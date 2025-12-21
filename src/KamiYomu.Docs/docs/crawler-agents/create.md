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

## Prerequisites

- .NET 8.0 SDK or later
- Visual Studio, VS Code, or preferred C# IDE
- NuGet package: `KamiYomu.CrawlerAgents.Core` (v1.1.4+)

## Step 1: Project Setup

### Create and Configure Project

1. Create a new **Class Library** project targeting **.NET 8.0**
2. Add the NuGet package dependency:

  ```bash
  dotnet add package KamiYomu.CrawlerAgents.Core --version 1.1.4
  ```
[![KamiYomu/KamiYomu.CrawlerAgents.Core- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.Core&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.Core/)

3. Configure your `.csproj` file with required metadata:

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
{: .warning }
> **⚠️ Important**: Include `kamiyomu-crawler-agents` in `<PackageTags>` to enable KamiYomu discovery.
{: .warning }


The project file (`.csproj`) includes the package `KamiYomu.CrawlerAgents.Core`.

`KamiYomu.CrawlerAgents.Core` natively references `PuppeteerSharp`, which can be used to create and control a Chromium browser instance.

The default Chromium installation configuration is available in the project's [Dockerfile](https://github.com/KamiYomu/KamiYomu/blob/main/src/KamiYomu.Web/Dockerfile)

Web scraping can be performed using the `HtmlAgilityPack` library. We recommend reviewing the existing crawler agents to understand how to construct the core objects: `PagedResult<T>`, `Manga`, `Chapter`, and `Page`.


## Step 2: Implement the ICrawlerAgent Interface

### Required Interface

Your agent must implement `AbstractCrawlerAgent`, `ICrawlerAgent`, and `IDisposable`:

```csharp
public interface ICrawlerAgent : IDisposable
{
   /// <summary>Retrieves the favicon URI of the target site.</summary>
   Task<Uri> GetFaviconAsync(CancellationToken cancellationToken);

   /// <summary>Searches for manga titles matching the query.</summary>
   Task<PagedResult<Manga>> SearchAsync(
      string titleName, 
      PaginationOptions paginationOptions, 
      CancellationToken cancellationToken);

   /// <summary>Retrieves detailed manga information by ID.</summary>
   Task<Manga> GetByIdAsync(string id, CancellationToken cancellationToken);

   /// <summary>Retrieves chapters for a manga.</summary>
   Task<PagedResult<Chapter>> GetChaptersAsync(
      Manga manga, 
      PaginationOptions paginationOptions, 
      CancellationToken cancellationToken);

   /// <summary>Retrieves page images for a chapter.</summary>
   Task<IEnumerable<Page>> GetChapterPagesAsync(
      Chapter chapter, 
      CancellationToken cancellationToken);
}
```

### Basic Implementation Template

```csharp
[DisplayName("My Wonderful Crawler Agent")]
public class MyCrawlerAgent : AbstractCrawlerAgent, ICrawlerAgent, IDisposable
{
   public MyCrawlerAgent(IDictionary<string, object> options) 
      : base(options)
   {
      // Initialize your agent with options
   }

   public Task<Uri> GetFaviconAsync(CancellationToken cancellationToken)
   {
      throw new NotImplementedException();
   }

   public Task<PagedResult<Manga>> SearchAsync(
      string titleName, 
      PaginationOptions paginationOptions, 
      CancellationToken cancellationToken)
   {
      throw new NotImplementedException();
   }

   // Implement remaining interface members...
}
```

### Understanding the Options Dictionary

The `IDictionary<string, object> options` parameter contains configuration passed from the KamiYomu application. Users can modify these values on the Crawler Agent configuration page.

#### Built-in Options

| Option | Property | Description |
|--------|----------|-------------|
| **KamiYomuILogger** | `Logger` | Logging interface for debugging and monitoring |
| **BrowserUserAgent** | `HttpClientDefaultUserAgent` | HTTP user agent string for requests |
| **HttpClientTimeout** | `TimeoutMilliseconds` | HTTP timeout in milliseconds |

#### Custom Options

Add custom configuration fields using **Crawler Inputs** (see Step 3 below).

## Step 3: Add Configuration Inputs

### Crawler Input Types

| Type | Use Case | Example |
|------|----------|---------|
| **CrawlerText** | Single-line text | API keys, URLs, usernames |
| **CrawlerPassword** | Sensitive data | Passwords, API secrets |
| **CrawlerSelect** | Dropdown choices | Language, quality settings |
| **CrawlerCheckBox** | Multiple toggles | Feature flags, preferences |

### Attribute Declaration Syntax

```csharp
[CrawlerInputType(
   "fieldKey",           // Dictionary key
   "Display Label",      // User-facing label
   required,             // Is mandatory?
   "defaultValue",       // Initial value
   displayOrder,         // UI position
   ["option1", "option2"] // Available options (Select/CheckBox only)
)]
```

### Complete Example

```csharp
[DisplayName("My Wonderful Crawler Agent")]
[CrawlerSelect("Language", "Select language", true, "en", 1, new[] { "en", "pt_br", "pt" })]
[CrawlerText("ApiKey", "API Key", true, "", 2)]
[CrawlerPassword("ApiSecret", "API Secret", false, "", 3)]
[CrawlerCheckBox("Features", "Enable features", true, new[] { "cache" }, 4, 
   new[] { "cache", "notifications", "logging" })]
public class MyCrawlerAgent : AbstractCrawlerAgent, ICrawlerAgent, IDisposable
{
   public MyCrawlerAgent(IDictionary<string, object> options) : base(options)
   {
      // Access configuration values
      var language = options["Language"] as string;        // "en"
      var apiKey = options["ApiKey"] as string;
      var secret = options["ApiSecret"] as string;
      var cacheEnabled = (options["Features.cache"] as string)?.ToLower() == "true";
   }
}
```

## Step 4: Build and Deploy

### Local Build

1. Build your project in **Debug** mode:
  ```bash
  dotnet build --configuration Debug
  ```
  This generates a `.nupkg` package in `bin/Debug`

2. Navigate to KamiYomu's **Crawler Agents** section
3. Import the `.nupkg` file

### Publish to NuGet (Optional)

```bash
dotnet nuget push bin/Release/*.nupkg --api-key YOUR_API_KEY --source https://api.nuget.org/v3/index.json
```

## Step 6: Debug Your Agent

### Enable Debug Symbols

Your `.csproj` already configures symbol generation. When building in Debug mode, `.pdb` files are created.

### Import and Configure Debugging

1. Import your `.nupkg` into KamiYomu
2. Copy the `.pdb` file to:
  ```
  src/AppData/agents/{agent-name}/lib/net8.0/
  ```

3. Open `CrawlerAgentDecorator.cs` in KamiYomu.Web and set breakpoints
4. Step through agent method calls to trace execution

### Testing

Use the **Validator** console application to verify your agent before production deployment.


## Reference Implementations

### Web API Consumption

For APIs like MangaDex:

[![KamiYomu/KamiYomu.CrawlerAgents.MangaDex- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.MangaDex&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.MangaDex/)

### Web Scraping

For HTML-based sources:

[![KamiYomu/KamiYomu.CrawlerAgents.MangaKatana- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.MangaKatana&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.MangaKatana/)

[![KamiYomu/KamiYomu.CrawlerAgents.MangaFire- GitHub](https://github-readme-stats.vercel.app/api/pin/?username=KamiYomu&repo=KamiYomu.CrawlerAgents.MangaFire&show_icons=true&theme=tokyonight&border_radius=8&hide_border=true&description_lines_count=3)](https://github.com/KamiYomu/KamiYomu.CrawlerAgents.MangaFire/)



## Example of Constructor

Example of how to initialize the crawler agent

```csharp
public class YourCrawlerAgent : AbstractCrawlerAgent, ICrawlerAgent
{
    // Tracks whether the object has already been disposed
    private bool _disposed = false;

    // Base URL of the website your crawler will target
    private readonly Uri _baseUri;

    // Lazy-initialized Chromium browser instance (PuppeteerSharp)
    // Browser is only created when first requested
    private Lazy<Task<IBrowser>> _browser;

    // Timezone used when emulating the browser environment
    private readonly string _timezone;

    public YourCrawlerAgent(IDictionary<string, object> options) : base(options)
    {
        _baseUri = new Uri("https://YourCrawlerWebSite.com");

        // Lazy initialization ensures the browser is created only when needed
        _browser = new Lazy<Task<IBrowser>>(CreateBrowserAsync, true);

        // PuppeteerSharp requires different timezone identifiers depending on OS
        _timezone = RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
            ? "Eastern Standard Time"
            : "America/New_York";
    }

    // Returns the browser instance, creating it if necessary
    public Task<IBrowser> GetBrowserAsync() => _browser.Value;

    // Creates and launches a headless Chromium instance
    private async Task<IBrowser> CreateBrowserAsync()
    {
        var launchOptions = new LaunchOptions
        {
            Headless = true,
            Timeout = TimeoutMilliseconds,
            Args =
            [
                "--disable-blink-features=AutomationControlled", // Helps avoid bot detection
                "--no-sandbox",                                  // Required in many container environments
                "--disable-dev-shm-usage"                        // Prevents crashes in low-shared-memory systems
            ]
        };

        return await Puppeteer.LaunchAsync(launchOptions);
    }

    // Prepares a Puppeteer page before navigation:
    // - Logs console output
    // - Neutralizes bot-detection scripts
    // - Freezes time
    // - Sets timezone
    private async Task PreparePageForNavigationAsync(IPage page)
    {
        // Capture browser console logs for debugging
        page.Console += (sender, e) =>
        {
            Logger?.LogDebug($"[Browser Console] {e.Message.Type}: {e.Message.Text}");

            // Log console arguments if present
            if (e.Message.Args != null)
            {
                foreach (var arg in e.Message.Args)
                {
                    Logger?.LogDebug($"   Arg: {arg.RemoteObject.Value}");
                }
            }
        };

        // Inject JavaScript BEFORE any page scripts run
        // Helps bypass simple anti-bot checks
        await page.EvaluateExpressionOnNewDocumentAsync(@"
                // Neutralize devtools detection
                const originalLog = console.log;
                console.log = function(...args) {
                    if (args.length === 1 && args[0] === '[object HTMLDivElement]') {
                        return; // skip detection trick
                    }
                    return originalLog.apply(console, args);
                };

                // Override reload to do nothing
                window.location.reload = () => console.log('Reload prevented');
            ");

        // Set the browser's timezone
        await page.EmulateTimezoneAsync(_timezone);

        // Freeze time to the current system time
        var fixedDate = DateTime.Now;
        var fixedDateIso = fixedDate.ToString("yyyy-MM-ddTHH:mm:ssZ", CultureInfo.InvariantCulture);

        await page.EvaluateExpressionOnNewDocumentAsync($@"
                // Freeze time to a specific date
                const fixedDate = new Date('{fixedDateIso}');
                Date = class extends Date {
                    constructor(...args) {
                        if (args.length === 0) {
                            return fixedDate;
                        }
                        return super(...args);
                    }
                    static now() {
                        return fixedDate.getTime();
                    }
                };
            ");
    }

    // Standard .NET dispose pattern
    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
            return;

        if (disposing)
        {
            // Dispose browser only if it was created
            if (_browser.IsValueCreated)
            {
                var browserTask = _browser.Value;
                if (browserTask.IsCompletedSuccessfully)
                {
                    browserTask.Result.Dispose();
                }
            }
        }

        _disposed = true;
    }

    // Finalizer (only needed if unmanaged resources exist)
    ~YourCrawlerAgent()
    {
        Dispose(disposing: false);
    }

    // Public Dispose method for releasing resources deterministically
    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }
}
```




