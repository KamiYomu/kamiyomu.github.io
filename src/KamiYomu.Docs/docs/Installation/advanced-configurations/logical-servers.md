---
title: Logical Server
parent: Advanced Configurations
nav_order: 3
---

# Logical Server

KamiYomu uses **Hangfire** as its background task manager.  
Hangfire allows you to define **logical servers**, which act as named processing units responsible for executing background jobs.  
These logical servers help you organize, scale, and distribute work across multiple worker instances.

---

## What Are Logical Servers?

A *logical server* in Hangfire is essentially a named worker node.  
Each server name represents an independent background processor that can:

- Run its own set of queues  
- Share queues with other servers  
- Be scaled up or down by adding or removing entries  
- Help distribute workload across multiple containers or threads

By defining multiple logical servers, you gain fine‑grained control over how background jobs are balanced and executed.

---

## Worker__ServerAvailableNames__0 (and others)

This setting defines the list of Hangfire server identifiers that KamiYomu will register and use.

- Each entry corresponds to a **distinct Hangfire server instance**.
- Add more entries to increase the number of logical servers.
- Indexes must be incremented sequentially:  
  `Worker__ServerAvailableNames__0`, `Worker__ServerAvailableNames__1`, `Worker__ServerAvailableNames__2`, etc.
- These names appear in the Hangfire Dashboard, making it easier to monitor and troubleshoot job execution.

### When to Add More Logical Servers

You may want to define multiple logical servers when:

- You want your KamiYomu instance to split different queues across separate workers.
- You want your KamiYomu instance to remain resilient—if one server stops, others continue processing jobs.
- You want your KamiYomu instance to scale horizontally by running multiple background processors.
- You want your KamiYomu instance to isolate heavy workloads into dedicated logical units.

---

## Example Configuration

Below is an example of defining four logical Hangfire servers through Docker Compose environment variables:

```yml
environment:
    Worker__ServerAvailableNames__0: "KamiYomu-background-1"
    Worker__ServerAvailableNames__1: "KamiYomu-background-2"
    Worker__ServerAvailableNames__2: "KamiYomu-background-3"
    Worker__ServerAvailableNames__3: "KamiYomu-background-4"
```