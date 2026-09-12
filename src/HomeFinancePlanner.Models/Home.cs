using System.ComponentModel.DataAnnotations;

namespace HomeFinancePlanner.Models;

/// <summary>
/// A for-sale listing used for affordability calculations.
/// </summary>
public class Home
{
    public int Id { get; set; }

    [Required]
    public string Address { get; set; } = string.Empty;

    [Required]
    public string City { get; set; } = string.Empty;

    [Required]
    public string State { get; set; } = string.Empty;

    public string ZipCode { get; set; } = string.Empty;

    public decimal ListPrice { get; set; }

    public decimal AnnualPropertyTax { get; set; }

    public decimal AnnualHomeInsurance { get; set; }

    public decimal? HoaMonthlyFee { get; set; }

    public int Bedrooms { get; set; }

    public int Bathrooms { get; set; }

    public int SquareFeet { get; set; }
}
