using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Jondo.UI
{
    public class GridBuilder<T> : GridBuilderBase<T, Grid<T>, GridBuilder<T>> 
    {
        public GridBuilder() : base(new Grid<T>()) { }
    }
}
