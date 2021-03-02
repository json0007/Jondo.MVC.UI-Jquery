using Jondo.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class AnimationBuilder
    {
        private readonly Animation _in;
        private readonly Animation _out;
        public AnimationBuilder(Animation component1, Animation component2)
        {
            _in = component1;
            _out = component2;
        }

        public AnimationBuilder FadeIn(int speed) 
        {
            _in.Type = AnimationType.Fade;
            _in.Speed = speed;
            return this;
        }
        public AnimationBuilder FadeOut(int speed)
        {
            _out.Type = AnimationType.Fade;
            _out.Speed = speed;
            return this;
        }

        public AnimationBuilder SlideIn(int speed)
        {
            _in.Type = AnimationType.Slide;
            _in.Speed = speed;
            return this;
        }

        public AnimationBuilder SlideOut(int speed)
        {
            _out.Type = AnimationType.Slide;
            _out.Speed = speed;
            return this;
        }
    }
}
