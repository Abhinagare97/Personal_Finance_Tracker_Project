using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace PersonalFinanceTracker.Models
{

        public class EFCoreDbContext : DbContext
        {
            public EFCoreDbContext(DbContextOptions<EFCoreDbContext> options) : base(options)
            {
            }
            //OnConfiguring() method is used to select and configure the data source
            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {

            }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().ToTable("Users");
            modelBuilder.Entity<Expenses>().ToTable("Expenses");
            modelBuilder.Entity<Income>().ToTable("Income"); // Added Income table
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<Income> Income { get; set; } // Added DbSet for Income



    }
}