using ASPnetCoreReact.Models;
using ASPnetCoreReact.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.SqlServer.Server;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
//builder.Services.AddControllersWithViews();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
  options.RequireHttpsMetadata = false;
  options.SaveToken = true;
  options.TokenValidationParameters = new TokenValidationParameters()
  { 
    ValidateIssuer = true,
    ValidateAudience= true,
    //ValidateLifetime = true,
    //ValidateIssuerSigningKey= true,
    ValidIssuer= builder.Configuration["Jwt:Issuer"],
    ValidAudience = builder.Configuration["Jwt.Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
  };
});
// Donot forgot to add ConnectionStrings as "Default" to the appsetting.json file
//Read ASP.Net connection component change @ https://www.conradakunga.com/blog/fix-ssl-provider-error-0-the-certificate-chain-was-issued-by-an-authority-that-is-not-trusted/
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
app.UseAuthentication();
app.UseAuthorization();
//app.MapHttpAttributeRoutes();
/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");*/
app.MapControllers();

app.MapFallbackToFile("index.html"); ;

app.Run();
