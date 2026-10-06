import { useMemo } from 'react'
import * as THREE from 'three'

export const ISLAND_RADIUS = 16
const PLANE_SIZE = 46
const SEABED_MIN = -0.55

const DRY_SAND = new THREE.Color('#fbe9cf')
const MID_SAND = new THREE.Color('#f5d6ae')
const WET_SAND = new THREE.Color('#e6bd92')
const SHALLOW = new THREE.Color('#b5ebdd')
const DEEP = new THREE.Color('#3bbccf')

// Altura del terreno: playa amplia con una duna suave al centro que baja hacia el mar.
export function terrainHeight(x, z) {
  const r = Math.hypot(x, z) / ISLAND_RADIUS
  const dunes = Math.sin(x * 0.45) * Math.cos(z * 0.4) * 0.05
  const h = (1 - r * r) * 0.95 - 0.25 + dunes
  return Math.max(h, SEABED_MIN)
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
    const segments = 184
    const plane = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, segments, segments)
    plane.rotateX(-Math.PI / 2)
    const pos = plane.attributes.position
    const colors = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count; i++) {
      const h = terrainHeight(pos.getX(i), pos.getZ(i))
      pos.setY(i, h)
      const c = colorForHeight(h)
      colors.set([c.r, c.g, c.b], i * 3)
    }
    plane.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    plane.computeVertexNormals()
    return plane
  }, [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors roughness={1} />
    </mesh>
  )
}