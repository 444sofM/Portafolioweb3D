import * as THREE from 'three'

// Textura de cuadrícula numerada para verificar UVs (HU-07): si los cuadros se ven
// cuadrados y uniformes sobre el modelo, el desplegado UV es correcto.
let grid
export function getUvGridTexture() {
  if (grid) return grid
  const size = 512
  const cells = 8
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const step = size / cells
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      ctx.fillStyle = (x + y) % 2 ? '#ff77c8' : '#fff6fb'
      ctx.fillRect(x * step, y * step, step, step)
    }
  }
  ctx.strokeStyle = '#3a1650'
  ctx.lineWidth = 2
  ctx.font = `${step * 0.3}px sans-serif`
  ctx.fillStyle = '#3a1650'
  for (let i = 0; i <= cells; i++) {
    ctx.beginPath()
    ctx.moveTo(i * step, 0)
    ctx.lineTo(i * step, size)
    ctx.moveTo(0, i * step)
    ctx.lineTo(size, i * step)
    ctx.stroke()
  }
  for (let y = 0; y < cells; y++) for (let x = 0; x < cells; x++) ctx.fillText(`${x},${y}`, x * step + 6, y * step + step * 0.4)
  grid = new THREE.CanvasTexture(canvas)
  grid.colorSpace = THREE.SRGBColorSpace
  grid.wrapS = grid.wrapT = THREE.RepeatWrapping
  grid.anisotropy = 8
  return grid
}

// Activo con `?uvgrid` en la URL.
export const uvGridEnabled = () => new URLSearchParams(window.location.search).has('uvgrid')
