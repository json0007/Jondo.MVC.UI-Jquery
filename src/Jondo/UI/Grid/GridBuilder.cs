using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class GridBuilder<T> : WidgetBuilderBase<GridBuilder<T>>
    {
        private readonly Grid<T> _component;

        public GridBuilder()
        {
            _component = new Grid<T>();
        }

        public GridBuilder<T> Id(string id)
        {
            _component.Id = id;
            return this;
        }

        public GridBuilder<T> Columns(Action<ColumnBuilder<T>> configurator)
        {
            _component.Columns = new List<Column<T>>();
            var columnBuilder = new ColumnBuilder<T>(_component.Columns);
            configurator.Invoke(columnBuilder);
            return this;
        }

        public GridBuilder<T> DataSource(Action<DataSourceBuilder> configurator)
        {
            _component.DataSource = new DataSource();
            var DataSourceBuilder = new DataSourceBuilder(_component.DataSource);
            configurator.Invoke(DataSourceBuilder);
            return this;
        }

        public GridBuilder<T> Resizable(bool enabled)
        {
            _component.Resizable = enabled;
            return this;
        }

        public GridBuilder<T> Sortable(bool enabled)
        {
            _component.Sortable = enabled;
            return this;
        }

        public GridBuilder<T> Paging()
        {

            Paging(new int[] { 20, 50, 100 });
            return this;
        }

        public GridBuilder<T> Paging(int [] pageSizes, int? defaultSize = null)
        {

            _component.Paging = new PageSettings {

                DefaultSize = defaultSize ?? pageSizes[0],
                PageSizes = pageSizes,
                
            };
            return this;
        }

        protected override void GenerateHtmlContent()
        {
            Builder.Append($"<div id='{_component.Id}' class='jondo-grid'></div>");
        }

        protected override void GenerateInitailizationScript()
        {
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            var grid = JsonConvert.SerializeObject(_component, settings);
            Builder.Append("<script>");
            Builder.Append($"$('.jondo-grid').jondoGrid({grid})");
            Builder.Append("</script>");
        }
    }
}
