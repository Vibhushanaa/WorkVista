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
    public class JobPostController : ControllerBase
    {
        private readonly EFDbcontext _context;

        public JobPostController(EFDbcontext context)
        {
            _context = context;
        }

        // GET: api/JobPost/all - Get all job posts (For Job Seekers)
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<JobPostDTO>>> GetAllJobs()
        {
            var jobs = await _context.JobPosts
                .Select(job => new JobPostDTO
                {
                    JobId = job.JobId,
                    RecruiterId = job.RecruiterId,
                    CompanyName = job.CompanyName,
                    Title = job.Title,
                    Description = job.Description,
                    Location = job.Location,
                    Salary = job.Salary,
                    Experience = job.Experience,
                    JobType = job.JobType,
                    JobCategory = job.JobCategory,
                    PostedDate = job.PostedDate
                }).ToListAsync();

            return Ok(jobs);
        }

        // GET: api/JobPost/{id} - Get job details by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<JobPostDTO>> GetJobById(int id)
        {
            var job = await _context.JobPosts
                .Where(j => j.JobId == id)
                .Select(job => new JobPostDTO
                {
                    JobId = job.JobId,
                    RecruiterId = job.RecruiterId,
                    CompanyName = job.CompanyName,
                    Title = job.Title,
                    Description = job.Description,
                    Location = job.Location,
                    Salary = job.Salary,
                    Experience = job.Experience,
                    JobType = job.JobType,
                    JobCategory = job.JobCategory,
                    PostedDate = job.PostedDate
                }).FirstOrDefaultAsync();

            if (job == null)
                return NotFound("Job not found");

            return Ok(job);
        }

        // POST: api/JobPost/create - Create a new job post (Only Recruiters)
        ////[Authorize]
        ////[HttpPost("create")]
        ////public async Task<ActionResult<JobPostDTO>> PostJob([FromBody] JobPostDTO jobPostDto)
        ////{
        ////    var jobPost = new JobPost
        ////    {
        ////        RecruiterId = jobPostDto.RecruiterId,
        ////        CompanyName = jobPostDto.CompanyName,
        ////        Title = jobPostDto.Title,
        ////        Description = jobPostDto.Description,
        ////        Location = jobPostDto.Location,
        ////        Salary = jobPostDto.Salary,
        ////        Experience = jobPostDto.Experience,
        ////        JobType = jobPostDto.JobType,
        ////        JobCategory = jobPostDto.JobCategory,
        ////        PostedDate = DateTime.UtcNow,
        ////    };

        ////    _context.JobPosts.Add(jobPost);
        ////    await _context.SaveChangesAsync();

        ////    jobPostDto.JobId = jobPost.JobId;
        ////    return CreatedAtAction(nameof(GetJobById), new { id = jobPost.JobId }, jobPostDto);
        ////}


        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<JobPostDTO>> PostJob([FromBody] JobPostDTO jobPostDto)
        {
            // Check if the RecruiterId exists
            var recruiterExists = await _context.Recruiters.AnyAsync(r => r.RecruiterId == jobPostDto.RecruiterId);
            if (!recruiterExists)
            {
                return BadRequest("Invalid RecruiterId");
            }

            var jobPost = new JobPost
            {
                RecruiterId = jobPostDto.RecruiterId,
                CompanyName = jobPostDto.CompanyName,
                Title = jobPostDto.Title,
                Description = jobPostDto.Description,
                Location = jobPostDto.Location,
                Salary = jobPostDto.Salary,
                Experience = jobPostDto.Experience,
                JobType = jobPostDto.JobType,
                JobCategory = jobPostDto.JobCategory,
                PostedDate = DateTime.UtcNow,
            };

            _context.JobPosts.Add(jobPost);
            await _context.SaveChangesAsync();

            jobPostDto.JobId = jobPost.JobId;
            return CreatedAtAction(nameof(GetJobById), new { id = jobPost.JobId }, jobPostDto);
        }



        // PUT: api/JobPost/update/{id} - Update job post (Only Recruiters)
        [HttpPut("update/{id}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> UpdateJob(int id, [FromBody] JobPostDTO jobPostDto)
        {
            if (id != jobPostDto.JobId)
                return BadRequest("Job ID mismatch");

            var jobPost = await _context.JobPosts.FindAsync(id);
            if (jobPost == null)
                return NotFound("Job not found");

            jobPost.CompanyName = jobPostDto.CompanyName;
            jobPost.Title = jobPostDto.Title;
            jobPost.Description = jobPostDto.Description;
            jobPost.Location = jobPostDto.Location;
            jobPost.Salary = jobPostDto.Salary;
            jobPost.Experience = jobPostDto.Experience;
            jobPost.JobType = jobPostDto.JobType;
            jobPost.JobCategory = jobPostDto.JobCategory;
            jobPost.PostedDate = DateTime.UtcNow;

            _context.Entry(jobPost).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/JobPost/delete/{id} - Delete job post (Only Recruiters)
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Recruiter")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var jobPost = await _context.JobPosts.FindAsync(id);
            if (jobPost == null)
                return NotFound("Job not found");

            _context.JobPosts.Remove(jobPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Search & Filter Jobs
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<JobPostDTO>>> SearchJobs(
            string? title, string? location, string? experience, string? jobType, string? jobCategory, decimal? minSalary)
        {
            var query = _context.JobPosts.AsQueryable();

            if (!string.IsNullOrEmpty(title))
                query = query.Where(j => j.Title.Contains(title));

            if (!string.IsNullOrEmpty(location))
                query = query.Where(j => j.Location.Contains(location));

            if (!string.IsNullOrEmpty(experience))
                query = query.Where(j => j.Experience.Contains(experience));

            if (!string.IsNullOrEmpty(jobType))
                query = query.Where(j => j.JobType == jobType);

            if (!string.IsNullOrEmpty(jobCategory))
                query = query.Where(j => j.JobCategory == jobCategory);

            if (minSalary.HasValue)
                query = query.Where(j => j.Salary >= minSalary);

            var jobs = await query.Select(job => new JobPostDTO
            {
                JobId = job.JobId,
                RecruiterId = job.RecruiterId,
                CompanyName = job.CompanyName,
                Title = job.Title,
                Description = job.Description,
                Location = job.Location,
                Salary = job.Salary,
                Experience = job.Experience,
                JobType = job.JobType,
                JobCategory = job.JobCategory,
                PostedDate = job.PostedDate
            }).ToListAsync();

            return Ok(jobs);
        }
    }
}
