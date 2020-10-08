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
           // var users = DataStore.Users;
            return View();
        }

        public IActionResult GetUsers([DataSourceRequest] DataSourceRequest request)
        {
            return Json(DataStore.Users.ToDataSourceResult(request));
        }

        public IActionResult About()
        {
            return View();
        }
    }
}
