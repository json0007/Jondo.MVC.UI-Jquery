
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
    CreateUI(settings, this);
    this.events = settings.events;

    this.dataSource.set = function (data)
    {
        this.data = data;
        settings.components.li = []
        var ul = document.createElement("ul");
        for(var i = 0; i < data.length; i++)
        {
            var li = document.createElement("li");
            li.value = data[i].value;
            li.innerHTML = data[i].text;
            ul.appendChild(li);
            settings.components.li.push(li);
        }

        settings.components.panel.innerHTML = ""; 
        settings.components.panel.appendChild(ul);

        if (!comboBox.selectedValue)
            comboBox.selectedValue = data[0].value;

        comboBox.val(comboBox.selectedValue, true);

        $(settings.components.li).click(e => {
            comboBox.val(e.currentTarget.value);
        });
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

        let listItem = settings.components.li.filter(d => d.value == value)[0];
        let dataIem = comboBox.dataSource.data.filter(d => d.value == value)[0];

        if (dataIem)
        {
            comboBox.selectedValue = dataIem.value;
            settings.components.input.value = dataIem.value;
            settings.components.displayInput.value = dataIem.text;
            $(settings.components.li).removeClass("selected");
            $(listItem).addClass("selected");
        }
        return comboBox
    }

    if (settings.dataSource)
        comboBox.dataSource.read();

    function CreateUI(settings, dropDownList) {

        settings.components.input = document.getElementById(settings.id);
        settings.components.container = settings.components.input.parentElement;
        settings.components.panel = settings.components.container.getElementsByClassName("j-dropdown-panel")[0];
        settings.components.displayInput = settings.components.container.getElementsByClassName("j-dropdown-input")[0];

        let displayInput = settings.components.displayInput
        let container = settings.components.container;
        let panel = settings.components.panel;

        if(settings.items)
            settings.components.li = $(settings.components.panel).find('li');


        $(settings.components.li).click(e => {
            comboBox.val(e.currentTarget.value);
        });

        displayInput.addEventListener("click", e => {
            e.stopPropagation();
            if ($(container).hasClass("active")) {
                $(container).removeClass("active");
                $(panel).slideUp(150, () => $(container).removeClass("top"));
            }
            else {
                let height = window.scrollY + container.getBoundingClientRect().top + panel.offsetHeight;

                if (height > window.innerHeight) {
                    $(container).addClass("top");
                }

                $(container).addClass("active");
                $(panel).slideDown(150);
            }
        });

        $("body").click(e => {
            if (document.activeElement != null && document.activeElement.id === settings.id)
                return;
            $(container).removeClass("active");
            $(panel).slideUp(150, () => $(container).removeClass("top"));
        });

        
        if (settings.filterType === "StartsWith") {
            displayInput.addEventListener("keyup", e => {
                e.stopPropagation();
                let currentText = $(e.currentTarget).val();

                if (currentText === "") {
                    $(settings.components.li).css("display", "block");
                    return;
                }

                for (let i = 0; i < settings.components.li.length; i++) {
                    if (settings.components.li[i].innerHTML.startsWith(currentText)) {
                        $(settings.components.li[i]).css("display", "block");
                    }
                    else {
                        $(settings.components.li[i]).css("display", "none");
                    }
                }
            });
        }
        else if (settings.filterType === "EndsWidth") {
            displayInput.addEventListener("keyup", e => {
                e.stopPropagation();
                let currentText = $(e.currentTarget).val();

                if (currentText === "") {
                    $(settings.components.li).css("display", "block");
                    return;
                }

                for (let i = 0; i < settings.components.li.length; i++) {
                    if (settings.components.li[i].innerHTML.endsWith(currentText)) {
                        $(settings.components.li[i]).css("display", "block");
                    }
                    else {
                        $(settings.components.li[i]).css("display", "none");
                    }
                }
            });
        }
        else{
            displayInput.addEventListener("keyup", e => {
                e.stopPropagation();
                let currentText = $(e.currentTarget).val();

                if (currentText === "") {
                    $(settings.components.li).css("display", "block");
                    return;
                }

                for (let i = 0; i < settings.components.li.length; i++) {
                    if (settings.components.li[i].innerHTML.indexOf(currentText) >= 0) {
                        $(settings.components.li[i]).css("display", "block");
                    }
                    else {
                        $(settings.components.li[i]).css("display", "none");
                    }
                }
            });
        }
    }
}