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

// Techo a dos aguas: triángulo en XY extruido a lo largo de Z y centrado.
export function gableGeometry(width, height, depth) {
  const s = new THREE.Shape()
  s.moveTo(-width / 2, 0)
  s.lineTo(width / 2, 0)
  s.lineTo(0, height)
  s.closePath()
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false })
  g.translate(0, 0, -depth / 2)
  return g
}

// Hoja de palmera: plana en XZ, crece hacia +X.
export function leafGeometry(length = 1.5, width = 0.34) {
  const s = new THREE.Shape()
  s.moveTo(0, 0)
  s.lineTo(length * 0.45, width)
  s.lineTo(length, width * 0.7)
  s.lineTo(length, -width * 0.7)
  s.lineTo(length * 0.45, -width)
  s.closePath()
  const g = new THREE.ShapeGeometry(s)
  g.rotateX(-Math.PI / 2)
  return g
}

export function batGeometry() {
  const right = [
    [0, 0.22], [0.1, 0.34], [0.16, 0.2], [0.45, 0.3], [0.9, 0.45],
    [0.8, 0.15], [0.62, 0.02], [0.5, 0.1], [0.38, -0.12], [0.2, -0.05], [0, -0.25],
  ]
  const left = right.slice(1, -1).reverse().map(([x, y]) => [-x, y])
  const pts = [...right, ...left]
  const s = new THREE.Shape()
  pts.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)))
  s.closePath()
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: false })
  g.translate(0, 0, -0.02)
  return g
}