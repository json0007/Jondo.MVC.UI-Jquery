using Jondo.DropDownList;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace Jondo.UI
{
    public abstract class DropDownListBuilderBase<TComponent, TBuilder> : WidgetBuilderBase<TComponent>
        where TBuilder : DropDownListBuilderBase<TComponent, TBuilder>
        where TComponent : DropDownList
    {

        public DropDownListBuilderBase(TComponent component) : base(component) { }


        public TBuilder Name(string name)
        {
            Component.Id = name;
            return (TBuilder)this;
        }

        public TBuilder Animation(Action<DropDownListAnimationBuilder> config)
        {
            var builder = new DropDownListAnimationBuilder(Component.Animations);
            config.Invoke(builder);
            return (TBuilder)this;
        }

        public TBuilder DataSource(Action<DataSourceBuilder> configure)
        {
            Component.DataSource = new DataSource();
            var builder = new DataSourceBuilder(Component.DataSource);
            configure.Invoke(builder);
            return (TBuilder)this;
        }

        public TBuilder CascadeFrom(string name)
        {
            Component.Id = name;
            return (TBuilder)this;
        }

        public TBuilder BindTo(IEnumerable<SelectListItem> items)
        {
            Component.Items = items;
            return (TBuilder)this;
        }

        public TBuilder Events(Action<DropDownListEventBuilder> builder)
        {
            var b = new DropDownListEventBuilder(Component.Events);
            builder.Invoke(b);
            return (TBuilder)this;
        }

        protected override void GenerateHtmlContent()
        {
            var selectectitem = Component.Items?.FirstOrDefault(a => a.Value == Component.SelectedValue.ToString());
            Builder.Append("<span class='j-dropdown-list'>");
            Builder.Append("<span class='j-dropdown-container'>");
            Builder.Append($@"<input type='button' class='j-dropdown-input' value='{selectectitem?.Text ?? " "}'\>");
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
            Builder.Append(@"</span>");
            Builder.Append(@"</span>");
            Builder.Append(@"</span>");
        }

        protected override void GenerateInitailizationScript()
        {
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var dropdown = JsonConvert.SerializeObject(Component, settings);
            Builder.Append("<script>");
            Builder.Append($"$('#{Component.Id}').jondoDropDownList({dropdown})");
            Builder.Append("</script>");
        }
    }
}
