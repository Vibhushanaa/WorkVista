using Work_Vista_App.Model;

namespace Work_Vista_App.DTO
{
    public class JobSeekerDTO
    {
        public int? JobSeekerId { get; set; }
        public int? UserId { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Skills { get; set; }
        public string? Experience { get; set; }
        public string? Location { get; set; }


    }
}
