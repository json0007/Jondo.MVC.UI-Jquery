using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Jondo.UI
{
    public partial class Jondo<TModel>
    {
        public DropDownListBuilder DropDownList()
        {
            return new DropDownListBuilder(new DropDownList());
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
