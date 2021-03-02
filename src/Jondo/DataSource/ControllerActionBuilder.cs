using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Jondo.UI
{
    public class ControllerActionBuilder
    {
        private readonly ControllerAction _component;

        public ControllerActionBuilder(ControllerAction component)
        {
            _component = component;
        }

        public ControllerActionBuilder Url(string controller)
        {
            _component.Controller = controller;
            _component.Url = $@"{_component.Controller}/{_component.Method}";
            return this;
        }

        public ControllerActionBuilder Controller(string controller)
        {
            _component.Controller = controller;
            return this;
        }

        public ControllerActionBuilder Action(string action)
        {
            _component.Method = action;
            return this;
        }
    }
}
