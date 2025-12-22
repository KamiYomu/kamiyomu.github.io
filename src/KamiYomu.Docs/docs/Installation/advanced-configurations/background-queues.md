---
title: Background Queues
parent: Advanced Configurations
nav_order: 2
---

# Background Queues

KamiYomu uses **Hangfire queues** to organize and distribute background jobs across different workers.  
By assigning jobs to specific queues, KamiYomu can process multiple tasks in parallel, isolate heavy workloads, and prevent different job types from blocking each other.

---

## How Hangfire Queues Work

Hangfire uses a queue‑based model to decide **which jobs run where**:

- Each background server ([logical server]({{ 'docs/installation/advanced-configurations/logical-servers' | relative_url }})) listens to one or more **named queues**.
- Jobs are pushed into queues based on their assigned category.
- A server will only process jobs from the queues it is configured to listen to.
- If multiple servers listen to the same queue, Hangfire automatically load‑balances jobs between them.
- If a queue has no available server, its jobs will wait until a server becomes available.

This design allows KamiYomu to scale horizontally, isolate workloads, and avoid bottlenecks.

### Why Multiple Queues Matter

Using multiple queues lets you:

- Prevent long‑running tasks from blocking fast tasks  
- Increase throughput by distributing work across multiple workers  
- Control priority (Hangfire processes queues in the order they are listed)  
- Scale specific workloads independently (e.g., chapter downloads vs. discovery tasks)

---

# Background Queue Configuration

KamiYomu exposes several queue groups through environment variables.  
Each group represents a type of workload, and you can add more queues by incrementing the index.

---

## Worker__DownloadChapterQueues

Queues dedicated to **downloading individual chapters**.

Add more entries using incrementing indexes:

- `Worker__DownloadChapterQueues__0`
- `Worker__DownloadChapterQueues__1`
- `Worker__DownloadChapterQueues__2`
- ...

Use multiple queues if you want to download many chapters in parallel without blocking other tasks.

### Example

```yml
    environment:
        Worker__DownloadChapterQueues__0: "download-chapter-1"
        Worker__DownloadChapterQueues__1: "download-chapter-2"
        Worker__DownloadChapterQueues__2: "download-chapter-3"
```

## Worker__MangaDownloadSchedulerQueues

Queues dedicated to scheduling manga downloads, which then enqueue chapter‑download jobs.
Add more entries using incrementing indexes:
- Worker__MangaDownloadSchedulerQueues__1
- Worker__MangaDownloadSchedulerQueues__2
Use multiple queues if you want to schedule many manga updates simultaneously.

### Example

```yml
    environment:
        Worker__MangaDownloadSchedulerQueues__0: "manga-download-scheduler-1"
        Worker__MangaDownloadSchedulerQueues__1: "manga-download-scheduler-2"
        Worker__MangaDownloadSchedulerQueues__2: "manga-download-scheduler-3"
```

## Putting It All Together

Here’s an example of a multi‑queue setup combining all queue types:

In this configuration:
- Two queues handle chapter downloads
- One queue handles manga scheduling
- Two queues handle chapter discovery
This allows KamiYomu to process discovery, scheduling, and downloading tasks simultaneously without interfering with each other.

```yml
environment:
  Worker__DownloadChapterQueues__0: "download-1"
  Worker__DownloadChapterQueues__1: "download-2"

  Worker__MangaDownloadSchedulerQueues__0: "scheduler-1"

  Worker__DiscoveryNewChapterQueues__0: "discovery-1"
  Worker__DiscoveryNewChapterQueues__1: "discovery-2"
```

By defining multiple queues and assigning them to your logical servers, you gain fine‑grained control over how KamiYomu distributes work, scales background processing, and avoids bottlenecks.


{% capture docker_full_example_note %}
{% include note-docker-full-example.md %}
{% endcapture %}
{{ docker_full_example_note | markdownify }}