---
slug: data-wars-the-consent-management-crisis-oems-didnt-see-coming
title: "Data Wars: The Consent Management Crisis OEMs Didn't See Coming"
authors: [dimo-team]
tags: [privacy, data, compliance]
description: "Legacy OEMs can't share data, but Tesla just did with Lemonade"
image: /img/dimo-social-card.png
---

<!-- truncate -->

### Maybe they did, but news this week revealed the $100B automotive data infrastructure gap. Read more to learn about what happened:

On January 14, the FTC finalized a 20-year order against General Motors for selling driver data without proper consent. Five days later, Lemonade announced 50% insurance discounts for Tesla drivers who share their FSD telemetry data.

The contradiction is stark:

- OEMs **can't share data** (massive liability risk) 
- Customers **want to share data** (hundreds in annual savings) 
- Insurance companies need data (to price risk accurately)

---

### Here's what the GM settlement actually means:

The FTC found that GM "monitored and sold people's precise geolocation data and driver behavior information, sometimes as often as every three seconds" through its OnStar Smart Driver program. The result? A 20-year consent order requiring "affirmative express consent" before collecting or sharing any connected vehicle data.

Source: https://www.ftc.gov/news-events/news/press-releases/2026/01/ftc-finalizes-order-settling-allegations-gm-onstar-collected-sold-geolocation-data-without-consumers

### Meanwhile, the insurance economics are already in motion:

Lemonade just launched "Autonomous Car Insurance" with 50% rate cuts for Tesla drivers using Full Self-Driving. How? Direct access to Tesla's onboard computer data. Lemonade Co-Founder Shai Wininger said:

By connecting to the Tesla onboard computer, our models are able to ingest incredibly nuanced sensor data that lets us price our insurance with higher precision.
Source: https://finance.yahoo.com/news/lemonade-halve-tesla-insurance-rates-133146153.html

### The impossible position for traditional OEMs:

Ford Motor Company, Stellantis , Toyota Motor Corporation, Honda — none of you can do what Tesla does. You don't own insurance companies. You can't be data brokers (the FTC just proved that). But your customers will demand access to their data when it means $800-1,200 in annual insurance savings.

Building consent management infrastructure in-house? That's a multi-year, multi-million dollar compliance project with ongoing legal liability.

**This is exactly why we built DIMO protocol.**

As a 2026 MotorTrend Group SDV Award finalist alongside Tesla, Ford, GM, and Mercedes-Benz, we've already solved the infrastructure problem that just cost GM a 20-year FTC order.

DIMO isn't a data broker. We're open-source consent management infrastructure helps remove OEM liability.

Article content
How DIMO solves the consent problem
How DIMO works in practice:

When a customer wants that 50% Lemonade discount:

1. Customer logs into their account
2. Customer grants permission to Lemonade via our consent system
3. Lemonade queries authorized telemetry data via our APIs
4. OEM provisions data access safely — never touches the liability

The OEM never becomes a data broker. The customer controls permissions. The insurer gets compliant access. Everyone stays FTC-clean. **Win-win-win** situation :)

---

### Why open-source matters here:

Proprietary consent systems create trust problems. Customers don't trust OEMs, 3rd parties don't trust black boxes. Here's why we built it on open-source:

1. Open protocol = auditable on-chain
2. Every permission grant verified 
3. Every data access logged 
4. Zero hidden data sales

---

### The market forcing function is already here:

- Insurance companies will offer data-driven discounts (economics demand it) 
- Customers will demand data access (FTC gives them this right) 
- OEMs need infrastructure that scales without liability (GM proves the alternative)

Tesla solved this by vertically integrating everything. However, that's not an option for the rest of the industry.

---

### The technical stack we're using:

- EIP-4337 (Account Abstraction) for seamless wallet UX
- SACD (Service Access Contract Definitions) for granular permissions
- GraphQL APIs for real-time telemetry queries
- Blockchain-native audit trails for compliance verification

All open-source. All interoperable. All designed for an industry that needs neutral infrastructure, not another walled garden.

---

### Here's what I believe will happen next:

The next year or so will separate OEMs into three categories:

1. **Pioneers** who adopt open consent protocols and enable customer data rights safely
2. **Fast followers** who scramble to build compliant infrastructure after the next headline
3. **The GM category** — compliance orders, class action lawsuits, customer trust erosion

The FTC ruling isn't an isolated incident, it's a preview of what happens when OEMs try to be data brokers instead of adopting proper consent infrastructure.

If you're working on automotive data governance and compliance, insurance telematics product development, fleet management data systems, or OEM connected vehicle architecture - we should talk.

The consent management problem isn't going away — and building it in-house means taking on liability that just cost GM 20 years of regulatory oversight.

DIMO provides the **neutral infrastructure layer that protects OEMs, empowers customers, and enables the consumer economy ecosystem**.

Learn more about our protocol: https://dimo.org

---

### The future isn't OEM walled gardens competing on data access.

It's open protocols where customers control permissions, OEMs provision safely, third parties access compliantly, and everyone operates transparently.

We're building that infrastructure layer. And we need you to help spread the word.