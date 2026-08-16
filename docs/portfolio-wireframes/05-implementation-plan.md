# Implementation plan

## Status

**Approved for React implementation.** This document translates the wireframe
into production constraints before code changes begin.

## Frontend art direction

### Visual thesis

A light, editorial work canvas: precise black type, quiet dividers, one cobalt
action color, and a single animated system map that turns technical depth into
the page's visual anchor.

### Content plan

1. **Entry** — name, role, and a small loading/reveal state.
2. **Selected work** — one project with a real system diagram and a clear
   case-study narrative.
3. **Project index** — all projects in concise, keyboard-accessible rows.
4. **System depth** — context, decision, outcome, and architecture layers.
5. **Contact** — one direct call to action plus professional links.

### Interaction thesis

1. A brief entry sequence reveals the name, but is skipped automatically when
   reduced motion is requested and never blocks the page.
2. Selecting a project crossfades its facts and redraws the same structural
   map, preserving spatial continuity instead of opening a modal.
3. Sections fade upward once as they enter the viewport; project rows provide
   a visible keyboard and hover state.

## Accessibility and responsive guardrails

- A skip link targets the page's main content.
- All interactive controls use semantic links or buttons, visible focus, and a
  minimum 44 px target.
- Project selection exposes a tablist/tabs relationship with an accessible
  panel label.
- The page reflows for 375 px, 768 px, 1024 px, and 1440 px without a horizontal
  scrollbar.
- Motion uses only opacity and transforms, stays below 400 ms, and has a
  `prefers-reduced-motion` fallback.
- No external visual assets are needed, avoiding image loading or layout-shift
  risks for this first implementation.

## QA loop

1. Build the React application.
2. Inspect the localhost page visually and interact with navigation, project
   selection, keyboard focus, resume, contact, and responsive layouts.
3. Fix all actionable findings.
4. Repeat the build and browser checks until no actionable issues remain.
