using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DataSourceEventBuilder : EventBuilderBase<Events, DataSourceEventBuilder>
    {
        public DataSourceEventBuilder(Events component) : base(component) { }

        public DataSourceEventBuilder OnChange(string function)
        {
            if (Component.ContainsKey("change"))
                throw new InvalidOperationException("OnChange event has already been defined");
            Component.Add("change", function);

            return this;
        }
    }
}
