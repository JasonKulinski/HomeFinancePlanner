using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFinancePlanner.Data.Migrations
{
    /// <inheritdoc />
    public partial class RenameUserNameToName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "FinanceProfiles",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "FinanceProfiles");
        }
    }
}