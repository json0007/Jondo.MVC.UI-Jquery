
(function ($) {

    var jondoDropDownListFunctions = {

        init: function (settings) {

            var ddl = new jondoDropDownList(settings);
            this.data("jondoDropDownList", ddl);
        }
    };

    $.fn.jondoDropDownList = function (methodOrOptions) {
        if (jondoDropDownListFunctions[methodOrOptions]) {
            return jondoDropDownListFunctions[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
            return jondoDropDownListFunctions.init.apply(this, arguments);
        } else {
            $.error("Method " + methodOrOptions + " does not exist");
        }
    };

})(jQuery);


function jondoDropDownList(settings) {
    var settings = settings;
    var dropDownList = this;
    this.dataSource = {};
    this.dataSource.data = {};
    this.components = {}
    this.selectedValue = settings.selectedValue;
    CreateUI(settings, this);
    this.events = settings.events;

    
    this.dataSource.set = function (data)
    {
        this.data = data;
        dropDownList.components.select.innerHTML = "";
        dropDownList.components.li = []
        var panel = document.getElementById(settings.id).parentElement.getElementsByClassName("j-dropdown-panel")[0];
        var ul = document.createElement("ul");
        for(var i = 0; i < data.length; i++)
        {
            var option = document.createElement("option");
            option.text = data[i].text;
            option.value = data[i].value;
            dropDownList.components.select.appendChild(option);

            var li = document.createElement("li");
            li.value = data[i].value;
            li.innerHTML = data[i].text;

            ul.appendChild(li);
            dropDownList.components.li.push(li);
        }

        $(dropDownList.components.li).click(e => {
            dropDownList.val($(e.currentTarget).attr("value"));

        });
        panel.innerHTML = ""; 
        panel.appendChild(ul);

        if (!dropDownList.selectedValue)
            dropDownList.selectedValue = data[0].value;

        dropDownList.val(dropDownList.selectedValue, true);
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
            return dropDownList.selectedValue
        }
        else
        {
            var select = document.getElementById(settings.id);
            if (dropDownList.dataSource.data.filter(d => d.value == value).length > 0)
            {
                dropDownList.selectedValue = value;
                select.value = value;
            }
            else
            {
                dropDownList.selectedValue = dropDownList.data[0].value;
                document.getElementById(settings.id).value = dropDownList.data[0].value;
            }

            var selected = dropDownList.components.li.filter(a => a.value == dropDownList.selectedValue)[0];
            $(dropDownList.components.li).removeClass("selected");
            $(dropDownList.components.selected).addClass("selected");
            dropDownList.components.button.innerHTML = selected.innerHTML;
            $(dropDownList.components.container).removeClass("active");
            $(dropDownList.components.container).removeClass("top");
            $(dropDownList.components.panel).hide();

            if(!ignoreChange)
                $(select).change();
        }
    }

    if (settings.dataSource)
        dropDownList.dataSource.read();
    else if (settings.items)
        dropDownList.dataSource.set(settings.items);
    else {
        var options = dropDownList.components.select.getElementsByTagName("options");
        var items = [];
        for (var i = 0; i > options.length; i++) {
            items.push({ text: options[i].innerHTML, value: options[i].value });
        }
        dropDownList.dataSource.set(items);
    }

    function CreateUI(settings, dropDownList) {
    
        var select = document.getElementById(settings.id);

        var parent = select.parentElement;
        var container = document.createElement("span");
        container.className = "j-dropdown-list";
        var panel = document.createElement("span");
        panel.className = "j-dropdown-panel";
        var button = document.createElement("a");
        button.className = "button"
        button.value = "Select one..."

        button.addEventListener("click", e => {
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

        if (settings.events && settings.events.onselect) {
            var fn = window[settings.events.onselect];
            if (typeof fn === "function")
                $(select).change(e => {
                    e.dropDownList = dropDownList;
                    fn(e)
                });
        }

        container.appendChild(button);
        container.appendChild(panel);

        parent.replaceChild(container, select);
        container.appendChild(select);

        dropDownList.components.button = button;
        dropDownList.components.select = select;
        dropDownList.components.panel = panel;
        dropDownList.components.container = container;
    }


}