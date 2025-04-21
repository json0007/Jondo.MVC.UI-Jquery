using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Jondo.UI;

namespace Jondo.UI
{
    public partial class Jondo<TModel>
    {
        public GridBuilder<T> Grid<T>()
        {
            return new GridBuilder<T>();
        }
    }
}
