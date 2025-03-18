using Work_Vista_App.Model;

namespace Work_Vista_App.DTO
{
    public class ApplicationGetDTO
    {
        public int ApplicationId { get; set; }
        public int JobSeekerId { get; set; }
        public int JobId { get; set; }
        public DateTime AppliedDate { get; set; }
        public string Status { get; set; } // Added Status property
        public JobSeeker JobSeeker { get; set; }
    }
}
