using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Jondo.UI
{
    public class ComboBoxBuilder : DropDownListBuilderBase<ComboBox, ComboBoxBuilder>
    {
        public ComboBoxBuilder(ComboBox ddl) : base(ddl) { }

        public ComboBoxBuilder FilterType(FilterTypes type)
        {
            Component._filterType = type;
            return this;
        }

        protected override void GenerateHtmlContent()
        {
            var selectectitem = Component.Items?.FirstOrDefault(a => a.Value == Component.SelectedValue.ToString());
            Builder.Append("<span class='j-combobox'>");
            Builder.Append("<span class='j-dropdown-container'>");
            Builder.Append($@"<input type='text' class='j-dropdown-input' value='{selectectitem?.Text ?? ""}'\>");
            Builder.Append($@"<input style='display:none' id='{Component.Id}' value='{selectectitem?.Value ?? ""}'\>");
            Builder.Append("<span class='j-dropdown-panel'>");

            if (Component.Items != null)
            {
                Builder.Append("<span class='j-dropdown-panel'>");
                foreach (var item in Component.Items)
                {
                    Builder.Append($@"<li value='{item.Value}'>{item.Text}</li>");
                }
                Builder.Append(@"</ul>");
            }
            Builder.Append("</span>");
            Builder.Append(@"</span>");
            Builder.Append(@"</span>");
        }

        protected override void GenerateInitailizationScript()
        {
            var resolver = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var settings = JsonConvert.SerializeObject(Component, resolver);
            Builder.Append("<script>");
            Builder.Append($"$('#{Component.Id}').jondoComboBox({settings})");
            Builder.Append("</script>");
        }
    }

}
