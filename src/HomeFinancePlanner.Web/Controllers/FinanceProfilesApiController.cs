using HomeFinancePlanner.Data;
using HomeFinancePlanner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFinancePlanner.Web.Controllers;

[ApiController]
[Route("api/financeprofiles")]
public class FinanceProfilesApiController : ControllerBase
{
    private readonly AppDbContext _db;

    public FinanceProfilesApiController(AppDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// POST /api/financeprofiles — Create a new finance profile with a name.
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateProfile([FromBody] CreateFinanceProfileRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.Name))
        {
            return BadRequest("Name is required.");
        }

        var profile = new FinanceProfile
        {
            Name = request.Name,
            CurrentSavings = request.CurrentSavings ?? 0,
            MonthlySavingsContribution = request.MonthlySavingsContribution ?? 0,
            AnnualGrossIncome = request.AnnualGrossIncome ?? 0,
            MonthlyDebtPayments = request.MonthlyDebtPayments ?? 0,
            TargetDownPaymentPercent = request.TargetDownPaymentPercent ?? 0.20m,
            LoanTermYears = request.LoanTermYears ?? 30,
            AnnualInterestRate = request.AnnualInterestRate ?? 0,
        };

        _db.FinanceProfiles.Add(profile);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProfile), new { id = profile.Id }, profile);
    }

    /// <summary>
    /// GET /api/financeprofiles/{id} — Get a finance profile by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfile(int id)
    {
        var profile = await _db.FinanceProfiles.FirstOrDefaultAsync(p => p.Id == id);

        if (profile == null)
        {
            return NotFound();
        }

        return Ok(profile);
    }

    /// <summary>
    /// GET /api/financeprofiles?name=John — Get a finance profile by name.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetProfileByName([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Name is required.");
        }

        var profile = await _db.FinanceProfiles
            .FirstOrDefaultAsync(p => p.Name == name);

        if (profile == null)
        {
            return NotFound($"Profile with name '{name}' not found.");
        }

        return Ok(profile);
    }
}

public class CreateFinanceProfileRequest
{
    public string? Name { get; set; }
    public decimal? CurrentSavings { get; set; }
    public decimal? MonthlySavingsContribution { get; set; }
    public decimal? AnnualGrossIncome { get; set; }
    public decimal? MonthlyDebtPayments { get; set; }
    public decimal? TargetDownPaymentPercent { get; set; }
    public int? LoanTermYears { get; set; }
    public decimal? AnnualInterestRate { get; set; }
}
