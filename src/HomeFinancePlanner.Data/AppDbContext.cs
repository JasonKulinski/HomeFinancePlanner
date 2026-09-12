using HomeFinancePlanner.Models;
using Microsoft.EntityFrameworkCore;

namespace HomeFinancePlanner.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Home> Homes => Set<Home>();
    public DbSet<RentalListing> RentalListings => Set<RentalListing>();
    public DbSet<FinanceProfile> FinanceProfiles => Set<FinanceProfile>();
    public DbSet<User> Users => Set<User>();
    public DbSet<LedgerEntry> LedgerEntries => Set<LedgerEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Home>()
            .HasIndex(h => h.ZipCode);

        modelBuilder.Entity<RentalListing>()
            .HasIndex(r => r.ZipCode);
    }
}