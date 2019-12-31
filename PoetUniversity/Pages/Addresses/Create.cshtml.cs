using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using PoetUniversity.Data;
using PoetUniversity.Data.Models;

namespace PoetUniversity.Pages.Addresses
{
    public class CreateModel : PageModel
    {
        private readonly PoetUniversity.Data.SchoolContext _context;

        public CreateModel(PoetUniversity.Data.SchoolContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Address Address { get; set; }

        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Addresses.Add(Address);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
