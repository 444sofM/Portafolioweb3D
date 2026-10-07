import * as THREE from 'three'
import { C, Lp, Gold, Neon } from '../lowpoly.jsx'

// Playa: sombrilla rosa, tumbona y cóctel gigante.
function Umbrella() {
  const slices = 8
  return (
    <group position={[-1.7, 0, -1.2]} rotation-z={-0.08}>
      <mesh position-y={1.8} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 3.6, 6]} />
        <Gold />
      </mesh>
      <group position-y={3.7}>
        {Array.from({ length: slices }, (_, i) => (
          <mesh key={i} castShadow receiveShadow>
            <coneGeometry args={[2.3, 1.0, 1, 1, true, (i * Math.PI * 2) / slices, (Math.PI * 2) / slices]} />
            <Lp color={i % 2 ? C.white : C.hotPink} side={THREE.DoubleSide} />
          </mesh>
        ))}
        <mesh position-y={0.55}>
          <icosahedronGeometry args={[0.13, 0]} />
          <Gold />
        </mesh>
      </group>
    </group>
  )
}

function Lounger() {
  return (
    <group position={[0.1, 0, 1.5]} rotation-y={-0.25}>
      {[[-0.55, -0.7], [0.55, -0.7], [-0.55, 0.7], [0.55, 0.7]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.22, z]} castShadow>
          <boxGeometry args={[0.1, 0.44, 0.1]} />
          <Gold />
        </mesh>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0.5, 0.55 - i * 0.42 + 0.35]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.12, 0.38]} />
          <Lp color={i % 2 ? C.white : C.turq} />
        </mesh>
      ))}
      <group position={[0, 0.56, -0.95]} rotation-x={0.95}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, 0, -0.2 - i * 0.4]} castShadow>
            <boxGeometry args={[1.3, 0.12, 0.38]} />
            <Lp color={i % 2 ? C.white : C.turq} />
          </mesh>
        ))}
        <mesh position={[0, 0.12, -1.55]} castShadow>
          <boxGeometry args={[0.9, 0.22, 0.5]} />
          <Lp color={C.pink} />
        </mesh>
      </group>
    </group>
  )
}

function GiantCocktail() {
  return (
    <group position={[2.5, 0, -0.4]}>
      <mesh position-y={0.06} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.8, 0.12, 8]} />
        <Gold />
      </mesh>
      <mesh position-y={0.85} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 1.6, 6]} />
        <Gold />
      </mesh>
      <mesh position-y={2.35} castShadow>
        <cylinderGeometry args={[1.05, 0.1, 1.6, 8]} />
        <meshStandardMaterial color={C.turq} flatShading transparent opacity={0.5} roughness={0.1} />
      </mesh>
      <mesh position-y={2.15}>
        <cylinderGeometry args={[0.92, 0.1, 1.2, 8]} />
        <Lp color={C.fuchsia} />
      </mesh>
      <mesh position={[0.95, 3.1, 0.1]} rotation={[Math.PI / 2, 0, -0.4]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 8]} />
        <Lp color="#ffe066" />
      </mesh>
      <mesh position={[0.3, 3.3, 0]} rotation-z={-0.3} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.9, 6]} />
        <Lp color={C.white} />
      </mesh>
      <mesh position={[0.62, 4.15, 0]} rotation-z={-0.3}>
        <cylinderGeometry args={[0.052, 0.052, 0.25, 6]} />
        <Lp color={C.hotPink} />
      </mesh>
      <group position={[-0.5, 3.35, 0.2]} rotation-z={0.15}>
        <mesh position-y={0.55} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 1.1, 5]} />
          <Gold />
        </mesh>
        <mesh position-y={1.2}>
          <coneGeometry args={[0.5, 0.3, 6]} />
          <Neon color={C.gold} intensity={1.4} />
        </mesh>
      </group>
      <mesh position={[-0.2, 3.05, 0.35]}>
        <icosahedronGeometry args={[0.17, 0]} />
        <Lp color={C.fuchsia} rough={0.3} />
      </mesh>
    </group>
  )
}

export default function Beach() {
  return (
    <group>
      <Umbrella />
      <Lounger />
      <GiantCocktail />
    </group>
  )
}