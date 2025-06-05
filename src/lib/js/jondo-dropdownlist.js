
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
        dropDownList.Items = data;
        this.data = data;
        dropDownList.components.li = []
        var panel = document.getElementById(settings.id).parentElement.getElementsByClassName("j-dropdown-panel")[0];
        var ul = document.createElement("ul");
        for(var i = 0; i < data.length; i++)
        {
            var li = document.createElement("li");
            li.value = data[i].value;
            li.innerHTML = data[i].text;

            ul.appendChild(li);
            dropDownList.components.li.push(li);
        }

        $(dropDownList.components.li).on("mousedown", e => {
            dropDownList.val($(e.currentTarget).attr("value"));
        });

        panel.innerHTML = ""; 
        panel.appendChild(ul);

        if (!dropDownList.selectedValue)
            dropDownList.selectedValue = data[0].value;

        dropDownList.val(dropDownList.selectedValue);
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

    this.val = function (value, ignoreChangeEvent) {

        if (!value) {
            return dropDownList.selectedValue
        }

        let listItem = dropDownList.components.li.filter(d => d.value == value)[0];
        let dataIem = dropDownList.dataSource.data.filter(d => d.value == value)[0];

        if (dataIem) {
            dropDownList.selectedValue = dataIem.value;
            dropDownList.components.input.value = dataIem.value;
            dropDownList.components.displayInput.value = dataIem.text;
            $(dropDownList.components.li).removeClass("selected");
            $(listItem).addClass("selected");
        }
        return dropDownList;
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

        dropDownList.components.input = document.getElementById(settings.id);
        dropDownList.components.container = dropDownList.components.input.parentElement;
        dropDownList.components.panel = dropDownList.components.container.getElementsByClassName("j-dropdown-panel")[0];
        dropDownList.components.displayInput = dropDownList.components.container.getElementsByClassName("j-dropdown-input")[0];

        let displayInput = dropDownList.components.displayInput
        let container = dropDownList.components.container;
        let panel = dropDownList.components.panel;

        let panelFunctions = {};

        panelFunctions["FadeIn"] = function () {

            var height = window.scrollY + container.getBoundingClientRect().top + panel.offsetHeight;

            if (height > window.innerHeight) {
                $(container).addClass("top");
            }
            $(dropDownList.components.container).addClass("active");
            $(dropDownList.components.panel).fadeIn(settings.animations.in.speed);
        }

        panelFunctions["FadeOut"] = function () {
            $(dropDownList.components.panel).fadeOut(settings.animations.out.speed, () => {
                $(dropDownList.components.container).removeClass("top");
                $(dropDownList.components.container).removeClass("active");
            });
        }

        panelFunctions["SlideIn"] = () => {

            var height = window.scrollY + container.getBoundingClientRect().top + panel.offsetHeight;

            if (height > window.innerHeight) {
                $(container).addClass("top");
            }
            $(dropDownList.components.container).addClass("active");
            $(dropDownList.components.panel).slideDown(settings.animations.in.speed);
        }

        panelFunctions["SlideOut"] = () => {
            $(dropDownList.components.panel).slideUp(settings.animations.out.speed, () => {
                $(dropDownList.components.container).removeClass("top");
                $(dropDownList.components.container).removeClass("active");
            });
        }        


        displayInput.addEventListener("keydown", (event) => {
            var item = dropDownList.Items.filter(a => a.value === dropDownList.selectedValue)[0];
            index = dropDownList.Items.indexOf(item);

            if (event.keyCode === 40) {
                if (index > dropDownList.Items.length)
                    return;
                dropDownList.val(dropDownList.Items[index + 1 ].value)
            }
            else if (event.keyCode === 38) {
                if (index == 0)
                    return;
                dropDownList.val(dropDownList.Items[index - 1].value)
            }
            else if (event.keyCode === 9) {
                panelFunctions[settings.animations.out.Name];
            }
        });

        displayInput.addEventListener("focus", panelFunctions[settings.animations.in.name]);

        displayInput.addEventListener("blur", panelFunctions[settings.animations.out.name]);

    }


}