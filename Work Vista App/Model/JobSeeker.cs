using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.Model
{
    public class JobSeeker
    {
        [Key]
        public int? JobSeekerId { get; set; }
        [Required]
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        [Required, MaxLength(100)]
        public string? FullName { get; set; }
        public User? User { get; set; }
        [Required, MaxLength(15)]
        public string? PhoneNumber { get; set; }
        public byte[]? Resume { get; set; } // Make Resume optional
        [Required, MaxLength(500)]
        public string? Skills { get; set; }
        [Required]
        public string? Experience { get; set; }
        [Required, MaxLength(100)]
        public string? Location { get; set; }

    }
}
