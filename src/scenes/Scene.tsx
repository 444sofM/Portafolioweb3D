import { OrbitControls } from '@react-three/drei'

// Escena base vacía: solo un cubo de prueba para verificar el render.
export default function Scene() {
  return (
    <>
      <color attach="background" args={['#2a1038']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#ff4fa3" />
      </mesh>
      <gridHelper args={[20, 20, '#ffd166', '#5b2a6e']} />
      <OrbitControls makeDefault />
    </>
  )
}
