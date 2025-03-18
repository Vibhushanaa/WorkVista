using System.Numerics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Work_Vista_App.DTO;
using Work_Vista_App.Model;
using Work_Vista_App.Services;

namespace Work_Vista_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly EFDbcontext _context;
        private readonly EmailService _emailservice;

        public ApplicationController(EFDbcontext context, EmailService emailservice)
        {
            _context = context;
            _emailservice = emailservice;
        }

        private static List<ApplicationDTO> applications = new List<ApplicationDTO>();

        // Apply for Job
        [HttpPost("apply")]
        public async Task<IActionResult> ApplyForJob([FromBody] ApplicationDTO applicationDto)
        {
            if (applicationDto == null || applicationDto.JobId <= 0 || applicationDto.JobSeekerId <= 0)
                return BadRequest("Invalid application data.");

            // Check if already applied
            var existingApplication = await _context.Applications
                .FirstOrDefaultAsync(a => a.JobSeekerId == applicationDto.JobSeekerId && a.JobId == applicationDto.JobId);
            if (existingApplication != null)
                return BadRequest("You have already applied for this job.");

            // Create a new application
            var application = new Application
            {
                JobSeekerId = applicationDto.JobSeekerId,
                JobId = applicationDto.JobId,
                Status = "Applied",  // Default status
                AppliedDate = DateTime.UtcNow
            };

            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            // Get the job seeker and job post details
            var jobSeeker = await _context.JobSeekers.Include(js => js.User).FirstOrDefaultAsync(js => js.JobSeekerId == applicationDto.JobSeekerId);
            var jobPost = await _context.JobPosts.Include(jp => jp.Recruiter).ThenInclude(r => r.User).FirstOrDefaultAsync(jp => jp.JobId == applicationDto.JobId);

            if (jobSeeker == null || jobPost == null)
                return BadRequest("Invalid job seeker or job post data.");

            //[HttpPost("apply")]
            //public async Task<IActionResult> ApplyForJob([FromBody] ApplicationDTO applicationDto)
            //{
            //    if (applicationDto == null || applicationDto.JobId <= 0 || applicationDto.JobSeekerId <= 0)
            //        return BadRequest("Invalid application data.");

            //    // Check if already applied
            //    var existingApplication = await _context.Applications
            //        .FirstOrDefaultAsync(a => a.JobSeekerId == applicationDto.JobSeekerId && a.JobId == applicationDto.JobId);
            //    if (existingApplication != null)
            //        return BadRequest("You have already applied for this job.");

            //    // Create a new application
            //    var application = new Application
            //    {
            //        JobSeekerId = applicationDto.JobSeekerId,
            //        JobId = applicationDto.JobId,
            //        Status = applicationDto.Status,  // Use the status from the DTO
            //        AppliedDate = applicationDto.AppliedDate
            //    };

            //    _context.Applications.Add(application);
            //    await _context.SaveChangesAsync();

            //    // Get the job seeker and job post details
            //    var jobSeeker = await _context.JobSeekers.Include(js => js.User).FirstOrDefaultAsync(js => js.JobSeekerId == applicationDto.JobSeekerId);
            //    var jobPost = await _context.JobPosts.Include(jp => jp.Recruiter).ThenInclude(r => r.User).FirstOrDefaultAsync(jp => jp.JobId == applicationDto.JobId);

            //    if (jobSeeker == null || jobPost == null)
            //        return BadRequest("Invalid job seeker or job post data.");

            //    // Return the newly created application ID
            //    return Ok(new { applicationId = application.ApplicationId });


            // Sending email to job seeker
            string subject = "Application Submitted";
            string body = $"Your application for the job '{jobPost.Title}' has been submitted successfully. Kindly wait for further updates.";
            await _emailservice.SendEmailAsync(jobSeeker.User.Email, subject, body);

            // Sending email to recruiter
           // string recruiterSubject = "New Job Application";
            //string recruiterBody = $"You have received a new application for the job '{jobPost.Title}' from {jobSeeker.User.FullName}.";
            await _emailservice.SendEmailAsync(jobPost.Recruiter.User.Email, subject, $"You have received a new application for the job '{jobPost.Title}' from {jobSeeker.User.FullName}.");

            return Ok(new { message = "Application submitted successfully.", application = applicationDto });
        }

        ////  View All Applied Jobs by Job Seeker
        //[HttpGet("view/{jobSeekerId}")]
        //public IActionResult GetAppliedJobs(int jobSeekerId)
        //{
        //    var appliedJobs = applications.Where(a => a.JobSeekerId == jobSeekerId).ToList();
        //    return Ok(appliedJobs);
        //}

        [HttpGet("view/{jobSeekerId}")]
        public async Task<IActionResult> GetAppliedJobs(int jobSeekerId)
        {
            if (jobSeekerId <= 0)
                return BadRequest("Invalid job seeker ID.");

            var appliedJobs = await _context.Applications
                .Where(a => a.JobSeekerId == jobSeekerId)
                .Include(a => a.JobPost) // Include job post details
                .ToListAsync();

            if (appliedJobs == null || !appliedJobs.Any())
                return NotFound("No applications found for this job seeker.");

            var result = appliedJobs.Select(a => new
            {
                Status = a.Status,
                AppliedDate = a.AppliedDate,
                JobPost = new
                {
                    Title = a.JobPost.Title,
                    Description = a.JobPost.Description,
                    Location = a.JobPost.Location,
                    Salary = a.JobPost.Salary,
                    Experience = a.JobPost.Experience,
                    JobType = a.JobPost.JobType,
                    JobCategory = a.JobPost.JobCategory,
                    PostedDate = a.JobPost.PostedDate,
                    ApplicationId = a.ApplicationId
                }
            });

            return Ok(result);
        }



        ////  Withdraw Job Application
        //[HttpDelete("withdraw/{applicationId}")]
        //public IActionResult WithdrawApplication(int applicationId)
        //{
        //    var application = applications.FirstOrDefault(a => a.ApplicationId == applicationId);
        //    if (application == null)
        //        return NotFound("Application not found.");

        //    applications.Remove(application);
        //    return Ok("Application withdrawn successfully.");
        //}

        [HttpDelete("withdraw/{applicationId}")]
        public async Task<IActionResult> WithdrawApplication(int applicationId)
        {
            // Find the application in the database
            var application = await _context.Applications.FirstOrDefaultAsync(a => a.ApplicationId == applicationId);
            if (application == null)
            {
                return NotFound("Application not found.");
            }

            // Remove the application from the database
            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Application withdrawn successfully." });
            //return Ok("Application withdrawn successfully.");
        }


        // Track Application Status
        [HttpGet("status/{applicationId}")]
        public async Task<IActionResult> GetApplicationStatus(int applicationId)
        {
            var application = await _context.Applications.FindAsync(applicationId);
            if (application == null)
                return NotFound("Application not found.");

            return Ok(new { application.ApplicationId, application.Status });
        }

        //// Get Applications for a Job (Recruiter)
        //[HttpGet("applications/{jobId}")]
        //[Authorize(Roles = "Recruiter")]
        //public async Task<ActionResult<IEnumerable<ApplicationDTO>>> GetApplications(int jobId, string? status = null)
        //{
        //    var query = _context.Applications.Where(a => a.JobId == jobId);

        //    if (!string.IsNullOrEmpty(status))
        //    {
        //        query = query.Where(a => a.Status == status);
        //    }

        //    var applications = await query.Select(a => new ApplicationDTO
        //    {
        //        ApplicationId = a.ApplicationId,
        //        JobId = a.JobId,
        //        JobSeekerId = a.JobSeekerId,
        //        Status = a.Status,
        //        AppliedDate = a.AppliedDate
        //    }).ToListAsync();

        //    return Ok(applications);
        //}




        [HttpGet("applications/{jobId}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<ActionResult<IEnumerable<ApplicationGetDTO>>> GetApplications(int jobId, string? status = null)
        {
            var query = _context.Applications
                                .Where(a => a.JobId == jobId);

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(a => a.Status == status);
            }

            var applications = await query.Select(a => new ApplicationGetDTO
            {
                ApplicationId = a.ApplicationId,
                JobId = a.JobId,
                JobSeekerId = a.JobSeekerId,
                Status = a.Status,
                AppliedDate = a.AppliedDate,
                JobSeeker = new JobSeeker
                {
                    JobSeekerId = a.JobSeeker.JobSeekerId,
                    FullName = a.JobSeeker.FullName,
                    PhoneNumber = a.JobSeeker.PhoneNumber,
                    Skills = a.JobSeeker.Skills,
                    Experience = a.JobSeeker.Experience,
                    Location = a.JobSeeker.Location
                }
            }).ToListAsync();

            return Ok(applications);
        }


        // Shortlist a Candidate (Recruiter)
        [HttpPut("shortlist/{applicationId}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> ShortlistCandidate(int applicationId)
        {
            var application = await _context.Applications.FindAsync(applicationId);
            if (application == null)
                return NotFound("Application not found");

            application.Status = "Shortlisted";
            _context.Entry(application).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Candidate has been shortlisted." });
        }

        // Reject a Candidate (Recruiter)
        [HttpPut("reject/{applicationId}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> RejectCandidate(int applicationId)
        {
            var application = await _context.Applications.FindAsync(applicationId);
            if (application == null)
                return NotFound("Application not found");

            application.Status = "Rejected";
            _context.Entry(application).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Candidate has been rejected." });
        }

        // Finalize a Candidate (Recruiter)
        [HttpPut("finalize/{applicationId}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> FinalizeCandidate(int applicationId)
        {
            var application = await _context.Applications.FindAsync(applicationId);
            if (application == null)
                return NotFound("Application not found");

            application.Status = "Finalized";
            _context.Entry(application).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Candidate has been finalized." });
        }


        // Update the method to use the correct type for JobPost
        private async Task<IActionResult> UpdateApplicationStatus(int applicationId, string status, string emailMessage)
        {
            var application = await _context.Applications
                .Include(a => a.JobSeeker)
                .ThenInclude(js => js.User) // Ensure JobSeeker's User is included
                .Include(a => a.JobPost) // Ensure JobPost is included
                .ThenInclude(jp => ((JobPost)jp).Recruiter) // Cast to JobPost to access Recruiter
                .ThenInclude(r => r.User) // Ensure Recruiter's User is included
                .FirstOrDefaultAsync(a => a.ApplicationId == applicationId);

            if (application == null)
                return NotFound("Application not found.");

            application.Status = status;
            await _context.SaveChangesAsync();

            string emailSubject = $"Your Job Application Status: {status}";
            string emailBody = $"Hello {application.JobSeeker.User.FullName},<br><br>{emailMessage}<br><br>" +
                               $"Job Title: <strong>{((JobPost)application.JobPost).Title}</strong><br>" + // Cast to JobPost
                               $"Status: <strong>{status}</strong><br><br>" +
                               "Best Regards,<br>Work Vista Team";

            await _emailservice.SendEmailAsync(application.JobSeeker.User.Email, emailSubject, emailBody);

            return Ok(new { message = $"Application {status} successfully and email sent!" });
        }
    }
}
