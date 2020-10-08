using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using Newtonsoft.Json;

namespace Jondo.UI
{
    public class DataSourceRequestModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            string valueFromBody = string.Empty;

            var value = bindingContext.HttpContext.Request.Query["jGridDataSourceRequest"];

            if (!value.Any())
                return Task.CompletedTask;

            var result = JsonConvert.DeserializeObject<DataSourceRequest>(value[0]);
            bindingContext.Result = ModelBindingResult.Success(result);

            return Task.CompletedTask;
        }
    }
}
