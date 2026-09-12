namespace HomeFinancePlanner.Models;

/// <summary>
/// A rental comp in the same area, used to check whether renting is
/// currently cheaper than buying in that zip code.
/// </summary>
public class RentalListing
{
    public int Id { get; set; }

    public string City { get; set; } = string.Empty;

    public string State { get; set; } = string.Empty;

    public string ZipCode { get; set; } = string.Empty;

    public decimal MonthlyRent { get; set; }

    public int Bedrooms { get; set; }

    public int Bathrooms { get; set; }

    public int SquareFeet { get; set; }

    public string ListingUrl { get; set; } = string.Empty;
}
