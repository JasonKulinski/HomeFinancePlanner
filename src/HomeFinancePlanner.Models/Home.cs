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

    public string ListPrice { get; set; }

    public int Bedrooms { get; set; }

    public int Bathrooms { get; set; }

    public int SquareFeet { get; set; }

    public int LotSize { get; set; }

    [Required]
    public string Latitude { get; set; }

    [Required]
    public string Longitude { get; set; }
}
