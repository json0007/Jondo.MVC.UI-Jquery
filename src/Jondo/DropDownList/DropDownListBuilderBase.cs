using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DropDownListBuilderBase<TComponent, TBuilder> : WidgetBuilderBase<TComponent>
        where TBuilder : DropDownListBuilderBase<TComponent, TBuilder>
        where TComponent : DropDownList
    {

        public DropDownListBuilderBase(TComponent component) : base(component) { }


        public TBuilder Name(string name)
        {
            Component.Id = name;
            return (TBuilder)this;
        }


        public TBuilder BindTo(IEnumerable<SelectListItem> items)
        {
            Component.Items = items;
            return (TBuilder)this;
        }

        protected override void GenerateHtmlContent()
        {
            Builder.Append($"<select id='{Component.Id}'>");
            foreach(var item in Component.Items)
            {
                Builder.Append($"<option value='{item.Value}'>{item.Text}</option>");
            }
            Builder.Append($"</select>");
        }

        protected override void GenerateInitailizationScript()
        {
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var dropdown = JsonConvert.SerializeObject(Component, settings);
            Builder.Append("<script>");
            Builder.Append($"$('.jondo-grid').jondoDropDownList({dropdown})");
            Builder.Append("</script>");
        }
    }
}
