import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './Terrain.jsx'

// Envuelve un objeto 3D: hover (cursor + escala), clic para abrir su panel y etiqueta flotante.
export default function Interactive({
  id,
  x,
  z,
  rotY = 0,
  scale = 1,
  active,
  onSelect,
  children,
}) {
  const body = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, dt) => {
    const target = (hovered || active ? 1.08 : 1) * scale
    body.current.scale.setScalar(THREE.MathUtils.damp(body.current.scale.x, target, 8, dt))
  })

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <group position={[x, terrainHeight(x, z), z]} rotation-y={rotY}>
      <group
        ref={body}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        {children}
      </group>
    </group>
  )
}