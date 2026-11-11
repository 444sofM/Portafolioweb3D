import { useMemo } from 'react'
import { Environment, Lightformer } from '@react-three/drei'
import { SUN_DIR } from './Sky.jsx'

// Iluminación de atardecer (HU-08) y sombras dinámicas (HU-09).
// El sol usa SUN_DIR, el mismo vector que dibuja el disco solar en Sky.jsx,
// así las sombras siempre apuntan en sentido opuesto al sol visible.
const SUN_DISTANCE = 33

// Calidad del mapa de sombras según dispositivo: táctil/pantalla pequeña → 1024.
function shadowMapSize() {
  const lowEnd = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 800
  return lowEnd ? 1024 : 2048
}

export default function Lighting() {
  const sunPosition = useMemo(() => SUN_DIR.clone().multiplyScalar(SUN_DISTANCE).toArray(), [])
  const mapSize = useMemo(shadowMapSize, [])

  return (
    <>
      {/* Luz ambiental hemisférica: cielo rosado / suelo coral, evita zonas negras */}
      <hemisphereLight args={['#ffe3f0', '#ffb8c8', 0.65]} />

      {/* Sol de atardecer: cálido y bajo, con sombras largas */}
      <directionalLight
        castShadow
        position={sunPosition}
        intensity={2.6}
        color="#ffb08a"
        shadow-mapSize={[mapSize, mapSize]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-near={1}
        shadow-camera-far={110}
        shadow-bias={-0.0005}
        shadow-normalBias={0.06}
      />

      {/* Luz de relleno magenta desde el lado opuesto al sol (sin sombras) */}
      <directionalLight position={[22, 10, 22]} intensity={0.3} color="#ff8fd8" />

      {/* Entorno sin descargas externas: reflejos rosas, turquesa y dorados para materiales PBR */}
      <Environment resolution={256} environmentIntensity={0.7}>
        <Lightformer form="rect" intensity={3} color="#ffd1e6" position={[0, 8, -6]} scale={[20, 6, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#ff77c8" position={[-8, 3, 6]} scale={[10, 6, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#2ed3c6" position={[8, 3, 6]} scale={[10, 6, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffd166" position={[0, 2, 10]} scale={[12, 3, 1]} />
      </Environment>
    </>
  )
}
