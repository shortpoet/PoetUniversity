using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IdentityModel.Tokens.Jwt;


namespace MvcClient
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllersWithViews();

      JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

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

            options.ClientId = "mvc";
            options.ClientSecret = "secret";
            options.ResponseType = "code";

            options.SaveTokens = true;

            options.Scope.Add("api1");
            options.Scope.Add("offline_access");

        });
      services.AddAuthorization();
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
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseStaticFiles();

      app.UseHttpsRedirection();

      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapDefaultControllerRoute()
          .RequireAuthorization();
        // endpoints.MapGet("/", async context =>
        // {
        //   await context.Response.WriteAsync("Hello World!");
        // });
      });
    }
  }
}
