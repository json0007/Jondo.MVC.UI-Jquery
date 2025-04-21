using Jondo.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.MultiSelect
{
    public class MultiSelect : WidgetBase
    {
        public MultiSelect() { }
        public MultiSelect(string id) 
        {
            Id = id;
        }
        public string Id { get; set; }
        
        public List<object> SelectedValue { get; set; }

    }
}
