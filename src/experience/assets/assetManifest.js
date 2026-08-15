export const assetManifest = {
  gateFrame: { id: 'gate-frame', type: 'procedural', priority: 'CRITICAL', scene: 'gate', mobile: 'same-silhouette' },
  gatePanels: { id: 'gate-panels', type: 'procedural', priority: 'CRITICAL', scene: 'gate', mobile: 'reduced-trim' },
  bell: { id: 'bell', type: 'procedural', priority: 'CRITICAL', scene: 'gate', mobile: 'same-silhouette', futureUrl: null },
  lantern: { id: 'lantern', type: 'procedural', priority: 'CRITICAL', scene: 'gate', mobile: 'lower-segments' },
  corridorFrame: { id: 'corridor-frame', type: 'procedural', priority: 'NEXT', scene: 'corridor', mobile: 'shorter-depth' },
  introductionDoor: { id: 'introduction-door', type: 'procedural', priority: 'NEXT', scene: 'corridor', mobile: 'reduced-hardware', futureUrl: null },
  studyProps: { id: 'study-props', type: 'procedural', priority: 'LAZY', scene: 'introduction', mobile: 'remove-secondary-props' },
}

export const getAssetsByPriority = (priority) => Object.values(assetManifest).filter((asset) => asset.priority === priority)
