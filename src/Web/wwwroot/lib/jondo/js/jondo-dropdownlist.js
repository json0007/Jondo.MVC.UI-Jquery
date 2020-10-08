
(function ($) {

    var jondoDropDownListFunctions = {

        init: function (settings) {
            this.data("jondoGrid", new jondoDropDownList(settings));
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
    settings.components.jondoDropDownList = this
    jondoDropDownList = this;

    this.val = function (value) {
        if (value)

    }
}