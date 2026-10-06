import * as THREE from 'three'
import { useMemo } from 'react'
import Interactive from './Interactive.jsx'
import { heartShape } from './shapes.js'

const GOLD = { color: '#f6c85f', metalness: 0.75, roughness: 0.3 }

function Gold({ children, ...rest }) {
  return (
    <mesh castShadow {...rest}>
      {children}
      <meshStandardMaterial {...GOLD} />
    </mesh>
  )
}

// Polvera compacta con espejo — "Sobre mí"
function CompactMirror() {
  return (
    <group>
      <mesh position-y={0.18} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.36, 40]} />
        <meshStandardMaterial color="#ff7eb6" roughness={0.35} />
      </mesh>
      <Gold position-y={0.36} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.1, 0.05, 12, 48]} />
      </Gold>
      <mesh position-y={0.37} receiveShadow>
        <cylinderGeometry args={[0.92, 0.92, 0.04, 40]} />
        <meshStandardMaterial color="#f8cdb8" roughness={0.9} />
      </mesh>
      <mesh position={[0.35, 0.42, 0.3]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.06, 24]} />
        <meshStandardMaterial color="#ffe3d3" roughness={1} />
      </mesh>
      <group position={[0, 0.36, -1.1]} rotation-x={-1.75}>
        <mesh position-z={1.1} castShadow>
          <cylinderGeometry args={[1.1, 1.1, 0.16, 40]} />
          <meshStandardMaterial color="#ff7eb6" roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.09, 1.1]}>
          <cylinderGeometry args={[0.95, 0.95, 0.03, 40]} />
          <meshStandardMaterial color="#d6efff" metalness={0.35} roughness={0.08} emissive="#bfe6ff" emissiveIntensity={0.25} />
        </mesh>
        <Gold position={[0, -0.08, 1.1]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.97, 0.04, 10, 48]} />
        </Gold>
      </group>
    </group>
  )
}

// Frasco de perfume — "Experiencia"
function Perfume() {
  const heart = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(heartShape(0.28), { depth: 0.04, bevelEnabled: false })
    g.translate(0, 0, 0)
    return g
  }, [])
  return (
    <group>
      <mesh position-y={0.75} castShadow>
        <boxGeometry args={[1.5, 1.5, 0.9]} />
        <meshPhysicalMaterial color="#ffd0e4" transparent opacity={0.72} roughness={0.05} />
      </mesh>
      <mesh position-y={0.62}>
        <boxGeometry args={[1.3, 1.1, 0.7]} />
        <meshStandardMaterial color="#ff6fa8" roughness={0.3} />
      </mesh>
      <mesh geometry={heart} position={[0, 0.85, 0.46]}>
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>
      <Gold position-y={1.62}>
        <cylinderGeometry args={[0.2, 0.28, 0.2, 20]} />
      </Gold>
      <mesh position-y={2.05} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.7, 28]} />
        <meshStandardMaterial color="#f7b4cf" metalness={0.4} roughness={0.25} />
      </mesh>
      <Gold position-y={2.45}>
        <sphereGeometry args={[0.22, 20, 20]} />
      </Gold>
    </group>
  )
}

// Paleta de sombras — "Habilidades"
function Palette() {
  const colors = ['#ff6fa5', '#ffb86f', '#ffe36f', '#9be3a8', '#7fc8ff', '#c69bff']
  return (
    <group rotation-y={0.2}>
      <mesh position-y={0.1} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.2, 1.7]} />
        <meshStandardMaterial color="#ff9ec7" roughness={0.35} />
      </mesh>
      {colors.map((c, i) => (
        <mesh key={c} position={[(i % 3) * 0.8 - 0.8, 0.22, Math.floor(i / 3) * 0.7 - 0.38]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.08, 24]} />
          <meshStandardMaterial color={c} roughness={0.5} />
        </mesh>
      ))}
      <group position={[0, 0.2, -0.85]} rotation-x={-1.7}>
        <mesh position-z={0.85} castShadow>
          <boxGeometry args={[2.6, 0.12, 1.7]} />
          <meshStandardMaterial color="#ff9ec7" roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.08, 0.85]}>
          <boxGeometry args={[2.3, 0.04, 1.4]} />
          <meshStandardMaterial color="#ffe6f1" metalness={0.3} roughness={0.15} />
        </mesh>
      </group>
      <group position={[0.2, 0.3, 1.25]} rotation-y={0.5} rotation-z={Math.PI / 2}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.3, 10]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position-y={0.8} castShadow>
          <cylinderGeometry args={[0.1, 0.07, 0.3, 10]} />
          <meshStandardMaterial color="#e8b27c" roughness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

// Bolso — "Proyectos"
function Handbag() {
  const heart = useMemo(
    () => new THREE.ExtrudeGeometry(heartShape(0.16), { depth: 0.04, bevelEnabled: false }),
    [],
  )
  return (
    <group>
      <mesh position-y={0.7} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.4, 0.9]} />
        <meshStandardMaterial color="#b794f6" roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.15, 0.03]} castShadow>
        <boxGeometry args={[2.24, 0.55, 0.96]} />
        <meshStandardMaterial color="#c8aaff" roughness={0.35} />
      </mesh>
      <Gold position={[0, 0.9, 0.5]}>
        <boxGeometry args={[0.3, 0.3, 0.06]} />
      </Gold>
      <mesh geometry={heart} position={[0, 0.9, 0.53]}>
        <meshStandardMaterial color="#ff5fa2" roughness={0.3} />
      </mesh>
      <Gold position={[0, 1.4, 0]}>
        <torusGeometry args={[0.7, 0.06, 12, 32, Math.PI]} />
      </Gold>
    </group>
  )
}

// Sombrero de playa — "Contacto"
function SunHat() {
  return (
    <group>
      <mesh position-y={0.06} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 1.8, 0.1, 40]} />
        <meshStandardMaterial color="#ffe7a3" roughness={0.9} />
      </mesh>
      <mesh position-y={0.45} castShadow>
        <cylinderGeometry args={[0.7, 0.85, 0.7, 32]} />
        <meshStandardMaterial color="#ffe7a3" roughness={0.9} />
      </mesh>
      <mesh position-y={0.26}>
        <cylinderGeometry args={[0.87, 0.87, 0.2, 32]} />
        <meshStandardMaterial color="#ff5fa2" roughness={0.4} />
      </mesh>
      <mesh position={[0.87, 0.26, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#ff5fa2" roughness={0.4} />
      </mesh>
    </group>
  )
}

export const ITEMS = [
  { id: 'about', x: -8, z: 2.5, rotY: 0.9, scale: 1.6, labelY: 3.3, Model: CompactMirror },
  { id: 'experience', x: -3, z: -8, rotY: 0.3, scale: 1.3, labelY: 4.2, Model: Perfume },
  { id: 'skills', x: 6.5, z: -7, rotY: -0.4, scale: 1.5, labelY: 3.3, Model: Palette },
  { id: 'projects', x: 7.5, z: 5, rotY: -0.7, scale: 1.5, labelY: 4, Model: Handbag },
  { id: 'contact', x: 1, z: 7.5, rotY: 0.2, scale: 1.6, labelY: 2.3, Model: SunHat },]

export default function InteractiveProps({ activeId, onSelect }) {
  return ITEMS.map(({ id, Model, labelY, ...rest }) => (
    <Interactive
      key={id}
      id={id}
      active={activeId === id}
      onSelect={onSelect}
      {...rest}
    >
      <Model />
    </Interactive>
  ))
}