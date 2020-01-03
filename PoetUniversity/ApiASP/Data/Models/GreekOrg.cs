using System;
using System.Collections.Generic;

namespace PoetUniversity.Data.Models
{
  public class GreekOrg
  {
    public Guid GreekOrgId { get; set; }
    public string GreekOrgName { get; set; }
    public string GreekOrgLetters { get; set; }
    public Guid AddressId { get; set; }

    public string Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime YearFounded { get; set; }
    public ICollection<Student> GreekOrgStudents { get; set; } = new List<Student>();

  }
}