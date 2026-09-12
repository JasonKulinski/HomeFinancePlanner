namespace HomeFinancePlanner.Models.DTOs;

public class UserHomeResponse
{
    public int timeToDownPaymentInMonths { get; set; }
    public int timeToPurchasedInMonths { get; set; }
    public int estimatedMonthlyPayment { get; set; }

}
