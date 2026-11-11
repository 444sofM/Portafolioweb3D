import { useMemo } from 'react'
import * as THREE from 'three'

// Texturas procedurales (sin descargas): se cachean y se comparten entre materiales.
const cache = new Map()
const cached = (key, build) => {
  if (!cache.has(key)) cache.set(key, build())
  return cache.get(key)
}

function canvasTexture(size, draw, { srgb = true, repeat = false } = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  draw(canvas.getContext('2d'), size)
  const tex = new THREE.CanvasTexture(canvas)
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace
  if (repeat) tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 4
  return tex
}

// Matcap: esfera pre-iluminada (luz arriba-izquierda + borde brillante). Se tiñe con `color`.
export function getMatcap(shade = 'pearl') {
  return cached(`matcap-${shade}`, () =>
    canvasTexture(256, (ctx, s) => {
      const stops = {
        pearl: ['#ffffff', '#f6dcf0', '#c79bd0', '#6e4a86'],
        gold: ['#fff4c2', '#f5c04a', '#a8731c', '#3d2508'],
        glossy: ['#ffffff', '#ffb3e0', '#e0147f', '#3a0a2a'],
      }[shade]
      const g = ctx.createRadialGradient(s * 0.36, s * 0.32, s * 0.02, s / 2, s / 2, s * 0.52)
      g.addColorStop(0, stops[0])
      g.addColorStop(0.28, stops[1])
      g.addColorStop(0.7, stops[2])
      g.addColorStop(1, stops[3])
      ctx.fillStyle = g
      ctx.fillRect(0, 0, s, s)
    }),
  )
}

// Veta de madera: mapa de color y mapa de rugosidad coherentes entre sí.
function getWoodMaps() {
  return cached('wood', () => {
    const grain = (ctx, s, base, vary) => {
      ctx.fillStyle = base
      ctx.fillRect(0, 0, s, s)
      for (let i = 0; i < 90; i++) {
        const y = (i / 90) * s + Math.sin(i * 12.9898) * 4
        ctx.strokeStyle = vary(i)
        ctx.lineWidth = 1 + (i % 4)
        ctx.beginPath()
        for (let x = 0; x <= s; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.03 + i) * 3)
        ctx.stroke()
      }
    }
    return {
      map: canvasTexture(256, (c, s) => grain(c, s, '#b8b8b8', (i) => `rgba(${60 + (i % 5) * 18},${50 + (i % 5) * 14},${50 + (i % 5) * 14},0.45)`), { repeat: true }),
      roughnessMap: canvasTexture(256, (c, s) => grain(c, s, '#b0b0b0', (i) => `rgba(${120 + (i % 6) * 20},${120 + (i % 6) * 20},${120 + (i % 6) * 20},0.5)`), { srgb: false, repeat: true }),
    }
  })
}

// Madera PBR con veta (HU-05). `color` tiñe la veta.
export function Wood({ color = '#ffffff', rough = 0.85, ...rest }) {
  const { map, roughnessMap } = getWoodMaps()
  return <meshStandardMaterial color={color} map={map} roughnessMap={roughnessMap} roughness={rough} metalness={0} flatShading {...rest} />
}

// Vidrio PBR: brillo especular alto + clearcoat, sin transmisión (barato en móvil).
export function Glass({ color = '#ffffff', opacity = 0.35, ...rest }) {
  return (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={opacity}
      roughness={0.05}
      metalness={0}
      clearcoat={1}
      clearcoatRoughness={0.05}
      ior={1.5}
      envMapIntensity={1.6}
      depthWrite={false}
      {...rest}
    />
  )
}

// Metal pulido PBR que refleja el Environment de la escena.
export function Metal({ color = '#f5c04a', rough = 0.25, ...rest }) {
  return <meshStandardMaterial color={color} roughness={rough} metalness={1} envMapIntensity={1.2} flatShading {...rest} />
}

// Material matcap: iluminación "horneada", útil para props lejanos o baratos de renderizar.
export function Matcap({ color = '#ffffff', shade = 'pearl', ...rest }) {
  const matcap = useMemo(() => getMatcap(shade), [shade])
  return <meshMatcapMaterial color={color} matcap={matcap} flatShading {...rest} />
}
