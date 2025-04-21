using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class ColumnBuilder<T>
    {
        private readonly List<Column<T>> _columns;

        public ColumnBuilder(List<Column<T>> columns)
        {
            _columns = columns;
        }

        public Column<T> Add()
        {
            var column = new Column<T>();
            _columns.Add(column);
            return column;
        }
    }
}
