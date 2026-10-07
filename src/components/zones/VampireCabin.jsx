import { useMemo } from 'react'
import { C, Lp, Gold, Neon } from '../lowpoly.jsx'
import { gableGeometry, batGeometry } from '../shapes.js'

function Candle({ position, h = 0.6, r = 0.12 }) {
  return (
    <group position={position}>
      <mesh position-y={h / 2} castShadow>
        <cylinderGeometry args={[r, r, h, 6]} />
        <Lp color={C.cream} rough={0.8} />
      </mesh>
      <mesh position-y={h + 0.14}>
        <coneGeometry args={[0.07, 0.24, 5]} />
        <Neon color="#ffc15a" intensity={3.2} />
      </mesh>
    </group>
  )
}

function Window({ x }) {
  return (
    <group position={[x, 1.35, 1.42]}>
      <mesh>
        <boxGeometry args={[0.8, 1.0, 0.08]} />
        <Neon color="#ffa6dc" intensity={1.6} />
      </mesh>
      <mesh position-y={0.5} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.4, 0.4, 0.08, 6]} />
        <Neon color="#ffa6dc" intensity={1.6} />
      </mesh>
      {/* cortinas de terciopelo */}
      {[-0.52, 0.52].map((dx) => (
        <mesh key={dx} position={[dx, 0.05, 0.07]} castShadow>
          <boxGeometry args={[0.28, 1.5, 0.1]} />
          <Lp color={C.velvet} rough={0.95} />
        </mesh>
      ))}
      <mesh position={[0, 0.65, 0.06]}>
        <boxGeometry args={[1.5, 0.12, 0.12]} />
        <Gold />
      </mesh>
    </group>
  )
}

// Cabaña vampírica con velas y terciopelo.
export default function VampireCabin() {
  const roof = useMemo(() => gableGeometry(4.3, 2.0, 3.4), [])
  const bat = useMemo(() => batGeometry(), [])
  return (
    <group>
      <mesh position-y={0.03} receiveShadow>
        <cylinderGeometry args={[3.7, 3.7, 0.06, 8]} />
        <Lp color={C.deepPurple} rough={1} />
      </mesh>

      <mesh position-y={1.1} castShadow receiveShadow>
        <boxGeometry args={[3.7, 2.2, 3.0]} />
        <Lp color="#43195e" />
      </mesh>
      <mesh geometry={roof} position-y={2.2} castShadow receiveShadow>
        <Lp color="#1d1024" />
      </mesh>
      <mesh position={[0, 2.22, 1.7]}>
        <boxGeometry args={[4.4, 0.12, 0.12]} />
        <Neon color="#ff4fb2" intensity={1.8} />
      </mesh>
      <mesh position={[1.2, 3.7, -0.6]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <Lp color={C.deepPurple} />
      </mesh>
      <mesh position={[0, 4.28, 1.72]} castShadow>
        <coneGeometry args={[0.13, 0.5, 4]} />
        <Gold />
      </mesh>

      {/* puerta arqueada */}
      <group position={[0, 0, 1.52]}>
        <mesh position-y={0.75} castShadow>
          <boxGeometry args={[1.3, 1.5, 0.1]} />
          <Gold />
        </mesh>
        <mesh position={[0, 1.5, 0]} rotation-x={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.65, 0.65, 0.1, 8]} />
          <Gold />
        </mesh>
        <mesh position={[0, 0.7, 0.06]}>
          <boxGeometry args={[1.05, 1.4, 0.08]} />
          <Lp color={C.velvet} rough={0.95} />
        </mesh>
        <mesh position={[0, 1.4, 0.06]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.52, 0.52, 0.08, 8]} />
          <Lp color={C.velvet} rough={0.95} />
        </mesh>
        <mesh position={[0.35, 0.7, 0.14]}>
          <icosahedronGeometry args={[0.07, 0]} />
          <Gold />
        </mesh>
      </group>
      <Window x={-1.3} />
      <Window x={1.3} />

      {/* velas y candelabro */}
      <Candle position={[-2.2, 0.03, 2.2]} h={0.9} />
      <Candle position={[-2.55, 0.03, 1.95]} h={0.55} r={0.1} />
      <Candle position={[-1.9, 0.03, 2.5]} h={0.4} r={0.1} />
      <Candle position={[2.2, 0.03, 2.3]} h={0.7} />
      <Candle position={[2.55, 0.03, 2.0]} h={1.1} r={0.14} />
      <Candle position={[1.9, 0.03, 2.6]} h={0.45} r={0.1} />
      <pointLight position={[-2.2, 1.4, 2.4]} color="#ffb36b" intensity={5} distance={6} />
      <pointLight position={[2.3, 1.4, 2.4]} color="#ff8fd0" intensity={5} distance={6} />

      {/* verja gótica */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = -3.2 + i * 0.8
        if (Math.abs(x) < 0.9) return null
        return (
          <group key={i} position={[x, 0, 3.25]}>
            <mesh position-y={0.4} castShadow>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <Lp color={C.black} />
            </mesh>
            <mesh position-y={0.92} castShadow>
              <coneGeometry args={[0.1, 0.28, 4]} />
              <Gold />
            </mesh>
          </group>
        )
      })}

      <mesh geometry={bat} position={[-1.4, 4.2, 0.2]} rotation={[0, 0.5, 0.15]} scale={1.1} castShadow>
        <Lp color={C.black} />
      </mesh>
    </group>
  )
}