# System-story implementation

## Outcome

The approved AuthKit-inspired explanation pattern is now part of the live
React portfolio. The generic overview map was replaced with project-specific
system stories that update when a visitor chooses a project from the work
index.

## Visual and interaction decisions

- The canvas remains light and editorial: neutral grid, ink connectors, and
  cobalt only for the engineering decision that matters.
- Every project has a named diagram type, system stages, decision, rationale,
  and operational outcome. This is an explanation surface, not decorative
  architecture art.
- The visual changes with the selected project while keeping the same
  structural frame, so the interaction preserves orientation.
- Route drawing and staged node entrance use opacity and transforms only.
  Reduced-motion users receive the fully visible diagram immediately.

## Shipped project stories

| Project | Visual story | Highlighted decision |
| --- | --- | --- |
| BPCL-EV Charging Platform | Event route | Async orchestration |
| Planzookie AI Planning Platform | Grounded context pipeline | Data before generation |
| AI-Powered Audiobook Mobile Platform | Content loop | Feedback at the product edge |
| Spotwork Multi-Tenant SaaS Job Board | Trust-boundary map | Tenant isolation |
| RVIN Merchant Support AI | Knowledge router | Merchant-specific knowledge |
| IOC Shipping & Logistics Platform | Data-to-operations line | Resilient ETL |

## QA record

The production preview was tested in the Codex browser. The review included
visual inspection, no-overflow verification, accessible tab/tabpanel wiring,
project selection, Arrow-key project navigation, visible focus rules, target
size measurement, and console inspection. The first pass found a clipped
decision annotation and three undersized hit targets; both were corrected
before the final clean pass.

## Direction update

This implementation is a stable, accessible foundation, not the final level
of visual storytelling. The next design pass will layer Radix-informed
interface scenes over the system stories. See
`11-radix-interface-scene-wireframe-plan.md`.
