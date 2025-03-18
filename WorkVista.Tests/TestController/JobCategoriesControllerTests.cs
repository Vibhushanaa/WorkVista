using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Work_Vista_App.Controllers;
using Work_Vista_App.DTO;
using Work_Vista_App.Model;

namespace WorkVista.Tests.TestController
{
    [TestFixture]
    public class JobCategoriesControllerTests
    {
        private EFDbcontext _context;
        private Mock<ILogger<JobCategoriesController>> _mockLogger;
        private JobCategoriesController _controller;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<EFDbcontext>()
                .UseInMemoryDatabase(databaseName: "JobCategoriesTest")
                .Options;

            _context = new EFDbcontext(options);
            _mockLogger = new Mock<ILogger<JobCategoriesController>>();
            _controller = new JobCategoriesController(_context, _mockLogger.Object);

            ClearDatabase();
            SeedDatabase();
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        private void ClearDatabase()
        {
            _context.JobCategory.RemoveRange(_context.JobCategory);
            _context.SaveChanges();
        }

        private void SeedDatabase()
        {
            var category = new JobCategories
            {
                CategoryId = 1,
                CategoryName = "Test Category"
            };

            _context.JobCategory.Add(category);
            _context.SaveChanges();
        }

        

        [Test]
        public async Task GetJobCategory_ReturnsNotFound_WhenCategoryNotFound()
        {
            // Arrange
            var categoryId = 99;

            // Act
            var result = await _controller.GetJobCategory(categoryId);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<NotFoundResult>());
        }

        [Test]
        public async Task PostJobCategory_ReturnsCreatedAtActionResult_WithCategory()
        {
            // Arrange
            var categoryDto = new JobCategoriesDTO
            {
                CategoryName = "New Category"
            };

            // Act
            var result = await _controller.PostJobCategory(categoryDto);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<CreatedAtActionResult>());
            var createdResult = result.Result as CreatedAtActionResult;
            Assert.That(createdResult.Value, Is.InstanceOf<JobCategoriesDTO>());
        }

       

        [Test]
        public async Task PutJobCategory_ReturnsNoContent_WhenCategoryUpdated()
        {
            // Arrange
            var categoryId = 1;
            var categoryDto = new JobCategoriesDTO
            {
                CategoryId = categoryId,
                CategoryName = "Updated Category"
            };

            // Act
            var result = await _controller.PutJobCategory(categoryId, categoryDto);

            // Assert
            Assert.That(result, Is.InstanceOf<NoContentResult>());
        }

        [Test]
        public async Task PutJobCategory_ReturnsBadRequest_WhenIdMismatch()
        {
            // Arrange
            var categoryId = 1;
            var categoryDto = new JobCategoriesDTO
            {
                CategoryId = 2, // Mismatched ID
                CategoryName = "Updated Category"
            };

            // Act
            var result = await _controller.PutJobCategory(categoryId, categoryDto);

            // Assert
            Assert.That(result, Is.InstanceOf<BadRequestResult>());
        }

        [Test]
        public async Task DeleteJobCategory_ReturnsNoContent_WhenCategoryDeleted()
        {
            // Arrange
            var categoryId = 1;

            // Act
            var result = await _controller.DeleteJobCategory(categoryId);

            // Assert
            Assert.That(result, Is.InstanceOf<NoContentResult>());
        }

        [Test]
        public async Task DeleteJobCategory_ReturnsNotFound_WhenCategoryNotFound()
        {
            // Arrange
            var categoryId = 99;

            // Act
            var result = await _controller.DeleteJobCategory(categoryId);

            // Assert
            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }
    }
}
