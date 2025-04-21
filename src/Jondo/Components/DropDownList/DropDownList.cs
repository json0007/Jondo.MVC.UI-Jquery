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

        public Events Events { get; set; } = new Events();

        public DataSource DataSource { get; set; }

        public Animations<DropDownListAnimation> Animations { get; set; } = InitAnimations();

        public int AnimationSpeed { get; set; } = 150;

        public string CascadeFromId { get; set; }

        public IEnumerable<SelectListItem> Items { get; set; }

        private static Animations<DropDownListAnimation> InitAnimations()
        {
            var anime = new Animations<DropDownListAnimation>();
            anime["in"] = new DropDownListAnimation (AnimationType.Slide, AnimationDirection.In, 150);
            anime["out"] = new DropDownListAnimation(AnimationType.Slide, AnimationDirection.Out, 150);
            return anime;
        }
    }
}
