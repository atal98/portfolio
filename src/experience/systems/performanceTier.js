export function detectPerformanceTier() {
  if (typeof window === 'undefined') return 'MEDIUM'
  if (!canCreateWebGLContext()) return 'FALLBACK'
  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  const mobile = matchMedia('(pointer: coarse)').matches
  if (mobile && (cores <= 4 || memory <= 4)) return 'LOW'
  if (cores >= 8 && memory >= 8) return 'HIGH'
  return 'MEDIUM'
}

function canCreateWebGLContext() {
  if (!window.WebGLRenderingContext) return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const performanceConfig = {
  HIGH: { dpr: [1, 2] },
  MEDIUM: { dpr: [1, 1.5] },
  LOW: { dpr: [1, 1] },
  FALLBACK: { dpr: [1, 1] },
}
