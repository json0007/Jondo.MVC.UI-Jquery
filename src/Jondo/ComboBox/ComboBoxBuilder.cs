using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class ComboBoxBuilder : DropDownListBuilderBase<ComboBox, ComboBoxBuilder>
    {
        public ComboBoxBuilder(ComboBox ddl) : base(ddl) { }

        protected override void GenerateHtmlContent()
        {
            Builder.Append($@"<input type='text' id='{Component.Id}' \>");
        }

        protected override void GenerateInitailizationScript()
        {
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var dropdown = JsonConvert.SerializeObject(Component, settings);
            Builder.Append("<script>");
            Builder.Append($"$('#{Component.Id}').jondoComboBox({dropdown})");
            Builder.Append("</script>");
        }
    }
}
