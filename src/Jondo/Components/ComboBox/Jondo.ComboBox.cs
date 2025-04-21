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
        public ComboBoxBuilder ComboBox()
        {
            return new ComboBoxBuilder(new ComboBox());
        }

        public ComboBoxBuilder ComboBox(string name)
        {
            return new ComboBoxBuilder(new ComboBox(name));
        }

        public ComboBoxBuilder ComboBoxFor<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            if (!(expression.Body is MemberExpression memberEx))
                throw new Exception("Invalid member expression");

            var name = memberEx.Member.Name;
            var value = expression.Compile().Invoke(_helper.ViewData.Model);

            return new ComboBoxBuilder(new ComboBox(name, value));
        }
    }
}
