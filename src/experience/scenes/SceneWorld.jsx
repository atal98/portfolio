import { forwardRef } from 'react'
import { Box, Edges, Line } from '@react-three/drei'
import { assetManifest } from '../assets/assetManifest'
import { materials } from '../assets/materials'

const doorPosition = [0, 1.1, -4]
const doorStations = [
  { id: 'introduction', position: doorPosition, side: 'left', color: '#6a4935' },
  { id: 'experience', position: [2.55, 1.1, -1.7], side: 'right', color: '#4e3c31' },
  { id: 'selected-work', position: [-2.55, 1.1, -6.6], side: 'left', color: '#604638' },
  { id: 'engineering', position: [2.55, 1.1, -9.2], side: 'right', color: '#514339' },
  { id: 'approach', position: [-2.55, 1.1, -11.8], side: 'left', color: '#57463a' },
  { id: 'contact', position: [2.55, 1.1, -14.3], side: 'right', color: '#493a32' },
]

export function SceneWorld({ state, performanceTier, sceneRefs, onBellActivate, onDoorSelect }) {
  const corridor = ['CORRIDOR', 'DOOR_APPROACHING', 'DOOR_OPENING', 'INSIDE_ROOM', 'LEAVING_ROOM', 'RETURNING_TO_CORRIDOR'].some((name) => state.matches(name))
  const room = ['INSIDE_ROOM', 'LEAVING_ROOM'].some((name) => state.matches(name))
  const insideRoom = state.matches('INSIDE_ROOM')
  const visited = state.context.visitedChapters.includes('introduction')

  return <group>
    <color attach="background" args={['#121712']} />
    <fog attach="fog" args={['#20261f', 7, 22]} />
    <hemisphereLight skyColor="#7f927b" groundColor="#1a1712" intensity={0.34} />
    <ambientLight intensity={corridor ? 0.48 : 0.38} color="#c8bfa8" />
    <directionalLight position={[-4, 7, 5]} intensity={corridor ? 0.95 : 0.8} color="#d5c4a7" />
    {corridor && <pointLight position={[0, 2.2, 3.5]} intensity={0.7} distance={9} color="#82907a" />}
    <mesh position={[0, -0.35, -7]} rotation={[-Math.PI / 2, 0, 0]} userData={assetManifest.corridorFrame}><planeGeometry args={[16, 28]} /><meshStandardMaterial {...materials.inkSurface} color="#29302a" /></mesh>
    {!corridor && <OutsideGate sceneRefs={sceneRefs} onBellActivate={onBellActivate} performanceTier={performanceTier} />}
    {corridor && !insideRoom && <Corridor sceneRefs={sceneRefs} visited={visited} onDoorSelect={onDoorSelect} room={room} insideRoom={insideRoom} performanceTier={performanceTier} />}
    {room && <TestRoom performanceTier={performanceTier} />}
  </group>
}

function OutsideGate({ sceneRefs, onBellActivate, performanceTier }) {
  return <group>
    <Box args={[7.4, 0.5, 0.42]} position={[0, 3.15, -1.2]} userData={assetManifest.gateFrame}><meshStandardMaterial {...materials.charredTimber} color="#2a211c" /><Edges color="#725945" /></Box>
    <Box args={[7, 0.22, 0.52]} position={[0, 2.78, -1.18]}><meshStandardMaterial color="#4b382b" roughness={0.84} /></Box>
    <Box args={[7.2, 0.3, 0.7]} position={[0, 0.16, -1.05]}><meshStandardMaterial color="#5d5145" roughness={1} /></Box>
    <Box args={[0.42, 4, 0.56]} position={[-3.25, 1.55, -1.12]}><meshStandardMaterial {...materials.charredTimber} color="#342820" /></Box>
    <Box args={[0.42, 4, 0.56]} position={[3.25, 1.55, -1.12]}><meshStandardMaterial {...materials.charredTimber} color="#342820" /></Box>
    <GatePanel ref={(node) => { sceneRefs.current.gateLeft = node }} position={[-1.35, 1.38, -1]} side="left" userData={assetManifest.gatePanels} />
    <GatePanel ref={(node) => { sceneRefs.current.gateRight = node }} position={[1.35, 1.38, -1]} side="right" userData={assetManifest.gatePanels} />
    <mesh position={[0, 1.55, -0.56]}><planeGeometry args={[2.05, 2.35]} /><meshBasicMaterial color="#ad7b49" transparent opacity={0.14} /></mesh>
    <pointLight position={[0, 1.6, -0.8]} intensity={1.2} distance={5} color="#d49a55" />
    <Bell onActivate={onBellActivate} ref={(node) => { sceneRefs.current.bell = node }} />
    <Lantern light={performanceTier !== 'LOW'} ref={(node) => { sceneRefs.current.lanternLeft = node }} position={[-2.45, 2.15, -1.35]} />
    <Lantern light={performanceTier !== 'LOW'} ref={(node) => { sceneRefs.current.lanternRight = node }} position={[2.45, 2.15, -1.35]} />
    <StonePath />
    <GardenEdge performanceTier={performanceTier} />
  </group>
}

const GatePanel = forwardRef(function GatePanel({ side, ...props }, ref) {
  return <group ref={ref} {...props}>
    <Box args={[2.45, 2.4, 0.2]}><meshStandardMaterial color="#654733" roughness={0.84} /><Edges color="#9a7251" /></Box>
    <Box args={[0.1, 2.25, 0.05]} position={[side === 'left' ? -0.65 : 0.65, 0, 0.13]}><meshStandardMaterial color="#2e241e" roughness={0.88} /></Box>
    <Box args={[0.1, 2.25, 0.05]} position={[side === 'left' ? 0.65 : -0.65, 0, 0.13]}><meshStandardMaterial color="#2e241e" roughness={0.88} /></Box>
  </group>
})

const Bell = forwardRef(function Bell({ onActivate, ...props }, ref) {
  return <group ref={ref} {...props} position={[2.55, 1.48, -0.35]} onClick={(event) => { event.stopPropagation(); onActivate() }} onPointerOver={(event) => { event.stopPropagation(); if (event.object.material?.emissiveIntensity !== undefined) event.object.material.emissiveIntensity = 0.9 }} onPointerOut={(event) => { if (event.object.material?.emissiveIntensity !== undefined) event.object.material.emissiveIntensity = 0.28 }}>
    <mesh><sphereGeometry args={[0.2, 20, 14]} /><meshStandardMaterial {...materials.brass} /></mesh>
    <mesh position={[0, -0.26, 0]}><cylinderGeometry args={[0.07, 0.1, 0.24, 14]} /><meshStandardMaterial color="#75502d" metalness={0.62} roughness={0.34} /></mesh>
    <Box args={[0.32, 0.08, 0.08]} position={[0, 0.26, 0]}><meshStandardMaterial color="#76532f" metalness={0.58} roughness={0.4} /></Box>
  </group>
})

function Lantern({ light = true, ...props }) { return <group {...props}><mesh><octahedronGeometry args={[0.2, 1]} /><meshStandardMaterial {...materials.brass} color="#694a31" emissive="#b77b3d" emissiveIntensity={1.1} metalness={0.3} roughness={0.62} /></mesh>{light && <pointLight position={[0, 0, 0.1]} intensity={0.82} distance={4.2} color="#d39a56" />}</group> }
function StonePath() { return <group>{[-3, -1.7, -0.4, 0.9, 2.2].map((z, index) => <Box key={z} args={[1.45 - index * 0.05, 0.08, 0.72]} position={[0, -0.12, z]} rotation={[0, index % 2 ? 0.03 : -0.03, 0]}><meshStandardMaterial color="#6b675d" roughness={1} /></Box>)}</group> }
function GardenEdge({ performanceTier }) { return <group>{[[-4.25, 0.35, -2.6], [4.2, 0.4, -2.3], [-4, 0.3, -0.3]].map((position, index) => <group key={index} position={position}><mesh><icosahedronGeometry args={[0.62 + index * 0.12, 1]} /><meshStandardMaterial color="#304337" roughness={1} /></mesh>{performanceTier !== 'LOW' && <mesh position={[0.28, 0.38, 0.1]}><icosahedronGeometry args={[0.28, 1]} /><meshStandardMaterial color="#52624a" roughness={1} /></mesh>}</group>)}</group> }

function Corridor({ sceneRefs, visited, onDoorSelect, room, insideRoom, performanceTier }) {
  return <group>
    <Box args={[7.1, 0.24, 21]} position={[0, -0.2, -7]}><meshStandardMaterial color="#513a2d" roughness={0.82} /></Box>
    <Box args={[0.32, 3.8, 21]} position={[-3.65, 1.45, -7]}><meshStandardMaterial color="#292721" roughness={0.9} /></Box>
    <Box args={[0.32, 3.8, 21]} position={[3.65, 1.45, -7]}><meshStandardMaterial color="#292721" roughness={0.9} /></Box>
    {[-1, -4, -7, -10, -13].map((z) => <group key={z}><Box args={[7.2, 0.18, 0.22]} position={[0, 3.12, z]}><meshStandardMaterial color="#3b2b22" roughness={0.9} /></Box><Box args={[0.18, 3, 0.26]} position={[-1.2, 1.45, z]}><meshStandardMaterial color="#3b2b22" roughness={0.9} /></Box><Box args={[0.18, 3, 0.26]} position={[1.2, 1.45, z]}><meshStandardMaterial color="#3b2b22" roughness={0.9} /></Box></group>)}
    {doorStations.map((station) => (station.id !== 'introduction' || !insideRoom) && <Door key={station.id} {...station} userData={station.id === 'introduction' ? assetManifest.introductionDoor : undefined} ref={station.id === 'introduction' ? (node) => { sceneRefs.current.door = node } : undefined} visited={station.id === 'introduction' && visited} onSelect={onDoorSelect} disabled={room || station.id !== 'introduction'} />)}
    {doorStations.map((station) => <Lantern key={`lantern-${station.id}`} light={performanceTier !== 'LOW'} position={[station.side === 'left' ? -2.65 : 2.65, 2.05, station.position[2] - 0.18]} />)}
    {performanceTier !== 'LOW' && <pointLight position={[0, 1.7, -14.8]} intensity={0.8} distance={5} color="#b67c45" />}
    {performanceTier !== 'LOW' && <CorridorPlant position={[-2.8, 0.25, -7.7]} />}
  </group>
}

const Door = forwardRef(function Door({ id, color, visited, onSelect, disabled, ...props }, ref) {
  return <group ref={ref} {...props} onClick={(event) => { if (!disabled) { event.stopPropagation(); onSelect(id) } }}>
    <Box args={[1.45, 2.5, 0.18]}><meshStandardMaterial color={color} roughness={0.82} emissive={visited ? '#9d6b38' : '#000000'} emissiveIntensity={visited ? 0.32 : 0} /><Edges color={visited ? '#b88758' : '#75604c'} /></Box>
    <Box args={[0.84, 0.1, 0.05]} position={[0, 0.54, 0.13]}><meshStandardMaterial color="#d5c5a6" roughness={0.7} /></Box>
    <Box args={[0.08, 0.18, 0.05]} position={[0.48, 0, 0.14]}><meshStandardMaterial color="#9b6d38" metalness={0.7} roughness={0.3} /></Box>
  </group>
})

function CorridorPlant({ position }) { return <group position={position}><Box args={[0.65, 0.3, 0.65]} position={[0, 0.15, 0]}><meshStandardMaterial color="#4b3b2c" roughness={1} /></Box><mesh position={[0, 0.72, 0]}><icosahedronGeometry args={[0.62, 1]} /><meshStandardMaterial color="#3b5140" roughness={1} /></mesh></group> }

function TestRoom({ performanceTier }) {
  return <group position={[0, 0, -6]} userData={assetManifest.studyProps}>
    <Box args={[6.5, 0.2, 5.2]} position={[0, -0.2, -1]}><meshStandardMaterial color="#624637" roughness={0.82} /></Box>
    <Box args={[0.28, 3.5, 5.2]} position={[-3.3, 1.4, -1]}><meshStandardMaterial color="#2c3028" roughness={0.9} /></Box>
    <Box args={[0.28, 3.5, 5.2]} position={[3.3, 1.4, -1]}><meshStandardMaterial color="#2c3028" roughness={0.9} /></Box>
    <Box args={[2.2, 1.8, 0.12]} position={[0, 1.75, -3.45]}><meshStandardMaterial color="#b8aa8d" roughness={0.94} transparent opacity={0.76} /></Box>
    <Box args={[2.4, 0.14, 0.9]} position={[0, 0.7, -1.65]}><meshStandardMaterial color="#754c32" roughness={0.76} /></Box>
    <Box args={[0.12, 1.35, 0.12]} position={[-1, 0.06, -1.65]}><meshStandardMaterial color="#5b3c2b" roughness={0.82} /></Box>
    <Box args={[0.12, 1.35, 0.12]} position={[1, 0.06, -1.65]}><meshStandardMaterial color="#5b3c2b" roughness={0.82} /></Box>
    <Box args={[0.9, 0.035, 0.52]} position={[-0.35, 0.79, -1.65]} rotation={[0, 0.05, -0.05]}><meshStandardMaterial color="#d0c2a5" roughness={0.95} /></Box>
    <Box args={[0.32, 0.06, 0.22]} position={[0.58, 0.81, -1.65]}><meshStandardMaterial color="#8b6946" roughness={0.9} /></Box>
    <Box args={[0.9, 2.2, 0.22]} position={[-2.55, 1.1, -2.7]}><meshStandardMaterial color="#4b382c" roughness={0.88} /></Box>
    <Box args={[0.72, 0.035, 0.4]} position={[-2.55, 1.95, -2.56]}><meshStandardMaterial color="#b8aa8d" roughness={0.94} /></Box>
    <mesh position={[1.95, 1.25, -2.9]}><cylinderGeometry args={[0.32, 0.42, 0.7, 12]} /><meshStandardMaterial color="#3f5945" roughness={1} /></mesh>
    <pointLight position={[0.4, 2.3, -1.5]} intensity={2.4} distance={5.5} color="#d39a56" />
    {performanceTier !== 'LOW' && <mesh position={[0.4, 2.75, -1.5]}><sphereGeometry args={[0.08, 10, 8]} /><meshBasicMaterial color="#d9a566" /></mesh>}
  </group>
}
