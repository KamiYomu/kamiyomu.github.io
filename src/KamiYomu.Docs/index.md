---
title: Getting Started
layout: home
nav_order: 1
---

# KamiYomu

<img src="{{ '/assets/images/logo.png' | relative_url }}" height="50"/>

**KamiYomu** is a powerful, extensible manga crawler built for manga enthusiasts who want full control over their collection. It scans and downloads manga from supported websites, stores them locally, and lets you host your own private manga reader—no ads, no subscriptions, no limits.

Whether you're cataloging rare series, powering a personal manga dashboard, or seeking a cleaner alternative to bloated online readers, KamiYomu puts you in control of how you access and organize manga content. It’s a lightweight, developer-friendly crawler built for clarity, extensibility, and respectful use of publicly accessible sources. Content availability and usage rights depend on the licensing terms of each source — KamiYomu simply provides the tools.


[![GitHub followers](https://img.shields.io/github/followers/kamiyomu)](https://github.com/orgs/KamiYomu/followers)
[![GitHub stars](https://img.shields.io/github/stars/kamiyomu/kamiyomu)](https://github.com/kamiyomu/kamiyomu/stargazers)
[![GitHub contributors](https://img.shields.io/github/contributors/kamiyomu/kamiyomu)](https://github.com/kamiyomu/kamiyomu/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/kamiyomu/kamiyomu)](https://github.com/kamiyomu/kamiyomu/issues)
[![GitHub License](https://img.shields.io/github/license/kamiyomu/kamiyomu)](https://github.com/kamiyomu/kamiyomu/blob/main/LICENSE)


---

## Community

Join the conversation and be part of the KamiYomu community:

[![Join the discussion on Github](https://img.shields.io/github/discussions/kamiyomu/kamiyomu?logo=github&label=Join%20the%20community)](https://github.com/KamiYomu/KamiYomu/discussions)

---

## ✨ Features

- 🔍 **Automated Crawling**  
  Fetch chapters from supported manga sites with ease.

- 💾 **Local Storage**  
  Keep your manga files on your own server or device.

- 🧩 **Plugin Architecture**  
  Add support for new sources or customize crawling logic.

- 🛠️ **Built with .NET Razor Pages**  
  Lightweight, maintainable, and easy to extend.



## ⚠️ What KamiYomu Does and Does Not

### ✅ Does

- Orchestrate and schedule crawler agent tasks (search, list, get, etc.)
- Download images from websites that the crawler agent specify
- Create local archives from downloaded images in specified folder location.
- Allow you to export archives as PDF, CBZ, or ZIP files to your local storage
- Provide a user-friendly web interface for managing your manga library.

### ❌ Does Not

- Invade sites or exploit vulnerabilities to access sensitive information
- Extract database, protected data information from websites
- Extract non-public information (such as website login credentials, API keys, etc)
- Store any files, data, or metadata on KamiYomu servers
- Track or monitor crawler activity across KamiYomu instances
- Enable peer-to-peer sharing or inter-instance communication
- Cache or retain downloaded content in KamiYomu servers
- Distribute, share, or redistribute downloaded content from KamiYomu instances to other users or platforms.

### User Responsibility and Disclaimer

By using KamiYomu, you agree that you are solely responsible for all downloaded content, file management, and usage. KamiYomu is provided as-is for local use only. The developers and maintainers of KamiYomu assume no responsibility for your use of this tool, including but not limited to compliance with copyright laws, licensing agreements, or the terms of service of any source websites. You assume full liability for any legal consequences arising from your use of KamiYomu.

## 📃 License


The KamiYomu project is licensed under the **AGPL-3.0 (Affero General Public License version 3.0)**. This license allows users to freely use, modify, and distribute the software, provided that any modified versions are also distributed under the same license. 

### Key Points of AGPL-3.0:
- **Freedom to Use**: Users can run the software for any purpose.
- **Freedom to Study and Modify**: Users can access the source code and modify it to suit their needs.
- **Freedom to Distribute Copies**: Users can share the original software with others.
- **Freedom to Distribute Modified Versions**: Users can distribute modified versions of the software, but they must also be licensed under AGPL-3.0, ensuring that the same freedoms are preserved for all users.

This license is particularly important for software that is intended to be run on servers, as it requires that the source code be made available to users who interact with the software over a network.

For more detailed information, please refer to the official AGPL-3.0 [license text](https://github.com/kamiyomu/kamiyomu/blob/main/LICENSE).
