import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { CameraDirector } from '../camera/CameraDirector'
import { performanceConfig } from '../systems/performanceTier'
import { SceneWorld } from './SceneWorld'

function CameraBridge({ directorRef }) {
  const { camera } = useThree()
  useEffect(() => {
    directorRef.current = new CameraDirector(camera)
    directorRef.current.moveTo('OUTSIDE_GATE', { duration: 0.01, reducedMotion: true })
    return () => directorRef.current?.cancel()
  }, [camera, directorRef])
  return null
}

export function SceneCanvas({ state, performanceTier, directorRef, sceneRefs, onBellActivate, onDoorSelect }) {
  if (performanceTier === 'FALLBACK') return null
  return <Canvas className="experience-canvas" camera={{ position: [0, 1.4, 6], fov: 42 }} dpr={performanceConfig[performanceTier].dpr} gl={{ antialias: performanceTier !== 'LOW', alpha: false }}>
    <Suspense fallback={null}><CameraBridge directorRef={directorRef} /><SceneWorld state={state} performanceTier={performanceTier} sceneRefs={sceneRefs} onBellActivate={onBellActivate} onDoorSelect={onDoorSelect} /></Suspense>
  </Canvas>
}
