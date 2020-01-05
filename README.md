# PoetUniversity
An extension of the microsoft docs tutorial

- start with template

```
dotnet new webapp -o PoetUniversity
```

- add links to _layout and change index

- install packages 

```
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.Extensions.Logging.Debug
```

- add models

- scaffold student pages

```
dotnet aspnet-codegenerator razorpage -m Student -dc PoetUniversity.Data.SchoolContext -udl -outDir Pages\\Students --referenceScriptLibraries
or
dotnet aspnet-codegenerator razorpage -m Student -dc PoetUniversity.Data.SchoolContext -udl -outDir Pages/Students --referenceScriptLibraries
```

- add db seed
- to create an air of sophistication, names of poets and english spanish, and italian were selected for base data for random seeding

```
dotnet aspnet-codegenerator razorpage -m Address -dc PoetUniversity.Data.SchoolContext -udl -outDir Pages\\Addresses --referenceScriptLibraries
```

- add code taken from scaffolded react web app => [medium article](https://medium.com/software-ateliers/asp-net-core-vue-template-with-custom-configuration-using-cli-3-0-8288e18ae80b)

- vue cli create

- scaffold [Identity Server](http://docs.identityserver.io/en/latest/quickstarts/2_interactive_aspnetcore.html) using template
  - only UI
  ```
  dotnet new is4ui
  ```
  - or complete web proj
  ```
  dotnet new is4inmem
  ```

- configure identity server mvc client
  - callapi, login, logout
  - json.cshtml in shared folder
  - make sure to mathc secret, et al.

- add identity controller api endpoint
  - jwt 

- [define additional identity resources](http://docs.identityserver.io/en/latest/topics/resources.html#defining-identity-resources)
  - in identity server 
    - add scope to client pointing to identity resource that matches user claims in api definition and user
  - in client
    - add scope to access api named in id server config
    - [map claims](https://leastprivilege.com/2017/11/15/missing-claims-in-the-asp-net-core-2-openid-connect-handler/)
    - ```
      options.GetClaimsFromUserInfoEndpoint = true;

      options.ClaimActions.MapJsonKey("location", "location");
      ```

### TODO
- Data Seeding
  - choose place for uni addresses
  - add enrollments
  - use all 44 rhetorics for courses instead of random
- Security
  - (?) http://localhost:5000 => redirects to https://localhost:5001 (Poet University ASPNet Index)
  - (?) http://localhost:5002 => redirects to https://localhost:5003/Account/Login (Identity Server Login Page)
