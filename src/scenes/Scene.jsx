import { OrbitControls } from '@react-three/drei'
import Island from './Island.jsx'

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#87ceeb']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 15, 5]} intensity={1.5} />
      <Island />

      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        minDistance={6}
        maxDistance={25}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.05}
        enableDamping
      />
    </>
  )
}