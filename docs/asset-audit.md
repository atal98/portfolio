# Phase 5 asset audit

Blender is not installed in the development environment, so this pass keeps the environment procedural and documents future GLB candidates rather than creating uncontrolled binaries.

| Asset | Current implementation | Importance | Recommendation | LOD / mobile | Complexity target |
| --- | --- | --- | --- | --- | --- |
| Gate frame | R3F boxes with trim/eave | Hero | Procedural for now; optional authored GLB later | Keep silhouette, remove trim on LOW | < 250 tris |
| Gate panels | R3F grouped panels | Hero | Procedural; GLB only if joinery needs it | One panel material on LOW | < 180 tris each |
| Bell | R3F brass primitives | Hero interaction | Future small GLB candidate | Same silhouette, fewer segments | < 500 tris |
| Lantern | R3F low-poly mesh | High | Procedural reusable prop | Disable extra point light on LOW | < 120 tris |
| Stone path | Repeated R3F slabs | Medium | Procedural | Fewer slabs on mobile | < 80 tris per slab |
| Boundary walls | R3F boxes | Medium | Procedural | Same | < 100 tris |
| Foliage | Low-poly icosahedrons | Medium | Procedural until art lock | Fewer instances / lower segments | < 250 tris per clump |
| Corridor beams | Repeated R3F boxes | Hero structure | Procedural | Shorter depth on mobile | < 120 tris per beam |
| Corridor floor | R3F plane/box | Hero structure | Procedural, material-driven | Same | < 50 tris |
| Chapter doors | Reusable R3F system | High | Procedural system; optional Introduction GLB | Simplify hardware on LOW | < 350 tris each |
| Nameplates | R3F bars | Medium | Procedural | Same | < 30 tris |
| Study desk | R3F boxes | High | Future authored GLB candidate | Remove leg detail on LOW | < 700 tris |
| Blueprint | R3F plane/box | Medium | Procedural/material-driven | Same | < 30 tris |
| Notebook | R3F box | Medium | Procedural | Same | < 40 tris |
| Lamp | R3F light + primitive | High | Future small GLB candidate | Light only on LOW | < 250 tris |
| Plant | R3F low-poly forms | Medium | Procedural or small GLB pot | Remove foliage on LOW | < 250 tris |
| Shelf | R3F boxes | Medium | Procedural | Same | < 120 tris |
| Shoji panel | R3F plane with warm material | High | Procedural until texture pass | Opaque fallback on LOW | < 20 tris |

## Loading priorities

- `CRITICAL`: gate frame, gate panels, bell, first lantern.
- `NEXT`: corridor framing, Introduction door, corridor lanterns.
- `LAZY`: study props and future room assets.

No external asset files are introduced in this phase. The manifest in `src/experience/assets/assetManifest.js` is ready for authored assets when Blender becomes available.
