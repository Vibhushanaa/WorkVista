using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Work_Vista_App.DTO;
using Work_Vista_App.Model;

namespace Work_Vista_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly EFDbcontext _context;
        private readonly IConfiguration _configuration;

        public UserController(EFDbcontext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            return await _context.Users
                .Select(user => new UserDTO
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _context.Users
                .Select(user => new UserDTO
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                })
                .FirstOrDefaultAsync(u => u.UserId == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDTO userDto)
        {
            if (id != userDto.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.FullName = userDto.FullName;
            user.Email = userDto.Email;
            user.Role = userDto.Role;
            user.CreatedAt = userDto.CreatedAt;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("role/{role}")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsersByRole(string role)
        {
            return await _context.Users
                .Where(u => u.Role == role)
                .Select(user => new UserDTO
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                })
                .ToListAsync();
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(UserDTO userDTO)
        {
            // Check if the username or email already exists
            if (await _context.Users.AnyAsync(u => u.Email == userDTO.Email))
            {
                return BadRequest("Username or Email already exists.");
            }

            // Hash the password
            userDTO.Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);

            var user = new User
            {
                FullName = userDTO.FullName,
                Email = userDTO.Email,
                Role = userDTO.Role,
                PasswordHash = userDTO.Password,
                CreatedAt = userDTO.CreatedAt
            };

            // Add the user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {

            // Find the user by username
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginDTO.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid username or password.");
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);
            var role = user.Role;

            // Authentication successful
            return Ok(new { token,role });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("id", user.UserId.ToString()),
                new Claim("email", user.Email),
                new Claim("role", user.Role)
            };

            var jwt = _configuration.GetSection("Jwt");
            var jwtkey = jwt["Key"];
            var issuer = jwt["Issuer"];
            var audience = jwt["Audience"];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtkey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
