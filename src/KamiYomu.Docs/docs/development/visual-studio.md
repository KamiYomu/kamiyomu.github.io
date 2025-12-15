---
title: Visual Studio Setup
parent: Development
nav_order: 3
---

# Visual Studio Code Setup

## Requirements
- Docker: [Download here](https://www.docker.com/get-started)
- Visual Studio: [Download here](https://visualstudio.microsoft.com/downloads/)
- .NET 8 SDK: [Download here](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

{% capture clone_repo_note %}
{% include note-clone-repo.md %}
{% endcapture %}
{{ clone_repo_note | markdownify }}

- Open the solution in Visual Studio in `/src/KamiYomu.sln`
- Set `docker-compose` project as **startup project** (Right-click on `docker-compose` project, select `Set As Startup Project.`).
- Run it