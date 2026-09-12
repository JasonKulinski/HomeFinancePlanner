namespace HomeFinancePlanner.Models.DTOs;

/// <summary>
/// Everything the React front end needs to render one home's affordability
/// card: the downpayment timeline, the resulting payment, and how it
/// compares to renting nearby.
/// </summary>
public class AffordabilityResult
{
    public int HomeId { get; set; }
    public string Address { get; set; } = string.Empty;
    public decimal ListPrice { get; set; }

    public decimal RequiredDownPayment { get; set; }
    public decimal MonthsToDownPayment { get; set; }

    public decimal EstimatedMonthlyPrincipalAndInterest { get; set; }
    //public decimal EstimatedMonthlyTaxesInsuranceHoa { get; set; }
    public decimal EstimatedTotalMonthlyPayment { get; set; }

    public decimal DebtToIncomeRatioAfterPurchase { get; set; }
    public bool LooksAffordable { get; set; }

    /// <summary>Cheapest comparable rental found nearby, if any.</summary>
    public decimal? CheapestNearbyRent { get; set; }
    public decimal? MonthlySavingsIfRentingInstead { get; set; }
}
