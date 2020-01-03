using System;

namespace PoetUniversity.Data.Models
{
  public class SportEnrollment
  {
    public Guid SportEnrollmentId { get; set; }
    public Guid SportId { get; set; }
    public Guid StudentId { get; set; }
    public Sport Sport { get; set; }
    public Student Student { get; set; }

  }
}