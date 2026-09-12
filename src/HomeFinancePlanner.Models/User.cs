namespace HomeFinancePlanner.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ICollection<LedgerEntry> LedgerEntries { get; set; } = new List<LedgerEntry>();
}
