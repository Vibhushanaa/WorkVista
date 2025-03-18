using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.Model
{
    public class JobPost
    {
        [Key]
        public int? JobId { get; set; }

        [Required]
        public int? RecruiterId { get; set; }

        [ForeignKey("RecruiterId")]
        public Recruiter? Recruiter { get; set; }

        [Required, MaxLength(100)]

        public string? CompanyName { get; set; } // Added CompanyName property

        [Required, MaxLength(100)]

        public string? Title { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required, MaxLength(100)]
        public string? Location { get; set; }

        [Required, Column(TypeName = "decimal(10, 2)")]
        public decimal? Salary { get; set; }

        [Required]
        public string? Experience { get; set; }

        [Required, MaxLength(20)]
        public string? JobType { get; set; }

        [Required]
        public string? JobCategory { get; set; }

        [Required]
        public DateTime? PostedDate { get; set; } = DateTime.Now;
    }
}
