using HomeFinancePlanner.Data;
using HomeFinancePlanner.Models;
using HomeFinancePlanner.Models.DTOs;
using HomeFinancePlanner.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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

        if (home == null || profile == null) {
            return NotFound("Home or profile not found");
        }

        var result = await _calculator.CalculateAsync(home, profile);
        return Ok(result);
    }

    [HttpGet("user")]
    public async Task<ActionResult<FinanceProfile>> GetByUserName([FromQuery] string userName)
    {
        Expression<Func<FinanceProfile, bool>> predicate = p => p.Name == userName;
        var profile = await _db.FinanceProfiles.FirstOrDefaultAsync(predicate);

        if (profile is null)
        {
            return NotFound($"No finance profile found for user '{userName}'.");
        }

        return Ok(profile);
    }
}