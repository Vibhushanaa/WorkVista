using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.Model
{
    public class Interview
    {
        [Key]
        public int? InterviewId { get; set; }

        [Required]
        public int? ApplicationId { get; set; }

        [ForeignKey("ApplicationId")]
        public Application? Application { get; set; }

        [Required]
        public DateTime? InterviewDate { get; set; }

        [Required, MaxLength(50)]
        public string? InterviewMode { get; set; }

        [MaxLength(255)]
        public string? InterviewLink { get; set; }

        [MaxLength(255)]
        public string? InterviewLocation { get; set; }

        [Required, MaxLength(20)]
        public string? Status { get; set; } = "Scheduled";
    }
}
