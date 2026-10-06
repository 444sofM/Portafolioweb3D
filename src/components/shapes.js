import * as THREE from 'three'

export function heartShape(size = 1) {
  const s = new THREE.Shape()
  const k = size
  s.moveTo(0, -0.9 * k)
  s.bezierCurveTo(-1.3 * k, 0.1 * k, -0.9 * k, 1.0 * k, 0, 0.45 * k)
  s.bezierCurveTo(0.9 * k, 1.0 * k, 1.3 * k, 0.1 * k, 0, -0.9 * k)
  return s
}

export function starShape(outer = 1, inner = 0.45, points = 5) {
  const s = new THREE.Shape()
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2
    const x = Math.cos(a) * r
    const y = Math.sin(a) * r
    if (i === 0) s.moveTo(x, y)
    else s.lineTo(x, y)
  }
  s.closePath()
  return s
}