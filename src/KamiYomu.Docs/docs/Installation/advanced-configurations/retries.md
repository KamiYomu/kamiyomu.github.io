---
title: Retries
parent: Advanced Configurations
---

# Retries

KamiYomu uses **Hangfire’s built‑in retry mechanism** to automatically re‑execute failed background jobs.  
Retries are essential for handling temporary issues such as network instability, rate‑limiting, or intermittent failures from external sources.

By configuring retry behavior, you control how resilient your background processing pipeline is and how aggressively it should attempt to recover from errors.

---

## How KamiYomu Retries Work

When a job fails (throws an exception), KamiYomu does **not** immediately mark it as permanently failed.  
Instead, it follows a retry policy:

1. The job is moved to a *Retry* state.  
2. KamiYomu waits for a delay (which increases with each retry attempt).  
3. The job is executed again.  
4. If the job continues to fail, KamiYomu repeats the process until the retry limit is reached.

After the final attempt:

- If the job still fails, it is moved to the **Failed** state.
- Failed jobs remain visible in the Hangfire Dashboard for inspection and troubleshooting.
- You can manually requeue or delete failed jobs if needed.

### Default Hangfire Retry Behavior

Hangfire uses an **exponential backoff** strategy by default.  
This means each retry waits longer than the previous one, helping avoid hammering external services.

Example retry delays (approximate):

- 1st retry → after a few seconds  
- 2nd retry → after ~30 seconds  
- 3rd retry → after a few minutes  
- 4th retry → after several minutes  

KamiYomu respects this behavior.

---

## Worker__MaxRetryAttempts

This setting defines the **maximum number of retry attempts** Hangfire will perform before giving up on a job.

- If set to `0`, retries are disabled and jobs fail immediately.
- If set to `1`, Hangfire will try once more after the first failure.
- Higher values increase resilience but may delay failure visibility.

Use this setting to balance reliability and resource usage.

---

## Why Adjust Retry Attempts?

You may want to increase or decrease retry attempts depending on your environment:

### Increase retries when:
- External sources frequently rate‑limit or throttle requests  
- Network conditions are unstable  
- You want maximum resilience and automatic recovery  

### Decrease retries when:
- You want fast failure visibility  
- You are debugging issues and want immediate feedback  
- You want to avoid long retry cycles for known failing jobs  

---

## Example Configuration

```yml
environment:
    Worker__MaxRetryAttempts: 10
```

In this example:
- Each failed job will be retried up to 10 times.
- If the job still fails after the 5th retry, it is marked as permanently failed.
- You can inspect the failure details in the Hangfire Dashboard.

Configuring retry behavior ensures that KamiYomu handles temporary failures gracefully while giving you full control over how persistent the system should be when recovering from errors.


{% capture docker_full_example_note %}
{% include note-docker-full-example.md %}
{% endcapture %}
{{ docker_full_example_note | markdownify }}
