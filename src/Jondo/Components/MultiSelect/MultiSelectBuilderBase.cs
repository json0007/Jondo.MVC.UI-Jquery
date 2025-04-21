using Jondo.UI;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.MultiSelect
{
    public class MultiSelectBuilderBase<TComponent, TBuilder> : WidgetBuilderBase<TComponent>
        where TBuilder : MultiSelectBuilderBase<TComponent, TBuilder>
        where TComponent : MultiSelect
    {
        public MultiSelectBuilderBase(TComponent component) : base(component) { }

        protected override void GenerateHtmlContent()
        {
            Builder.Append($"<div id='{Component.Id}'></div>");
        }

        protected override void GenerateInitailizationScript()
        {
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var multiSelect = JsonConvert.SerializeObject(Component, settings);
            Builder.Append("<script>");
            Builder.Append($"$('#{Component.Id}').jondoMultiSelect({multiSelect})");
            Builder.Append("</script>");
        }
    }
}
