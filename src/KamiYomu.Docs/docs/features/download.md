---
title: Download
parent: Features
---

# Download

The download screen allows you to select a crawler agent and search for manga by name. The search uses the crawler agent's `Search` method to identify available manga for download. Note that some results may be hidden due to [family safe mode]({% link docs/features/family-safe-mode.md %}).

<img src="{{ '/assets/tutorial/search-mangas.gif' | relative_url }}" height="300"/>

Results are displayed with infinite scroll pagination (simply scroll down to load more manga).

{% capture download_status_note %}
{% include note-download-status.md %}
{% endcapture %}
{{ download_status_note | markdownify }}

