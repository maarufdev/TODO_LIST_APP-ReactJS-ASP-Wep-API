using API.DTOs;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly IAuthManager _authManager;
        private readonly ILogger<UserController> _logger;
        public UserController(UserManager<ApplicationUser> userManager, 
            IConfiguration config,
            IAuthManager authManager,
            ILogger<UserController> logger)
        {
            _userManager = userManager;
            _config = config;
            _authManager = authManager;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password!);

            if (result.Succeeded)
            {
                return Ok("User created successfully");
            }

            return BadRequest(result.Errors);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  
            }

            try
            {
                if (!await _authManager.ValidateUser(model)) return Unauthorized();

                return Accepted(new LoginResponseDto { Token = await _authManager.CreateToken(), Username = model.Username });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message.ToString());
                return Problem("Something went wrong in you're credential.");
            }
        }

    }
}
