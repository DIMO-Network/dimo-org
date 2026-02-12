---
slug: building-private-stateful-vehicle-ai-agents-with-dimo
title: "Building Private, Stateful, Vehicle AI Agents with DIMO"
authors: [dimo-team]
tags: [privacy, data, compliance]
description: "An interview with Yevgeny Khessin on why DIMO exists."
image: /img/dimo-social-card.png
---

<!-- truncate -->

### Stop building plumbing. Start building products

[Yevgeny Khessin](https://www.linkedin.com/in/yevgeny-khessin/) spent an unreasonable amount of his life watching smart engineering teams try to build “simple” mobility apps, only to realize they accidentally signed up for a horror anthology: 

> OEM quirks, auth gymnastics, permissions, normalization, vendor lock-in, and a long tail of “why is this vehicle reporting negative speed.” 

If you’ve done this once, you know the pattern. The feature you wanted takes a week. The permission system you didn’t want takes three months. Then you carry it forever.

So we built DIMO to make the hard parts boring.

This is the stack behind our Agents API—and why it saves time if you’re building agentic apps on vehicle data. Here are his takes on why DIMO exists:

---
### The problem isn’t data, it’s governance

When a developer says “I want to build an app that uses vehicle data,” what they think they’re asking for is:

> Speed, fuel, location, battery, trips, analytics, and a bit of automation

What they’re actually asking for is:

- **Identity**: For users and vehicles
- **Consent**: Auditable and revocable
- **Permission**: A model that doesn’t become a bespoke religion
- **Programmability**: The ability to not hardcode one provider forever
- **Ethical AI**: A way to let AI agents do real work without giving them a loaded weapon

This is why most mobility projects fail.

Mobility isn’t hard because the data doesn’t exist. It’s hard because the data is attached to the real world, and the real world has **ownership**, **liability**, and **“who authorized this?”** baked-in.

---

### The mental model: Everything has a public-key identity

DIMO leans hard on public keys because they scale cleanly. Not as ideology—just engineering.

- Users have wallets (identity you can prove).
- Developers have a license identity (accountability).
- Vehicles have identities + ownership + permissions.
- **Agents have identity too.**

This matters because it makes consent and permissions composable across apps. You don’t have to build a new OAuth kingdom for every product and every integration partner.

---

### Agents API: the orchestration surface

[DIMO Agents API](https://www.dimo.org/docs/api-references/agents-api) is how you build “chat with your car” experiences without wiring dozens of brittle flows.

You create a scoped agent for a user, then message it. The agent delegates internally: vehicle identity lookups, telemetry queries, structured tool calls. You get the stuff you actually need to ship:

- **Streaming (SSE)** so the UI feels alive instead of broken
- **History** for continuity and debugging
- **Vehicle scoping** so the agent can’t wander into vehicles it shouldn’t touch

The key thing: this is not `LLM vibes`. It’s an orchestration layer sitting on top of our legacy DIMO stack of identity + permissions + data access.

---

### What makes it not a toy: SACD + Public Keys + MCP
#### SACD: Contracts for capabilities 

[SACD (Service Access Contract Definition)](https://www.dimo.org/docs/key-concepts#permissions--consent-management-sacd) is how we define what an app can ask for and what it gets back—typed, stable, permission-aware.

Instead of “call this endpoint”, you invoke a capability with consistent semantics. That’s what lets an ecosystem exist without turning into bespoke integrations and endless compatibility charts.

#### Wallets: Identity + consent that scales past one app
Wallets aren’t here to turn users into traders. They’re here because keys are the cleanest foundation for:

- Provable identity
- Auditable consent
- Revocation
- Interoperability across apps and businesses

If you want to build something that works beyond a single app silo, **you need this**. Otherwise you’re signing multiple NDAs and implementing “partner auth” forever.

#### MCP: Tool access for agents, not ad-hoc spaghetti
A useful agent needs structured tool access. [DIMO MCP](https://www.dimo.org/docs/build/building-with-ai/dimo-mcp-server) **(Model Context Protocol)** exposes DIMO Identity + Telemetry as callable tools and handles the annoying parts—auth, token management, retries—so developers don’t rebuild brittle glue.

**GitHub Repo**: https://github.com/DIMO-Network/mcp-dimo

---

### The identity detail that matters
Developer permissions today, agent commerce tomorrow

Today, an agent effectively acts under the **developer’s license 0x (aka clientID)**. The agent is wearing your badge. That keeps accountability and permission boundaries simple: it can only do what the developer is allowed to do, and only for the user/vehicles it’s scoped to.

Separately, each agent also has its own 0x identity. That’s not just decoration. That’s where we’re going: agents as services with real composability and commerce—pay-per-insight, subscriptions to an agent identity, revenue splits, eventually public agents you can discover and pay.

But we’re sequencing it intentionally: permissions first, commerce next. Otherwise you get “autonomous agents” and then you get a security incident.

---

### Links if you want to actually build
- Register via [Developer Console](https://console.dimo.org)
- Build services using the [Server SDK](https://www.dimo.org/docs/build/building-with-tools/server-sdk)
- Build experiences using the [Client SDK](https://www.dimo.org/docs/build/building-with-tools/client-sdk)

The goal isn’t “AI magic”, it’s having an agent that scan safely access real vehicle data—without you spending the next quarter building permission plumbing.