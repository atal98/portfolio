# System-story visual pattern

## Purpose

Every portfolio case study needs one visual that shows how the engineering
work moved through the product. This is the missing bridge between a project
title and a technical stack.

## The anatomy of a visual proof module

```text
Project context
      ↓
Named system stages / boundaries / decisions
      ↓
Observed product or operational outcome
```

The module is not a generic architecture diagram. It selects the one system
relationship that explains why the project required engineering judgment.

## Diagram types

| Diagram type | Best for | Example project |
| --- | --- | --- |
| Event route | asynchronous or protocol-driven systems | BPCL-EV Charging Platform |
| Context pipeline | AI generation grounded in data | Planzookie AI Planning Platform |
| Trust-boundary map | tenant isolation, permissions, deployment boundaries | Spotwork Multi-Tenant SaaS Job Board |
| Content loop | input, transformation, feedback, and analytics | AI-Powered Audiobook Mobile Platform |
| Knowledge router | channel routing and constrained AI response | RVIN Merchant Support AI |
| Data-to-operations line | ingestion, ETL, APIs, operational visibility | IOC Shipping & Logistics Platform |

## Project modules to build later

### BPCL-EV Charging Platform — event route

`User discovery → Beckn protocol → FastAPI services → Temporal workflows →
PostgreSQL + Redis → OCPI CPO layer → EV charging network`

Use this to explain the asynchronous state handling and integration work. The
visual should expose the route and show Temporal/Redis as the engineering
decision at its centre.

### Planzookie AI Planning Platform — grounded context pipeline

`Planning input → Census / transport / parcel data → context assembly → LLM
workflow → structured sections → maps and visualizations → planning report`

Use this to distinguish a grounded planning workflow from a generic text
generator. The key visual decision is the data context that constrains the
output.

### Spotwork Multi-Tenant SaaS Job Board — tenant boundary map

`Tenant portal → Auth + RBAC → API gateway → tenant resolver → isolated
databases → AWS ECS services`

Use this to show that multi-tenancy is a trust-boundary and deployment
decision, not merely a database choice.

### AI-Powered Audiobook Mobile Platform — content loop

`Mobile app → playback APIs → subtitle pipeline → AI voice/text layer → AWS
Lambda → analytics dashboard`

Use this to show the feedback loop linking media delivery, accessibility,
interaction, and product visibility.

### RVIN Merchant Support AI — knowledge router

`WhatsApp / Instagram / email → message router → merchant knowledge base → AI
response engine → support dashboard`

Use this to explain why a merchant-specific knowledge boundary and escalation
logic matter.

### IOC Shipping & Logistics Platform — operations data line

`Third-party APIs → ETL scripts → Django APIs → operational database →
dashboards → department users`

Use this to show how raw external data becomes dependable operational
visibility.

## Content requirements before public launch

For each module, verify the project statement, architecture labels, and result
with available source material. If an outcome cannot be substantiated, keep
the visual and use a qualitative operational result instead.
