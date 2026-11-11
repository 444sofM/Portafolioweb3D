import { OrbitControls, Sparkles } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import Island from './Island.jsx'
import Sky, { SKY_HORIZON } from '../components/Sky.jsx'
import Lighting from '../components/Lighting.jsx'
import Character from '../components/Character.jsx'
import { LabelProjector } from '../components/Labels.jsx'
import CameraRig from '../components/CameraRig.jsx'
import DrakeExtras from '../components/DrakeExtras.jsx'
import Neon444 from '../components/Neon444.jsx'

export default function Scene({ activeId, onSelect }) {
  return (
    <>
      <fog attach="fog" args={[SKY_HORIZON, 70, 170]} />
      <Sky />

      <Lighting />

      <Island activeId={activeId} onSelect={onSelect} />
      <Neon444 />
      <DrakeExtras />
      <Character />
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