using Microsoft.AspNetCore.Mvc.Rendering;

namespace Jondo.UI
{
    public static class IHtmlHelperExtentions
    {
        public static Jondo<TModel> Jondo<TModel>(this IHtmlHelper<TModel> helper)
        {
            return new Jondo<TModel>(helper);
        }
    }
}
