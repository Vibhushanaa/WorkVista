using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Work_Vista_App.DTO;
using Work_Vista_App.Model;

namespace Work_Vista_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobSeekerController : ControllerBase
    {
        private readonly EFDbcontext _context;

        public JobSeekerController(EFDbcontext context)
        {
            _context = context;
        }

        // Register Job Seeker Profile
        [HttpPost("register")]
        public async Task<IActionResult> RegisterJobSeeker([FromBody] JobSeekerDTO jobSeekerDto)
        {
            if (jobSeekerDto == null)
                return BadRequest("Invalid job seeker data");

            // Ensure user exists
            var user = await _context.Users.FindAsync(jobSeekerDto.UserId);
            if (user == null)
                return NotFound("User not found");

            // Check if job seeker profile already exists
            bool exists = await _context.JobSeekers.AnyAsync(js => js.UserId == jobSeekerDto.UserId);
            if (exists)
                return BadRequest("Job Seeker profile already exists");

            // Map DTO to Entity
            var jobSeeker = new JobSeeker
            {
                UserId = jobSeekerDto.UserId,
                PhoneNumber = jobSeekerDto.PhoneNumber,
                Skills = jobSeekerDto.Skills,
                Experience = jobSeekerDto.Experience,
                Location = jobSeekerDto.Location
            };

            _context.JobSeekers.Add(jobSeeker);
            await _context.SaveChangesAsync();

            return Ok(new { success = "Job Seeker profile created successfully" });
            
        }

        // Get Job Seeker by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobSeekerById(int id)
        {
            var jobSeeker = await _context.JobSeekers.Include(js => js.User).FirstOrDefaultAsync(js => js.UserId == id);

            if (jobSeeker == null)
                return NotFound("Job Seeker not found");

            return Ok(jobSeeker);
        }

        //// Upload Job Seeker Resume
        [HttpPost("{id}/upload-resume")]
        public async Task<IActionResult> UploadResume(int id, [FromForm] AddDataModel addDataModel)
        {
            var jobSeeker = await _context.JobSeekers.FindAsync(id);
            if (jobSeeker == null)
                return NotFound("Job Seeker not found");

            if (addDataModel.File == null || addDataModel.File.Length == 0)
                return BadRequest("Invalid file");

            using (var memoryStream = new MemoryStream())
            {
                await addDataModel.File.CopyToAsync(memoryStream);
                jobSeeker.Resume = memoryStream.ToArray();
            }

            _context.JobSeekers.Update(jobSeeker);
            await _context.SaveChangesAsync();

            return Ok(new { success = "Resume uploaded successfully" });
       
        }



        // Edit Job Seeker Profile
        [HttpPut("edit/{jobSeekerId}")]
        public async Task<IActionResult> EditJobSeeker(int jobSeekerId, [FromBody] JobSeekerDTO updatedJobSeekerDto)
        {
            var jobSeeker = await _context.JobSeekers.FindAsync(jobSeekerId);
            if (jobSeeker == null)
                return NotFound("Job Seeker not found");

            // Update fields from DTO
            jobSeeker.PhoneNumber = updatedJobSeekerDto.PhoneNumber ?? jobSeeker.PhoneNumber;
            jobSeeker.Skills = updatedJobSeekerDto.Skills ?? jobSeeker.Skills;
            jobSeeker.Experience = updatedJobSeekerDto.Experience ?? jobSeeker.Experience;
            jobSeeker.Location = updatedJobSeekerDto.Location ?? jobSeeker.Location;

            _context.JobSeekers.Update(jobSeeker);
            await _context.SaveChangesAsync();

            return Ok(new { success = "Job Seeker profile updated successfully" });
            
        }
    }
}
