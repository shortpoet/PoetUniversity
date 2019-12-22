using System;
using System.Collections.Generic;

namespace PoetUniversity.Data.Models
{
  public class Student
  {
    public int StudentId { get; set; }
    public string LastName { get; set; }
    public string FirstMidName { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public int TotalCredits { get; set; }
    public int GPA { get; set; }
    public ICollection<CourseEnrollment> CourseEnrollments { get; set; } = new List<CourseEnrollment>();
    public ICollection<GreekOrgEnrollment> GreekOrgEnrollments { get; set; } = new List<GreekOrgEnrollment>();
    public ICollection<ClubEnrollment> ClubEnrollments { get; set; } = new List<ClubEnrollment>();
    public ICollection<SportEnrollment> SportEnrollments { get; set; } = new List<SportEnrollment>();
  }
}