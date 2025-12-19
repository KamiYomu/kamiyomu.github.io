---
title: Add-ons
parent: Features
---

# Add-ons

<img src="{{ '/assets/tutorial/install-add-ons.gif' | relative_url }}" height="300"/>

The KamiYomu platform supports a variety of add-ons that enhance its functionality and allow users to customize their manga crawling experience. Add-ons can provide support for additional manga sources, implement new features, or modify existing behavior.

## Installing Add-Ons
Add-ons can be installed through the KamiYomu interface or manually by placing the add-on files in the designated add-ons directory. To install an add-on via the interface, navigate to the "Add-Ons" section, browse the available add-ons, and click "Install" on the desired add-on.

## Managing Add-Ons
Once installed, add-ons can be managed from the "Add-Ons" section of the KamiYomu interface. Users can enable or disable add-ons, configure settings specific to each add-on, and uninstall add-ons that are no longer needed.


{: .warning }
> **Community add-ons are not officially supported.** 
> Before installing any add-on:
> - Review the source code in its public repository
> - Verify that it is open source
> - Avoid installing if the source is unavailable or untrusted
> 
> Community add-ons may access unofficial sources, contain unreviewed code, or pose security/privacy risks. KamiYomu assumes no responsibility for their functionality, safety, or legality.

## Adding Sources

A source is a NuGet server that your crawler agents will use. Fill in the following fields:
**Required Fields:**
- **Display Name**: The name displayed in the KamiYomu interface
- **URL**: The NuGet server endpoint

Common endpoints:
- `https://api.nuget.org/v3/index.json` (NuGet.Org)
- `https://baget.kamiyomu.com/v3/index.json` (KamiYomu BaGet)
- `https://nuget.pkg.github.com/KamiYomu/index.json` (KamiYomu GitHub)
- Any other NuGet-compatible server


**Optional Fields** (recommended if your server requires authentication):
- **Username**: Username for the NuGet server
- **Password / API Key**: API key for authentication

### GitHub Packages
To use GitHub Packages as a source:
1. Create a [personal access token](https://github.com/settings/tokens) with the `read:packages` scope
2. Enter the token in the **Password / API Key** field
3. Enter your GitHub username in the **Username** field

Click **Save** to add the source.
