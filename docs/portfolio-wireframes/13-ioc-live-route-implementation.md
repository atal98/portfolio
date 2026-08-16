# IOC live-route scene implementation

## Outcome

The IOC Shipping & Logistics illustrative scene now includes a real geographic
OpenStreetMap panel between Jebel Ali and Mumbai. It now reads as an
operations-style navigation tracker: point A is the origin, point B is the
live route position, and point C is the destination. The route, status, ETA,
and vessel operations table make the scene understandable as an operational
surface.

## Component decision

Radix Themes was checked before implementation. It provides useful status,
table, and layout primitives, but no mapping or geospatial route component.
Because the desired result is now an actual map rather than a map-like visual,
the project uses `leaflet` and `react-leaflet` with OpenStreetMap tiles.

The map implementation provides:

- a semantic labelled route-tracker region;
- real port coordinates for Jebel Ali and Mumbai;
- a cobalt A-to-B segment for the covered route;
- a green dashed B-to-C segment when the vessel is in transit;
- an orange dotted B-to-C segment when the route is placed on hold;
- an interactive, keyboard-accessible In transit / Hold control with 44 px
  minimum targets;
- a small directional arrow at point B instead of a literal vessel symbol;
- text and line-pattern keys, so route state is not communicated by color
  alone;
- a no-key OpenStreetMap tile layer that gracefully retains the route and
  labels if map imagery cannot load;
- a reduced-motion fallback that keeps the point-B arrow visible without
  continuous movement. Holding the route also pauses the marker.

Radix `Badge` continues to identify the route-tracker scene; native buttons
provide the accessible interactive route-state control.

## QA result

**Pass.** The production preview confirmed OpenStreetMap tiles load, the IOC
tab updates the hero scene, green in-transit and orange hold states transition
correctly, hold pauses the live marker, the labelled route has no horizontal
overflow, each control is at least 44 px high, and the browser has no console
errors.
