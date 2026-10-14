import { Canvas } from '@react-three/fiber'
import Scene from './scenes/Scene'

export default function App() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [6, 5, 8], fov: 50, near: 0.1, far: 200 }}
      gl={{ antialias: true }}
    >
      <Scene />
    </Canvas>
  )
}
