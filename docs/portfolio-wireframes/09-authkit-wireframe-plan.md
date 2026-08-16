# AuthKit-inspired visual proof wireframe plan

## Direction

Introduce a reusable, light editorial system canvas inside case studies. It
borrows AuthKit's habit of explaining each capability through a specific visual
scene, while keeping Atal's portfolio visual identity and information
architecture intact.

## Visual grammar

- **Canvas:** a white or warm-neutral plane with fine grid/rule lines, not a
  dark sci-fi scene.
- **Objects:** labels, text nodes, simple connectors, and a single selected
  decision marker. Avoid 3D devices and glowing glass panels. This constraint
  no longer prohibits believable project-specific interface scenes; see
  `11-radix-interface-scene-wireframe-plan.md` for the replacement direction.
- **Hierarchy:** project title and problem first; the system canvas second;
  decision and outcome below.
- **Colour:** neutral ink and borders with cobalt reserved for the one active
  decision or route.
- **Motion later:** reveal the system route in reading order once; show every
  label without requiring motion; disable the sequence for reduced motion.

## Case-study section order

1. Project title and one-sentence problem.
2. Visual proof module: named system route, context pipeline, or boundary map.
3. Engineering decision: why a particular component or boundary exists.
4. Outcome: verified result or qualitative operational change.
5. Next case study.

## Wireframe artefact

`authkit-system-stories.html` contains three visual examples using the real
portfolio project data:

- BPCL-EV — event route.
- Planzookie — grounded context pipeline.
- Spotwork — tenant boundary map.

It is a review artefact only. The live React site remains unchanged until the
client approves the visual grammar and the project-specific content.

## Decision to request next

After reviewing the new wireframe, choose whether the live portfolio should:

1. replace the existing generic vertical map with these project-specific visual
   modules; or
2. keep the current map in the overview and add these modules only to future
   dedicated case-study pages.

## Superseded design assumption

The direction above was intentionally conservative while the visual grammar
was being approved. It has now been refined: a labelled system canvas should
support a realistic product/interface scene, not replace it. The current
implementation remains a useful system layer; the next wireframes should make
the project experience itself visible.
