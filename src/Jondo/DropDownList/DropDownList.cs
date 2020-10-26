using Jondo.UI;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DropDownList : WidgetBase
    {
        public string Id { get; set; }

        public IEnumerable<SelectListItem> Items { get; set; } = new List<SelectListItem>();
    }
}
