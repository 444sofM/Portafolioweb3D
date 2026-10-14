import { C, Lp, Gold, Neon } from '../lowpoly.jsx'

function Plate({ x, r, h = 0.18 }) {
  return (
    <mesh position={[x, 1.75, -0.8]} rotation-z={Math.PI / 2} castShadow>
      <cylinderGeometry args={[r, r, h, 10]} />
      <Lp color={C.hotPink} rough={0.4} />
    </mesh>
  )
}

function Dumbbell({ position, rotY = 0, color = C.pink }) {
  return (
    <group position={position} rotation-y={rotY}>
      <mesh rotation-z={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.9, 6]} />
        <Gold />
      </mesh>
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation-z={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 6]} />
          <Lp color={color} />
        </mesh>
      ))}
    </group>
  )
}

function NeonLetters() {
  const bar = (key, x, y, w, h, color) => (
    <mesh key={key} position={[x, y, 0]}>
      <boxGeometry args={[w, h, 0.1]} />
      <Neon color={color} intensity={3} />
    </mesh>
  )
  const P = '#ff4fb2'
  const T = '#35f0dc'
  return (
    <group position={[0, 0.05, 0.12]}>
      {/* F */}
      <group position={[-1.3, 0, 0]}>
        {bar('f1', -0.25, 0, 0.2, 1.3, P)}
        {bar('f2', 0.05, 0.55, 0.7, 0.2, P)}
        {bar('f3', 0, 0, 0.5, 0.2, P)}
      </group>
      {/* I */}
      <group position={[0, 0, 0]}>
        {bar('i1', 0, 0, 0.2, 1.3, T)}
        {bar('i2', 0, 0.55, 0.7, 0.2, T)}
        {bar('i3', 0, -0.55, 0.7, 0.2, T)}
      </group>
      {/* T */}
      <group position={[1.3, 0, 0]}>
        {bar('t1', 0, 0.55, 0.9, 0.2, P)}
        {bar('t2', 0, -0.05, 0.2, 1.2, P)}
      </group>
    </group>
  )
}

// Gimnasio de entrenamiento funcional: pesas rosas y letrero neón.
export default function Gym() {
  return (
    <group>
      <mesh position-y={0.05} receiveShadow castShadow>
        <boxGeometry args={[6.6, 0.1, 4.8]} />
        <Lp color="#d81b7a" rough={0.9} />
      </mesh>
      {[-2.9, 2.9].map((x) => (
        <mesh key={x} position={[x, 0.11, 0]}>
          <boxGeometry args={[0.1, 0.02, 4.6]} />
          <Neon color="#35f0dc" intensity={1.8} />
        </mesh>
      ))}

      {/* Rack y barra */}
      {[-1.4, 1.4].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.3, -0.8]} castShadow>
            <boxGeometry args={[0.18, 2.6, 0.18]} />
            <Lp color={C.black} />
          </mesh>
          <mesh position={[x, 1.65, -0.8]} castShadow>
            <boxGeometry args={[0.3, 0.1, 0.3]} />
            <Gold />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 2.6, -0.8]} castShadow>
        <boxGeometry args={[3.1, 0.12, 0.14]} />
        <Gold />
      </mesh>
      <mesh position={[0, 1.8, -0.8]} rotation-z={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 4.4, 6]} />
        <Gold />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Plate x={s * 1.95} r={0.85} />
          <Plate x={s * 2.17} r={0.62} />
          <mesh position={[s * 1.77, 1.75, -0.8]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 6]} />
            <Gold />
          </mesh>
        </group>
      ))}

      <Dumbbell position={[-2.1, 0.3, 1.2]} rotY={0.4} />
      <Dumbbell position={[-1.5, 0.3, 1.75]} rotY={-0.2} color={C.turq} />
      <Dumbbell position={[-0.7, 0.3, 1.3]} rotY={0.15} />

      <group position={[1.7, 0, 1.5]}>
        <mesh position-y={0.5} castShadow>
          <icosahedronGeometry args={[0.5, 1]} />
          <Lp color={C.hotPink} rough={0.35} />
        </mesh>
        <mesh position-y={1.1} rotation-x={0} castShadow>
          <torusGeometry args={[0.3, 0.07, 5, 8]} />
          <Gold />
        </mesh>
      </group>
      <group position={[2.6, 0, 0.2]} rotation-y={-0.3}>
        <mesh position-y={0.6} castShadow receiveShadow>
          <boxGeometry args={[1.3, 1.1, 1.1]} />
          <Lp color={C.turq} />
        </mesh>
        <mesh position-y={1.16} castShadow>
          <boxGeometry args={[1.36, 0.1, 1.16]} />
          <Lp color={C.pink} />
        </mesh>
      </group>

      {/* Letrero neón */}
      <group position={[0, 0, -2.1]}>
        {[-2.1, 2.1].map((x) => (
          <mesh key={x} position={[x, 1.2, 0]} castShadow>
            <boxGeometry args={[0.2, 2.4, 0.2]} />
            <Gold />
          </mesh>
        ))}
        <mesh position={[0, 3.2, 0]} castShadow>
          <boxGeometry args={[4.8, 2.3, 0.18]} />
          <Lp color={C.deepPurple} />
        </mesh>
        {[[0, 1.1, 4.6, 0.07], [0, -1.1, 4.6, 0.07]].map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, 3.2 + y, 0.1]}>
            <boxGeometry args={[w, h, 0.06]} />
            <Neon color="#35f0dc" intensity={2.4} />
          </mesh>
        ))}
        {[-2.3, 2.3].map((x) => (
          <mesh key={x} position={[x, 3.2, 0.1]}>
            <boxGeometry args={[0.07, 2.2, 0.06]} />
            <Neon color="#35f0dc" intensity={2.4} />
          </mesh>
        ))}
        <group position={[0, 3.2, 0.1]}>
          <NeonLetters />
        </group>
      </group>
    </group>
  )
}