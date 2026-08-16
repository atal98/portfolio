# Reference synthesis

## Intent

Create a work-first engineering portfolio that feels authored and clear. The
portfolio should lead with projects and show how each system works, rather
than behaving like a generic personal landing page.

## What to take from each reference

### AuthKit — explain the system visually

- Use a focused visual module to explain a complex capability.
- Pair short copy with a diagram, state map, or interface fragment.
- Make the narrative concrete: context, system, decisions, result.

**Portfolio translation:** every case study has a system-map moment. It is an
explanation of the engineering work, not a decorative technical diagram.

### Belen Jones — authored entry and selected work

- Start with a compact loading sequence only when it reflects actual asset
  readiness.
- Reveal the name after the entry sequence, then let a selected project carry
  the first screen.
- Keep the author and direct contact information close at hand.

**Portfolio translation:** use a short, skippable loader and name reveal, then
show one selected case study. The name stays present but does not compete with
the work.

### Unveil — project index and durable navigation

- Use an index as a readable list, not a gallery of cards.
- Persist a small navigation and direct contact route.
- Let case studies move naturally to the next project.

**Portfolio translation:** use dated project rows with project, domain, and
role. Each row must be a real link/button in implementation and each case has
next/previous navigation.

## Combined concept

`Entry → selected project → work index → system explanation → direct contact`

The site should be minimal enough for project material to become the visual
anchor. Motion supports orientation: reveal the name, expose a project row,
and progress through a system map. It must never be required to understand or
operate the site.

## Explicit non-goals

- No recreation of a reference site's layout, images, copy, or branded style.
- No 3D corridor, floating block, or generic SaaS-card direction.
- No invented impact metrics.
- No motion that hides content, blocks keyboard use, or ignores reduced-motion
  preferences.
