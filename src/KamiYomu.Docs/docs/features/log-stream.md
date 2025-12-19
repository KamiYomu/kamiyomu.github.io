---
title: Log Stream
parent: Features
---

# Log Stream

KamiYomu logs all actions to provide visibility into operation progress and facilitate troubleshooting. The log stream displays **Info**, **Warning**, **Error**, and **Fatal** level logs.

For detailed diagnostics including **Debug** level messages, use Docker container logs:

```bash
docker logs --follow kamiyomu
```

{: .note }
> **Note:** Replace `kamiyomu` with your actual container name if different.
{: .note }

# System Information

The system information table displays details that can help when sharing issues on GitHub or understanding how KamiYomu will operate. Key information includes processor count, which influences Hangfire's `WorkerCount` setting for concurrent job execution.

| Property | Value | Description |
|----------|-------|-------------|
| Processor Count | 4 | Number of logical processors available. Used as a baseline for Hangfire's `WorkerCount` setting to control concurrent job execution. |
| Machine Name | namemachine | Unique identifier for the machine running KamiYomu. |
| Operational System Version | Unix 6.12.34.8 / x86_64 / ARM / any other | The operating system and kernel version. |
| Framework Version | .NET 8.0.22 | The .NET runtime version. |
| Architecture | Arm64 / x86 / x64 / any other | The processor architecture. |
| Current Directory | /app | The working directory of the application. |
