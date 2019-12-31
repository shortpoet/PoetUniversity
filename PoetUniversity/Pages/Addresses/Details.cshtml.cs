using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PoetUniversity.Data;
using PoetUniversity.Data.Models;

namespace PoetUniversity.Pages.Addresses
{
    public class DetailsModel : PageModel
    {
        private readonly PoetUniversity.Data.SchoolContext _context;

        public DetailsModel(PoetUniversity.Data.SchoolContext context)
        {
            _context = context;
        }

        public Address Address { get; set; }

        public async Task<IActionResult> OnGetAsync(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Address = await _context.Addresses.FirstOrDefaultAsync(m => m.AddressId == id);

            if (Address == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
