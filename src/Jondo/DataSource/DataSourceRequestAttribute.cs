using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Jondo.UI
{
    public class DataSourceRequestAttribute : ModelBinderAttribute
    {
        public DataSourceRequestAttribute() : base(typeof(DataSourceRequestModelBinder)) { }

    }
}
