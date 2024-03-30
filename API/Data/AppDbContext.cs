using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<ApplicationUser> AppUsers { get; set; }
        public DbSet<Todo> Todos { get; set; }


        //fluentApi
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Define One-To-Many ralationship from user to todo

            builder.Entity<ApplicationUser>()
                .HasMany(u => u.Todos)
                .WithOne(t => t.AppUser)
                .HasForeignKey(t => t.AppUserId);

            base.OnModelCreating(builder);
        }

    }
}
