using System;

namespace PoetUniversity.Data.Models
{
  public class ClubEnrollment
  {
    public Guid ClubEnrollmentId { get; set; }
    public Guid ClubId { get; set; }
    public Guid StudentId { get; set; }
    public Club Club { get; set; }
    public Student Student { get; set; }


  }
}