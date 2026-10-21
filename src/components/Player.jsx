import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { ISLAND_RADIUS, terrainHeight } from './Terrain.jsx'
import { readMove, useKeyboard } from '../hooks/useInput.js'

const SPEED = 5
// Límite caminable: la orilla de la isla
const WALK_RADIUS = ISLAND_RADIUS - 3

const SKIN = '#5C3A28'
const SKIN_LIGHT = '#74492f'
const FUCHSIA = '#ff2d95'
const GOLD = '#ffd166'
const HAIR = '#140a07'
const gold = { color: GOLD, metalness: 0.85, roughness: 0.2 }

// Posición compartida para que otros objetos (p. ej. el teléfono) reaccionen al acercarse
export const playerPos = new THREE.Vector3(0, 0, 6)

const fwd = new THREE.Vector3()
const right = new THREE.Vector3()
const move = new THREE.Vector3()

const BRAIDS = [-0.42, -0.3, -0.18, 0.18, 0.3, 0.42]

// Muñeca estilo Bratz: cabeza enorme, ojos almendrados con pestañas, labios glossy,
// trenzas largas con cuentas doradas, cuerpo delgado y pies grandes.
export default function Player({ paused }) {
  useKeyboard()
  const group = useRef()
  const body = useRef()
  const legL = useRef()
  const legR = useRef()
  const armL = useRef()
  const armR = useRef()
  const braids = useRef()
  const { camera, controls } = useThree()

  useFrame(({ clock }, dt) => {
    const g = group.current
    if (!g) return
    dt = Math.min(dt, 0.05)
    const [mx, my] = paused ? [0, 0] : readMove()
    const moving = mx !== 0 || my !== 0

    if (moving) {
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
    playerPos.copy(g.position)

    // Balanceo simple de caminata
    const t = clock.elapsedTime * 11
    const swing = moving ? Math.sin(t) * 0.55 : 0
    legL.current.rotation.x = swing
    legR.current.rotation.x = -swing
    armL.current.rotation.x = -swing * 0.8
    armR.current.rotation.x = swing * 0.8
    body.current.position.y = moving ? Math.abs(Math.sin(t)) * 0.05 : Math.sin(clock.elapsedTime * 2) * 0.01
    braids.current.rotation.x = moving ? Math.sin(t) * 0.08 : 0
  })

  return (
    <group ref={group} position={[0, 0, 6]} scale={1.15}>
      <group ref={body}>
        {/* piernas con leggins y botas plataforma */}
        {[[-0.14, legL], [0.14, legR]].map(([x, ref]) => (
          <group key={x} ref={ref} position={[x, 0.78, 0]}>
            <mesh position={[0, -0.35, 0]} castShadow>
              <capsuleGeometry args={[0.1, 0.5, 4, 8]} />
              <meshStandardMaterial color="#c2187a" />
            </mesh>
            <mesh position={[0, -0.72, 0.06]} castShadow>
              <boxGeometry args={[0.2, 0.14, 0.34]} />
              <meshStandardMaterial color="#fff6fb" />
            </mesh>
            <mesh position={[0, -0.8, 0.06]}>
              <boxGeometry args={[0.22, 0.06, 0.36]} />
              <meshStandardMaterial color={FUCHSIA} />
            </mesh>
          </group>
        ))}

        {/* cadera */}
        <mesh position={[0, 0.82, 0]} castShadow>
          <capsuleGeometry args={[0.22, 0.06, 4, 10]} />
          <meshStandardMaterial color="#c2187a" />
        </mesh>
        {/* cintura / abdomen al aire */}
        <mesh position={[0, 1.02, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.22, 10]} />
          <meshStandardMaterial color={SKIN} roughness={0.5} />
        </mesh>
        {/* top fucsia corto */}
        <mesh position={[0, 1.27, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.12, 4, 10]} />
          <meshStandardMaterial color={FUCHSIA} />
        </mesh>
        {/* cuello */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.14, 8]} />
          <meshStandardMaterial color={SKIN} roughness={0.5} />
        </mesh>

        {/* brazos delgados */}
        {[[-0.3, armL], [0.3, armR]].map(([x, ref]) => (
          <group key={x} ref={ref} position={[x, 1.38, 0]}>
            <mesh position={[0, -0.25, 0]} rotation={[0, 0, x > 0 ? -0.08 : 0.08]} castShadow>
              <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
              <meshStandardMaterial color={SKIN} roughness={0.5} />
            </mesh>
            {/* pulsera dorada */}
            <mesh position={[x > 0 ? 0.02 : -0.02, -0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.07, 0.015, 6, 12]} />
              <meshStandardMaterial {...gold} />
            </mesh>
          </group>
        ))}

        {/* cadenas y collar con 444 */}
        <mesh position={[0, 1.44, 0.03]} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[0.15, 0.014, 6, 16]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        <mesh position={[0, 1.38, 0.05]} rotation={[Math.PI / 2.8, 0, 0]}>
          <torusGeometry args={[0.2, 0.012, 6, 16]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        <mesh position={[0, 1.22, 0.215]}>
          <cylinderGeometry args={[0.07, 0.07, 0.015, 14]} />
          <meshStandardMaterial {...gold} emissive={GOLD} emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 1.22, 0.225]} fontSize={0.055} color="#5a3a00" anchorX="center" anchorY="middle">
          444
        </Text>

        {/* ===== CABEZA (muy grande, estilo Bratz) ===== */}
        <group position={[0, 1.95, 0]}>
          {/* pelo detrás y volumen */}
          <mesh position={[0, 0.08, -0.12]} scale={[1, 1.05, 0.9]}>
            <sphereGeometry args={[0.6, 18, 14]} />
            <meshStandardMaterial color={HAIR} roughness={0.9} />
          </mesh>
          {/* cara */}
          <mesh scale={[1, 1.02, 0.88]} castShadow>
            <sphereGeometry args={[0.5, 24, 18]} />
            <meshStandardMaterial color={SKIN} roughness={0.35} />
          </mesh>
          {/* mejillas luminosas */}
          {[-0.27, 0.27].map((x) => (
            <mesh key={x} position={[x, -0.1, 0.36]} scale={[1, 0.6, 0.3]}>
              <sphereGeometry args={[0.13, 10, 8]} />
              <meshStandardMaterial color={SKIN_LIGHT} roughness={0.3} emissive="#ff7a5c" emissiveIntensity={0.12} />
            </mesh>
          ))}
          {/* flequillo */}
          <mesh position={[0, 0.34, 0.12]} rotation={[0.5, 0, 0]} scale={[1.05, 0.35, 0.8]}>
            <sphereGeometry args={[0.5, 16, 10]} />
            <meshStandardMaterial color={HAIR} roughness={0.9} />
          </mesh>

          {/* ojos grandes, almendrados */}
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.2, 0.05, 0.39]} rotation={[0, s * -0.2, s * 0.12]}>
              {/* sombra de ojos fucsia */}
              <mesh position={[0, 0.07, -0.01]} scale={[1.25, 0.8, 0.3]}>
                <sphereGeometry args={[0.15, 12, 10]} />
                <meshStandardMaterial color={FUCHSIA} roughness={0.4} emissive={FUCHSIA} emissiveIntensity={0.25} />
              </mesh>
              {/* blanco */}
              <mesh scale={[1.3, 0.95, 0.35]}>
                <sphereGeometry args={[0.13, 14, 12]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
              {/* iris */}
              <mesh position={[0, -0.005, 0.04]} scale={[1, 1, 0.5]}>
                <sphereGeometry args={[0.085, 12, 10]} />
                <meshStandardMaterial color="#3b1d0f" roughness={0.2} />
              </mesh>
              {/* pupila */}
              <mesh position={[0, -0.005, 0.065]}>
                <sphereGeometry args={[0.04, 10, 8]} />
                <meshStandardMaterial color="#000" />
              </mesh>
              {/* brillo */}
              <mesh position={[0.035, 0.035, 0.085]}>
                <sphereGeometry args={[0.022, 8, 6]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              {/* párpado y pestañas largas */}
              <mesh position={[0, 0.1, 0.02]} rotation={[0, 0, Math.PI / 2]} scale={[0.4, 1.3, 0.5]}>
                <capsuleGeometry args={[0.02, 0.15, 3, 6]} />
                <meshStandardMaterial color="#0a0505" />
              </mesh>
              {[0, 1, 2].map((i) => (
                <mesh
                  key={i}
                  position={[s * (0.15 + i * 0.012), 0.08 + i * 0.03, 0.02]}
                  rotation={[0, 0, -s * (0.5 + i * 0.35)]}
                >
                  <capsuleGeometry args={[0.009, 0.1, 2, 4]} />
                  <meshStandardMaterial color="#0a0505" />
                </mesh>
              ))}
            </group>
          ))}

          {/* cejas definidas */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.2, 0.25, 0.4]} rotation={[0, s * -0.25, s * -0.22 + Math.PI / 2]} scale={[1, 1, 0.5]}>
              <capsuleGeometry args={[0.014, 0.17, 3, 6]} />
              <meshStandardMaterial color="#0a0505" />
            </mesh>
          ))}

          {/* nariz pequeña */}
          <mesh position={[0, -0.07, 0.45]} scale={[1, 0.7, 0.7]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color={SKIN_LIGHT} roughness={0.35} />
          </mesh>

          {/* labios grandes y glossy */}
          <mesh position={[0, -0.22, 0.4]} scale={[1.7, 0.7, 0.8]}>
            <sphereGeometry args={[0.07, 14, 10]} />
            <meshStandardMaterial color="#ff2d7a" roughness={0.05} metalness={0.3} emissive="#ff2d7a" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, -0.255, 0.4]} scale={[1.5, 0.6, 0.8]}>
            <sphereGeometry args={[0.07, 14, 10]} />
            <meshStandardMaterial color="#ff5fa3" roughness={0.05} metalness={0.3} emissive="#ff5fa3" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0.025, -0.25, 0.465]}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* aros dorados grandes con 444 */}
          {[-0.5, 0.5].map((x) => (
            <group key={x} position={[x, -0.18, 0]}>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.15, 0.017, 6, 20]} />
                <meshStandardMaterial {...gold} />
              </mesh>
              <mesh position={[x > 0 ? 0.01 : -0.01, -0.15, 0]} rotation={[0, Math.PI / 2, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial {...gold} emissive={GOLD} emissiveIntensity={0.4} />
              </mesh>
            </group>
          ))}

          {/* moño dorado */}
          <mesh position={[0.3, 0.52, 0]}>
            <sphereGeometry args={[0.07, 10, 8]} />
            <meshStandardMaterial {...gold} />
          </mesh>
        </group>

        {/* trenzas largas con cuentas doradas */}
        <group ref={braids} position={[0, 2.1, -0.18]}>
          {BRAIDS.map((x, i) => (
            <group key={x} position={[x * 1.35, 0, 0.02 * i - 0.04]}>
              <mesh position={[0, -0.6, 0]}>
                <capsuleGeometry args={[0.04, 1.0, 3, 6]} />
                <meshStandardMaterial color={HAIR} roughness={0.9} />
              </mesh>
              {[-0.35, -0.75, -1.1].map((y) => (
                <mesh key={y} position={[0, y, 0]}>
                  <sphereGeometry args={[0.035, 8, 6]} />
                  <meshStandardMaterial {...gold} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      </group>
    </group>
  )
}
