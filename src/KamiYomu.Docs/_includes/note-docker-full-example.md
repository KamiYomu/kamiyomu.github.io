
See below the full example of docker file with all applied configurations:

```yml
services:
  kamiyomu:
    image: marcoscostadev/kamiyomu:latest # Check releases for latest versions
    ports:
      - "8080:8080" # HTTP Port
    environment:
        Worker__WorkerCount: 4
        Worker__MaxConcurrentCrawlerInstances: 2
        Worker__MinWaitPeriodInMilliseconds: 3000
        Worker__MaxWaitPeriodInMilliseconds: 9001
        Worker__MaxRetryAttempts: 10
        Worker__ServerAvailableNames__0:   "KamiYomu-background-1" 
        Worker__DownloadChapterQueues__0:  "download-chapter-queue-1" 
        Worker__MangaDownloadSchedulerQueues__0:  "manga-download-scheduler-queue-1" 
        Worker__DiscoveryNewChapterQueues__0:  "discovery-new-chapter-queue-1" 
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