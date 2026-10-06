import { Environment, Lightformer, OrbitControls, Sparkles } from '@react-three/drei'
import Island from './Island.jsx'

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#cdeefe']} />
      <fog attach="fog" args={['#cdeefe', 55, 130]} />

      <hemisphereLight args={['#fff4fa', '#f7c9a6', 0.9]} />
      <directionalLight
        castShadow
        position={[18, 26, 12]}
        intensity={2.4}
        color="#fff1e0"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-24}
        shadow-camera-right={24}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-camera-near={1}
        shadow-camera-far={80}
        shadow-bias={-0.0004}
        shadow-normalBias={0.04}
      />

      {/* Entorno sin descargas externas: da reflejos a metales y espejos */}
      <Environment resolution={256} environmentIntensity={0.7}>
        <Lightformer form="rect" intensity={3} color="#fff" position={[0, 8, -6]} scale={[20, 6, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffd1e6" position={[-8, 3, 6]} scale={[10, 6, 1]} />
        <Lightformer form="rect" intensity={2} color="#cfeaff" position={[8, 3, 6]} scale={[10, 6, 1]} />
      </Environment>

      <Island />
      <Sparkles count={70} scale={[34, 7, 34]} position-y={4} size={4} speed={0.3} color="#ffc2dd" />

      <OrbitControls
        target={[0, 0.5, 0]}
        enablePan={false}
        minDistance={8}
        maxDistance={48}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.05}
        enableDamping
      />
    </>
  )
}