import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './scenes/Scene.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  return (
    <>
      <Canvas
        camera={{ position: [12, 9, 12], fov: 50, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        onCreated={() => setSceneReady(true)}
      >
        <Scene />
      </Canvas>
      <LoadingScreen sceneReady={sceneReady} entered={entered} onEnter={() => setEntered(true)} />
    </>
  )
}