using Jondo.UI;
using Jondo.UI.Grid;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class ComboBox : DropDownList
    {
        public FilterTypes _filterType;
        public string FilterType => Enum.GetName(typeof(FilterTypes), _filterType);
        public ComboBox() { }

        public ComboBox(string name) : base(name){}

        public ComboBox(string name, object value): base(name, value) { }
        public ComboBox(string name, IEnumerable<object> value) 
        {
            Id = name;
            SelectedValue = value;
        }
    }

    public enum FilterTypes
    {
        Contains = 0,
        StartsWith = 1,
        EndsWith = 2,
    }
}
