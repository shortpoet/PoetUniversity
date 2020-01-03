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
    public class IndexModel : PageModel
    {
        private readonly PoetUniversity.Data.SchoolContext _context;

        public IndexModel(PoetUniversity.Data.SchoolContext context)
        {
            _context = context;
        }

        public IList<Address> Address { get;set; }

        public async Task OnGetAsync()
        {
            Address = await _context.Addresses.ToListAsync();
        }
    }
}
