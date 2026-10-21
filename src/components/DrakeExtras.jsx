import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { C, Lp, Gold, Neon } from './lowpoly.jsx'
import { facingCenter } from '../data/layout.js'
import { terrainHeight } from './Terrain.jsx'
import { playerPos } from './Player.jsx'

function place(x, z) {
  return { position: [x, terrainHeight(x, z), z], rotation: [0, facingCenter(x, z), 0] }
}

// Escorpión neón original: cuerpo segmentado, pinzas y cola con aguijón
function Scorpion() {
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0.9 - i * 0.28, 0]} scale={[1 - i * 0.1, 0.7, 0.4]}>
          <sphereGeometry args={[0.28, 8, 6]} />
          <Neon color={C.gold} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.4, 1.15, 0]} rotation={[0, 0, s * -0.9]}>
            <capsuleGeometry args={[0.05, 0.4, 3, 6]} />
            <Neon color={C.hotPink} />
          </mesh>
          <mesh position={[s * 0.62, 1.4, 0]} scale={[0.9, 1.3, 0.4]}>
            <sphereGeometry args={[0.16, 8, 6]} />
            <Neon color={C.hotPink} />
          </mesh>
        </group>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0.05 + Math.sin(i * 0.55) * 0.55, 0.1 + i * 0.12, 0]} scale={[0.6, 0.6, 0.4]}>
          <sphereGeometry args={[0.15 - i * 0.012, 8, 6]} />
          <Neon color={C.gold} />
        </mesh>
      ))}
      <mesh position={[0.62, 0.75, 0]} rotation={[0, 0, -0.6]}>
        <coneGeometry args={[0.07, 0.25, 5]} />
        <Neon color={C.hotPink} />
      </mesh>
    </group>
  )
}

function ScorpionSign({ x, z }) {
  return (
    <group {...place(x, z)}>
      {[-1.5, 1.5].map((px) => (
        <mesh key={px} position={[px, 1.1, -0.1]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 2.2, 6]} />
          <Lp color={C.purple} />
        </mesh>
      ))}
      <mesh position={[0, 2.7, -0.08]}>
        <circleGeometry args={[2.1, 28]} />
        <meshBasicMaterial color={C.hotPink} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <group position={[0, 1.9, 0]} scale={1.15}>
        <Scorpion />
      </group>
    </group>
  )
}

// Cabina telefónica retro: el teléfono rosa "suena" al acercarse
function PhoneBooth({ x, z }) {
  const phone = useRef()
  const glow = useRef()

  useFrame(({ clock }) => {
    const d = Math.hypot(playerPos.x - x, playerPos.z - z)
    const ringing = d < 4.5
    const t = clock.elapsedTime
    phone.current.rotation.z = ringing ? Math.sin(t * 40) * 0.18 : 0
    glow.current.intensity = ringing ? 8 + Math.sin(t * 20) * 5 : 1
  })

  return (
    <group {...place(x, z)}>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <Lp color={C.purple} />
      </mesh>
      {[[-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7]].map(([px, pz]) => (
        <mesh key={`${px}${pz}`} position={[px, 1.2, pz]}>
          <boxGeometry args={[0.1, 2.1, 0.1]} />
          <Lp color={C.hotPink} />
        </mesh>
      ))}
      <mesh position={[0, 2.35, 0]} castShadow>
        <boxGeometry args={[1.7, 0.22, 1.7]} />
        <Lp color={C.hotPink} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.35, 2.0, 1.35]} />
        <meshStandardMaterial color="#ffd1e6" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.2, -0.65]}>
        <boxGeometry args={[1.35, 2.0, 0.08]} />
        <Lp color={C.deepPurple} />
      </mesh>
      <mesh position={[0, 2.2, 0.82]}>
        <boxGeometry args={[1.2, 0.12, 0.02]} />
        <Neon color={C.gold} />
      </mesh>
      <pointLight ref={glow} position={[0, 1.6, 0.2]} color="#ff5fb0" intensity={1} distance={6} />
      <group position={[0, 1.3, -0.55]}>
        <mesh>
          <boxGeometry args={[0.45, 0.5, 0.12]} />
          <Lp color={C.pink} rough={0.3} />
        </mesh>
        <group ref={phone}>
          <mesh position={[0, 0.32, 0.1]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.07, 0.4, 4, 8]} />
            <Lp color={C.hotPink} rough={0.25} />
          </mesh>
        </group>
        <mesh position={[0, -0.05, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.04, 12]} />
          <Gold />
        </mesh>
      </group>
    </group>
  )
}

// Disco de platino: vinilo dorado enmarcado
function PlatinumDisc({ x, z }) {
  const disc = useRef()
  useFrame((_, dt) => {
    disc.current.rotation.z += dt * 0.6
  })
  return (
    <group {...place(x, z)}>
      <mesh position={[0, 1.5, -0.05]}>
        <boxGeometry args={[2.1, 2.1, 0.12]} />
        <Lp color={C.deepPurple} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.95, 1.95, 0.05]} />
        <Gold />
      </mesh>
      <mesh position={[0, 1.5, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.03, 24]} />
        <meshStandardMaterial color="#12081a" roughness={0.3} metalness={0.4} />
      </mesh>
      <group ref={disc} position={[0, 1.5, 0.07]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.03, 20]} />
          <Gold />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 10]} />
          <Neon color={C.gold} />
        </mesh>
      </group>
      <Text position={[0, 0.35, 0.05]} fontSize={0.2} color="#ffd166" anchorX="center" anchorY="middle">
        PLATINO
      </Text>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.1, 0.1, 0.5]} />
        <Lp color={C.purple} />
      </mesh>
    </group>
  )
}

export default function DrakeExtras() {
  return (
    <>
      <ScorpionSign x={-3.5} z={-13.5} />
      <PhoneBooth x={8} z={-9.5} />
      <PlatinumDisc x={-0.5} z={-14.5} />
    </>
  )
}
