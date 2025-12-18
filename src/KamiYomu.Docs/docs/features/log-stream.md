---
title: Log Stream
parent: Features
---

# Log Stream

Each action in KamiYomu produces logs that you can view in the log stream to track progress and troubleshoot issues. The log stream displays "Info", "Warning", "Error", and "Fatal" level logs to help with debugging. For detailed logs including debug level messages, use Docker container logs with `docker logs kamiyomu --stream`.

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
