import gsap from 'gsap'

export class TransitionManager {
  constructor({ actor, cameraDirector }) { this.actor = actor; this.cameraDirector = cameraDirector; this.timeline = null; this.eventTimers = []; this.firedEvents = new Set() }

  run({ steps = [], camera, cameraStops, duration = 1, reducedMotion = false, animate = () => {} }) {
    this.cancel()
    gsap.ticker.wake()
    this.timeline = gsap.timeline()
    // Keep one master clock alive even when a scene ref is not mounted yet.
    this.timeline.to({}, { duration: reducedMotion ? 0.05 : duration }, 0)
    animate(this.timeline)
    this.timeline.timeScale(reducedMotion ? 20 : 1)
    if (cameraStops) this.cameraDirector?.moveSequence(cameraStops, { reducedMotion })
    else if (camera) this.cameraDirector?.moveTo(camera, { duration, reducedMotion })
    steps.forEach(({ at, event }) => {
      const fire = () => {
        if (this.firedEvents.has(event)) return
        this.firedEvents.add(event)
        this.actor.send({ type: event })
      }
      this.timeline.call(fire, [], reducedMotion ? 0.05 : at)
      // Visibility-throttled browsers can pause GSAP's ticker. The timer is only
      // a recovery path; the master timeline remains the primary event owner.
      const delay = (reducedMotion ? 0.05 : at) * 1000
      this.eventTimers.push(setTimeout(fire, delay + 100))
    })
    this.timeline.play(0)
    return this.timeline
  }

  cancel() {
    this.timeline?.kill()
    this.eventTimers.forEach(clearTimeout)
    this.eventTimers = []
    this.firedEvents.clear()
    this.cameraDirector?.cancel()
    this.timeline = null
  }
}
