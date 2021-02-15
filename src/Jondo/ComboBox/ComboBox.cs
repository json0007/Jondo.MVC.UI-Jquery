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
        public ComboBox() { }

        public ComboBox(string name) : base(name){}

        public ComboBox(string name, IEnumerable<object> value) 
        {
            Id = name;
            SelectedValue = value;
        }
    }
}
