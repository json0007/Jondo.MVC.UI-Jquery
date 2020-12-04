using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Security;
using System.Text;

namespace Jondo.DropDownList
{
    public class DropDownListEventBuilder
    {
        private readonly IDictionary<string, string> component;

        public DropDownListEventBuilder(IDictionary<string, string> events)
        {
            component = events;
        }

        public void OnSelect(string function)
        {
            component.Add("onselect", function);
        }
    }
}
