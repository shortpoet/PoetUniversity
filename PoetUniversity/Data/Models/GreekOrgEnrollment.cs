using System;
namespace PoetUniversity.Data.Models
{
  public class GreekOrgEnrollment
  {
    public Guid GreekOrgEnrollmentId { get; set; }
    public Guid GreekOrgId { get; set; }
    public Guid StudentId { get; set; }
    public GreekOrg GreekOrg { get; set; }
    public Student Student { get; set; }
  }
}