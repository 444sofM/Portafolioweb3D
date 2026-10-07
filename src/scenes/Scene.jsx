import { Environment, Lightformer, OrbitControls, Sparkles } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import Island from './Island.jsx'
import Sky, { SKY_HORIZON } from '../components/Sky.jsx'
import { LabelProjector } from '../components/Labels.jsx'
import CameraRig from '../components/CameraRig.jsx'

export default function Scene({ activeId, onSelect }) {
  return (
    <>
      <fog attach="fog" args={[SKY_HORIZON, 70, 170]} />
      <Sky />

      <hemisphereLight args={['#ffe3f0', '#ffb8c8', 0.65]} />
      {/* Sol de atardecer: cálido y bajo, con sombras largas */}
      <directionalLight
        castShadow
        position={[-28, 15, -10]}
        intensity={2.6}
        color="#ffb08a"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-near={1}
        shadow-camera-far={110}
        shadow-bias={-0.0005}
        shadow-normalBias={0.06}
      />
      <directionalLight position={[22, 10, 22]} intensity={0.3} color="#ff8fd8" />

      {/* Entorno sin descargas externas: reflejos rosas, turquesa y dorados */}
      <Environment resolution={256} environmentIntensity={0.7}>
        <Lightformer form="rect" intensity={3} color="#ffd1e6" position={[0, 8, -6]} scale={[20, 6, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#ff77c8" position={[-8, 3, 6]} scale={[10, 6, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#2ed3c6" position={[8, 3, 6]} scale={[10, 6, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffd166" position={[0, 2, 10]} scale={[12, 3, 1]} />
      </Environment>

      <Island activeId={activeId} onSelect={onSelect} />
      <LabelProjector />
      <CameraRig activeId={activeId} />
      <Sparkles count={90} scale={[40, 9, 40]} position-y={5} size={5} speed={0.3} color="#ffd166" />
      <Sparkles count={60} scale={[40, 9, 40]} position-y={5} size={4} speed={0.2} color="#ff9ad0" />

      <OrbitControls
        makeDefault
        target={[0, 1, 0]}
        enablePan={false}
        minDistance={8}
        maxDistance={58}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.05}
        enableDamping
      />

      <EffectComposer multisampling={4}>
        <Bloom intensity={0.9} luminanceThreshold={0.9} luminanceSmoothing={0.2} mipmapBlur />
      </EffectComposer>
    </>
  )
}