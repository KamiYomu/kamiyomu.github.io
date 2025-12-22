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

{% capture docker_full_example_note %}
{% include note-docker-full-example.md %}
{% endcapture %}
{{ docker_full_example_note | markdownify }}





