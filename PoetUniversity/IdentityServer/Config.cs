// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.



using IdentityServer4.Models;
using IdentityServer4;
using System.Collections.Generic;
using IdentityModel;

namespace IdentityServer
{
public static class Config
{

  public static IEnumerable<IdentityResource> Ids =>
      new List<IdentityResource>
      {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
        new IdentityResource("location", new[] { "location" }),
        // new IdentityResources.Email(),
        // new IdentityResources.Phone(),
        // new IdentityResource("custom.profile.test", new[] { JwtClaimTypes.Name, JwtClaimTypes.Email, JwtClaimTypes.EmailVerified, "location" }),
        // new IdentityResource {
        //   Name = "custom.profile.basic",
        //   DisplayName = "Custom Profile Basic",
        //   Description = "A basic custom profile containing just, well, a profile",
        //   UserClaims = new[] { "profile" }
        // },
        // new IdentityResource {
        //   Name = "custom.profile.web",
        //   DisplayName = "Custom Profile Web Contact Info",
        //   Description = "A custom profile containing new fangled info stuffs",
        //   UserClaims = new[] { "name", "email", "emailValidated" }
        // },
        // new IdentityResource {
        //   Name = "custom.profile.snail",
        //   DisplayName = "Custom Profile Snail Contact Info",
        //   Description = "A custom profile containing some snail stuff",
        //   UserClaims = new[] { "givenName", "familyName", "phoneNumber", "phoneNumberValidated", "address" }
        // }
      };

  public static IEnumerable<ApiResource> Apis =>
    new ApiResource[]
    {
      new ApiResource("api1", "My API #1"),
      new ApiResource 
      {
        Name = "api2",
        // secret for using introspection endpoint
        ApiSecrets =
        {
            new Secret("secret".Sha256())
        },
        // include the following using claims in access token (in addition to subject id)
        UserClaims = { 
          // JwtClaimTypes.Name, 
          // JwtClaimTypes.Email, 
          JwtClaimTypes.Profile, 
          // JwtClaimTypes.PhoneNumber, 
          // "custom.profile.test", 
          // "custom.profile.basic", 
          // "custom.profile.web", 
          // "custom.profile.snail" 
          },
        // this API defines two scopes
        Scopes =
        {
          new Scope
          {
            Name = "api2.full_access",
            DisplayName = "Full access to API 2",
          },
          new Scope
          {
            Name = "api2.read_only",
            DisplayName = "Read only access to API 2"
          }
        }
      }
    };
  public static IEnumerable<Client> Clients =>
    new Client[]
    {
      // machine to machine client (from quickstart 1)
      // client credentials flow client
      new Client
      {
        ClientId = "client",
        ClientName = "Client Credentials Client",

        AllowedGrantTypes = GrantTypes.ClientCredentials,
        ClientSecrets = { new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256()) },

        AllowedScopes = { "api1" }
      },
      // interactive ASP.NET Core MVC client
      // MVC client using code flow + pkce
      new Client
      {
        ClientId = "mvc",
        ClientName = "MVC Client",
        ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256()) },

        AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
        RequirePkce = true,
        RequireConsent = false,

        RedirectUris = { "https://localhost:5002/signin-oidc" },
        FrontChannelLogoutUri = "https://localhost:5002/signout-oidc",
        PostLogoutRedirectUris = { "https://localhost:5002/signout-callback-oidc" },

        // enables support for refresh tokens
        AllowOfflineAccess = true,
        // AllowedScopes = { "openid", "profile", "api1" }

        AllowedScopes = new List<string>
        {
          IdentityServerConstants.StandardScopes.OpenId,
          IdentityServerConstants.StandardScopes.Profile,
          // IdentityServerConstants.StandardScopes.Email,
          // "profile",
          "location",
          "api1",
          "api2.full_access",
          // "custom.profile.test",
          // "custom.profile.basic",
          // "custom.profile.web",
          // "custom.profile.snail",
        }
      },
      // SPA client using code flow + pkce
      new Client
      {
        ClientId = "spa",
        ClientName = "SPA Client",
        ClientUri = "https://identityserver.io",

        AllowedGrantTypes = GrantTypes.Code,
        RequirePkce = true,
        RequireClientSecret = false,

        RedirectUris =
        {
          "https://localhost:5002/index.html",
          "https://localhost:5002/callback.html",
          "https://localhost:5002/silent.html",
          "https://localhost:5002/popup.html",
        },

        PostLogoutRedirectUris = { "https://localhost:5002/index.html" },
        AllowedCorsOrigins = { "https://localhost:5002" },

        AllowedScopes = { "openid", "profile", "api1" }
      },
      // JavaScript Client
      new Client
      {
        ClientId = "js",
        ClientName = "JavaScript Client",

        AllowedGrantTypes = GrantTypes.Code,
        RequirePkce = true,
        RequireClientSecret = false,
        AllowAccessTokensViaBrowser = true,


        RedirectUris =           { "https://localhost:5004/callback.html" },
        PostLogoutRedirectUris = { "https://localhost:5004/index.html" },
        // AllowedCorsOrigins =     { "https://localhost:5004;https://localhost:5003" },
        AllowedCorsOrigins =     { "https://localhost:5004" },

        // enables support for refresh tokens
        AllowOfflineAccess = true,

        AllowedScopes = new List<string>
        {
          IdentityServerConstants.StandardScopes.OpenId,
          IdentityServerConstants.StandardScopes.Profile,
          "location",
          "api1",
          "api2.full_access"
        }
      }
    };
  }
}