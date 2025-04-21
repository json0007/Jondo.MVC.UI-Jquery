using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Jondo.UI
{
    public partial class Jondo<TModel>(IHtmlHelper<TModel> helper)
    {
        private readonly IHtmlHelper<TModel> _helper = helper;
    }
}
