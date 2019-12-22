using System;
using System.Collections.Generic;

namespace PoetUniversity.Data.Models
{
  public class Club
  {
    public Guid ClubId { get; set; }
    public string ClubName { get; set; }
    public Guid AddressId { get; set; }
    // use scraper to grab most frequent words from wiki and create custom 'lorem ipsum' for description or google short
    public string Description { get; set; }
    public ICollection<Student> ClubStudents { get; set; } = new List<Student>();
  }
}