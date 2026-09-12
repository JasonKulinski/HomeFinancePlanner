using HomeFinancePlanner.Data;
using HomeFinancePlanner.Models;
using HomeFinancePlanner.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace HomeFinancePlanner.Services;

public class MortgageCalculator : IMortgageCalculator
{
    // Common budgeting guideline: mortgage-related debt shouldn't push
    // total debt-to-income past this share of gross monthly income.
    private const decimal MaxHealthyDebtToIncome = 0.36m;

    private readonly AppDbContext _db;

    public MortgageCalculator(AppDbContext db)
    {
        _db = db;
    }

    public async Task<AffordabilityResult> CalculateAsync(Home home, FinanceProfile profile)
    {
        var downPayment = home.ListPrice * profile.TargetDownPaymentPercent;
        var monthsToDownPayment = MonthsToSave(downPayment, profile.CurrentSavings, profile.MonthlySavingsContribution);

        var loanAmount = home.ListPrice - downPayment;
        var monthlyPrincipalAndInterest = MonthlyPayment(loanAmount, profile.AnnualInterestRate, profile.LoanTermYears);

        var monthlyTaxesInsuranceHoa =
            (home.AnnualPropertyTax + home.AnnualHomeInsurance) / 12m
            + (home.HoaMonthlyFee ?? 0m);

        var totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyTaxesInsuranceHoa;

        var monthlyGrossIncome = profile.AnnualGrossIncome / 12m;
        var debtToIncome = monthlyGrossIncome == 0
            ? 0m
            : (profile.MonthlyDebtPayments + totalMonthlyPayment) / monthlyGrossIncome;

        var cheapestNearbyRent = await _db.RentalListings
            .Where(r => r.ZipCode == home.ZipCode)
            .OrderBy(r => r.MonthlyRent)
            .Select(r => (decimal?)r.MonthlyRent)
            .FirstOrDefaultAsync();

        return new AffordabilityResult
        {
            HomeId = home.Id,
            Address = home.Address,
            ListPrice = home.ListPrice,
            RequiredDownPayment = downPayment,
            MonthsToDownPayment = monthsToDownPayment,
            EstimatedMonthlyPrincipalAndInterest = Round(monthlyPrincipalAndInterest),
            EstimatedMonthlyTaxesInsuranceHoa = Round(monthlyTaxesInsuranceHoa),
            EstimatedTotalMonthlyPayment = Round(totalMonthlyPayment),
            DebtToIncomeRatioAfterPurchase = Round(debtToIncome, 4),
            LooksAffordable = debtToIncome <= MaxHealthyDebtToIncome,
            CheapestNearbyRent = cheapestNearbyRent,
            MonthlySavingsIfRentingInstead = cheapestNearbyRent.HasValue
                ? Round(totalMonthlyPayment - cheapestNearbyRent.Value)
                : null,
        };
    }

    public async Task<List<AffordabilityResult>> CalculateForAreaAsync(string zipCode, FinanceProfile profile)
    {
        var homes = await _db.Homes
            .Where(h => h.ZipCode == zipCode)
            .ToListAsync();

        var results = new List<AffordabilityResult>(homes.Count);
        foreach (var home in homes)
        {
            results.Add(await CalculateAsync(home, profile));
        }

        return results
            .OrderBy(r => r.MonthsToDownPayment)
            .ThenBy(r => r.EstimatedTotalMonthlyPayment)
            .ToList();
    }

    /// <summary>Standard amortized fixed-rate monthly payment formula.</summary>
    private static decimal MonthlyPayment(decimal principal, decimal annualRate, int termYears)
    {
        if (principal <= 0) return 0m;

        var monthlyRate = annualRate / 12m;
        var numberOfPayments = termYears * 12;

        if (monthlyRate == 0m)
        {
            return principal / numberOfPayments;
        }

        var factor = (decimal)Math.Pow((double)(1 + monthlyRate), numberOfPayments);
        return principal * (monthlyRate * factor) / (factor - 1);
    }

    private static decimal MonthsToSave(decimal target, decimal currentSavings, decimal monthlyContribution)
    {
        var remaining = target - currentSavings;
        if (remaining <= 0) return 0m;
        if (monthlyContribution <= 0) return decimal.MaxValue; // never, at this rate

        return Math.Ceiling(remaining / monthlyContribution);
    }

    private static decimal Round(decimal value, int digits = 2) => Math.Round(value, digits);
}
