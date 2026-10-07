import { useMemo } from 'react'
import * as THREE from 'three'
import { C, Lp, Gold, Neon } from '../lowpoly.jsx'
import { heartShape } from '../shapes.js'

function Lipstick({ color = C.fuchsia, position, scale = 1, tilt = 0 }) {
  return (
    <group position={position} scale={scale} rotation-z={tilt}>
      <mesh position-y={0.4} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.8, 8]} />
        <Gold />
      </mesh>
      <mesh position-y={0.84} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.1, 8]} />
        <Lp color={C.black} />
      </mesh>
      <mesh position-y={1.15} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.55, 8]} />
        <Lp color={color} rough={0.35} />
      </mesh>
      <mesh position-y={1.52} rotation-z={0.25} castShadow>
        <coneGeometry args={[0.2, 0.32, 8]} />
        <Lp color={color} rough={0.35} />
      </mesh>
    </group>
  )
}

function MirrorBulbs() {
  const bulbs = useMemo(() => {
    const list = []
    for (let i = 0; i <= 6; i++) {
      const x = -1.55 + (i * 3.1) / 6
      list.push([x, 1.75], [x, -1.75])
    }
    for (let j = 1; j < 6; j++) {
      const y = -1.75 + (j * 3.5) / 6
      list.push([-1.55, y], [1.55, y])
    }
    return list
  }, [])
  return bulbs.map(([x, y], i) => (
    <mesh key={i} position={[x, y, 0.1]}>
      <icosahedronGeometry args={[0.1, 0]} />
      <Neon color="#fff0b8" intensity={3.2} />
    </mesh>
  ))
}

// Tocador con espejo de luces y labiales gigantes.
export default function Vanity() {
  const cushion = useMemo(() => new THREE.ExtrudeGeometry(heartShape(0.3), { depth: 0.12, bevelEnabled: false }), [])
  return (
    <group>
      <mesh position-y={0.03} receiveShadow>
        <cylinderGeometry args={[3.4, 3.4, 0.06, 8]} />
        <Lp color={C.fuchsia} rough={0.9} />
      </mesh>
      <mesh position-y={0.015} receiveShadow>
        <cylinderGeometry args={[3.55, 3.55, 0.03, 8]} />
        <Gold />
      </mesh>

      {[[-1.9, -0.6], [1.9, -0.6], [-1.9, 0.6], [1.9, 0.6]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.75, z]} castShadow>
          <boxGeometry args={[0.14, 1.5, 0.14]} />
          <Gold />
        </mesh>
      ))}
      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.3, 0.18, 1.7]} />
        <Lp color={C.pink} />
      </mesh>
      <mesh position={[0, 1.32, 0.8]} castShadow>
        <boxGeometry args={[2.2, 0.45, 0.08]} />
        <Lp color={C.hotPink} />
      </mesh>
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 1.32, 0.88]}>
          <icosahedronGeometry args={[0.08, 0]} />
          <Gold />
        </mesh>
      ))}

      <group position={[0, 3.55, -0.65]}>
        <mesh castShadow>
          <boxGeometry args={[3.5, 3.8, 0.14]} />
          <Gold />
        </mesh>
        <mesh position-z={0.09}>
          <boxGeometry args={[3.0, 3.3, 0.05]} />
          <meshStandardMaterial color="#d9f2ff" emissive="#9fd8ff" emissiveIntensity={0.35} metalness={0.4} roughness={0.08} flatShading />
        </mesh>
        <MirrorBulbs />
      </group>
      {[-1.1, 1.1].map((x) => (
        <mesh key={x} position={[x, 1.72, -0.65]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <Gold />
        </mesh>
      ))}

      <Lipstick position={[-1.5, 1.69, 0.1]} scale={0.7} color={C.fuchsia} />
      <Lipstick position={[-1.05, 1.69, 0.3]} scale={0.6} color="#a3138f" />
      <Lipstick position={[1.5, 1.69, 0.15]} scale={0.7} color={C.hotPink} tilt={-0.25} />
      <mesh position={[0.6, 1.95, 0.1]} castShadow>
        <cylinderGeometry args={[0.3, 0.38, 0.55, 6]} />
        <meshStandardMaterial color="#ffd0ee" flatShading transparent opacity={0.75} roughness={0.1} />
      </mesh>
      <mesh position={[0.6, 2.35, 0.1]} castShadow>
        <icosahedronGeometry args={[0.16, 0]} />
        <Gold />
      </mesh>

      <Lipstick position={[-3.0, 0.02, 1.7]} scale={2.1} color={C.fuchsia} />
      <Lipstick position={[3.0, 0.02, 1.4]} scale={1.8} color="#8d1aa8" tilt={0.12} />
      <Lipstick position={[-2.1, 0.02, 2.6]} scale={1.3} color={C.hotPink} />

      <group position={[0, 0, 2.1]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI * 2) / 3) * 0.4, 0.4, Math.sin((i * Math.PI * 2) / 3) * 0.4]} rotation-y={0} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 5]} />
            <Gold />
          </mesh>
        ))}
        <mesh position-y={0.85} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.25, 8]} />
          <Lp color={C.velvet} rough={0.95} />
        </mesh>
        <mesh geometry={cushion} position={[0, 1.05, 0.05]} rotation-x={-Math.PI / 2} castShadow>
          <Lp color={C.pink} />
        </mesh>
      </group>
    </group>
  )
}