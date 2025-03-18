using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Work_Vista_App.Model
{
    public class Application
    {
        [Key]
        public int ApplicationId { get; set; }

        [Required]
        public int JobSeekerId { get; set; }

        [ForeignKey("JobSeekerId")]
        public JobSeeker? JobSeeker { get; set; }

        [Required]
        public int JobId { get; set; }

        [ForeignKey("JobId")]
        public JobPost? JobPost { get; set; } // Change object to JobPost

        [Required, MaxLength(20)]
        public string Status { get; set; }

        [Required]
        public DateTime AppliedDate { get; set; }
    }
}
