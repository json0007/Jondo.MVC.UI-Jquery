using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Jondo.MultiSelect;
using Jondo.UI;

namespace Jondo.UI
{
    public partial class Jondo<TModel>
    {
        public MultiSelectBuilder MultiSelectDropDownList()
        {
            return new MultiSelectBuilder(new MultiSelect.MultiSelect());
        }

        public MultiSelectBuilder MultiSelectDropDownList(string name)
        {
            return new MultiSelectBuilder(new MultiSelect.MultiSelect(name));
        }

        public DropDownListBuilder MultiSelectDropDownListFor<TValue>(Expression<Func<TModel, TValue>> expression) where TValue : ICollection<TModel>
        {
            if (!(expression.Body is MemberExpression memberEx))
                throw new Exception("Invalid member expression");

            var name = memberEx.Member.Name;
            var value = expression.Compile().Invoke(_helper.ViewData.Model);
            return new DropDownListBuilder(new DropDownList(name, value));
        }
    }
}
