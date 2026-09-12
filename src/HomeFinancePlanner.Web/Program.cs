using HomeFinancePlanner.Data;
using HomeFinancePlanner.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IMortgageCalculator, MortgageCalculator>();

// Allows the Vite dev server (npm run dev, typically localhost:5173) to
// call the API while developing. Not needed once the React build is
// published alongside the ASP.NET app.
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactDevServer", policy =>
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("ReactDevServer");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // enables the [ApiController]-attributed routes

app.Run();