import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { starShape } from './shapes.js'

function Star({ position, scale, phase, geometry }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase
    ref.current.position.y = position[1] + Math.sin(t * 1.1) * 0.3
    ref.current.rotation.y = t * 0.7
  })
  return (
    <mesh ref={ref} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial color="#ffd166" emissive="#ffc23d" emissiveIntensity={2} toneMapped={false} flatShading />
    </mesh>
  )
}

// Estrellas doradas que flotan y brillan sobre la isla.
export default function Stars() {
  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(starShape(1, 0.46), { depth: 0.2, bevelEnabled: false })
    g.translate(0, 0, -0.1)
    return g
  }, [])
  const stars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = i * 2.39996
        const r = 5 + ((i * 7) % 13)
        return {
          position: [Math.cos(a) * r, 5 + (i % 5) * 1.3, Math.sin(a) * r],
          scale: 0.3 + (i % 3) * 0.12,
          phase: i * 0.9,
        }
      }),
    [],
  )
  return stars.map((s, i) => <Star key={i} geometry={geometry} {...s} />)
}