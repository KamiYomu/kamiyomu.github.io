---
title: Delay Between Jobs 
parent: Advanced Configurations
---
# Delay Between Jobs

KamiYomu allows you to configure a delay between background job executions.  
This delay helps control how frequently requests are sent to external services, reducing the risk of rate‑limiting, throttling, or temporary bans from content providers.

These settings are especially important when dealing with sources that enforce strict request limits or respond with errors such as **HTTP 423 – “Too Many Requests”**.

---

## How the Delay Works

Every time a background job finishes, KamiYomu waits for a short period before starting the next one.  
This waiting period is chosen randomly between the **minimum** and **maximum** values you define.

Using a randomized delay provides two major benefits:

- **Throttling control**  
  Ensures your crawler does not overwhelm external services with rapid consecutive requests.

- **Reduced detectability**  
  Random intervals make your request pattern less predictable, lowering the chance of IP blocking or automated throttling.

---

## Worker__MinWaitPeriodInMilliseconds

Defines the **minimum** amount of time (in milliseconds) that KamiYomu will wait between job executions.

Use this to enforce a baseline delay that prevents overly aggressive request patterns.

---

## Worker__MaxWaitPeriodInMilliseconds

Defines the **maximum** amount of time (in milliseconds) that KamiYomu may wait between job executions.

A higher maximum value introduces more randomness, which can help avoid triggering anti‑bot protections or rate‑limit systems.

---

## Example Configuration

```yml
environment:
    Worker__MinWaitPeriodInMilliseconds: 3000
    Worker__MaxWaitPeriodInMilliseconds: 9001
```

In this example:
- Each job will wait at least 3 seconds before the next one starts.
- The delay may extend up to 9 seconds, chosen randomly.
- This creates a natural, human‑like request pattern that reduces the likelihood of throttling.

Configuring these values allows you to fine‑tune how aggressively KamiYomu interacts with external sources, balancing performance with stability and reliability.

{% capture docker_full_example_note %}
{% include note-docker-full-example.md %}
{% endcapture %}
{{ docker_full_example_note | markdownify }}

