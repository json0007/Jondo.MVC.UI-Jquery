using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class Grid<T> : WidgetBase
    {
        public string Id { get; set; }
        public List<Column<T>> Columns { get; set; }
        public DataSource DataSource { get; set; }
        public bool Resizable { get; set; }
        public bool Sortable { get; set; }
        public string Height { get; set; }
        public bool Scrollable { get; set; }
        public PageSettings Paging{get; set;}
        public bool Filterable { get; set; } = true;
    }
}

