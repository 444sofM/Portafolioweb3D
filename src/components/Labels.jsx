import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ITEMS } from './InteractiveProps.jsx'
import { terrainHeight } from './Terrain.jsx'
import { zones } from '../data/content.js'

const anchors = ITEMS.map((it) => ({
  id: it.id,
  position: new THREE.Vector3(it.x, terrainHeight(it.x, it.z) + it.labelY, it.z),
}))

// Elementos DOM de las etiquetas, registrados por LabelsOverlay y movidos por LabelProjector.
const elements = new Map()

// Parte DOM: botones flotantes sobre cada objeto.
export function LabelsOverlay({ activeId, onSelect }) {
  return (
    <div className="labels" aria-label="Zonas de la isla">
      {anchors.map(({ id }) => (
        <button
          key={id}
          ref={(el) => (el ? elements.set(id, el) : elements.delete(id))}
          type="button"
          className={`chip ${activeId === id ? 'chip--active' : ''}`}
          onClick={() => onSelect(id)}
        >
          {zones[id].label}
        </button>
      ))}
    </div>
  )
}

// Parte 3D: proyecta cada ancla a pantalla en cada frame.
export function LabelProjector() {
  const v = useRef(new THREE.Vector3())
  useEffect(() => () => elements.clear(), [])

  useFrame(({ camera, size }) => {
    for (const { id, position } of anchors) {
      const el = elements.get(id)
      if (!el) continue
      v.current.copy(position).project(camera)
      const visible = v.current.z < 1
      el.style.visibility = visible ? 'visible' : 'hidden'
      if (!visible) continue
      const px = (v.current.x * 0.5 + 0.5) * size.width
      const py = (-v.current.y * 0.5 + 0.5) * size.height
      el.style.transform = `translate(-50%, -50%) translate(${px}px, ${py}px)`
    }
  })
  return null
}