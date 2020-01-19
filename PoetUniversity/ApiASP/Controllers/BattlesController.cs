using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

// https://stackoverflow.com/questions/13297563/read-and-parse-a-json-file-in-c-sharp

namespace ApiASP.Controllers
{
  public class Battle 
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Sponsor { get; set; }
    public string SeedFund { get; set; }

    public static List<Battle> LoadJson(string path)
    {
      using (StreamReader r = new StreamReader(path))
      {
        string json = r.ReadToEnd();
        List<Battle> battles = JsonConvert.DeserializeObject<List<Battle>>(json);
        return battles;
      }
    }
  }


  [Route("battles")]
  public class BattlesController : ControllerBase
  {
    [HttpGet]
    public IActionResult Get()
    {
      string path = @".\Data\Seed\battles.json";
      List<Battle> publicBattles = Battle.LoadJson(path);
      return new JsonResult(from b in publicBattles select new { b.Id, b.Name, b.Sponsor, b.SeedFund });
    }
  }
  [Route("battles/private-battles")]
  [Authorize(AuthenticationSchemes = "Auth0")]
  public class PrivateBattlesController : ControllerBase
  {
    [HttpGet]
    public IActionResult Get()
    {
      string path = @".\Data\Seed\private-battles.json";
      List<Battle> privateBattles = Battle.LoadJson(path);
      return new JsonResult(from b in privateBattles select new { b.Id, b.Name, b.Sponsor, b.SeedFund });
    }
  }
}