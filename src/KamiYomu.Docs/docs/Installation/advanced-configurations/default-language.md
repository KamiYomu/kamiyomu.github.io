---
title: Default Language
parent: Advanced Configurations
---

# Default Language

- **UI__DefaultLanguage**

Defines the default language used by the KamiYomu web interface during application startup  
(e.g., "en", "pt-BR", "fr").

This setting only determines the **initial** language shown when the application first loads.  
Users can freely change the interface language later through the UI without restarting the service.


{% capture docker_full_example_note %}
{% include note-docker-full-example.md %}
{% endcapture %}
{{ docker_full_example_note | markdownify }}