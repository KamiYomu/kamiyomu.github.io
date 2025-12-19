---
title: Add-ons
parent: Features
---

# Add-ons

<img src="{{ '/assets/tutorial/install-add-ons.gif' | relative_url }}" height="300"/>

The KamiYomu platform supports add-ons that extend functionality and customize your manga crawling experience. Add-ons can introduce new manga sources, implement features, or modify existing behavior.

## Installing Add-ons

Install add-ons through the KamiYomu interface:

1. Navigate to **Add-ons**
2. Browse available add-ons
3. Click **Install**

Alternatively, manually place add-on files in the designated add-ons directory.

## Managing Add-ons

From the **Add-ons** section, you can:
- Enable or disable add-ons
- Configure add-on settings
- Uninstall add-ons

{: .warning }
> **Community add-ons are not officially supported.**
> 
> Before installing:
> - Review the source code in its public repository
> - Verify it is open source
> - Confirm the source is trusted and available
> 
> Community add-ons may access unofficial sources, contain unreviewed code, or pose security risks. KamiYomu assumes no responsibility for their functionality, safety, or legality.
{: .warning }

## Adding Sources

A source is a NuGet server your crawler agents use.

**Required fields:**
- **Display Name**: The name shown in the KamiYomu interface
- **URL**: The NuGet server endpoint

**Common endpoints:**
- `https://api.nuget.org/v3/index.json` (NuGet.Org)
- `https://baget.kamiyomu.com/v3/index.json` (KamiYomu BaGet)
- `https://nuget.pkg.github.com/KamiYomu/index.json` (KamiYomu GitHub)

**Optional fields** (required if authentication is needed):
- **Username**: NuGet server username
- **Password / API Key**: Authentication key

### GitHub Packages

To use GitHub Packages:

1. Create a [personal access token](https://github.com/settings/tokens) with `read:packages` scope
2. Enter your GitHub username in **Username**
3. Paste the token in **Password / API Key**
4. Click **Save**

