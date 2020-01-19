using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ApiASP.Controllers
{
  [Route("identity")]
  [Authorize(AuthenticationSchemes = "Identity")]
  public class IdentityController : ControllerBase
  {
    [HttpGet]
    public IActionResult Get()
    {
      return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
    }
  }
}