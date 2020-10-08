using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Jondo.UI
{
    public static class ExpressionHelpers
    {
        public static PropertyInfo GetPropertyInfo<T>(this Expression<Func<T, object>> expression)
        {
            MemberExpression memberExpression = null;

            switch (expression?.Body)
            {
                case null:
                    throw new ArgumentNullException(nameof(expression));
                case UnaryExpression unaryExp when unaryExp.Operand is MemberExpression:
                    memberExpression = (MemberExpression)unaryExp.Operand;
                    break;
                case MemberExpression memberExp:
                    memberExpression = (MemberExpression)expression.Body;
                    break;
                default:
                    throw new ArgumentException($"The expression doesn't indicate a valid property. [ {expression} ]");
            }

            var propertyInfo = (PropertyInfo)memberExpression.Member;

            var innerExpression = memberExpression.Expression;

            while (innerExpression is MemberExpression)
            {
                memberExpression = (MemberExpression)innerExpression;
                propertyInfo = (PropertyInfo)memberExpression.Member;
                innerExpression = memberExpression.Expression;
            }

            return propertyInfo;
        }
    }
}
