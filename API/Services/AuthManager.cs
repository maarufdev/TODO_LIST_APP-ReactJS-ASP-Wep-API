using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private ApplicationUser _user;

        public AuthManager(UserManager<ApplicationUser> userManager,
            IConfiguration config)
        {
            _config = config;
            _userManager = userManager;
        }

        public async Task<string> CreateToken()
        {
            var signInCredentials = GetSigningCredentials();
            var claims = GetClaims();
            var token = GenerateTokenOptions(signInCredentials, claims);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return await Task.FromResult(tokenString);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        public async Task<bool> ValidateUser(LoginDto login)
        {
            _user = await _userManager.FindByNameAsync(login.Username);
            var validPassword = await _userManager.CheckPasswordAsync(_user, login.Password);
            return (_user != null && validPassword);
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var expiration = DateTime.Now.AddMinutes(Convert.ToDouble(
                jwtSettings.GetSection("lifetime").Value));

            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetSection("Issuer").Value,
                claims: claims,
                expires: expiration,
                signingCredentials: signingCredentials
                );

            return token;
        }

        //private async Task<List<Claim>> GetClaims()
        //{
        //    var claims = new List<Claim>
        //     {
        //         new Claim(ClaimTypes.Name, _user.UserName)
        //     };

        //    var roles = await _userManager.GetRolesAsync(_user);

        //    foreach (var role in roles)
        //    {
        //        claims.Add(new Claim(ClaimTypes.Role, role));
        //    }

        //    return claims;
        //}
        private List<Claim> GetClaims()
        {
            var claims = new List<Claim>()
            {
                 new Claim(JwtRegisteredClaimNames.Sub, _user.UserName!),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            return claims;
        }

    }
}
