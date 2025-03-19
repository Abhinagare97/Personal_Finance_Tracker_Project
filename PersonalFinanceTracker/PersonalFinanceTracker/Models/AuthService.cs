namespace PersonalFinanceTracker.Models
{
    using Microsoft.EntityFrameworkCore;
    using System.IdentityModel.Tokens.Jwt;
    using System.Text;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System;

        public class AuthService : IAuthService
        {
            private readonly EFCoreDbContext _context;
            private readonly JwtSettings _jwtSettings;

            public AuthService(EFCoreDbContext context, IOptions<JwtSettings> jwtSettings)
            {
                _context = context;
                _jwtSettings = jwtSettings.Value;
            }
            public async Task<string> Authenticate(string username, string passcode)
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
                if (user == null || user.PassCodeHash != passcode) // Use hashed passwords in production
                {
                    return null;
                }

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _jwtSettings.Issuer,
                    audience: _jwtSettings.Audience,
                    expires: DateTime.Now.AddMinutes(_jwtSettings.ExpirationMinutes),
                    signingCredentials: credentials
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        }
    }