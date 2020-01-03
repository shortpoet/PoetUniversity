using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

using PoetUniversity.Data;
using VueCliMiddleware;


namespace PoetUniversity
{
  public class Startup
  {
    
    public IWebHostEnvironment Environment { get; }
    public IConfiguration Configuration { get; }

    public Startup(IWebHostEnvironment environment, IConfiguration configuration)
    {
        Environment = environment;
        Configuration = configuration;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddRazorPages();

      services.AddControllersWithViews();

      // added to enable identity controller token check
      services.AddAuthentication("Bearer")
        .AddJwtBearer("Bearer", options =>
        {
            options.Authority = "https://localhost:5003";
            options.RequireHttpsMetadata = false;

            options.Audience = "api1";
        });


      services.AddDbContext<SchoolContext>(options =>
        options.UseSqlite(Configuration.GetConnectionString("SchoolContext")));
      // services.AddDbContext<SchoolContext>(options =>
      //   options.UseSqlServer(Configuration.GetConnectionString("SchoolContext")));
      services.AddSpaStaticFiles(configuration =>
      {
          configuration.RootPath = "../ClientApp";
      });
      services.AddCors(options =>
      {
        // this defines a CORS policy called "default"
        options.AddPolicy("default", policy =>
        {
          policy.WithOrigins("http://localhost:8080")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
      });

    }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
          app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();

      app.UseRouting();
      app.UseCors("default");
      // added to enable identity api token check
      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapRazorPages();

        endpoints.MapControllerRoute(
          name: "default",
          pattern: "{controller}/{action=Index}/{id?}");

      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "../ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseVueCli(npmScript: "serve", port: 8080);
        }
      });

    }
  }
}
