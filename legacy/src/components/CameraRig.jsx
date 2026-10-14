import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { ZONES } from '../data/layout.js'
import { terrainHeight } from './Terrain.jsx'

const DURATION = 1.1
const HOME = { position: new THREE.Vector3(15, 10.5, 15), target: new THREE.Vector3(0, 1, 0) }
const ease = (t) => 1 - Math.pow(1 - t, 3)

// Al elegir una escena la cámara se acerca; al cerrar el panel vuelve a la vista general.
export default function CameraRig({ activeId }) {
  const { camera, controls, size } = useThree()
  const anim = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    if (!controls) return
    if (first.current) {
      first.current = false
      return
    }
    const zone = ZONES.find((z) => z.id === activeId)
    let toTarget = HOME.target
    let toPosition = HOME.position
    if (zone) {
      toTarget = new THREE.Vector3(zone.x, terrainHeight(zone.x, zone.z) + 1.8, zone.z)
      // Cada escena mira al centro de la isla: la cámara se coloca de ese lado para verla de frente
      const inward = new THREE.Vector3(-zone.x, 0, -zone.z).normalize()
      toPosition = toTarget.clone().addScaledVector(inward, 12).add(new THREE.Vector3(0, 6.5, 0))
      // En pantallas anchas se desplaza la vista para que el panel no tape la escena
      if (size.width > 800) {
        const forward = toTarget.clone().sub(toPosition).normalize()
        const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize()
        toTarget = toTarget.clone().addScaledVector(right, 3.6)
        toPosition = toPosition.clone().addScaledVector(right, 3.6)
      }
    }
    anim.current = {
      t: 0,
      fromPosition: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPosition,
      toTarget,
    }
  }, [activeId, camera, controls, size.width])

  useFrame((_, dt) => {
    const a = anim.current
    if (!a || !controls) return
    a.t = Math.min(a.t + dt / DURATION, 1)
    const k = ease(a.t)
    camera.position.lerpVectors(a.fromPosition, a.toPosition, k)
    controls.target.lerpVectors(a.fromTarget, a.toTarget, k)
    controls.update()
    if (a.t >= 1) anim.current = null
  })

  return null
}