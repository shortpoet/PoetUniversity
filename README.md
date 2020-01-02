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

TODO
choose place for uni addresses
add enrollments
use all 44 rhetorics for courses instead of random