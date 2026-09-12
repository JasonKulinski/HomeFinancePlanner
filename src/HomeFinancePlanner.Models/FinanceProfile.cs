namespace HomeFinancePlanner.Models;

/// <summary>
/// The buyer's personal finance inputs — everything needed to work out
/// how long saving for a downpayment will take and whether the resulting
/// mortgage payment fits their budget.
/// </summary>
public class FinanceProfile
{
    public int Id { get; set; }

    public decimal CurrentSavings { get; set; }

    public decimal MonthlySavingsContribution { get; set; }

    public decimal AnnualGrossIncome { get; set; }

    public decimal MonthlyDebtPayments { get; set; }

    /// <summary>Fraction of price to put down, e.g. 0.20 for 20%.</summary>
    public decimal TargetDownPaymentPercent { get; set; } = 0.20m;

    /// <summary>Loan term in years, e.g. 30.</summary>
    public int LoanTermYears { get; set; } = 30;

    /// <summary>Annual interest rate as a fraction, e.g. 0.065 for 6.5%.</summary>
    public decimal AnnualInterestRate { get; set; }
}
