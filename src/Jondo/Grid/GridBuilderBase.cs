using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public abstract class GridBuilderBase<T, TComponent, TBuilder> : WidgetBuilderBase<TComponent> 
        where TBuilder : GridBuilderBase<T, TComponent, TBuilder>
        where TComponent : Grid<T>
    {
        private readonly TBuilder _builder;


        public GridBuilderBase(TComponent component) : base(component) { }

        public TBuilder Id(string id)
        {
            Component.Id = id;
            return (TBuilder)this;
        }

        public TBuilder Columns(Action<ColumnBuilder<T>> configurator)
        {
            Component.Columns = new List<Column<T>>();
            var columnBuilder = new ColumnBuilder<T>(Component.Columns);
            configurator.Invoke(columnBuilder);
            return (TBuilder)this;
        }

        public TBuilder DataSource(Action<DataSourceBuilder> configurator)
        {
            Component.DataSource = new DataSource();
            var DataSourceBuilder = new DataSourceBuilder(Component.DataSource);
            configurator.Invoke(DataSourceBuilder);
            return (TBuilder)this;
        }

        public TBuilder Resizable(bool enabled)
        {
            Component.Resizable = enabled;
            return (TBuilder)this;
        }

        public TBuilder Sortable(bool enabled)
        {
            Component.Sortable = enabled;
            return (TBuilder)this;
        }

        public TBuilder Paging()
        {

            Paging(new int[] { 20, 50, 100 });
            return (TBuilder)this;
        }

        public TBuilder Paging(int [] pageSizes, int? defaultSize = null)
        {

            Component.Paging = new PageSettings {

                DefaultSize = defaultSize ?? pageSizes[0],
                PageSizes = pageSizes,
            };
            return (TBuilder)this;
        }

        protected override void GenerateHtmlContent()
        {
            Builder.Append($"<div id='{Component.Id}' class='jondo-grid'></div>");
        }

        protected override void GenerateInitailizationScript()
        {
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var grid = JsonConvert.SerializeObject(Component, settings);
            Builder.Append("<script>");
            Builder.Append($"$('.jondo-grid').jondoGrid({grid})");
            Builder.Append("</script>");
        }
    }
}
