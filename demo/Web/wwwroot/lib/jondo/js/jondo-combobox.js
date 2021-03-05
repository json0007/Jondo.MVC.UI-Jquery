
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
    settings.components = {}
    settings.components.li = [];
    this.components = {};
    this.components.li = [];
    this.selectedValue = settings.selectedValue;
    
    CreateEvents(settings);
    CreateUI(settings);

    this.dataSource.set = function (data)
    {
        this.data = data;
        settings.items = data;
        settings.components.li = []
        var ul = document.createElement("ul");
        for(var i = 0; i < data.length; i++)
        {
            var li = document.createElement("li");
            li.value = data[i].value;
            li.innerHTML = data[i].text;
            ul.appendChild(li);
            settings.components.li.push(li);
            li.addEventListener("mousedown", settings.events.listitem_mousedown);
            li.addEventListener("click", settings.events.listitem_click);
            li.addEventListener("mouseup", settings.events.listitem_mouseup);
        }

        settings.components.panel.innerHTML = ""; 
        settings.components.panel.appendChild(ul);

        comboBox.selectedValue = comboBox.selectedValue ?? data[0].value;

        comboBox.val(comboBox.selectedValue, true);

        if (settings.dataSource.events["change"])
            window[settings.dataSource.events["schange"]]();

      
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
            return comboBox.selectedValue
        }

        let dataIem = settings.items.filter(d => d.value == value)[0];

        if (dataIem) {
            let listItem = settings.components.li.filter(d => d.value == value)[0];
            settings.selectedValue = dataIem.value;
            settings.components.input.value = dataIem.value;
            settings.components.input.defaultValue = dataIem.value;
            settings.components.displayInput.value = dataIem.text;
            $(settings.components.li).removeClass("selected");
            $(listItem).addClass("selected");
        }
      
        return comboBox
    }

    if (settings.dataSource)
        comboBox.dataSource.read();

    function CreateEvents(settings) {

        let filterFunctions = {};
        let panelFunctions = {};
        panelFunctions["FadeIn"] = function () {
            $(settings.components.panel).fadeIn(settings.animations.in.speed);
        }

        panelFunctions["FadeOut"] = function () {
            $(settings.components.panel).fadeOut(settings.animations.out.speed, () => {
                $(settings.components.container).removeClass("top");
                $(settings.components.container).removeClass("active");
                $(settings.components.li).show();
            });
        }

        panelFunctions["SlideIn"] = function () {
            $(settings.components.panel).slideDown(settings.animations.in.speed, () => {
                $(settings.components.container).removeClass("top");
                $(settings.components.li).show();
                $(settings.components.container).removeClass("active");
            });
        }

        panelFunctions["SlideOut"] = function () {
            $(settings.components.panel).slideUp(settings.animations.out.speed);
        }

        filterFunctions["StartsWith"] = function (value, currentText) {
            return value.toLowerCase().startsWith(currentText.toLowerCase());
        }

        filterFunctions["EndsWidth"] = function (value, currentText) {
            return value.toLowerCase().endsWith(currentText.toLowerCase());
        }

        filterFunctions["Contains"] = function (value, currentText) {
            return value.toLowerCase().indexOf(currentText.toLowerCase()) >= 0;
        }

        settings.events.filter = function (e) {
            if (event.keyCode === 40 || event.keyCode === 38) {
                return;
            } 

            if (!settings.components.panel.isOpen)
                settings.events.open();

         
            let showItems = [];
            let hiddenItems = [];
            for (var i = 0; i < settings.components.li.length; i++)
            {
                if (filterFunctions[settings.filterType](settings.components.li[i].innerHTML, e.currentTarget.value)) {
                    showItems.push(settings.components.li[i]);
                    settings.components.li[i].hidden = false;
                }
                else {
                    hiddenItems.push(settings.components.li[i])
                    settings.components.li[i].true = false;
                }

            }

            $(showItems).show();
            $(hiddenItems).hide();
        }

        settings.events.close = function (e) {

            if (!settings.components.panel.isOpen)
                return;

            panelFunctions[settings.animations.out.name]();

            var item = settings.items.filter(a => a.value == settings.selectedValue);

            $(settings.components.li).show();

            if (item)
                comboBox.val(settings.selectedValue);
            else
                comboBox.val("");

            settings.components.panel.isOpen = false;
        }

        settings.events.open = function (e) {
            if (settings.components.panel.isOpen)
                return;

            let height = window.scrollY + settings.components.container.getBoundingClientRect().top + settings.components.panel.offsetHeight;
            if (height > window.innerHeight) {
                $(settings.components.container).addClass("top");
            }
            $(settings.components.container).addClass("active");

            panelFunctions[settings.animations.in.name]();
            settings.components.panel.isOpen = true; 
        }

        settings.events.listitem_mousedown = function (e) {
            settings.components.displayInput.removeEventListener("blur", settings.events.close);
        }

        settings.events.listitem_click = function (e) {
            comboBox.val(e.currentTarget.value);
            settings.events.close();
        }

        settings.events.listitem_mouseup = function (e) {
            settings.components.displayInput.addEventListener("blur", settings.events.close);
        }

        settings.events.scroll_select = function (e) {

            if (event.keyCode === 9) {
                settings.events.close();
                return;
            }

            if (!settings.components.panel.isOpen)
                settings.events.open();

            var item = settings.items.filter(a => a.value === settings.selectedValue)[0];
            index = settings.items.indexOf(item);

            if (event.keyCode === 40) {
                if (index > settings.items.length)
                    return;
                comboBox.val(settings.items[index + 1].value)
            }
            else if (event.keyCode === 38) {
                if (index == 0)
                    return;
                comboBox.val(settings.items[index - 1].value)
            }
        }
    }

    function CreateUI(settings) {

        settings.components.input = document.getElementById(settings.id);
        settings.components.container = settings.components.input.parentElement;
        settings.components.panel = settings.components.container.getElementsByClassName("j-dropdown-panel")[0];
        settings.components.displayInput = settings.components.container.getElementsByClassName("j-dropdown-input")[0];

       

        settings.components.panel.isOpen = false;

        if(settings.items)
            settings.components.li = $(panel).find('li');

        $(settings.components.li).on("mousedown", settings.events.listitem_mousedown);
        $(settings.components.li).on("click", settings.events.listitem_click);
        $(settings.components.li).on("mouseup", settings.events.listitem_mouseup);

        settings.components.displayInput.addEventListener("keydown", settings.events.scroll_select)         
        settings.components.displayInput.addEventListener("focus", settings.events.open);  
        settings.components.displayInput.addEventListener("blur", settings.events.close);      
        settings.components.displayInput.addEventListener("keyup", settings.events.filter)
    }
}