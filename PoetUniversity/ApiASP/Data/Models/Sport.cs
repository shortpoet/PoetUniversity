using System;
using System.Collections.Generic;
namespace PoetUniversity.Data.Models
{
	public class Sport
	{
		public Guid SportId { get; set; }
		public string SportName { get; set; }
		public ICollection<Student> SportStudents { get; set; } = new List<Student>();
	}
}