using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonalFinanceTracker.Middleware;
using PersonalFinanceTracker.Models;

namespace PersonalFInanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] PersonalFinanceTracker.Models.LoginRequest request)
        {
            string decrypted = DecryptionHelper.Decrypt(request.PassCodeHash);
            Console.WriteLine($"Decrypted: {decrypted}");
         

            var token = await _authService.Authenticate(request.Username, decrypted);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(new { Token = token }); 
        }
    }
}











