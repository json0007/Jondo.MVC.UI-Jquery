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
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Jondo.UI
{
    public static class Extensions
    {
        public static Jondo<TModel> Jondo<TModel>(this IHtmlHelper<TModel> helper)
        {
            return new Jondo<TModel>(helper);
        }
    }

    public class Jondo<TModel>
    {
        private readonly IHtmlHelper<TModel> _helper;
        public Jondo(IHtmlHelper<TModel> helper)
        {
            _helper = helper;
        }
        public GridBuilder<T> Grid<T>()
        {
            return new GridBuilder<T>();
        }

        public DropDownListBuilder DropDownList() 
        {
            return new DropDownListBuilder(new DropDownList());
        }

        public ComboBoxBuilder ComboBox()
        {
            return new ComboBoxBuilder(new ComboBox());
        }

        public ComboBoxBuilder ComboBox(string name)
        {
            return new ComboBoxBuilder(new ComboBox(name));
        }

        public DropDownListBuilder DropDownList(string name)
        {
            return new DropDownListBuilder(new DropDownList(name));
        }

        public DropDownListBuilder DropDownListFor<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            if (!(expression.Body is MemberExpression memberEx))
                throw new Exception("Invalid member expression");

            var name = memberEx.Member.Name;
            var value = expression.Compile().Invoke(_helper.ViewData.Model);
            return new DropDownListBuilder(new DropDownList(name, value));
        }
    }           
}
