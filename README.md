# HomeFinancePlanner — ASP.NET Template

Demo template showing an MVC + Web API + EF Core backend with a React front
end, themed around a "can I afford this home" calculator: given a home price
and a personal finance profile, work out savings-to-downpayment time and
expected mortgage payments, and flag cheaper rental alternatives in the area.

This is a **skeleton**, not a full app — just enough demo classes in each
layer to show how the pieces connect. Swap in real data sources, add
validation, auth, etc. as needed.

## Layout

```
src/
  HomeFinancePlanner.Models/       # Domain models + DTOs (no dependencies)
    Home.cs
    RentalListing.cs
    FinanceProfile.cs
    DTOs/AffordabilityResult.cs

  HomeFinancePlanner.Data/         # EF Core layer
    AppDbContext.cs

  HomeFinancePlanner.Services/     # Business logic (mortgage math, rental scan)
    IMortgageCalculator.cs
    MortgageCalculator.cs

  HomeFinancePlanner.Web/          # ASP.NET Core host: MVC + Web API + React
    Program.cs
    appsettings.json
    Controllers/
      HomeController.cs            # MVC — serves the React shell
      HomesApiController.cs        # Web API — /api/homes/*
    Views/
      Shared/_Layout.cshtml
      Home/Index.cshtml
    ClientApp/                     # React (Vite) front end
      index.html
      vite.config.js
      package.json
      src/App.jsx
      src/api/homesApi.js
      src/components/AffordabilityCalculator.jsx
```

## How the layers connect

1. **Models** are plain C# classes with no EF or ASP.NET references — reused
   by Data, Services, and the API DTOs.
2. **Data** exposes `AppDbContext` (one `DbSet` per model) — that's the only
   EF-facing piece.
3. **Services** hold the actual math (`MortgageCalculator`) and query
   `AppDbContext` directly — no repository wrapper, since for a project this
   size that's just an extra layer with nothing to add.
4. **Controllers**
   - `HomesApiController` (`/api/homes/*`) is what the React app calls.
   - `HomeController` just returns the single MVC view that hosts the React
     bundle — the MVC/View layer here is a thin shell around the SPA rather
     than a competing UI.
5. **React app** (`ClientApp`) calls the API via `fetch` in `homesApi.js` and
   renders the calculator in `AffordabilityCalculator.jsx`.

## Running it

**Prerequisites:** .NET SDK (8.0+; see the TFM note below), Node.js/npm.

```bash
# 1. Restore + build everything
dotnet restore
dotnet build

# 2. Create the database (one-time, from the repo root)
dotnet tool install --global dotnet-ef   # skip if you already have it
dotnet ef database update --project src/HomeFinancePlanner.Data --startup-project src/HomeFinancePlanner.Web

# 3. Run the backend
dotnet run --project src/HomeFinancePlanner.Web

# 4. Run the frontend (separate terminal)
cd src/HomeFinancePlanner.Web/ClientApp
npm install
npm run dev
```

Or open `HomeFinancePlanner.sln` in Visual Studio / Rider, set
`HomeFinancePlanner.Web` as the startup project, and run — then do step 4
for the frontend in a terminal alongside it.

**Database:** this uses SQLite, not SQL Server — no service or LocalDB
install required. `appsettings.json`'s `ConnectionStrings:Default`
(`Data Source=HomeFinancePlanner.db`) is a relative path, so after step 2
the actual file lands in the build output folder, e.g.
`src/HomeFinancePlanner.Web/bin/Debug/net8.0/HomeFinancePlanner.db`. Open it
with [DB Browser for SQLite](https://sqlitebrowser.org/) or the `sqlite3`
CLI to inspect tables/data directly. There's no seed data — the app starts
with empty tables, so the calculator won't show results until you insert
some `Home`/`RentalListing` rows.

If you ever change a model and need a new migration:

```bash
dotnet ef migrations add <MigrationName> --project src/HomeFinancePlanner.Data --startup-project src/HomeFinancePlanner.Web
dotnet ef database update --project src/HomeFinancePlanner.Data --startup-project src/HomeFinancePlanner.Web
```

### Project files

- `HomeFinancePlanner.sln` — solution tying the four projects together.
- `HomeFinancePlanner.Models.csproj` — plain class library, no dependencies.
- `HomeFinancePlanner.Data.csproj` — class library, references Models,
  pulls in `Microsoft.EntityFrameworkCore.Sqlite` + `.Design`.
- `HomeFinancePlanner.Services.csproj` — class library, references Models
  and Data.
- `HomeFinancePlanner.Web.csproj` — `Microsoft.NET.Sdk.Web`, references all
  three; `ClientApp/node_modules` and `ClientApp/dist` are excluded from
  MSBuild's file watching since npm owns that folder.

**Target frameworks:** `Models`, `Data`, and `Services` target `net8.0`;
`Web` targets `net10.0`. That split is intentional for this project (Web was
retargeted since net10 was the SDK available), and project references across
different TFMs work fine as long as the referenced project's TFM is
`<=` the referencing project's. If you'd rather have all four on one
version, change `<TargetFramework>` in each `.csproj` to match.