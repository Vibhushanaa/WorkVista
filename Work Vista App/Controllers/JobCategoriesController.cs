using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Work_Vista_App.DTO;
using Work_Vista_App.Model;

namespace Work_Vista_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobCategoriesController : ControllerBase
    {
        private readonly EFDbcontext _context;
        private readonly ILogger<JobCategoriesController> _logger;

        public JobCategoriesController(EFDbcontext context, ILogger<JobCategoriesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public JobCategoriesController(EFDbcontext context)
        {
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobCategoriesDTO>>> GetJobCategories()
        {
            _logger.LogInformation("Getting all job categories");
            return await _context.JobCategory
                .Select(category => new JobCategoriesDTO
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobCategoriesDTO>> GetJobCategory(int id)
        {
            _logger.LogInformation($"Getting job category with id {id}");
            var category = await _context.JobCategory
                .Select(category => new JobCategoriesDTO
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName
                })
                .FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category == null)
            {
                _logger.LogWarning($"Job category with id {id} not found");
                return NotFound();
            }

            return category;
        }

        [HttpPost]
        public async Task<ActionResult<JobCategoriesDTO>> PostJobCategory(JobCategoriesDTO categoryDto)
        {
            var category = new JobCategories
            {
                CategoryName = categoryDto.CategoryName
            };

            _context.JobCategory.Add(category);
            await _context.SaveChangesAsync();

            categoryDto.CategoryId = category.CategoryId;
            return CreatedAtAction(nameof(GetJobCategory), new { id = category.CategoryId }, categoryDto);
            _logger.LogInformation($"Job category with id {category.CategoryId} created");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobCategory(int id, JobCategoriesDTO categoryDto)
        {
            if (id != categoryDto.CategoryId)
            {
                return BadRequest();
            }

            var category = await _context.JobCategory.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            category.CategoryName = categoryDto.CategoryName;

            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobCategory(int id)
        {
            try
            {
                var category = await _context.JobCategory.FindAsync(id);
                if (category == null)
                {
                    return NotFound();
                }

                _context.JobCategory.Remove(category);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
