using Microsoft.EntityFrameworkCore;

namespace Work_Vista_App.Model
{
    public class EFDbcontext : DbContext
    {
        public EFDbcontext(DbContextOptions<EFDbcontext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<JobSeeker> JobSeekers { get; set; }
        public DbSet<Recruiter> Recruiters { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<JobCategories> JobCategory { get; set; }
        public DbSet<JobPost> JobPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure composite keys, relationships, and constraints if needed
            modelBuilder.Entity<Application>()
                .HasOne(a => a.JobSeeker)
                .WithMany()
                .HasForeignKey(a => a.JobSeekerId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Interview>()
                .HasOne(i => i.Application)
                .WithMany()
                .HasForeignKey(i => i.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<JobPost>()
                .HasOne(j => j.Recruiter)
                .WithMany()
                .HasForeignKey(j => j.RecruiterId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Application>()
            .HasOne(a => a.JobPost)
            .WithMany()
            .HasForeignKey(a => a.JobId)
            .OnDelete(DeleteBehavior.Restrict); // Use Restrict to avoid cycles

            modelBuilder.Entity<Application>()
                .HasOne(a => a.JobSeeker)
                .WithMany()
                .HasForeignKey(a => a.JobSeekerId)
                .OnDelete(DeleteBehavior.Restrict); // Use Restrict to avoid cycles

            modelBuilder.Entity<Application>()
            .HasOne(a => a.JobSeeker)
            .WithMany()
            .HasForeignKey(a => a.JobSeekerId);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JobSeeker>()
           .HasOne(js => js.User)
           .WithMany()
           .HasForeignKey(js => js.UserId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
