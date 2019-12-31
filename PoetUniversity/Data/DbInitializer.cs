using PoetUniversity.Data;
using PoetUniversity.Data.Models;
using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;
using System.IO;
using System.Linq;

namespace PoetUniversity.Data
{

  public class DbInitializer
  {
    public static void InitializeUni(SchoolContext context)
    {
      context.Database.EnsureCreated();
      // Look for any students.
      if (context.Courses.Any())
      {
        return;   // DB has been seeded
      }

      Address[] addresses1 = context.Addresses.Where(x => x.Region == 1).ToArray();

      static string courseGen(int seed)
      {
        string[] rhetorics =  File.ReadAllLines(@".\Data\rhetoric_44.txt");
        string rhetoric = rhetorics[seed];
        TextInfo myTI = new CultureInfo("en-US",false).TextInfo;
        return myTI.ToTitleCase(rhetoric);
      }

      int seed = 8;
      Random rnd = new Random(seed);

      var courses = new Course[100];

      for (int index = 0; index <= 100; index++)
      {

        int rCourse = rnd.Next(0, 44);
        // 2-5 credits
        int rCredits = rnd.Next(2, 6);

        int rAddress1 = rnd.Next(0, addresses1.Length);

        Course c = new Course
        {
          CourseTitle = courseGen(rCourse),
          AddressId = addresses1[rAddress1].AddressId,
          CourseCredits = rCredits
        };

        courses[index] = c;
      }

    }
    public static void InitializeStudents(SchoolContext context)
    {
      context.Database.EnsureCreated();
      // Look for any students.
      if (context.Students.Any())
      {
        return;   // DB has been seeded
      }

      // StreamReader file = new StreamReader(@".\poet_names_100.txt");

      Address[] addresses2 = context.Addresses.Where(x => x.Region == 2).ToArray();
      Address[] addresses3 = context.Addresses.Where(x => x.Region == 3).ToArray();

      static string[] nameGen(int seed)
      {
        string[] poets =  File.ReadAllLines(@".\Data\poet_names_100.txt");
        string poet = poets[seed];
        string[] names = poet.Split(' ');
        string[] generatedNames = new string[names.Count()];
        if (names.Length > 1)
        {
          string lastName = names.Last();
          string firstName = names.Take(names.Count() - 1).ToString();
          generatedNames.Append(firstName);
          generatedNames.Append(lastName);
        }
        else 
        {
          string lastName = names.ToString();
          string firstName = "The";
          generatedNames.Append(firstName);
          generatedNames.Append(lastName);
        }
        return generatedNames;
      }

      static string courseGen(int seed)
      {
        string[] rhetorics =  File.ReadAllLines(@".\Data\rhetoric_44.txt");
        string rhetoric = rhetorics[seed];
        TextInfo myTI = new CultureInfo("en-US",false).TextInfo;
        return myTI.ToTitleCase(rhetoric);
      }

      int seed = 8;
      Random rnd = new Random(seed);

      var students = new Student[100];

      var course = new Course[100];

      for (int index = 0; index <= 100; index++)
      {
        int rName = rnd.Next(0, 100);
        // 2010-2020 enrollment
        int rYear = rnd.Next(2010, 2021);

        int rCourse = rnd.Next(0, 44);
        // 2-5 credits
        int rCredits = rnd.Next(2, 6);

        int rAddress2 = rnd.Next(0, addresses2.Length);
        int rAddress3 = rnd.Next(0, addresses3.Length);

        Student s = new Student
        {
          FirstMidName = nameGen(rName)[0],
          LastName = nameGen(rName)[1],
          EnrollmentDate = DateTime.Parse(String.Format(@"{}-09-01", rYear)),
          // use enrollment year to "randomize" region
          AddressId = rYear % 2 == 0 ? addresses2[rAddress2].AddressId : addresses3[rAddress3].AddressId,
        };

        students.Append(s);

      }

    }
    public static void InitializeAddy(SchoolContext context)
    {
      context.Database.EnsureCreated();
      // Look for any students.
      if (context.Addresses.Any())
      {
        return;   // DB has been seeded
      }

      int seed = 8;

      int[] regions = {1, 2, 3};

      foreach (int region in regions)
      {
        foreach (var address in addressGen(266, region, seed))
        {
          context.Addresses.Add(address);
        }

      }
      context.SaveChanges();

      static Address[] addressGen(int limit, int region, int seed)
      {

        var addresses = new Address[limit];
        Random rnd = new Random(seed);

        for (int index = 0; index <= limit - 1; index++)
        {
          string[] streetRegion =  File.ReadAllLines(String.Format(@".\Data\street_region_{0}.txt", region.ToString()));
          string[] cityStateRegion =  File.ReadAllLines(String.Format(@".\Data\city_state_region_{0}.txt", region.ToString()));
          string[] streetType =  File.ReadAllLines(@".\Data\street_type_designations.txt");

          int streetNum = rnd.Next(1, 8889);
          int rsr = rnd.Next(0, streetRegion.Count());
          int rcsr = rnd.Next(0, cityStateRegion.Count());
          int rst = rnd.Next(0, streetType.Count());

          string street = streetRegion[rsr] + " " + streetType[rst];
          string city = cityStateRegion[rcsr].Split(",")[0].Trim();
          string state = cityStateRegion[rcsr].Split(",")[1].Trim();
          TextInfo myTI = new CultureInfo("en-US",false).TextInfo;
          street = myTI.ToTitleCase(street);
          city = myTI.ToTitleCase(city);
          state = myTI.ToTitleCase(state);
          
          static string zipGen(string letter)
          {
            string[] letters = {"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
            // add 10 to avoid leading zero and string issues
            string _index = (Array.IndexOf(letters, letter) + 10).ToString();
            return _index;
          }

          int zip = int.Parse(zipGen(state.Substring(0,1)) + zipGen(city.Substring(0,1)) + zipGen(street.Substring(0,1)));

          // modify after zip assign to avoid leading digit

          street = streetNum.ToString() + " " + street;

          Address a = new Address
          {
            Street = street,
            City = city,
            State = state,
            ZipCode = zip,
            Region = region
          };

          addresses[index] = a;

        }
        return addresses;
      }
    }
  }
}