using Jondo.UI.Grid;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;
using System.Xml.Xsl;

namespace Jondo.UI
{
    public class DataSourceBuilder
    {
        private readonly DataSource _component;
        public DataSourceBuilder(DataSource component)
        {
            _component = component;
        }

        public DataSourceBuilder Read(Action<ControllerActionBuilder> configurator)
        {
            _component.Action = new ControllerAction();
            var actionBuilder = new ControllerActionBuilder(_component.Action);
            configurator.Invoke(actionBuilder);
            return this;
        }
    }
}
