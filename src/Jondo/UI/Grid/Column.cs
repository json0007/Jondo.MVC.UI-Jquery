using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Jondo.UI
{
    public class Column<T>
    {
        public string DisplayName { get; set; }
        public string PropertyName { get; set; }

        public Column<T> BindTo(Expression<Func<T, object>> selector)
        {
            var propertyInfo = selector.GetPropertyInfo();

            var attr = (DisplayAttribute)propertyInfo.GetCustomAttribute(typeof(DisplayAttribute));

            DisplayName = attr?.Name ?? propertyInfo.Name;
            PropertyName = propertyInfo.Name;
            return this;
        }
    }
}
