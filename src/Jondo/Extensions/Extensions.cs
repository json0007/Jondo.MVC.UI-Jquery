using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Encodings.Web;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Jondo.UI
{
    public static class Extensions
    {
        public static Jondo Jondo(this IHtmlHelper helper)
        {
            return new Jondo();
        }
    }

    public class Jondo
    {
        public GridBuilder<T> Grid<T>()
        {
            return new GridBuilder<T>();
        }

        public DropDownListBuilder DropDownList() 
        {
            return new DropDownListBuilder();
        }
    }
}
