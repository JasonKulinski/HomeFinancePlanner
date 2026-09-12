using HomeFinancePlanner.Data;
using HomeFinancePlanner.Models.DTOs;
using HomeFinancePlanner.Services;
using Microsoft.AspNetCore.Mvc;

namespace MapAPIController.Web.Controllers;

[ApiController]
[Route("api/maps")]
public class MapAPIController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IMortgageCalculator _calculator;

    public MapAPIController(AppDbContext db, IMortgageCalculator calculator)
    {
        _db = db;
        _calculator = calculator;
    }

    [HttpGet("calculate")]
    public async Task<ActionResult<AffordabilityResult>> Get([FromQuery] UserHomeRequest request)
    {
        var home = await _db.Homes.FindAsync(request.homeId);
        var profile = await _db.FinanceProfiles.FindAsync(request.userId);

        var result = await _calculator.CalculateAsync(home, profile);
        return Ok(result);
    }
}