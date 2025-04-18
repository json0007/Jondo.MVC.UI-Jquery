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

        [HttpPost]
        public IActionResult DoWork(User user)
        {
            return RedirectToAction("Index");
        }

        public IActionResult GetUsers([DataSourceRequest] DataSourceRequest request)
        {
            return Json(DataStore.Users.ToDataSourceResult(request));
        }

        public IActionResult GetDropDownList()
        {
            return Ok(new List<SelectListItem> { 
                new SelectListItem("Antonia Banderas","1"),
                new SelectListItem("Sandra Bullok","2"),
                new SelectListItem("Tom Brady","3"),
                new SelectListItem("Emillio Estivez","4"),
                new SelectListItem("Karreem Hunt","5"),
            });
        }

        public IActionResult About()
        {
            return View();
        }
    }
}
