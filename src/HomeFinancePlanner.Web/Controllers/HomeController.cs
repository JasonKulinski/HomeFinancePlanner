using Microsoft.AspNetCore.Mvc;

namespace HomeFinancePlanner.Web.Controllers;

/// <summary>
/// Classic MVC controller. Its only job here is to serve the single view
/// that mounts the React app — the demo keeps MVC and the SPA from
/// competing for the same UI real estate.
/// </summary>
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
