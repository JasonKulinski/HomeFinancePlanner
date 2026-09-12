using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFinancePlanner.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FinanceProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CurrentSavings = table.Column<decimal>(type: "TEXT", nullable: false),
                    MonthlySavingsContribution = table.Column<decimal>(type: "TEXT", nullable: false),
                    AnnualGrossIncome = table.Column<decimal>(type: "TEXT", nullable: false),
                    MonthlyDebtPayments = table.Column<decimal>(type: "TEXT", nullable: false),
                    TargetDownPaymentPercent = table.Column<decimal>(type: "TEXT", nullable: false),
                    LoanTermYears = table.Column<int>(type: "INTEGER", nullable: false),
                    AnnualInterestRate = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinanceProfiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Homes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    State = table.Column<string>(type: "TEXT", nullable: false),
                    ZipCode = table.Column<string>(type: "TEXT", nullable: false),
                    ListPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    Bedrooms = table.Column<int>(type: "INTEGER", nullable: false),
                    Bathrooms = table.Column<int>(type: "INTEGER", nullable: false),
                    SquareFeet = table.Column<int>(type: "INTEGER", nullable: false),
                    LotSize = table.Column<int>(type: "INTEGER", nullable: false),
                    Latitude = table.Column<decimal>(type: "FLOAT", nullable: false),
                    Longitude = table.Column<decimal>(type: "Float", nullable: false)
				},
                constraints: table =>
                {
                    table.PrimaryKey("PK_Homes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RentalListings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    State = table.Column<string>(type: "TEXT", nullable: false),
                    ZipCode = table.Column<string>(type: "TEXT", nullable: false),
                    MonthlyRent = table.Column<decimal>(type: "TEXT", nullable: false),
                    Bedrooms = table.Column<int>(type: "INTEGER", nullable: false),
                    Bathrooms = table.Column<int>(type: "INTEGER", nullable: false),
                    SquareFeet = table.Column<int>(type: "INTEGER", nullable: false),
                    ListingUrl = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalListings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Homes_ZipCode",
                table: "Homes",
                column: "ZipCode");

            migrationBuilder.CreateIndex(
                name: "IX_RentalListings_ZipCode",
                table: "RentalListings",
                column: "ZipCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinanceProfiles");

            migrationBuilder.DropTable(
                name: "Homes");

            migrationBuilder.DropTable(
                name: "RentalListings");
        }
    }
}
