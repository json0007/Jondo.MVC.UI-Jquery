using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public abstract class DataSourceBuilderBase<TSource, TBuilder> 
        where TSource : DataSource
        where TBuilder : DataSourceBuilderBase<TSource, TBuilder>
    {

        protected readonly DataSource Component;

        public DataSourceBuilderBase(DataSource component)
        {
            Component = component;
        }
        public virtual TBuilder Read(string Controller, string action)
        {
            Component.Action = new ControllerAction();
            Component.Action = new ControllerAction { Controller = Controller, Method = action };
            return (TBuilder)this;
        }

        public virtual TBuilder Read(Action<ControllerActionBuilder> configurator)
        {
            Component.Action = new ControllerAction();
            var builder = new ControllerActionBuilder(Component.Action);
            configurator.Invoke(builder);
            return (TBuilder)this;
        }

        public virtual TBuilder AutoBind(bool enable = true)
        {
            Component.AutoBind = enable;
            return (TBuilder)this;
        }

        public virtual TBuilder Events(Action<DataSourceEventBuilder> configurator)
        {
            var builder = new DataSourceEventBuilder(Component.Events);
            configurator.Invoke(builder);
            return (TBuilder)this;
        }
    }
}
