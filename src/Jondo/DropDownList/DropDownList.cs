using Jondo.Enums;
using Jondo.UI;
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
            SelectedValue = value;
        }

        public string Id { get; set; }

        public object SelectedValue { get; set; }

        public Dictionary<string, string> Events { get; set; } = new Dictionary<string, string>();

        public DataSource DataSource { get; set; }

        public Animation InAnimation { get; set; } = new Animation { Type = AnimationType.Slide, Speed = 150 };

        public Animation OutAnimation { get; set; } = new Animation { Type = AnimationType.Slide, Speed = 150 };

        public int AnimationSpeed { get; set; } = 150;



        public string CascadeFromId { get; set; }

        public IEnumerable<SelectListItem> Items { get; set; }
    }
}
