import { useMemo } from 'react'
import * as THREE from 'three'
import { ZONES, ZONE_FLAT_RADIUS } from '../data/layout.js'

export const ISLAND_RADIUS = 18
const PLANE_SIZE = 56
const SEABED_MIN = -0.55

const DRY_SAND = new THREE.Color('#fff1e2')
const MID_SAND = new THREE.Color('#ffdcc6')
const WET_SAND = new THREE.Color('#f0b0b8')
const SHALLOW = new THREE.Color('#86f2e2')
const DEEP = new THREE.Color('#1fb9c9')

const smoothstep = (a, b, x) => {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

function rawHeight(x, z) {
  const r = Math.hypot(x, z) / ISLAND_RADIUS
  const dunes = Math.sin(x * 0.45) * Math.cos(z * 0.4) * 0.05
  return Math.max((1 - r * r) * 0.95 - 0.25 + dunes, SEABED_MIN)
}

// Playa amplia con una duna suave; se aplana alrededor de cada escena temática.
export function terrainHeight(x, z) {
  let h = rawHeight(x, z)
  for (const zone of ZONES) {
    const w = 1 - smoothstep(ZONE_FLAT_RADIUS, ZONE_FLAT_RADIUS + 3, Math.hypot(x - zone.x, z - zone.z))
    if (w > 0) h = THREE.MathUtils.lerp(h, rawHeight(zone.x, zone.z), w)
  }
  return h
}

function colorForHeight(h) {
  if (h > 0.4) return DRY_SAND
  if (h > 0.12) return DRY_SAND.clone().lerp(MID_SAND, 1 - (h - 0.12) / 0.28)
  if (h > -0.02) return MID_SAND.clone().lerp(WET_SAND, 1 - (h + 0.02) / 0.14)
  const t = THREE.MathUtils.clamp(-h / -SEABED_MIN, 0, 1)
  return SHALLOW.clone().lerp(DEEP, t)
}

export default function Terrain() {
  const geometry = useMemo(() => {
    const segments = 70
    const plane = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, segments, segments)
    plane.rotateX(-Math.PI / 2)
    // Sin índices: cada triángulo tiene su propio color y se ve facetado (low poly)
    const flat = plane.toNonIndexed()
    const pos = flat.attributes.position
    const colors = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count; i += 3) {
      let avg = 0
      for (let k = 0; k < 3; k++) {
        const h = terrainHeight(pos.getX(i + k), pos.getZ(i + k))
        pos.setY(i + k, h)
        avg += h / 3
      }
      const c = colorForHeight(avg)
      for (let k = 0; k < 3; k++) colors.set([c.r, c.g, c.b], (i + k) * 3)
    }
    flat.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    flat.computeVertexNormals()
    return flat
  }, [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors flatShading roughness={1} />
    </mesh>
  )
}