using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Work_Vista_App.DTO;
using Work_Vista_App.Model;

namespace Work_Vista_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Recruiter")]
    public class RecruiterController : ControllerBase
    {
        private readonly EFDbcontext _context;

        public RecruiterController(EFDbcontext context)
        {
            _context = context;
        }

        // Register a new recruiter
        [HttpPost("register")]
        [AllowAnonymous] // Allow anonymous access for registration
        public async Task<IActionResult> RegisterRecruiter([FromBody] RecruiterDTO recruiterDto)
        {
            if (recruiterDto == null)
                return BadRequest("Invalid Recruiter Data");

            // Ensure user exists in User table
            var user = await _context.Users.FindAsync(recruiterDto.UserId);
            if (user == null)
                return NotFound("User not found");

            // Check if recruiter profile already exists
            bool exists = await _context.Recruiters.AnyAsync(r => r.UserId == recruiterDto.UserId);
            if (exists)
                return BadRequest("Recruiter profile already exists");

            // Map DTO to Entity
            var recruiter = new Recruiter
            {
                UserId = recruiterDto.UserId,
                CompanyName = recruiterDto.CompanyName,
                ContactNumber = recruiterDto.ContactNumber,
                CompanyWebsite = recruiterDto.CompanyWebsite
            };

            _context.Recruiters.Add(recruiter);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Recruiter profile created successfully", recruiter });
        }

        // Get Recruiter by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecruiterById(int id)
        {
            var recruiter = await _context.Recruiters.Include(r => r.User).FirstOrDefaultAsync(r => r.RecruiterId == id);

            if (recruiter == null)
                return NotFound("Recruiter not found");

            return Ok(recruiter);
        }

        // Shortlist a Candidate
        [HttpPut("shortlist/{applicationId}")]
        public async Task<IActionResult> ShortlistCandidate(int applicationId)
        {
            var application = await _context.Applications.FindAsync(applicationId);
            if (application == null)
                return NotFound("Application not found");

            application.Status = "Shortlisted";
            _context.Applications.Update(application);
            await _context.SaveChangesAsync();

            return Ok("Candidate shortlisted");
        }

        // Finalize a Candidate
        [HttpPut("finalize/{applicationId}")]
        public async Task<IActionResult> FinalizeCandidate(int applicationId)
        {
            var application = await _context.Applications.FindAsync(applicationId);
            if (application == null)
                return NotFound("Application not found");

            application.Status = "Hired";
            _context.Applications.Update(application);
            await _context.SaveChangesAsync();

            return Ok("Candidate finalized");
        }

        // Generate Reports
        [HttpGet("{id}/generate-report")]
        public async Task<IActionResult> GenerateReport(int id)
        {
            var jobs = await _context.JobPosts.Where(j => j.RecruiterId == id).ToListAsync();
            var applications = await _context.Applications.Where(a => jobs.Select(j => j.JobId).Contains(a.JobId)).ToListAsync();
            var hiredCandidates = applications.Where(a => a.Status == "Hired").ToList();

            var report = new
            {
                TotalJobs = jobs.Count,
                TotalApplications = applications.Count,
                HiredCandidates = hiredCandidates.Count
            };

            return Ok(report);
        }
    }
}
