// ApplicationDbContext.cs
using CSVFileDAL.Model;
using CSVFileDAL.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<EntityTbl> Entities { get; set; }
    public DbSet<Features> Features { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Features>()
            .HasKey(f => f.FeatureID);

        modelBuilder.Entity<Features>()
            .Property(f => f.FeatureID)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<Features>()
            .Property(f => f.EntityName)
            .IsRequired();

    }

}