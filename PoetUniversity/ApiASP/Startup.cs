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
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;

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
      // services.AddAuthentication("Bearer")
      //   .AddJwtBearer("Bearer", options =>
      //   {
      //       options.Authority = "https://localhost:5003";
      //       options.RequireHttpsMetadata = false;

      //       options.Audience = "api1";
      //   });

        services.AddAuthentication(options =>
          {
              options.DefaultScheme = "Cookies";
              options.DefaultChallengeScheme = "oidc";
          })
          .AddCookie("Cookies")
          .AddOpenIdConnect("oidc", options =>
          {
              options.Authority = "https://localhost:5003";
              options.RequireHttpsMetadata = false;

              options.ClientId = "poet";
              options.ClientSecret = "88C1A7E1-8H79-4A89-A3D6-A88888FB86B0";
              options.ResponseType = "code";
              options.GetClaimsFromUserInfoEndpoint = true;

              options.ClaimActions.MapJsonKey("location", "location");

              options.SaveTokens = true;

              options.Scope.Add("api1");
              // adding additional scope
              options.Scope.Add("api2.full_access");
              options.Scope.Add("location");
              // options.Scope.Add("custom.profile.test");
              options.Scope.Add("offline_access");
          });
      services.AddAuthorization();

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
          // policy.WithOrigins("http://localhost:8080;https://localhost:5004;https://localhost:5003")
          // policy.WithOrigins("https://localhost:5004")
          // for some reason it won't recognize the urls if not allow all
          policy.AllowAnyOrigin()
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
