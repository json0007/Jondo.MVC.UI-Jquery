using Jondo.UI.Enums;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;

namespace Jondo.UI
{
    public static class EnumerableExtensions
    {
        public static DataSourceResult ToDataSourceResult(this IEnumerable data, DataSourceRequest request)
        {
            var enumerable = data.Cast<object>();

            if (request == null)
                return new DataSourceResult
                {
                    Data = enumerable,
                    Total = enumerable.Count()
                };

            var type = enumerable.GetType().GenericTypeArguments.First();

            foreach(var filter in request.Filters)
            {
                foreach (var descriptor in filter.Value)
                {
                    enumerable = FilterEnumerable(enumerable, type, filter.Key, descriptor);
                }
            }

            var skip = (request.Page - 1) * request.PageSize;
      
            if(request.Sort != null)
            {       
                var prop = TypeDescriptor.GetProperties(type).Find(request.Sort.PropertyName, false);
                if (request.Sort.Direction == SortDirection.Ascending)
                    enumerable = enumerable.OrderBy(x => prop.GetValue(x));
                else
                    enumerable = enumerable.OrderByDescending(x => prop.GetValue(x));
            }

            var count = enumerable.Count();
            var pageCount = (int)Math.Ceiling( ((double)count) / request.PageSize);

            if (request.Page > pageCount)
                skip = (pageCount - 1) * request.PageSize;
 
            return new DataSourceResult
            {
                Data = enumerable.Skip(skip).Take(request.PageSize),
                Total = count
            };
        }

        public static IEnumerable<object> FilterEnumerable(IEnumerable<object> enumerable, Type type, string propertyName, FilterDescriptor descriptor)
        {
            var property = type.GetProperty(propertyName);

            var param = Expression.Parameter(type);

            switch (descriptor.Type)
            {
                case Enums.FilterType.Equals:
                    {
                       return enumerable.Where(a => property.GetValue(a).ToString().ToLower() == descriptor.Value);
                    }
                case Enums.FilterType.NotEqual:
                    {
                        return enumerable.Where(a => property.GetValue(a).ToString().ToLower() != descriptor.Value);
                    }
                case Enums.FilterType.Contains:
                    {
                        return enumerable.Where(a => property.GetValue(a).ToString().ToLower().Contains(descriptor.Value));
                    }
                case Enums.FilterType.NotContains:
                    {
                        return enumerable.Where(a => !property.GetValue(a).ToString().ToLower().Contains(descriptor.Value));
                    }
                default:
                    throw new InvalidOperationException("Invalid filter type, or filter type not defined");
            }

           
        }

    }
}
