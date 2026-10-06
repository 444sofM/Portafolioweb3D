import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './Terrain.jsx'
import { starShape } from './shapes.js'

const PINK = '#ff7eb6'
const WHITE = '#ffffff'

function Placed({ x, z, y = 0, rotY = 0, scale = 1, children }) {
  return (
    <group position={[x, terrainHeight(x, z) + y, z]} rotation-y={rotY} scale={scale}>
      {children}
    </group>
  )
}

function Umbrella({ colors = [PINK, WHITE] }) {
  const slices = 8
  return (
    <group>
      <mesh position-y={1.4} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 2.8, 8]} />
        <meshStandardMaterial color="#f4ece4" roughness={0.4} />
      </mesh>
      <group position-y={2.9} rotation-z={0.08}>
        {Array.from({ length: slices }, (_, i) => (
          <mesh key={i} castShadow receiveShadow>
            <coneGeometry args={[2.2, 0.9, 5, 1, true, (i * Math.PI * 2) / slices, (Math.PI * 2) / slices]} />
            <meshStandardMaterial color={colors[i % 2]} side={THREE.DoubleSide} roughness={0.6} />
          </mesh>
        ))}
        <mesh position-y={0.47}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#f5c542" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

function Towel({ colors = [PINK, WHITE] }) {
  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[(i - 2.5) * 0.28, 0.03, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.28, 0.06, 2.1]} />
          <meshStandardMaterial color={colors[i % 2]} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function BeachBall({ radius = 0.6 }) {
  const palette = ['#ff6fa5', '#ffffff', '#ffd23f', '#ffffff', '#6ec8ff', '#ffffff']
  return (
    <group position-y={radius} rotation={[0.3, 0, 0.4]}>
      {palette.map((c, i) => (
        <mesh key={i} castShadow>
          <sphereGeometry args={[radius, 20, 14, (i * Math.PI) / 3, Math.PI / 3]} />
          <meshStandardMaterial color={c} roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

function Starfish({ color = '#ff9b85' }) {
  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(starShape(0.5, 0.22), {
      depth: 0.06,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.04,
      bevelSegments: 2,
    })
    g.rotateX(-Math.PI / 2)
    return g
  }, [])
  return (
    <mesh geometry={geometry} position-y={0.03} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  )
}

function Cocktail() {
  return (
    <group>
      <mesh position-y={0.04} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.05, 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      <mesh position-y={0.28} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      <mesh position-y={0.75} castShadow>
        <cylinderGeometry args={[0.34, 0.05, 0.5, 24, 1, true]} />
        <meshPhysicalMaterial color="#ffd6ea" transparent opacity={0.55} roughness={0.05} side={THREE.DoubleSide} />
      </mesh>
      <mesh position-y={0.68}>
        <cylinderGeometry args={[0.28, 0.06, 0.34, 24]} />
        <meshStandardMaterial color="#ff5fa2" roughness={0.3} />
      </mesh>
      <mesh position={[0.1, 0.95, 0]} rotation-z={-0.25} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.2, 0.98, 0.05]} castShadow>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#d81b60" roughness={0.3} />
      </mesh>
    </group>
  )
}

function Floatie({ x, z, color = PINK, phase = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase
    ref.current.position.y = 0.08 + Math.sin(t * 1.2) * 0.05
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.04
  })
  const arcs = 8
  return (
    <group ref={ref} position={[x, 0.08, z]}>
      <group rotation-x={Math.PI / 2}>
        {Array.from({ length: arcs }, (_, i) => (
          <group key={i} rotation-z={(i * Math.PI * 2) / arcs}>
            <mesh castShadow>
              <torusGeometry args={[1, 0.35, 14, 8, (Math.PI * 2) / arcs]} />
              <meshStandardMaterial color={i % 2 ? WHITE : color} roughness={0.35} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

export default function Decor() {
  return (
    <>
      <Placed x={-9} z={-6}><Umbrella /></Placed>
      <Placed x={9} z={-1} rotY={1}><Umbrella colors={['#b794f6', WHITE]} /></Placed>
      <Placed x={-2} z={9} rotY={2}><Umbrella colors={['#ffb36b', WHITE]} /></Placed>

      <Placed x={-7.6} z={-4.2} rotY={0.5}><Towel /></Placed>
      <Placed x={7.6} z={-2.4} rotY={-0.4}><Towel colors={['#b794f6', WHITE]} /></Placed>
      <Placed x={0.4} z={7.2} rotY={0.2}><Towel colors={['#ffb36b', WHITE]} /></Placed>

      <Placed x={3} z={1.5}><BeachBall /></Placed>
      <Placed x={-5} z={-9.5}><BeachBall radius={0.45} /></Placed>

      <Placed x={-1.5} z={-1.5} rotY={0.4}><Starfish /></Placed>
      <Placed x={10.5} z={6} rotY={1.2}><Starfish color="#ffb36b" /></Placed>
      <Placed x={-10.5} z={4.5} rotY={2.2}><Starfish color="#ff7eb6" /></Placed>
      <Placed x={4.5} z={-10.5} rotY={0.9}><Starfish color="#ffd1a6" /></Placed>
      <Placed x={12.2} z={-4} rotY={0.1} scale={0.8}><Starfish color="#ff9b85" /></Placed>

      <Placed x={-3.8} z={3.2}><Cocktail /></Placed>
      <Placed x={6.2} z={-6.6} rotY={1}><Cocktail /></Placed>

      <Floatie x={19} z={5} />
      <Floatie x={-18} z={-8} color="#b794f6" phase={2} />
      <Floatie x={4} z={19} color="#ffb36b" phase={4} />
    </>
  )
}