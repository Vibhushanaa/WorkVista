using Work_Vista_App.Model;

namespace Work_Vista_App.DTO
{
    public class JobPostDTO
    {
        public int? JobId { get; set; }
        public int? RecruiterId { get; set; }
        public string? CompanyName { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public decimal? Salary { get; set; }
        public string? Experience { get; set; }
        public string? JobType { get; set; }
        public string? JobCategory { get; set; }
        public DateTime? PostedDate { get; set; }
    }
}
