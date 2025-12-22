---
title: Concurrency
parent: Advanced Configurations
nav_order: 1
---

# Concurrency

KamiYomu provides several concurrency-related settings that allow you to fine‑tune how many background tasks and crawler agents instances can run in parallel. These options can be configured directly through your Docker Compose environment variables.

---

## Worker__WorkerCount

Defines the total number of background processing threads that Hangfire will spawn.

- Increasing this value allows more jobs to run concurrently.
- Higher concurrency also increases CPU usage and memory consumption.
- Each worker thread typically consumes around 20~50 MB of memory while active  
  (actual usage may vary depending on the crawler agent and system environment).

Use this setting to scale overall throughput based on your server’s available resources.

---

## Worker__MaxConcurrentCrawlerInstances

Specifies the maximum number of crawler instances that may run **simultaneously for the same source**.

- Commonly set to `1` to ensure only one crawler operates per source at a time.  
  This avoids duplicate work, race conditions, and potential rate‑limiting or blocking by the target site.
- You may increase this value if the source supports parallel requests and you want higher throughput.

### Important Notes

- **Worker__WorkerCount** controls the *total* number of worker threads available.
- **Worker__MaxConcurrentCrawlerInstances** limits how many of those threads can be used by a *single crawler type*.

### Examples

- **Worker__MaxConcurrentCrawlerInstances = 1**  
  **Worker__WorkerCount = 4**  
  → Up to 4 different crawler agents can run at the same time, but each agent runs only one instance.

- **Worker__MaxConcurrentCrawlerInstances = 2**  
  **Worker__WorkerCount = 6**  
  → Each crawler agent may run up to 2 instances concurrently,  
    and up to 3 different crawler agents can be active simultaneously.

---

These settings allow you to balance performance, resource usage, and source‑specific constraints to best fit your deployment environment.


{% capture docker_full_example_note %}
{% include note-docker-full-example.md %}
{% endcapture %}
{{ docker_full_example_note | markdownify }}