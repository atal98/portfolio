# Radix-informed interface-scene wireframe plan

## Decision

The system-story canvas explains the architecture, but it is not the final
visual explanation for a project. The next wireframe direction uses a
believable project-specific interface scene as the primary visual proof, with
the system route remaining a supporting layer.

This corrects an earlier constraint: the portfolio must avoid copied AuthKit
artwork and generic fake dashboards, but it should not avoid representing the
real product surfaces that Atal designed and engineered.

## Radix principle to apply

Radix demonstrates its product through concrete UI states: team members,
notification preferences, pricing, sign-in, payment, invoices, metrics, and
activity. A visitor understands its component system by seeing it solve real
product tasks, not by reading a component list.

For the portfolio:

```text
Real project role or user task
        +
One believable interface state
        +
Visible system decision / status
        =
A visual engineering story
```

The scenes are visual explanations, not claims that the exact production UI
looked this way. Where a real screenshot is unavailable, label it as an
illustrative system scene.

## Shared scene grammar

- **Frame:** light editorial page with one focused application surface; no
  dark 3D device art.
- **Components:** fields, toggles, tabs, lists, status badges, progress, data
  rows, and feedback states that make sense for the project.
- **Evidence:** show input, intermediate system state, and outcome in one
  composition. Do not reduce a project to a technology/logo list.
- **Decision marker:** cobalt identifies the key technical choice, while text
  supplies the meaning so color is never the only signal.
- **Motion:** transition between adjacent product states, then stop; the scene
  must remain completely understandable without animation.
- **Accessibility:** semantic controls where interactive, visible focus, 44 px
  targets, and reduced-motion fallbacks.

## Project wireframes to create next

| Project | Hero interface scene | Supporting system proof |
| --- | --- | --- |
| BPCL-EV Charging Platform | Charger discovery, tariff, start request, and live session status | Event route with Temporal retry/state marker |
| Planzookie AI Planning Platform | Planner brief, selected data sources, generated report and map preview | Context assembly before LLM generation |
| Spotwork Multi-Tenant SaaS Job Board | Tenant sign-in, role workspace, and isolated tenant context | Identity through resolver to data boundary |
| AI-Powered Audiobook Mobile Platform | Playback, subtitles, AI voice interaction, and listening status | Content/feedback loop to analytics |
| RVIN Merchant Support AI | Multi-channel inbox with merchant knowledge citation and approval state | Channel router and constrained response boundary |
| IOC Shipping & Logistics Platform | Vessel status table and operational exception state | External data through ETL to operations |

## Case-study module order

1. Project name, role, and one practical problem.
2. Dominant interface scene: an operator can infer the product purpose at a
   glance.
3. Small system annotation layer that calls out the relevant backend, data,
   workflow, or trust decision.
4. Stated result or qualitative operational change.

## Radix Themes adoption

`@radix-ui/themes` is installed as the component foundation for the next
implementation pass. It is not yet imported into the site. It will provide
accessible, composable primitives for the interface scenes while the portfolio
keeps its own typography, layout, and cobalt visual identity.

Do not replace the portfolio wholesale with Radix's visual identity. Use Radix
for robust component behavior and the discipline of showing real states; this
portfolio remains an editorial work presentation.

## Next approval needed

Before changing React again, wireframe the first three scenes in detail:
BPCL-EV, Planzookie, and Spotwork. Together they show asynchronous systems,
grounded AI, and multi-tenant trust boundaries.
