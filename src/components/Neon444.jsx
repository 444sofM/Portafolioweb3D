import { Text } from '@react-three/drei'
import { facingCenter } from '../data/layout.js'
import { terrainHeight } from './Terrain.jsx'

// Letrero neón 444 básico en la playa (todavía sin interacción)
export default function Neon444({ x = -11, z = -11 }) {
  const y = terrainHeight(x, z)
  return (
    <group position={[x, y, z]} rotation={[0, facingCenter(x, z), 0]}>
      {[-1.6, 1.6].map((px) => (
        <mesh key={px} position={[px, 1.2, -0.1]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 2.4, 6]} />
          <meshStandardMaterial color="#3a1650" />
        </mesh>
      ))}
      {/* halo de luz */}
      <mesh position={[0, 2.8, -0.08]}>
        <circleGeometry args={[2.6, 32]} />
        <meshBasicMaterial color="#ff4fa3" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <Text
        position={[0, 2.8, 0]}
        fontSize={1.8}
        color="#ffd166"
        outlineWidth={0.06}
        outlineColor="#ff2d95"
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        444
      </Text>
      <pointLight position={[0, 2.8, 1.2]} color="#ff7ac8" intensity={14} distance={9} />
    </group>
  )
}
