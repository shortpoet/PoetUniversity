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
dotnet aspnet-codegenerator razorpage -m Student -dc PoetUniversity.Data.SchoolContext -udl -outDir Pages\Students --referenceScriptLibraries
```

