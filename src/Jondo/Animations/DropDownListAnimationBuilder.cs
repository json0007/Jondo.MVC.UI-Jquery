using Jondo.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class DropDownListAnimationBuilder
    {
        private readonly Animations<DropDownListAnimation> _component;
        public DropDownListAnimationBuilder(Animations<DropDownListAnimation> component)
        {
            _component = component;
        }

        public DropDownListAnimationBuilder FadeIn(int speed) 
        {
            _component["in"] = new DropDownListAnimation(AnimationType.Fade, AnimationDirection.In, speed);
            return this;
        }
        public DropDownListAnimationBuilder FadeOut(int speed)
        {
            _component["out"] = new DropDownListAnimation(AnimationType.Fade, AnimationDirection.Out, speed);
            return this;
        }

        public DropDownListAnimationBuilder SlideIn(int speed)
        {
            _component["out"] = new DropDownListAnimation(AnimationType.Slide, AnimationDirection.In, speed);
            return this;
        }

        public DropDownListAnimationBuilder SlideOut(int speed)
        {
            _component["out"] = new DropDownListAnimation(AnimationType.Slide, AnimationDirection.Out, speed);
            return this;
        }
    }
}
