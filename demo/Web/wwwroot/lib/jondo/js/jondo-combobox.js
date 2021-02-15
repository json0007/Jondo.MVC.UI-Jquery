
(function ($) {

    var jondoComboBoxFunctions = {

        init: function (settings) {

            var ddl = new jondoComboBox(settings);
            this.data("jondoComboBox", ddl);
        }
    };



    $.fn.jondoComboBox = function (methodOrOptions) {
        if (jondoComboBoxFunctions[methodOrOptions]) {
            return jondoComboBoxFunctions[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
            return jondoComboBoxFunctions.init.apply(this, arguments);
        } else {
            $.error("Method " + methodOrOptions + " does not exist");
        }
    };

})(jQuery);


function jondoComboBox(settings) {
    var settings = settings;
    var comboBox = this;
    this.dataSource = {};
    this.dataSource.data = {};
    this.components = {}
    this.selectedValue = settings.selectedValue;
    CreateUI(settings, this);
    this.events = settings.events;

    
    this.dataSource.set = function (data)
    {
        this.data = data;
        comboBox.components.select.innerHTML = "";
        comboBox.components.li = []
        var panel = document.getElementById(settings.id).parentElement.getElementsByClassName("j-dropdown-panel")[0];
        var ul = document.createElement("ul");
        for(var i = 0; i < data.length; i++)
        {
            var option = document.createElement("option");
            option.text = data[i].text;
            option.value = data[i].value;
            comboBox.components.select.appendChild(option);

            var li = document.createElement("li");
            li.value = data[i].value;
            li.innerHTML = data[i].text;

            ul.appendChild(li);
            comboBox.components.li.push(li);
        }

        $(comboBox.components.li).click(e => {
            comboBox.val(e.currentTarget.innerHTML);

        });
        panel.innerHTML = ""; 
        panel.appendChild(ul);

        if (!comboBox.selectedValue)
            comboBox.selectedValue = data[0].value;

        comboBox.val(comboBox.selectedValue, true);
    };

    this.dataSource.read = function () {
        let url;
        url = createUrl();
        $.get(url
            ).then(data => {
                this.set(data);
            });

        function createUrl() {
            return settings.dataSource.action.controller + "/" + settings.dataSource.action.method
        }
    }

    this.val = function (value, ignoreChange) {
        if (!value) {
            return comboBox.selectedValue
        }
        else
        {
            var select = document.getElementById(settings.id);
            if (comboBox.dataSource.data.filter(d => d.value == value).length > 0)
            {
                comboBox.selectedValue = value;
                select.value = value;
            }
            else
            {
                comboBox.selectedValue = comboBox.data[0].value;
                document.getElementById(settings.id).value = comboBox.data[0].value;
            }

            var selected = comboBox.components.li.filter(a => a.value == comboBox.selectedValue)[0];
            $(comboBox.components.li).removeClass("selected");
            $(comboBox.components.selected).addClass("selected");
         
            $(comboBox.components.container).removeClass("active");
            $(comboBox.components.container).removeClass("top");
            $(comboBox.components.panel).hide();

            if(!ignoreChange)
                $(select).change();
        }
    }

    if (settings.dataSource)
        comboBox.dataSource.read();
    else if (settings.items)
        comboBox.dataSource.set(settings.items);
    else {
        var options = comboBox.components.select.getElementsByTagName("options");
        var items = [];
        for (var i = 0; i > options.length; i++) {
            items.push({ text: options[i].innerHTML, value: options[i].value });
        }
        comboBox.dataSource.set(items);
    }

    function CreateUI(settings, dropDownList) {
    
        var select = document.getElementById(settings.id);

        var parent = select.parentElement;
        var container = document.createElement("span");
        container.className = "j-dropdown-list";
        var panel = document.createElement("span");
        panel.className = "j-dropdown-panel";


        select.addEventListener("click", e => {
            e.stopPropagation();
          
            if (!$(container).hasClass("active")) {
              
                var height = window.scrollY + container.getBoundingClientRect().top + panel.offsetHeight;
          
                if (height > window.innerHeight) {
                    $(container).addClass("top");
                }

                $(container).addClass("active");
                $(panel).slideDown(150);

            }
            else {
                $(container).removeClass("active");
                $(panel).slideUp(150, () => $(container).removeClass("top"));
            }
            $("body").click(() => {
                $(container).removeClass("active");
                $(panel).slideUp(150, () => $(container).removeClass("top"));
            });
        });

        select.addEventListener("keyup", e => {
            e.stopPropagation();
            let listValues = $(e.currentTarget).parent().find('li')
            let currentText = $(e.currentTarget).val();

          
            
            for (var i = 0; i < listValues.length; i++) {
                if (!listValues[i].innerHTML.startsWith(currentText)) {
                    $(listValues[i]).css("display", "none");
                }
                else {
                    $(listValues[i]).css("display", "block");
                }
            }
            
           
        });

        if (settings.events && settings.events.onselect) {
            var fn = window[settings.events.onselect];
            if (typeof fn === "function")
                $(select).change(e => {
                    e.dropDownList = dropDownList;
                    fn(e);
                });
        }

        container.appendChild(panel);

        parent.replaceChild(container, select);
        container.appendChild(select);

        dropDownList.components.select = select;
        dropDownList.components.panel = panel;
        dropDownList.components.container = container;
    }


}