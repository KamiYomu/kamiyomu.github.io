## {{ include.package }}

[![KamiYomu/{{ include.package }}- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo={{ include.package }}&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/{{ include.package }}/) 

[![{{ include.package }} Downloads](https://img.shields.io/nuget/dt/{{ include.package }}?style=flat&label={{ include.package }}&link=https%3A%2F%2Fwww.nuget.org%2Fpackages%2F{{ include.package }})](https://www.nuget.org/packages/{{ include.package }}/)

### Using `{{ include.package }}`

#### In KamiYomu Web Application

1. Open the KamiYomu Web application
2. Navigate to **Add-ons** > **Sources** (if not already configured)
3. Click **Add nuget.org as source** (if not already added)
4. Search for `{{ include.package }}`
5. Click the **Install** button
6. Configure the package in the Add-ons UI as needed

#### In Your C# Project

Install via .NET CLI:
```sh
dotnet add package {{ include.package }}
```

Or via NuGet Package Manager Console:
```powershell
Install-Package {{ include.package }}
```

---