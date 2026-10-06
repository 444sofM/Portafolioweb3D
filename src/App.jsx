import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <Canvas>
      <color attach="background" args={['#87ceeb']} />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
  )
}
