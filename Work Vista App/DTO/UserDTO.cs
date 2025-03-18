using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }

        [Required]
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
