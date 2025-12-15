---
title: Create your Own Crawler Agents
parent: Crawler Agents
nav_order: 2
---

{% capture crawler_agent_note %}
{% include note-crawler-agents.md %}
{% endcapture %}
{{ crawler_agent_note | markdownify }}

## Overview

Create custom Crawler Agents to integrate new manga sources with KamiYomu. This guide walks you through setup, implementation, and debugging.

[![KamiYomu/KamiYomu.CrawlerAgents.Core- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.Core&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.Core/)

## Prerequisites

- .NET 8.0 SDK installed
- Visual Studio or preferred C# IDE
- NuGet package reference to `KamiYomu.CrawlerAgents.Core`

## Step 1: Project Setup

1. Create a new **Class Library** project (.NET 8.0)
2. Add NuGet package: `KamiYomu.CrawlerAgents.Core` (v1.1.4+)
3. Configure your `.csproj` file:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <PropertyGroup>
    <Title>Your Crawler Agent Name</Title>
    <Description>A crawler agent for accessing public data. Built on KamiYomu.CrawlerAgents.Core.</Description>
    <Authors>Your Name</Authors>
    <PackageTags>kamiyomu-crawler-agents</PackageTags>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <GeneratePackageOnBuild>True</GeneratePackageOnBuild>
    <IncludeSymbols>True</IncludeSymbols>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="KamiYomu.CrawlerAgents.Core" Version="1.1.4" />
  </ItemGroup>
</Project>
```

> **Required**: Include `kamiyomu-crawler-agents` in `<PackageTags>` for KamiYomu discovery.

## Step 2: Implement ICrawlerAgent Interface

Create a class implementing `AbstractCrawlerAgent, ICrawlerAgent, IDisposable` and extends:

```csharp
public interface ICrawlerAgent : IDisposable
{
    /// <summary>Retrieves the favicon URI of the target site.</summary>
    Task<Uri> GetFaviconAsync(CancellationToken cancellationToken);

    /// <summary>Searches for manga titles matching the query.</summary>
    Task<PagedResult<Manga>> SearchAsync(string titleName, PaginationOptions paginationOptions, CancellationToken cancellationToken);

    /// <summary>Retrieves detailed manga information by ID.</summary>
    Task<Manga> GetByIdAsync(string id, CancellationToken cancellationToken);

    /// <summary>Retrieves chapters for a manga.</summary>
    Task<PagedResult<Chapter>> GetChaptersAsync(Manga manga, PaginationOptions paginationOptions, CancellationToken cancellationToken);

    /// <summary>Retrieves page images for a chapter.</summary>
    Task<IEnumerable<Page>> GetChapterPagesAsync(Chapter chapter, CancellationToken cancellationToken);
}
```

Example:

```csharp
[DisplayName("My Wonderful Crawler Agent")]
public class MyCrawlerAgent : AbstractCrawlerAgent, ICrawlerAgent, IDisposable
{
  public MyCrawlerAgent(IDictionary<string, object> options) : base(options)
  {

  }
}
```

### Options Configuration

The `IDictionary<string, object> options` is provided by the KamiYomu Application and can be viewed on the Crawler Agent Edit page. You can define form fields that users can modify, and these values will be received by your agent.

#### Default Options

The following default options are available:

- **KamiYomuILogger**: For logging purposes. Access via the `Logger` property for debugging and monitoring.
- **BrowserUserAgent**: The user agent string used for HTTP requests. Access via the `HttpClientDefaultUserAgent` property for HTTP and browser requests.
- **HttpClientTimeout**: The maximum duration for executing an HTTP task.  Access via the `TimeoutMilliseconds` property to control task execution duration.

#### Additional Options

You can extend the `options` dictionary with more values using `Crawler Inputs` as needed for your specific implementation.

## Step 3: Reference Implementations

Choose based on your data source:

- Web API consumption

[![KamiYomu/KamiYomu.CrawlerAgents.MangaDex- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.MangaDex&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.MangaDex/)

- Web scraping

[![KamiYomu/KamiYomu.CrawlerAgents.MangaKatana- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.MangaKatana&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.MangaKatana/)

[![KamiYomu/KamiYomu.CrawlerAgents.MangaFire- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.MangaFire&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.MangaFire/)


## Step 4: Build & Deploy

1. Build your project in Debug mode (generates `.nupkg`)
2. Navigate to KamiYomu **Crawler Agents** section
3. Import the `.nupkg` from `bin/Debug`
4. Publish to NuGet.org (optional)

## Debugging Your Agent

### Configure Debug Build

Your `.csproj` already includes symbol generation. Build in Debug mode to generate `.pdb` files.

### Import & Copy Symbols

1. Import the `.nupkg` into KamiYomu
2. Copy the `.pdb` file to: `src\AppData\agents\{agent-name}\lib\net8.0\`

### Debug Breakpoints

- Set breakpoints in `CrawlerAgentDecorator.cs` (KamiYomu.Web)
- Step into agent method calls to debug your implementation

> **Tip**: Use the Validator console app to verify your agent before deployment.

## Crawler Inputs

Use `Crawler Inputs` to let users provide custom configuration values to your agent. These values are passed through the `options` dictionary in your constructor.

### Available Input Types

| Type | Purpose | Usage |
|------|---------|-------|
| **CrawlerText** | Single-line text input | API keys, URLs, usernames |
| **CrawlerPassword** | Masked password input | Sensitive credentials |
| **CrawlerSelect** | Dropdown selection | Language, quality preferences |
| **CrawlerCheckBox** | Multiple toggleable options | Feature flags, preferences |

### Example Implementation

```csharp
[DisplayName("My Wonderful Crawler Agent")]
[CrawlerSelect("Language", "Select language", true, "en", 1, ["en", "pt_br", "pt"])]
[CrawlerText("ApiKey", "API Key", true, "", 2)]
[CrawlerPassword("ApiSecret", "API Secret", "", 3)]
[CrawlerCheckBox("Features", "Enable features", true, "cache", 4, ["cache", "notifications", "logging"])]
public class MyCrawlerAgent : AbstractCrawlerAgent, ICrawlerAgent, IDisposable
{
  public MyCrawlerAgent(IDictionary<string, object> options) : base(options)
  {
    var language = options["Language"] as string; // "en"
    var apiKey = options["ApiKey"] as string;
    var secret = options["ApiSecret"] as string;
    var cacheEnabled = bool.Parse(options["Features.cache"].ToString());
    var notificationsEnabled = bool.Parse(options["Features.notifications"].ToString());
  }
}
```

### Attribute Parameters

Each attribute requires:
1. **Key name** - Dictionary key for retrieving the value
2. **Display label** - User-friendly field name
3. **Required** (optional) - Whether field is mandatory
4. **Default value** - Initial value shown to users
5. **Order** - Display sequence in the UI
6. **Options** (for Select/CheckBox) - Available choices






