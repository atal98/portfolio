import { Component, useEffect, useRef, useState } from 'react'
import { useMachine } from '@xstate/react'
import { chapters } from './config/chapters'
import { experienceMachine } from './machine/experienceMachine'
import { detectPerformanceTier, prefersReducedMotion } from './systems/performanceTier'
import { SceneCanvas } from './scenes/SceneCanvas'
import { TransitionManager } from './transitions/TransitionManager'
import { profile } from '../data/portfolio'
import './styles.css'

const playableChapter = 'introduction'

class SceneErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return <div className="experience-panel scene-fallback"><span className="eyebrow">INTERACTIVE SCENE UNAVAILABLE</span><h1>Portfolio content is still available.</h1><p>The 3D layer could not start on this device.</p><button className="primary-action" type="button" onClick={this.props.onExit}>View portfolio</button></div>
    return this.props.children
  }
}

export default function ExperienceShell({ onExit }) {
  const [state, send] = useMachine(experienceMachine)
  const [performanceTier] = useState(detectPerformanceTier)
  const [showMap, setShowMap] = useState(false)
  const directorRef = useRef(null)
  const sceneRefs = useRef({})
  const transitionRef = useRef(null)
  const reducedMotion = state.context.reducedMotion

  useEffect(() => {
    if (prefersReducedMotion()) send({ type: 'SET_PREFERENCES', preferences: { reducedMotion: true } })
    send({ type: 'LOADED' })
    return () => transitionRef.current?.cancel()
  }, [])

  const runTransition = (config) => {
    transitionRef.current?.cancel()
    transitionRef.current = new TransitionManager({ actor: { send }, cameraDirector: directorRef.current })
    transitionRef.current.run({ ...config, reducedMotion })
  }

  const ringBell = () => {
    if (state.matches('OUTSIDE_GATE')) {
      send({ type: 'BELL_READY' })
      send({ type: 'RING_BELL' })
    } else {
      if (!state.matches('BELL_READY') || state.context.transitionLocked) return
      send({ type: 'RING_BELL' })
    }
    runTransition({
      duration: 3.2,
      cameraStops: [{ name: 'GATE_THRESHOLD', at: 0.6, duration: 1.2 }, { name: 'CORRIDOR_HOME', at: 1.8, duration: 1.4 }],
      steps: [{ at: 0.4, event: 'BELL_COMPLETE' }, { at: 1.8, event: 'GATE_COMPLETE' }, { at: 3.2, event: 'ENTER_COMPLETE' }],
      animate: (timeline) => {
        const { bell, gateLeft, gateRight, lanternLeft, lanternRight } = sceneRefs.current
        timeline.to(bell?.scale || {}, { x: 0.82, y: 0.82, z: 0.82, duration: 0.15 }, 0)
          .to(bell?.scale || {}, { x: 1, y: 1, z: 1, duration: 0.15 }, 0.15)
          .to([lanternLeft?.material, lanternRight?.material].filter(Boolean), { emissiveIntensity: 2.8, duration: 0.2 }, 0.25)
          .to(gateLeft?.rotation || {}, { y: -0.9, duration: 1.8, ease: 'power2.inOut' }, 0.6)
          .to(gateRight?.rotation || {}, { y: 0.9, duration: 1.8, ease: 'power2.inOut' }, 0.6)
      },
    })
  }

  const openIntroduction = () => {
    if (state.context.transitionLocked) return
    send({ type: 'SELECT_DOOR', chapterId: playableChapter })
    runDoorTransition()
  }

  const runDoorTransition = () => runTransition({
    duration: 2.1,
    cameraStops: [{ name: 'DOOR_01', at: 0, duration: 0.75 }, { name: 'ROOM_01', at: 0.9, duration: 1.2 }],
    steps: [{ at: 0.75, event: 'DOOR_APPROACH_COMPLETE' }, { at: 2.1, event: 'DOOR_COMPLETE' }],
    animate: (timeline) => timeline.to(sceneRefs.current.door?.rotation || {}, { y: -0.95, duration: 1.15, ease: 'power2.inOut' }, 0.85),
  })

  const selectChapter = (chapterId) => {
    setShowMap(false)
    if (chapterId !== playableChapter || state.context.transitionLocked) return
    if (state.matches('QUICK_EXPLORE')) {
      send({ type: 'SELECT_CHAPTER', chapterId })
      runTransition({ duration: 1.4, cameraStops: [{ name: 'ROOM_01', at: 0, duration: 1.4 }], steps: [{ at: 1.4, event: 'DOOR_COMPLETE' }], animate: (timeline) => timeline.to(sceneRefs.current.door?.rotation || {}, { y: -0.95, duration: 0.8, ease: 'power2.inOut' }, 0.3) })
      return
    }
    if (state.matches('CORRIDOR')) openIntroduction()
  }

  const returnToCorridor = () => {
    if (!state.matches('INSIDE_ROOM') || state.context.transitionLocked) return
    send({ type: 'EXIT_ROOM' })
    runTransition({
      duration: 1.8,
      cameraStops: [{ name: 'RETURN_DOOR_01', at: 0, duration: 0.7 }, { name: 'CORRIDOR_HOME', at: 0.7, duration: 1.1 }],
      steps: [{ at: 0.7, event: 'LEAVE_COMPLETE' }, { at: 1.8, event: 'RETURN_COMPLETE' }],
      animate: (timeline) => timeline.to(sceneRefs.current.door?.rotation || {}, { y: 0, duration: 0.9, ease: 'power2.inOut' }, 0.2),
    })
  }

  const skipTransition = () => {
    if (!state.context.transitionLocked) return
    transitionRef.current?.cancel()
    if (state.matches('BELL_RINGING') || state.matches('GATE_OPENING') || state.matches('ENTERING_GATE')) {
      sceneRefs.current.gateLeft && (sceneRefs.current.gateLeft.rotation.y = -0.9)
      sceneRefs.current.gateRight && (sceneRefs.current.gateRight.rotation.y = 0.9)
      directorRef.current?.moveTo('CORRIDOR_HOME', { duration: 0.15, reducedMotion: true })
    }
    if (state.matches('DOOR_APPROACHING') || state.matches('DOOR_OPENING')) {
      sceneRefs.current.door && (sceneRefs.current.door.rotation.y = -0.95)
      directorRef.current?.moveTo('ROOM_01', { duration: 0.15, reducedMotion: true })
    }
    if (state.matches('LEAVING_ROOM') || state.matches('RETURNING_TO_CORRIDOR')) {
      sceneRefs.current.door && (sceneRefs.current.door.rotation.y = 0)
      directorRef.current?.moveTo('CORRIDOR_HOME', { duration: 0.15, reducedMotion: true })
    }
    send({ type: 'SKIP_TRANSITION' })
  }

  const openMap = () => {
    if (state.matches('LOADING') || state.context.transitionLocked) return
    send({ type: 'QUICK_EXPLORE' })
    setShowMap(true)
  }
  const isTransitioning = ['BELL_RINGING', 'GATE_OPENING', 'ENTERING_GATE', 'DOOR_APPROACHING', 'DOOR_OPENING', 'LEAVING_ROOM', 'RETURNING_TO_CORRIDOR'].some((name) => state.matches(name))

  return <section className="experience-shell" aria-label="AtalOS immersive portfolio">
    <SceneErrorBoundary onExit={onExit}><SceneCanvas state={state} performanceTier={performanceTier} directorRef={directorRef} sceneRefs={sceneRefs} onBellActivate={ringBell} onDoorSelect={selectChapter} /></SceneErrorBoundary>
    <div className="experience-wash" />
    <header className="experience-nav"><button className="experience-mark" type="button" onClick={onExit} aria-label="Return to portfolio">A / 01</button><div className="experience-utility"><button type="button" onClick={openMap}>Map</button><button type="button" onClick={openMap}>Menu</button></div></header>
    <div className="experience-content">
      {state.matches('LOADING') && <div className="scene-caption"><span>Preparing the world</span></div>}
      {(state.matches('OUTSIDE_GATE') || state.matches('BELL_READY') || isTransitioning && !state.matches('DOOR_APPROACHING') && !state.matches('DOOR_OPENING') && !state.matches('LEAVING_ROOM') && !state.matches('RETURNING_TO_CORRIDOR')) && <div className="scene-caption gate-caption"><span className="scene-index">01</span><span>RING TO ENTER</span><button className="bell-hotspot" type="button" onClick={ringBell} disabled={state.context.transitionLocked} aria-label="Ring the entrance bell"><span aria-hidden="true" /></button>{isTransitioning && <button className="skip-link" type="button" onClick={skipTransition}>Skip</button>}</div>}
      {state.matches('CORRIDOR') && <div className="door-inspector"><span className="scene-index">01</span><div><strong>INTRODUCTION</strong><small>QUIET STUDY / WORKSHOP</small></div><button type="button" onClick={() => selectChapter(playableChapter)}>Enter</button></div>}
      {(state.matches('DOOR_APPROACHING') || state.matches('DOOR_OPENING') || state.matches('LEAVING_ROOM') || state.matches('RETURNING_TO_CORRIDOR')) && <div className="scene-caption transition-caption"><span>{state.matches('LEAVING_ROOM') || state.matches('RETURNING_TO_CORRIDOR') ? 'Returning' : 'Opening Introduction'}</span><button className="skip-link" type="button" onClick={skipTransition}>Skip</button></div>}
      {state.matches('INSIDE_ROOM') && <div className="room-drawer"><span className="scene-index">01 / INTRODUCTION</span><h1>Visual prototype</h1><p>A quiet study for the work ahead.</p><button className="secondary-action" type="button" onClick={returnToCorridor}>Back to corridor</button></div>}
    </div>
    <footer className="experience-status"><span>{state.value}</span><span>{performanceTier}</span><button type="button" onClick={() => send({ type: 'SET_PREFERENCES', preferences: { reducedMotion: !reducedMotion } })}>{reducedMotion ? 'Motion reduced' : 'Motion full'}</button></footer>
    {import.meta.env.DEV && <aside className="experience-debug"><span>DEBUG</span><small>state {state.value}</small><small>chapter {state.context.currentChapter || 'none'}</small><small>tier {performanceTier}</small><small>reduced {String(reducedMotion)}</small><small>locked {String(state.context.transitionLocked)}</small></aside>}
    {showMap && <div className="chapter-map" role="dialog" aria-modal="true" aria-label="Chapter map"><div className="chapter-map-card"><button className="map-close" type="button" onClick={() => { setShowMap(false); send({ type: 'CLOSE_QUICK_EXPLORE' }) }}>Close</button><span className="eyebrow">MAP / CHAPTERS</span><h2>Move through the house.</h2>{chapters.map((chapter) => <button className="map-link" disabled={chapter.id !== playableChapter} key={chapter.id} type="button" onClick={() => selectChapter(chapter.id)}><small>{chapter.doorId}</small><span>{chapter.label}</span><em>{chapter.id === playableChapter ? 'ENTER' : 'SOON'}</em></button>)}<div className="map-links"><a href={`mailto:${profile.email}`}>Email</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></div></div>}
  </section>
}
