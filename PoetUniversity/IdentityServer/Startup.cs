// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Logging;

namespace IdentityServer
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

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // configures IIS out-of-proc settings (see https://github.com/aspnet/AspNetCore/issues/14882)
            services.Configure<IISOptions>(iis =>
            {
                iis.AuthenticationDisplayName = "Windows";
                iis.AutomaticAuthentication = false;
            });

            // configures IIS in-proc settings
            services.Configure<IISServerOptions>(iis =>
            {
                iis.AuthenticationDisplayName = "Windows";
                iis.AutomaticAuthentication = false;
            });

            var builder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
              .AddInMemoryIdentityResources(Config.Ids)
              .AddInMemoryApiResources(Config.Apis)
              .AddInMemoryClients(Config.Clients)
              .AddTestUsers(TestUsers.Users); 

            // in-memory, code config
            // builder.AddInMemoryIdentityResources(Config.Ids);
            // builder.AddInMemoryApiResources(Config.Apis);
            // builder.AddInMemoryClients(Config.Clients);
            // builder.AddTestUsers(TestUsers.Users);

            // or in-memory, json config
            //builder.AddInMemoryIdentityResources(Configuration.GetSection("IdentityResources"));
            //builder.AddInMemoryApiResources(Configuration.GetSection("ApiResources"));
            //builder.AddInMemoryClients(Configuration.GetSection("clients"));

            // not recommended for production - you need to store your key material somewhere secure
            builder.AddDeveloperSigningCredential();

            // JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

            services.AddAuthentication(options =>
              {
                options.DefaultScheme = "Cookies";
                options.DefaultChallengeScheme = "oidc";
                
              })

              .AddCookie("Cookies")

              // .AddOpenIdConnect("oidc", options =>
              //   {
              //     options.Authority = "https://localhost:5003";
              //     options.RequireHttpsMetadata = false;

              //     options.ClientId = "mvc";
              //     options.ClientSecret = "secret";
              //     options.ResponseType = "code";

              //     options.SaveTokens = true;
              //   })
            
              .AddGoogle(options =>
              {
                options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                // register your IdentityServer with Google at https://console.developers.google.com
                // enable the Google+ API
                // set the redirect URI to http://localhost:5000/signin-google
                options.ClientId = Configuration["PoetUniversity:Google:ClientId"];
                options.ClientSecret = Configuration["PoetUniversity:Google:ClientSecret"];
              })
            .AddGitHub(options =>
            {
                options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                options.ClientId = Configuration["PoetUniversity:Github:ClientId"];
                options.ClientSecret = Configuration["PoetUniversity:Github:ClientSecret"];
                options.Scope.Add("user:email");
            });

            services.AddCors(options => {
              // this defines a CORS policy called "default"
              options.AddPolicy("default", policy =>
              {
                // policy.WithOrigins("https://localhost:5004;https://localhost:5001;https://localhost:5003")
                policy.WithOrigins("https://localhost:5004")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
              });
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                IdentityModelEventSource.ShowPII = true;
            }

            // https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers/blob/dev/samples/Mvc.Client/Startup.cs
            // Required to serve files with no extension in the .well-known folder
            var options = new StaticFileOptions()
            {
                ServeUnknownFileTypes = true,
            };

            app.UseStaticFiles();
            
            // order here is important

            app.UseRouting();

            app.UseCors("default");

            app.UseIdentityServer();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute()
                  .RequireAuthorization();
            });
        }
    }
}