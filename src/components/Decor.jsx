import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './Terrain.jsx'
import { starShape } from './shapes.js'
import { C, Lp } from './lowpoly.jsx'
import InteractiveProps from './InteractiveProps.jsx'
import Palms from './Palms.jsx'
import Butterflies from './Butterflies.jsx'
import Stars from './Stars.jsx'

function Starfish({ x, z, rotY = 0, scale = 1, color = '#ff9b85' }) {
  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(starShape(0.5, 0.22), { depth: 0.06, bevelEnabled: false })
    g.rotateX(-Math.PI / 2)
    return g
  }, [])
  return (
    <mesh geometry={geometry} position={[x, terrainHeight(x, z) + 0.03, z]} rotation-y={rotY} scale={scale} castShadow receiveShadow>
      <Lp color={color} />
    </mesh>
  )
}

function Floatie({ x, z, color = C.hotPink, phase = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase
    ref.current.position.y = 0.1 + Math.sin(t * 1.2) * 0.05
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.04
  })
  const arcs = 8
  return (
    <group ref={ref} position={[x, 0.1, z]}>
      <group rotation-x={Math.PI / 2}>
        {Array.from({ length: arcs }, (_, i) => (
          <group key={i} rotation-z={(i * Math.PI * 2) / arcs}>
            <mesh castShadow>
              <torusGeometry args={[1, 0.35, 5, 3, (Math.PI * 2) / arcs]} />
              <Lp color={i % 2 ? C.white : color} rough={0.35} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

export default function Decor({ activeId, onSelect }) {
  return (
    <>
      <InteractiveProps activeId={activeId} onSelect={onSelect} />
      <Palms />
      <Butterflies />
      <Stars />

      <Starfish x={-1} z={-1.5} rotY={0.4} color="#ff77c8" />
      <Starfish x={3} z={3} rotY={1.2} color={C.gold} />
      <Starfish x={-4} z={11} rotY={2.2} color="#ff9b85" />
      <Starfish x={13} z={3.5} rotY={0.9} color="#ff77c8" scale={0.8} />
      <Starfish x={-13} z={-1} rotY={0.1} color={C.gold} />
      <Starfish x={-1.5} z={8.5} rotY={0.6} color="#ffb36b" scale={0.9} />

      <Floatie x={21} z={6} />
      <Floatie x={-20} z={-9} color={C.turq} phase={2} />
      <Floatie x={6} z={22} color={C.gold} phase={4} />
    </>
  )
}