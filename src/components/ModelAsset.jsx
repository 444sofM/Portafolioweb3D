import { Suspense, useEffect, useMemo } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { getUvGridTexture, uvGridEnabled } from './uvGrid.js'
import * as THREE from 'three'

// Decodificador Draco servido desde /public/draco (sin depender de CDNs externos).
useGLTF.setDecoderPath(`${import.meta.env.BASE_URL}draco/`)

// Todos los .glb de src/assets/models. Si el archivo aún no existe, el componente no renderiza nada.
const MODELS = import.meta.glob('../assets/models/*.glb', { eager: true, query: '?url', import: 'default' })
export const hasModel = (name) => `../assets/models/${name}.glb` in MODELS

function Loaded({ url, animation, ...props }) {
  const gltf = useGLTF(url)
  const scene = useMemo(() => {
    const clone = gltf.scene.clone(true)
    const grid = uvGridEnabled()
    clone.traverse((o) => {
      if (!o.isMesh) return
      o.castShadow = true
      o.receiveShadow = true
      if (grid) o.material = new THREE.MeshStandardMaterial({ map: getUvGridTexture(), roughness: 0.8 })
    })
    return clone
  }, [gltf])
  const { actions, names } = useAnimations(gltf.animations, scene)

  useEffect(() => {
    const clip = actions[animation] ?? actions[names[0]]
    clip?.reset().fadeIn(0.2).play()
    return () => clip?.fadeOut(0.2)
  }, [actions, names, animation])

  return <primitive object={scene} {...props} />
}

// Carga un modelo exportado desde Blender (ver docs/pipeline-blender.md).
// Activa sombras en todas sus mallas y reproduce su animación (por nombre o la primera).
// Con `?uvgrid` en la URL cambia sus materiales por una cuadrícula para verificar UVs.
export default function ModelAsset({ name, animation, ...props }) {
  const url = MODELS[`../assets/models/${name}.glb`]
  if (!url) return null
  return (
    <Suspense fallback={null}>
      <Loaded url={url} animation={animation} {...props} />
    </Suspense>
  )
}
