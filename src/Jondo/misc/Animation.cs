using Jondo.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class Animation
    {
        public AnimationType Type { get; set; }

        public string TypeName => Enum.GetName(typeof(AnimationType), Type);

        public int Speed { get; set; }
    }
}
