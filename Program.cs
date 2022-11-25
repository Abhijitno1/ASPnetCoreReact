using ASPnetCoreReact.Models;
using ASPnetCoreReact.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
//builder.Services.AddControllersWithViews();
// Donot forgot to add ConnectionStrings as "Default" to the appsetting.json file
builder.Services.AddDbContext<DatabaseContext>
    (options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddTransient<ICountryStateCityRepo, CountryStateCityRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();

//app.MapHttpAttributeRoutes();
/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");*/
app.MapControllers();

app.MapFallbackToFile("index.html"); ;

app.Run();
