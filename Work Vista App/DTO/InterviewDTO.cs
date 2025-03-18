namespace Work_Vista_App.DTO
{
    public class InterviewDTO
    {
        public int? InterviewId { get; set; }
        public int? ApplicationId { get; set; }
        public DateTime? InterviewDate { get; set; }
        public string? InterviewMode { get; set; }
        public string? InterviewLocation { get; set; }
        public string? Status { get; set; }
    }
}
