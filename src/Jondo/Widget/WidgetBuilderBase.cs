﻿using Microsoft.AspNetCore.Html;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Encodings.Web;
using System.Web;

namespace Jondo.UI
{
    public abstract class WidgetBuilderBase<T> : IHtmlContent where T : WidgetBase 
    {
        protected readonly T Component;

        public WidgetBuilderBase(T component)
        {
            Component = component;
        }

        protected StringBuilder Builder = new StringBuilder();

        protected abstract void GenerateHtmlContent();
        protected abstract void GenerateInitailizationScript();

        public void WriteTo(TextWriter writer, HtmlEncoder encoder)
        {
            if (writer == null)
            {
                throw new ArgumentNullException(nameof(writer));
            }

            if (encoder == null)
            {
                throw new ArgumentNullException(nameof(encoder));
            }
            GenerateHtmlContent();
            GenerateInitailizationScript();
            writer.Write(Builder.ToString());
        }
    }
}
