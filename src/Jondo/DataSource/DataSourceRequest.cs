using Jondo.UI.Enums;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DataSourceRequest
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public SortDescriptor Sort { get; set; }
        public Dictionary<string, IEnumerable<FilterDescriptor>> Filters { get; set; }
    }
}
