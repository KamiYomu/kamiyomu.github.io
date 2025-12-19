---
title: Crawler Agents
parent: Features
---

# Crawler Agents

{% capture crawler_agent_note %}
{% include note-crawler-agents.md %}
{% endcapture %}
{{ crawler_agent_note | markdownify }}

This screen shows the list of insteled crawler agents in your KamiYomu instance. This can be used for managing their instance, such as edit the metadata, see the metadata and delete the crawler agent. 

{: .danger}
> Consider delete all collection that uses your crawler agent that you want to delete before remove a crawler agent
> Otherwise some exception could come up. 
{: .danger}

## Add Crawler Agents Manually

Crawler Agents can be imported using either a .dll file or a NuGet package file (.ngpkg). If the import is successful, the crawler agent configuration fields will be displayed.

{: .warning }
> **Warning:** It is recommended to use the add-ons installation approach instead of installing manually. This method is particularly useful if you are creating your own crawler agents and wish to debug them.
{: .warning }

### Default Fields

1. **Display Name**: This is the user-friendly name for the crawler agent. Modify this according to your intention and identification.
   
2. **Browser User Agent**: The default value is `KamiYomu-Agent/1.0 (Unix; x64)`. This can be changed at any time and serves as an identifier for your instance of the crawler agent on the internet.
   
3. **HTTP Client Timeout**: The default waiting time is `60000` milliseconds. This setting determines the maximum time to wait for a download to complete or for any HTTP request.

### Additional Information

Each crawler agent has its own specific fields and configuration options. Please refer to their documentation or the descriptions available on the screen for more details.

