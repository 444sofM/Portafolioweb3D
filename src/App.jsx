import { Canvas } from '@react-three/fiber'
import Scene from './scenes/Scene.jsx'

export default function App() {
  return (
    <Canvas
      camera={{ position: [12, 9, 12], fov: 50, near: 0.1, far: 200 }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  )
}