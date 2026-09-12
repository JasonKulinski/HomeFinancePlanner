using HomeFinancePlanner.Data;
using HomeFinancePlanner.Models;
using HomeFinancePlanner.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFinancePlanner.Web.Controllers;

[ApiController]
[Route("api/homes")]
public class HomesApiController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IMortgageCalculator _calculator;

    public HomesApiController(AppDbContext db, IMortgageCalculator calculator)
    {
        _db = db;
        _calculator = calculator;
    }

    /// <summary>GET /api/homes?zip=04101 — raw listings for an area.</summary>
    [HttpGet]
    public async Task<IActionResult> GetHomes([FromQuery] string zip)
    {
        var homes = await _db.Homes
            .Where(h => h.ZipCode == zip)
            .ToListAsync();

        return Ok(homes);
    }

    /// <summary>
    /// POST /api/homes/affordability?zip=04101 — affordability results for
    /// every home in the zip against the posted finance profile, cheapest
    /// downpayment timeline first.
    /// </summary>
    [HttpPost("affordability")]
    public async Task<IActionResult> GetAffordability([FromQuery] string zip, [FromBody] FinanceProfile profile)
    {
        if (string.IsNullOrWhiteSpace(zip))
        {
            return BadRequest("zip is required.");
        }

        var results = await _calculator.CalculateForAreaAsync(zip, profile);
        return Ok(results);
    }
}
