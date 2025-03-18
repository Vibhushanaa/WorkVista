using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Work_Vista_App.DTO;
using Work_Vista_App.Model;
using Work_Vista_App.Services;

namespace Work_Vista_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterviewController : ControllerBase
    {
        private static List<InterviewDTO> interviews = new List<InterviewDTO>();
        private readonly EFDbcontext _context; // Change object to DbContext
        private readonly EmailService _emailService;

        public InterviewController(EFDbcontext context, EmailService emailService) // Add constructor to initialize _context
        {
            _context = context;
            _emailService = emailService;
        }

        // POST: api/Interview/Schedule
        [HttpPost("Schedule")]
        public async Task<IActionResult> ScheduleInterview([FromBody] InterviewDTO interviewDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobSeeker = await _context.JobSeekers
                .Include(js => js.User)
                .FirstOrDefaultAsync(js => js.JobSeekerId == interviewDTO.ApplicationId);
            if (jobSeeker == null)
            {
                return NotFound("JobSeeker not found");
            }

            // Set default value for Status if not provided
            if (string.IsNullOrEmpty(interviewDTO.Status))
            {
                interviewDTO.Status = "Scheduled"; // Default status
            }

            var interview = new Interview
            {
                ApplicationId = interviewDTO.ApplicationId,
                InterviewDate = interviewDTO.InterviewDate ?? DateTime.Now,
                InterviewMode = interviewDTO.InterviewMode,
                InterviewLocation = interviewDTO.InterviewLocation,
                Status = interviewDTO.Status
            };

            _context.Interviews.Add(interview);
            await _context.SaveChangesAsync();

            // Send email notification
            var emailSubject = "Interview Scheduled";
            var emailMessage = $"Dear {jobSeeker.User.FullName},\n\nYour interview has been scheduled on {interview.InterviewDate} at {interview.InterviewLocation}.\n\nBest regards,\nWork Vista Team";
            await _emailService.SendEmailAsync(jobSeeker.User.Email, emailSubject, emailMessage);

            return Ok(new { success = "Interview scheduled successfully and email notification sent"});

        }
    }
}