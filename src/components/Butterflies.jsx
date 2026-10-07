import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLORS = ['#ff77c8', '#35f0dc', '#ffd166', '#c58bff']

function Butterfly({ cx, cz, radius, speed, phase, color, y }) {
  const root = useRef()
  const left = useRef()
  const right = useRef()
  const wing = useMemo(() => {
    const g = new THREE.CircleGeometry(0.28, 5)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase
    root.current.position.set(
      cx + Math.cos(t) * radius,
      y + Math.sin(t * 2.3) * 0.5,
      cz + Math.sin(t * 1.3) * radius,
    )
    root.current.rotation.y = -Math.atan2(Math.sin(t * 1.3) * 1.3, -Math.sin(t)) + Math.PI / 2
    const flap = Math.sin(clock.elapsedTime * 16 + phase) * 0.9
    left.current.rotation.z = flap
    right.current.rotation.z = -flap
  })

  const mat = (
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} side={THREE.DoubleSide} flatShading />
  )
  return (
    <group ref={root}>
      <mesh rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.025, 0.025, 0.3, 4]} />
        <meshStandardMaterial color="#2a0f3a" />
      </mesh>
      <group ref={left}>
        <mesh geometry={wing} position-x={0.26}>{mat}</mesh>
      </group>
      <group ref={right}>
        <mesh geometry={wing} position-x={-0.26}>{mat}</mesh>
      </group>
    </group>
  )
}

export default function Butterflies() {
  const items = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        cx: Math.cos(i * 2.4) * 8,
        cz: Math.sin(i * 2.4) * 8,
        radius: 2 + (i % 3),
        speed: 0.35 + (i % 4) * 0.08,
        phase: i * 1.7,
        color: COLORS[i % COLORS.length],
        y: 2 + (i % 4) * 0.8,
      })),
    [],
  )
  return items.map((it, i) => <Butterfly key={i} {...it} />)
}