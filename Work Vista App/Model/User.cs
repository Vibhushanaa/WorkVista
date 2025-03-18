using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required, MaxLength(100)]
        public string? FullName { get; set; }

        [Required, MaxLength(100), EmailAddress]
        public string? Email { get; set; }

        [Required, MaxLength(255)]
        public string? PasswordHash { get; set; }

        [Required, MaxLength(20)]
        public string? Role { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
