using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web.Data;
using Web.Models;
using Jondo.UI;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Web.Controllers
{
    public class HomeController : Controller
    {

        private readonly DataStore DataStore;
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, IDataStore _dataStore)
        {
            _logger = logger;
            DataStore = _dataStore as DataStore;
        }

        public IActionResult Index()
        {
            var user = DataStore.Users.First();
            user.OptionId = 3;
            return View(user);
        }

        public IActionResult GetUsers([DataSourceRequest] DataSourceRequest request)
        {
            return Json(DataStore.Users.ToDataSourceResult(request));
        }

        public IActionResult GetDropDownList()
        {
            return Ok(new List<SelectListItem> { 
                new SelectListItem("option1","1"),
                new SelectListItem("option2","2"),
                new SelectListItem("option3","3"),
                new SelectListItem("option4","4"),
                new SelectListItem("option5","5")
            });
        }

        public IActionResult About()
        {
            return View();
        }
    }
}
