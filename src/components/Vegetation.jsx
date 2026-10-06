import { useMemo } from 'react'
import { terrainHeight } from './Terrain.jsx'

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position-y={0.4}>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 6]} />
        <meshStandardMaterial color="#7a5230" />
      </mesh>
      <mesh position-y={1.1}>
        <coneGeometry args={[0.5, 1.2, 7]} />
        <meshStandardMaterial color="#2f7d3a" flatShading />
      </mesh>
    </group>
  )
}

// Generador pseudoaleatorio determinista para que la isla sea siempre igual
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Vegetation({ count = 18 }) {
  const trees = useMemo(() => {
    const rand = mulberry32(7)
    const list = []
    while (list.length < count) {
      const angle = rand() * Math.PI * 2
      const radius = 0.5 + rand() * 3.2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = terrainHeight(x, z)
      if (y < 0.7) continue
      list.push({ position: [x, y - 0.05, z], scale: 0.7 + rand() * 0.6 })
    }
    return list
  }, [count])

  return trees.map((t, i) => <Tree key={i} {...t} />)
}