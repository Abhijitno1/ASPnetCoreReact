using ASPnetCoreReact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ASPnetCoreReact.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class TokenController : ControllerBase
  {
    IConfiguration _config;
    public TokenController(IConfiguration config)
    {
      this._config = config;
    }

    //[AllowAnonymous]
    [HttpPost]
    public IActionResult Login([FromBody]ClientCredentials loginCredentials)
    {
      var response = Unauthorized();
      var user = AuthenticateClient(loginCredentials);
      if (user != null)
      {
        var tokenString = GenerateJsonWebToken(loginCredentials);
        return Ok(new { token = tokenString });
      }
      return response;
    }

    private string GenerateJsonWebToken(ClientCredentials loginCredentials)
    {
      var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
      var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
      var claimsArray = new[] {
        new Claim(JwtRegisteredClaimNames.Sub, _config["Jwt:Subject"].ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
        new Claim("UserId", loginCredentials.Username),
        new Claim("DisplayName", loginCredentials.Username),
        new Claim("UserName", loginCredentials.Username),
        new Claim("Email", loginCredentials.RegdEmail)
      }; 

      var token = new JwtSecurityToken(
        _config["Jwt:Issuer"],
        _config["Jwt:Audience"],
        claims: claimsArray,
        expires: DateTime.Now.AddMinutes(20),
        signingCredentials: credentials
        );
      return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private ClientCredentials AuthenticateClient(ClientCredentials credentials) 
    {
      if (credentials.RegdEmail == _config["ClientCredentials:RegdEmail"] && credentials.SecretKey == _config["ClientCredentials:SecretKey"])
        return credentials;
      else
        return null;
    }
  }
}
