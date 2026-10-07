import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { C, Lp, Gold, Neon } from '../lowpoly.jsx'

function Vinyl({ position, speed = 2.2, scale = 1 }) {
  const ref = useRef()
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * speed
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 14]} />
        <Gold />
      </mesh>
      <mesh position-y={0.025}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 8]} />
        <Lp color={C.hotPink} />
      </mesh>
      <mesh position={[0.28, 0.03, 0]}>
        <boxGeometry args={[0.12, 0.01, 0.03]} />
        <Lp color={C.black} />
      </mesh>
    </group>
  )
}

function Speaker({ x }) {
  return (
    <group position={[x, 0, -0.6]}>
      <mesh position-y={1.6} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.4, 1.0]} />
        <Lp color={C.black} />
      </mesh>
      {[[0.95, 0.5], [1.85, 0.2]].map(([y, r], i) => (
        <group key={i} position={[0, y + 0.1, 0.51]}>
          <mesh rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[r + 0.2, r + 0.2, 0.06, 10]} />
            <Lp color={C.hotPink} />
          </mesh>
          <mesh position-z={0.02} rotation-x={Math.PI / 2}>
            <torusGeometry args={[r + 0.22, 0.04, 4, 10]} />
            <Gold />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 2.82, 0.3]}>
        <boxGeometry args={[1.0, 0.05, 0.05]} />
        <Neon color="#35f0dc" intensity={2.2} />
      </mesh>
    </group>
  )
}

function Owl() {
  return (
    <group position={[2.7, 2.8, -0.5]} rotation-y={-0.5} scale={1.25}>
      <mesh position-y={0.45} scale={[1, 1.2, 0.9]} castShadow>
        <icosahedronGeometry args={[0.5, 1]} />
        <Lp color="#6b2d9a" />
      </mesh>
      <mesh position={[0, 0.35, 0.22]} scale={[0.75, 1, 0.5]}>
        <icosahedronGeometry args={[0.4, 1]} />
        <Lp color="#ffc2e0" />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.5, 0.4, 0]} rotation-z={s * 0.35} scale={[0.35, 1, 0.6]} castShadow>
            <icosahedronGeometry args={[0.4, 0]} />
            <Lp color="#4a1d73" />
          </mesh>
          <mesh position={[s * 0.2, 0.78, 0.4]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.2, 0.2, 0.06, 8]} />
            <Lp color="#ffe066" rough={0.3} />
          </mesh>
          <mesh position={[s * 0.2, 0.78, 0.44]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 6]} />
            <Lp color={C.black} />
          </mesh>
          <mesh position={[s * 0.28, 1.12, 0]} rotation-z={-s * 0.3} castShadow>
            <coneGeometry args={[0.12, 0.3, 4]} />
            <Lp color="#4a1d73" />
          </mesh>
          <mesh position={[s * 0.5, 0.82, 0]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <Lp color={C.hotPink} />
          </mesh>
          <mesh position={[s * 0.15, -0.02, 0.2]}>
            <boxGeometry args={[0.18, 0.06, 0.25]} />
            <Gold />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.65, 0.5]} rotation-x={Math.PI / 2}>
        <coneGeometry args={[0.08, 0.22, 4]} />
        <Gold />
      </mesh>
      <mesh position-y={0.9}>
        <torusGeometry args={[0.52, 0.05, 4, 8, Math.PI]} />
        <Lp color={C.hotPink} />
      </mesh>
    </group>
  )
}

function DiscoBall() {
  const ref = useRef()
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.8
  })
  return (
    <group position={[0, 3.6, -1.5]}>
      <mesh position-y={0.55}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 4]} />
        <Lp color={C.white} />
      </mesh>
      <mesh ref={ref} castShadow>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#ffd6f0" flatShading metalness={1} roughness={0.15} emissive="#ff9ad0" emissiveIntensity={0.25} />
      </mesh>
    </group>
  )
}

// Tarima de DJ con vinilos dorados y un búho.
export default function DjStage() {
  return (
    <group>
      <mesh position-y={0.2} castShadow receiveShadow>
        <cylinderGeometry args={[3.7, 3.9, 0.4, 10]} />
        <Lp color={C.deepPurple} />
      </mesh>
      <mesh position-y={0.43} rotation-x={Math.PI / 2}>
        <torusGeometry args={[3.55, 0.06, 4, 20]} />
        <Neon color="#35f0dc" intensity={2.4} />
      </mesh>

      {/* arcos neón */}
      <mesh position={[0, 0.4, -1.5]}>
        <torusGeometry args={[3.2, 0.09, 5, 16, Math.PI]} />
        <Neon color="#35f0dc" intensity={2.6} />
      </mesh>
      <mesh position={[0, 0.4, -1.5]}>
        <torusGeometry args={[2.8, 0.07, 5, 16, Math.PI]} />
        <Neon color="#ff4fb2" intensity={2.6} />
      </mesh>
      <DiscoBall />

      {/* cabina */}
      <mesh position={[0, 0.95, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.1, 1.1]} />
        <Lp color={C.fuchsia} />
      </mesh>
      <mesh position={[0, 1.54, -0.2]} castShadow>
        <boxGeometry args={[2.9, 0.08, 1.2]} />
        <Gold />
      </mesh>
      <mesh position={[0, 0.95, 0.37]}>
        <boxGeometry args={[2.4, 0.07, 0.06]} />
        <Neon color="#35f0dc" intensity={2.4} />
      </mesh>
      <Vinyl position={[-0.8, 1.62, -0.2]} />
      <Vinyl position={[0.8, 1.62, -0.2]} speed={-2.6} />
      <mesh position={[0, 1.62, -0.2]} castShadow>
        <boxGeometry args={[0.5, 0.08, 0.8]} />
        <Lp color={C.black} />
      </mesh>
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 1.68, -0.2]}>
          <boxGeometry args={[0.05, 0.05, 0.3]} />
          <Neon color={x < 0 ? '#ff4fb2' : '#35f0dc'} intensity={2.6} />
        </mesh>
      ))}

      <Speaker x={-2.7} />
      <Speaker x={2.7} />
      <Owl />

      {/* vinilos dorados apoyados */}
      {[-2.2, -1.4, -0.6].map((x, i) => (
        <group key={x} position={[x, 0.4 + 0.8, 2.3 - i * 0.12]} rotation-x={-0.18}>
          <mesh rotation-x={Math.PI / 2} castShadow>
            <cylinderGeometry args={[0.8, 0.8, 0.05, 14]} />
            <Gold />
          </mesh>
          <mesh position-z={0.03} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.28, 0.28, 0.04, 8]} />
            <Lp color={i % 2 ? C.turq : C.hotPink} />
          </mesh>
        </group>
      ))}
    </group>
  )
}