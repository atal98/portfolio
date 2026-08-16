# Working rules

## Source of truth

- The binding in `.open-design.json` governs this prototype phase.
- `design-system/atalos-portfolio/MASTER.md` supplies UI/UX research guidance.
- When the two conflict, Open Design's active `DESIGN.md` tokens and prototype
  rules win for this artifact.
- This folder records rationale; it does not replace project requirements.

## Design constraints

- One accent color at most; use it only to establish action or selected state.
- Prefer rows, dividers, columns, and media over decorative cards.
- Every section has a single job and a visible reading order.
- Use real project facts only. Mark missing data as a content placeholder.
- Keep direct contact obvious and do not hide navigation behind hover-only UI.

## Accessibility and motion

- Maintain at least 4.5:1 text contrast.
- Preserve visible focus states and a minimum practical target size of 44 px.
- Build for 375 px, 768 px, 1024 px, and 1440 px widths with no horizontal
  scrolling.
- Treat animation as an enhancement. Provide `prefers-reduced-motion` support
  and a skip mechanism for any loader.
- Use semantic buttons/links and meaningful labels; no anonymous controls.

## Documentation rule

When a new design artifact, folder, or substantial decision is added, add or
update a Markdown file in this folder that states its purpose, source, and
status. Keep execution notes concise and dated.
