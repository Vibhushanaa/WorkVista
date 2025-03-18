using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.Model
{
    public class Recruiter
    {
        [Key]
        public int RecruiterId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [Required, MaxLength(100)]
        public string? CompanyName { get; set; }

        [Required, MaxLength(15)]
        public string? ContactNumber { get; set; }

        [Required, MaxLength(255)]
        public string? CompanyWebsite { get; set; }
    }
}
