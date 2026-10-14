import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { ISLAND_RADIUS, terrainHeight } from './Terrain.jsx'
import { readMove, useKeyboard } from '../hooks/useInput.js'

const SPEED = 5
// Límite caminable: la orilla de la isla
const WALK_RADIUS = ISLAND_RADIUS - 3

const SKIN = '#5C3A28'
const FUCHSIA = '#ff2d95'
const GOLD = '#ffd166'
const gold = { color: GOLD, metalness: 0.8, roughness: 0.25 }

const fwd = new THREE.Vector3()
const right = new THREE.Vector3()
const move = new THREE.Vector3()

// Muñeca placeholder (formas simples). El movimiento es relativo a la cámara.
export default function Player({ paused }) {
  useKeyboard()
  const group = useRef()
  const { camera, controls } = useThree()

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    dt = Math.min(dt, 0.05)
    const [mx, my] = paused ? [0, 0] : readMove()

    if (mx !== 0 || my !== 0) {
      camera.getWorldDirection(fwd)
      fwd.y = 0
      fwd.normalize()
      right.crossVectors(fwd, camera.up).normalize()
      move.set(0, 0, 0).addScaledVector(right, mx).addScaledVector(fwd, my)

      const prev = g.position.clone()
      g.position.addScaledVector(move, SPEED * dt)

      // Colisión básica: no salir del círculo de la isla
      const d = Math.hypot(g.position.x, g.position.z)
      if (d > WALK_RADIUS) {
        g.position.x *= WALK_RADIUS / d
        g.position.z *= WALK_RADIUS / d
      }

      let diff = Math.atan2(move.x, move.z) - g.rotation.y
      diff = Math.atan2(Math.sin(diff), Math.cos(diff))
      g.rotation.y += diff * Math.min(1, dt * 12)

      // La cámara sigue a la muñeca manteniendo el ángulo elegido
      if (controls) {
        const delta = g.position.clone().sub(prev)
        delta.y = 0
        camera.position.add(delta)
        controls.target.add(delta)
        controls.update()
      }
    }
    g.position.y = terrainHeight(g.position.x, g.position.z)
  })

  return (
    <group ref={group} position={[0, 0, 6]} scale={1.1}>
      {/* leggins */}
      {[-0.17, 0.17].map((x) => (
        <mesh key={x} position={[x, 0.42, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.55, 4, 8]} />
          <meshStandardMaterial color="#c2187a" />
        </mesh>
      ))}
      {/* top rosa fucsia */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.35, 4, 10]} />
        <meshStandardMaterial color={FUCHSIA} />
      </mesh>
      {/* abdomen y brazos */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.24, 0.26, 0.2, 10]} />
        <meshStandardMaterial color={SKIN} />
      </mesh>
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 1.05, 0]} rotation={[0, 0, x > 0 ? -0.15 : 0.15]} castShadow>
          <capsuleGeometry args={[0.09, 0.5, 4, 8]} />
          <meshStandardMaterial color={SKIN} />
        </mesh>
      ))}
      {/* cabeza grande estilo Bratz */}
      <mesh position={[0, 1.8, 0]} scale={[1, 1.05, 0.95]} castShadow>
        <sphereGeometry args={[0.4, 16, 14]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
      </mesh>
      {/* afro voluminoso con accesorios dorados */}
      <mesh position={[0, 2.0, -0.1]}>
        <sphereGeometry args={[0.52, 14, 12]} />
        <meshStandardMaterial color="#1a0f0a" roughness={1} />
      </mesh>
      <mesh position={[0.4, 2.25, -0.05]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      {/* ojos grandes */}
      {[-0.15, 0.15].map((x) => (
        <group key={x} position={[x, 1.83, 0.35]}>
          <mesh scale={[1, 1.2, 0.5]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#2a1008" />
          </mesh>
        </group>
      ))}
      {/* labios glossy */}
      <mesh position={[0, 1.64, 0.37]} scale={[1.6, 0.8, 0.8]}>
        <sphereGeometry args={[0.07, 10, 8]} />
        <meshStandardMaterial color="#ff4fa3" roughness={0.1} metalness={0.2} />
      </mesh>
      {/* aros grandes dorados */}
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 1.65, 0.02]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.12, 0.02, 6, 16]} />
          <meshStandardMaterial {...gold} />
        </mesh>
      ))}
      {/* collar con colgante 444 */}
      <mesh position={[0, 1.42, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.02, 6, 16]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      <mesh position={[0, 1.27, 0.3]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
        <meshStandardMaterial {...gold} emissive={GOLD} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}
