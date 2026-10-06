import { useMemo } from 'react'
import * as THREE from 'three'

const SAND = new THREE.Color('#e6d49a')
const GRASS = new THREE.Color('#5da64a')
const BEACH_LIMIT = 0.45

// Altura del terreno: colina central que desciende hacia la orilla.
export function terrainHeight(x, z) {
  const r = Math.hypot(x, z) / 6
  const falloff = Math.max(0, 1 - r * r)
  const bumps = Math.sin(x * 0.9) * Math.cos(z * 0.9) * 0.12
  return falloff * (1.6 + bumps) - 0.15
}

export default function Terrain() {
  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(12, 12, 96, 96)
    plane.rotateX(-Math.PI / 2)
    const pos = plane.attributes.position
    const colors = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const h = terrainHeight(x, z)
      pos.setY(i, h)
      const c = h > BEACH_LIMIT ? GRASS : SAND
      colors.set([c.r, c.g, c.b], i * 3)
    }
    plane.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    plane.computeVertexNormals()
    return plane
  }, [])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial vertexColors flatShading />
    </mesh>
  )
}