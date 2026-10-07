import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './Terrain.jsx'
import { leafGeometry } from './shapes.js'
import { C, Lp, Neon } from './lowpoly.jsx'
import { ZONES } from '../data/layout.js'

const SEGMENTS = 5
const FRONDS = 7
const BULB_COLORS = ['#ff4fb2', '#35f0dc', '#ffd166']
const LEAF_COLORS = ['#19c7a6', '#2ee6d0', '#12a98f']

function Palm({ x, z, scale = 1, rotY = 0, lean = 1, height = 5, phase = 0, leaf1, leaf2 }) {
  const sway = useRef()
  const y0 = terrainHeight(x, z)

  const { points, bulbs } = useMemo(() => {
    const pts = Array.from({ length: SEGMENTS + 1 }, (_, i) => {
      const t = i / SEGMENTS
      return new THREE.Vector3(lean * t * t * 2, t * height, 0)
    })
    const list = []
    for (let j = 0; j < 7; j++) {
      const t = (j + 1) / 8
      const u = t * SEGMENTS
      const i = Math.min(Math.floor(u), SEGMENTS - 1)
      const p = pts[i].clone().lerp(pts[i + 1], u - i)
      const r = 0.3 * (1 - t * 0.5) + 0.05
      const a = j * 1.15
      list.push({ pos: [p.x + Math.cos(a) * r, p.y, p.z + Math.sin(a) * r], color: BULB_COLORS[j % 3] })
    }
    return { points: pts, bulbs: list }
  }, [lean, height])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.8 + phase
    sway.current.rotation.z = Math.sin(t) * 0.025
    sway.current.rotation.x = Math.cos(t * 0.8) * 0.02
  })

  const top = points[SEGMENTS]
  return (
    <group position={[x, y0 - 0.05, z]} rotation-y={rotY} scale={scale}>
      <group ref={sway}>
        {points.slice(0, SEGMENTS).map((a, i) => {
          const b = points[i + 1]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const len = Math.hypot(dx, dy)
          const t = i / SEGMENTS
          return (
            <group key={i} position={a} rotation-z={-Math.atan2(dx, dy)}>
              <mesh position-y={len / 2} castShadow>
                <cylinderGeometry args={[0.3 * (1 - (t + 0.2) * 0.5), 0.3 * (1 - t * 0.5), len * 1.03, 6]} />
                <Lp color={i % 2 ? '#8a4f6d' : '#6e3b57'} />
              </mesh>
            </group>
          )
        })}

        {bulbs.map((b, i) => (
          <mesh key={i} position={b.pos}>
            <icosahedronGeometry args={[0.075, 0]} />
            <Neon color={b.color} intensity={3.2} />
          </mesh>
        ))}

        <group position={top}>
          {Array.from({ length: 3 }, (_, i) => (
            <mesh key={i} position={[Math.cos(i * 2.1) * 0.22, -0.2, Math.sin(i * 2.1) * 0.22]} castShadow>
              <icosahedronGeometry args={[0.14, 0]} />
              <Lp color="#4a2a3a" />
            </mesh>
          ))}
          {Array.from({ length: FRONDS }, (_, k) => (
            <group key={k} rotation-y={(k * Math.PI * 2) / FRONDS + phase}>
              <group rotation-z={0.3}>
                <mesh geometry={leaf1} castShadow>
                  <Lp color={LEAF_COLORS[k % 3]} side={THREE.DoubleSide} />
                </mesh>
                <group position-x={1.5} rotation-z={-0.95}>
                  <mesh geometry={leaf2} castShadow>
                    <Lp color={LEAF_COLORS[(k + 1) % 3]} side={THREE.DoubleSide} />
                  </mesh>
                  {k % 2 === 0 && (
                    <mesh position-x={1.4}>
                      <icosahedronGeometry args={[0.09, 0]} />
                      <Neon color={BULB_COLORS[k % 3]} intensity={3} />
                    </mesh>
                  )}
                </group>
              </group>
            </group>
          ))}
        </group>
      </group>
    </group>
  )
}

function buildPalms() {
  const list = []
  const near = (x, z, min) => ZONES.some((zn) => Math.hypot(x - zn.x, z - zn.z) < min)

  // Anillo de palmeras en la orilla, inclinadas hacia el mar
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + (i % 3) * 0.08
    const r = 14 + (i % 2) * 0.8
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (near(x, z, 7.2)) continue
    list.push({ x, z, rotY: -a + ((i % 3) - 1) * 0.3, lean: 0.8 + (i % 4) * 0.2, height: 4.6 + (i % 5) * 0.4, scale: 0.95 + (i % 3) * 0.12, phase: i })
  }

  // Palmeras alrededor de la cabaña vampírica
  const cabin = ZONES.find((zn) => zn.id === 'experience')
  ;[[-4.6, 1.2], [-3.4, -4], [3.4, -3.6], [4.8, 2.4]].forEach(([dx, dz], i) => {
    list.push({ x: cabin.x + dx, z: cabin.z + dz, rotY: i * 1.7, lean: 0.9, height: 5 + (i % 2) * 0.6, scale: 1, phase: i * 2 })
  })
  return list
}

export default function Palms() {
  const leaf1 = useMemo(() => leafGeometry(1.5, 0.34), [])
  const leaf2 = useMemo(() => leafGeometry(1.4, 0.3), [])
  const palms = useMemo(buildPalms, [])
  return palms.map((p, i) => <Palm key={i} {...p} leaf1={leaf1} leaf2={leaf2} />)
}