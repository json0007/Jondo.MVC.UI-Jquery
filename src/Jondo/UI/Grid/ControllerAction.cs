using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class ControllerAction
    {
        public object RouteValues { get; set; }
        public string Controller { get; set; }
        public string Method { get; set; }
        private string _url { get; set; }
        public string Url
        {
            get => _url ??= $@"{Controller}/{Method}";
            set => _url = value;
        }
    }
}
