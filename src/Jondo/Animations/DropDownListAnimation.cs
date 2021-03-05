using Jondo.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DropDownListAnimation
    {
        public AnimationType Type { get; set; }
        AnimationDirection Direction { get; set; }
        public string Name => $"{Enum.GetName(typeof(AnimationType), Type)}{Enum.GetName(typeof(AnimationDirection), Direction)}";

        public int Speed { get; set; }

        public DropDownListAnimation(AnimationType type, AnimationDirection direction, int speed)
        {
            Type = type;
            Direction = direction;
            Speed = speed;
        }
    }
}
