---
title: Install via docker
parent: Getting Started
nav_order: 1
---

# Installation

## Requirements

- [Docker](https://www.docker.com/get-started)

{% capture docker_note %}
{% include note-docker.md %}
{% endcapture %}
{{ docker_note | markdownify }}

## Docker Compose

Save the following `docker-compose.yml` file to run KamiYomu with Docker:

```yml
services:
  kamiyomu:
    image: marcoscostadev/kamiyomu:latest # Check releases for latest versions
    ports:
      - "8080:8080" # HTTP Port
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/healthz"]
      interval: 30s
      timeout: 10s
    volumes:
      - manga_storage:/manga 
      - database_storage:/db 
      - logs_storage:/logs 
      - crawler_agents:/agents 

volumes:
  manga_storage:
  database_storage:
  logs_storage:
  crawler_agents:
```

In the folder where you saved the `docker-compose.yml` file, run:

```bash
    docker-compose up -d
```
You will have access to the web interface at `http://localhost:8080`.
Keep in mind to map the volumes to your desired local paths. 
See the releases branchs for identifying the versions available.

## Default Directories

### 📖 Manga Directory

- `/manga` 

KamiYomu uses the directory `/manga` inside its container as the default location for all downloaded manga files (.cbz).

The most common usage is to share this download directory directly with a reader application like Kavita using a Docker Volume.

**Key Concept: Shared Volumes**
In your Docker Compose setup, the volumes section ensures both services access the same data:

KamiYomu is assigned the `/manga` directory to download files into.

Kavita is assigned the same `/manga` directory to read and serve those same files.

This synchronization is achieved by mapping the containers to a single persistent storage location.

**Redirection Options**
To control where the files live on your computer (the host machine), you adjust the volume mapping:

> Shared Named Volume (Recommended for Stability): The files are managed by Docker.

YAML

```yml
# Both services access a volume named 'manga_storage'
volumes:
  - manga_storage:/manga 
```

> Host Bind Mount (Recommended for Access): The files are saved directly to a folder you specify on your host machine.

YAML
```yml
# Both services access your local folder /path/to/my/manga
volumes:
  - /path/to/my/manga:/manga
```


**Full Example file (Integration with Kavita)**

```yml
services:
  kamiyomu:
    image: marcoscostadev/kamiyomu:latest
    container_name: kamiyomu
    # Use the shared network
    networks:
      - manga_network
    ports:
      - "8080:8080"
    # Map the shared volume to KamiYomu's internal path
    volumes:
      - manga_storage:/manga # KamiYomu needs write access to save downloads
      - database_storage:/db 
      - logs_storage:/logs 
      - crawler_agents:/agents 
    restart: unless-stopped
    
  kavita:
    image: jvmilazz0/kavita:latest 
    container_name: kavita
    # Use the shared network
    networks:
      - manga_network
    environment:
      - TZ=America/Toronto
      - DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true
    volumes:
      # Map the dedicated config volume
      - kavita_config_data:/kavita/config 
      # Map the shared volume to Kavita's internal path
      # Kavita needs read access to serve the files
      - manga_storage:/manga 
    ports:
      - "5000:5000" 
    restart: unless-stopped
    
volumes:
  kavita_config_data: # For persistent Kavita settings (users, database)
  manga_storage:      # Shared volume for manga files
  database_storage:   # volume for KamiYomu database files
  logs_storage:       # volume for KamiYomu logs
  crawler_agents:     # volume for KamiYomu crawler agents
networks:
  manga_network:
    driver: bridge # Default Docker bridge network

```

## ⚙️ Agents Directory

- `/agents`

This directory is used internally by KamiYomu to store and manage its installed **crawler agents**, which contain the specific configurations and logic necessary for downloading content.

### Persistence Note (Recommended)

To ensure that your installed agents and their configurations are **not lost** when the container is updated or deleted, it is **strongly recommended** that you map this directory to a persistent Docker volume.

### Example Mapping

```yaml
# In your kamiyomu service volumes:
volumes:
  - ./kamiyomu_agents_data:/agents # Maps a local folder to the container's /agents path

```
## 💾 Database Directory

- `/db`

This directory is where KamiYomu stores and manages its internal **database files**. This includes critical data like your download history, application settings, and user configuration.

### Persistence Note (Crucial)

Since this folder holds all of your long-term application data, it is **crucial** that you map this directory to a persistent Docker volume. If you do not map it, all your history and settings will be **lost** every time the container is recreated or updated. 

### Example Mapping

```yaml
# In your kamiyomu service volumes:
volumes:
  - ./kamiyomu_db_data:/db # Maps a local folder to the container's /db path for persistence
```

## 📜 Logs Directory

- `/logs`

This directory is where KamiYomu writes all of its application log files. These files track operations, errors, warnings, and diagnostic information needed for monitoring application health.

### Persistence Note (Optional/Debugging)

It is **not mandatory** to map this directory to a Docker volume, as the application will function correctly without log persistence. However, mapping it is **highly recommended** if you are:

* **Troubleshooting:** Need to review historical errors or events after a container crash or restart.
* **Monitoring:** Using external tools to scrape the logs for analysis.

If you choose not to map it, log history will be lost when the container is replaced.

### Example Mapping

```yaml
# In your kamiyomu service volumes:
volumes:
  - ./kamiyomu_logs_data:/logs # Maps a local folder to the container's /logs path for historical review
```

## Enverionment Variables

```yml
services:
  kamiyomu:
    image: marcoscostadev/kamiyomu:latest # Check releases for latest versions
    ports:
      - "8080:8080" # HTTP Port
    environment:
        Worker__ServerAvailableNames__0:   "KamiYomu-background-1" 
        Worker__DownloadChapterQueues__0:  "download-chapter-queue-1" 
        Worker__MangaDownloadSchedulerQueues__0:  "manga-download-scheduler-queue-1" 
        Worker__DiscoveryNewChapterQueues__0:  "discovery-new-chapter-queue-1" 
        Worker__WorkerCount: 1
        Worker__MaxConcurrentCrawlerInstances: 1
        Worker__MinWaitPeriodInMilliseconds: 3000
        Worker__MaxWaitPeriodInMilliseconds: 9001
        Worker__MaxRetryAttempts: 10
        UI__DefaultLanguage: "en" 
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/healthz"]
      interval: 30s
      timeout: 10s
    volumes:
      - manga_storage:/manga 
      - database_storage:/db 
      - logs_storage:/logs 
      - crawler_agents:/agents 

volumes:
  manga_storage:
  database_storage:
  logs_storage:
  crawler_agents:
```

- **Worker__ServerAvailableNames__0**

List of Hangfire server identifiers available to process jobs.
Each name corresponds to a distinct background worker instance;
add more entries here if you want multiple servers to share or divide queues.
add more entries using incrementing indexes (e.g., Worker__ServerAvailableNames__1, Worker__ServerAvailableNames__2, etc.)

- **Worker__DownloadChapterQueues__0**

Queues dedicated to downloading individual chapters.
add more entries using incrementing indexes (e.g., Worker__DownloadChapterQueues__1, Worker__DownloadChapterQueues__2, etc.)

- **Worker__MangaDownloadSchedulerQueues__0**

Queues dedicated to scheduling manga downloads (manages chapter download jobs).
add more entries using incrementing indexes (e.g., Worker__MangaDownloadSchedulerQueues__1 Worker__MangaDownloadSchedulerQueues__2, etc.)

- **Worker__DiscoveryNewChapterQueues__0**

Queues dedicated to discovering new chapters (polling or scraping for updates).
add more entries using incrementing indexes (e.g., Worker__DiscoveryNewChapterQueues__1, Worker__DiscoveryNewChapterQueues__2, etc.)

- **Worker__WorkerCount**

Specifies the number of background processing threads Hangfire will spawn.
Increasing this value allows more jobs to run concurrently, but also raises CPU load 
and memory usage.
Each worker consumes ~80 MB of memory on average while active 
(actual usage may vary depending on the crawler agent implementation and system configuration).

- **Worker__MaxConcurrentCrawlerInstances**

Defines the maximum number of crawler instances allowed to run concurrently for the same source.
Typically set to 1 to ensure only a single crawler operates at a time, preventing duplicate work,
resource conflicts, and potential rate‑limiting or blocking by the target system.
This value can be increased to improve throughput if the source supports multiple concurrent requests.
Note:
- Worker__WorkerCount controls the total number of threads available.
- Worker__MaxConcurrentCrawlerInstances limits how many threads can be used by the same crawler.
Examples:
- If Worker__MaxConcurrentCrawlerInstances = 1 and Worker__WorkerCount = 4,
  then up to 4 different crawler agents can run independently.
- If Worker__MaxConcurrentCrawlerInstances = 2 and Worker__WorkerCount = 6,
  then each crawler agent can run up to 2 instances concurrently,
  while up to 3 different crawler agents may be active at the same time.

- **Worker__MinWaitPeriodInMilliseconds**

Minimum delay (in milliseconds) between job executions.
Helps throttle requests to external services and avoid hitting rate limits (e.g., HTTP 423 "Too Many Requests").

- **Worker__MaxWaitPeriodInMilliseconds**

Maximum delay (in milliseconds) between job executions.
Provides variability in scheduling to reduce the chance of IP blocking or service throttling.

- **Worker__MaxRetryAttempts**

 Maximum number of retry attempts for failed jobs before marking them as permanently failed.

- **UI__DefaultLanguage**

 Default language for the web interface (e.g., "en", "pt-BR", "fr").