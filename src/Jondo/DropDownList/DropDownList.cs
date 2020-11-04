using Jondo.UI;
using Jondo.UI.Grid;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DropDownList : WidgetBase
    {
        public DropDownList() { }

        public DropDownList(string name)
        {
            Id = name;
        }

        public DropDownList(string name, object value) 
        {
            Id = name;
            Value = value;
        }

        public string Id { get; set; }

        public object Value { get; set; }

        public DataSource DataSource { get; set; }

        public string CascadeFromId { get; set; }

        public IEnumerable<SelectListItem> Items { get; set; }
    }
}
