# Wireframe plan

## Visual thesis

A quiet, editorial project index interrupted by one clear engineering-system
visual: minimal in chrome, precise in hierarchy, and built around the work.

## Prototype boundary

This package is a neutral visual and information-architecture prototype. It
uses Open Design's `default` system and `web-prototype` template. That binding
keeps the wireframe calm and testable; it is not the final art direction.

## Screen sequence

| Order | Screen / section | Reference principle | Question it answers |
| --- | --- | --- | --- |
| 01 | Entry loader and name reveal | Belen Jones | Who made this, and has the experience begun? |
| 02 | Selected project | Belen Jones | What is the first piece of work I should see? |
| 03 | Work index | Unveil | What else has been built, in a fast scannable format? |
| 04 | Case-study system map | AuthKit | How did the product or technical system work? |
| 05 | Direct contact | All three | How can I start a conversation? |

## Content model for a real project row

Each project must eventually supply:

- year or date range;
- project name;
- product/domain;
- role and technical contribution;
- one sentence of context;
- verified outcomes, if available;
- assets/screens or an intentionally designed abstract system map.

## Interaction plan

1. **Entry:** a 0–100 loading state is shown only while initial content/assets
   load. It exposes a visible skip action and respects reduced motion.
2. **Index:** project rows receive focus and underline/weight changes on hover
   or keyboard focus. Hover is enhancement only.
3. **Case study:** the system map can reveal layers in a reading order; all
   labels remain visible without animation.
4. **Contact:** a simple mail action remains available in navigation and at
   the end of the page.

## Design decisions to validate with the client

- Does the work-first entry feel right, or should the name have more presence?
- Should the visual system maps be literal product diagrams or editorial
  abstractions of the architecture?
- Which three to five projects deserve full case studies?
- Should the live site use light, dark, or an automatically chosen theme after
  the structure is accepted?
