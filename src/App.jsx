import { useCallback, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './scenes/Scene.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import ZonePanel from './components/ZonePanel.jsx'
import { LabelsOverlay } from './components/Labels.jsx'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const closePanel = useCallback(() => setActiveId(null), [])

  return (
    <>
      <Canvas
        shadows="percentage"
        camera={{ position: [17, 12, 17], fov: 50, near: 0.1, far: 300 }}
        dpr={[1, 2]}
        onCreated={() => setSceneReady(true)}
        onPointerMissed={closePanel}
      >
        <Scene activeId={activeId} onSelect={setActiveId} />
      </Canvas>
      <LabelsOverlay activeId={activeId} onSelect={setActiveId} />
      <ZonePanel zoneId={activeId} onClose={closePanel} />
      <LoadingScreen sceneReady={sceneReady} entered={entered} onEnter={() => setEntered(true)} />
    </>
  )
}