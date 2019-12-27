using PoetUniversity.Data;
using PoetUniversity.Data.Models;
using System;
using System.IO;
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

      // StreamReader file = new StreamReader(@".\poet_names_100.txt");
      string[] poets =  File.ReadAllLines(@".\Data\poet_names_100.txt");

      foreach (string poet  in poets)
      {
        Console.WriteLine(poet);
      }

      Console.ReadKey();
    }
  }
}