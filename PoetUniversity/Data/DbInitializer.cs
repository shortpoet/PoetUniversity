using PoetUniversity.Data;
using PoetUniversity.Data.Models;
using System;
using System.Linq;

namespace PoetUniversity.Data
{
  public class DbInitializer
  {
    public static void Initialize(SchoolContext context)
    {
      context.Database.EnsureCreated();
      // Look for any students.
      if (context.Students.Any())
      {
        return;   // DB has been seeded
      }


    }
  }
}