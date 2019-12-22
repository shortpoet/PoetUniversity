using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PoetUniversity.Data.Models;

namespace PoetUniversity.Data
{
  public class SchoolContext : DbContext
  {
    public SchoolContext (DbContextOptions<SchoolContext> options)
        : base(options)
    {
    }

    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Club> Clubs { get; set; }
    public DbSet<Sport> Sports { get; set; }
    public DbSet<GreekOrg> GreekOrgs { get; set; }
    public DbSet<CourseEnrollment> CourseEnrollments { get; set; }
    public DbSet<GreekOrgEnrollment> GreekOrgEnrollments { get; set; }
    public DbSet<ClubEnrollment> ClubEnrollments { get; set; }
    public DbSet<SportEnrollment> SportEnrollments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Student>().ToTable("Student");
      modelBuilder.Entity<Course>().ToTable("Course");
      modelBuilder.Entity<Sport>().ToTable("Sport");
      modelBuilder.Entity<GreekOrg>().ToTable("GreekOrg");
      modelBuilder.Entity<CourseEnrollment>().ToTable("CourseEnrollment");
      modelBuilder.Entity<GreekOrgEnrollment>().ToTable("GreekOrgEnrollment");
      modelBuilder.Entity<ClubEnrollment>().ToTable("ClubEnrollment");
      modelBuilder.Entity<SportEnrollment>().ToTable("SportEnrollment");
    }    
  }
}
