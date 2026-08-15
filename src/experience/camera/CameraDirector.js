import gsap from 'gsap'

export const cameraPositions = {
  OUTSIDE_GATE: { position: [0, 1.45, 6.5], lookAt: [0, 1.4, -1] },
  GATE_THRESHOLD: { position: [0, 1.45, 2.8], lookAt: [0, 1.35, -3] },
  CORRIDOR_HOME: { position: [0, 1.5, 5.5], lookAt: [0, 1.35, -8] },
  DOOR_01: { position: [0, 1.5, -2.2], lookAt: [0, 1.2, -4] },
  ROOM_01: { position: [0, 1.58, -3.35], lookAt: [0, 1.15, -7.15] },
  RETURN_DOOR_01: { position: [0, 1.5, -2.2], lookAt: [0, 1.2, -4] },
}

export class CameraDirector {
  constructor(camera) { this.camera = camera; this.timeline = null }

  moveTo(name, { duration = 1, reducedMotion = false, onComplete } = {}) {
    const target = cameraPositions[name] || cameraPositions.CORRIDOR_HOME
    this.cancel()
    this.timeline = gsap.to(this.camera.position, { ...vector(target.position), duration: reducedMotion ? 0.15 : duration, ease: 'power2.inOut', onUpdate: () => this.camera.lookAt(...target.lookAt), onComplete })
    this.camera.lookAt(...target.lookAt)
    return this.timeline
  }

  moveSequence(stops = [], { reducedMotion = false } = {}) {
    this.cancel()
    this.timeline = gsap.timeline()
    stops.forEach(({ name, at = 0, duration = 1 }) => {
      const target = cameraPositions[name] || cameraPositions.CORRIDOR_HOME
      this.timeline.to(this.camera.position, {
        ...vector(target.position),
        duration: reducedMotion ? 0.15 : duration,
        ease: 'power2.inOut',
        onUpdate: () => this.camera.lookAt(...target.lookAt),
      }, reducedMotion ? 0 : at)
    })
    if (stops[0]) this.camera.lookAt(...(cameraPositions[stops[0].name] || cameraPositions.CORRIDOR_HOME).lookAt)
    return this.timeline
  }

  cancel() { this.timeline?.kill(); this.timeline = null }
}

function vector([x, y, z]) { return { x, y, z } }
