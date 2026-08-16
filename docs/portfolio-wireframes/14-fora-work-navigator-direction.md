# Fora-informed work navigator direction

## Status

**Proposed. Documentation only; no React change has been made.**

This direction is based on an interaction review of Fora's homepage, work
index, and VIVAMAYR case study. It adopts the useful `index → selected case`
relationship, without copying Fora's brand, layout, or fixed-scroll behavior.

## Decision

Keep the top portfolio entry intact:

- Atal Upadhyay's name, role, entry reveal, and illustrative system scene stay
  as the first experience.
- The project-specific scene continues to update with the selected project.

Below the entry, connect the existing **Selected work**, **Work index**, and
**System practice** content into one Work Navigator. Nothing is removed: the
same project evidence, decisions, technical focus, and system stories are
presented as one selected case instead of three disconnected page rows.

```text
Portfolio entry: name + illustrative system scene
                         ↓
Work Navigator
  Project index           Selected case
  01 BPCL-EV       →      title, role, practical problem
  02 Planzookie           impact, decision, technical focus, lesson
  03 Audiobook            existing visual scene and system-practice story
  04 Spotwork
  05 RVIN
  06 IOC
                         ↓
Contact (unchanged)
```

## Reference finding translated for this portfolio

Fora's desktop work area keeps a stable identity/contact rail at the left and
replaces the right-side work content as visitors move from an index to a case
study. Every project card carries a named `work → case study` transition.
The case study preserves the outer frame, so selection feels like moving
deeper into the same work system rather than opening an unrelated page.

For Atal's portfolio, use that continuity but retain normal document scroll.
Fora locks the desktop body and scrolls an internal pane; that is not suitable
for a long engineering portfolio because it weakens ordinary page scrolling,
keyboard expectations, and small-screen resilience.

## Desktop arrangement

Use a two-column Work Navigator at desktop sizes.

- **Index rail (about one third):** section label, project count, numbered
  project buttons, and the current selection state. It becomes sticky while
  the selected case is in view; it does not become a fixed page-wide sidebar.
- **Case panel (about two thirds):** project number, title, role, problem,
  impact, existing detail rows, and the existing system-practice story.
- **Continuity:** the active index row, hero scene, case-panel title, and
  system story always describe the same project.

The established light editorial palette, typography, dividers, and cobalt
accent remain unchanged. The neutral Open Design binding supports the
content-first hierarchy and restraint; it does not replace the existing
portfolio art direction.

## Small-screen arrangement

At phone and narrow-tablet widths, the index is a full-width vertical list
above the selected case. The selected project follows directly below it.

- Do not create a horizontal carousel or nested scroll region.
- Keep every project button at least 44 px high with visible focus.
- Preserve the selected project name above the case content so context is
  never lost after the user scrolls.

## Selection and transition rules

### Project selection

1. A visitor chooses a numbered project in the index.
2. The selected index row becomes visually and semantically active.
3. The hero scene and selected case update to that same project.
4. The visitor remains at their current scroll position; selection must not
   force an unexpected jump to the top of the page.
5. The selection is represented in the URL, for example
   `?project=ioc-logistics`, so it can be shared and Back/Forward remain
   predictable.

### Motion

- **Index indicator:** 180 ms color/opacity transition; no layout shift.
- **Case replacement:** outgoing content fades out quickly, then incoming
  content fades and translates upward by at most 12 px over 220–260 ms.
- **Hero scene:** crossfade to the same project state over at most 260 ms.
- **Reduced motion:** show the final state immediately; no marker travel,
  crossfade, or translation is required to understand the case.

Only opacity and transform may animate. There is no 3D rotation, scroll
hijacking, modal drill-in, or decorative animation.

## Content mapping

| Existing presentation | Work Navigator presentation | Content change |
| --- | --- | --- |
| Hero name + illustrative system scene | Portfolio entry | None |
| Selected work | Case-panel opening | None |
| Work index | Sticky desktop index / stacked mobile index | None |
| System practice | Supporting lower layer of the selected case | None |
| Contact | Closing page section | None |

## Accessibility and QA requirements

- Use semantic project buttons in a labelled `tablist` or equivalent
  single-selection control; pair the active selection with its case panel.
- Expose active state through `aria-selected` and a visible text/shape
  indicator, not cobalt alone.
- Keep a visible focus ring and 44 px minimum controls.
- Preserve normal page scrolling; avoid `body { overflow: hidden }` and
  desktop-only internal scroll panels.
- Use an accessible text label for any compact back-to-index control.
- Test selection, keyboard navigation, URL state, reduced motion, and layout
  at 375 px, 768 px, 1024 px, and 1440 px before approval.

## Fora QA findings that are deliberately not adopted

- Its active Work navigation state is visual only; it does not expose
  `aria-current`.
- Several links rely on SVG or have no text alternative.
- The compact case-study return link measures below a comfortable 44 px
  target.
- Its desktop shell uses `body` overflow lock with a nested content scroll.

These are useful warnings, not patterns to reproduce.

## Approval gate

Before implementation, review this arrangement as a wireframe decision:

1. Confirm the index rail + selected-case relationship.
2. Confirm that System practice belongs inside the selected case rather than
   remaining a separate top-level row.
3. Confirm whether URL selection should use a query parameter or project path.

After approval, create the updated wireframe, then implement and run the
frontend/UI/UX QA loop.
