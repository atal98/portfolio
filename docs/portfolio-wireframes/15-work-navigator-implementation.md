# Work Navigator implementation and QA

## Outcome

The portfolio now presents its work as one connected navigator rather than
three separate page sections. The entry hero and its illustrative system scene
remain intact. Below it, a project index selects one full engineering case
containing the existing selected-work evidence and system-practice story.

## Implementation

- Replaced the separate **Selected work**, **Work index**, and **System
  practice** sections with one `#work` Work Navigator in `src/main.jsx`.
- Added a sticky desktop project rail and a normal stacked project list on
  narrow screens. The page keeps normal document scroll; there is no
  fixed-body or nested-scroll treatment.
- Kept all existing project content: problem, impact, system decision,
  technical focus, engineering lesson, illustrative hero scene, and system
  story.
- Project selection updates the case panel and hero scene together.
- Added `?project=<id>` selection state with browser Back/Forward handling.
- Replaced the previous forced scroll-to-selected-work behavior with in-place
  selection.
- Added a 240 ms case transition using only opacity and a 12 px translate.
  The global reduced-motion mode resolves directly to the final state.
- Normalized the hero scene footprint across project types, including the
  denser IOC route scene, so project selection does not visually displace the
  active Work Navigator.

## Accessibility and responsive behavior

- The rail is a labelled tablist with roving tab stops, arrow-key navigation,
  `aria-selected`, `aria-controls`, and a labelled tab panel.
- The selected case panel is announced politely and is linked to the active
  tab.
- Project controls measure 64 px in the small-screen layout and 68 px in the
  desktop layout.
- The desktop rail becomes a normal full-width list under 960 px and uses no
  horizontal carousel.
- Visual state combines cobalt, text, numbering, focus, and a left marker;
  color is not the only selected-state signal.

## QA result

**Pass.** The production build succeeds. Browser QA verified:

- all six project controls are present and the selected case/hero update
  together;
- normal clicking does not trigger an application scroll jump;
- ArrowDown moves selection and focus correctly;
- direct URL state loads the selected project, and Back/Forward restores it;
- desktop and narrow-screen layouts have no horizontal overflow;
- the rail becomes static at the small-screen breakpoint;
- compact IOC route controls do not overlap;
- browser console reports no warnings or errors.

One issue was found during QA: unequal hero-scene heights changed the visual
position of the navigator when switching projects. The hero scene frame was
then normalized and rechecked before this pass was marked complete.
