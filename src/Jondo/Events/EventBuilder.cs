using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class EventBuilderBase<TEvents, TBuilder> 
        where TBuilder : EventBuilderBase<TEvents, TBuilder> 
        where TEvents: Events
    {

        protected readonly TEvents Component;

        public EventBuilderBase(TEvents component)
        {
            Component = component;
        }
        
    }
}
