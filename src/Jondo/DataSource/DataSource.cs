using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DataSource
    {
        public ControllerAction Action { get; set; } = new ControllerAction();

        public bool AutoBind { get; set; } = true;

        public Events Events { get; set; } = new Events();
    }
}
