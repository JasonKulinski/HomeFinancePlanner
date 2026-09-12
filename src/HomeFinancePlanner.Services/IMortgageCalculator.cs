using HomeFinancePlanner.Models;
using HomeFinancePlanner.Models.DTOs;

namespace HomeFinancePlanner.Services;

public interface IMortgageCalculator
{
    /// <summary>
    /// Builds the full affordability picture for one home against one
    /// finance profile, including a rental comparison for the same zip.
    /// </summary>
    Task<AffordabilityResult> CalculateAsync(Home home, FinanceProfile profile);

    /// <summary>Runs CalculateAsync across every home in an area, cheapest-fit first.</summary>
    Task<List<AffordabilityResult>> CalculateForAreaAsync(string zipCode, FinanceProfile profile);
}
