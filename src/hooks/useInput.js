import { useEffect } from 'react'

// Estado compartido de entrada (se lee cada frame, sin re-renders)
export const input = { x: 0, y: 0, keys: new Set() }

const MAP = {
  KeyW: 'up', ArrowUp: 'up',
  KeyS: 'down', ArrowDown: 'down',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
}

export function useKeyboard() {
  useEffect(() => {
    const down = (e) => {
      const k = MAP[e.code]
      if (k) { input.keys.add(k); e.preventDefault() }
    }
    const up = (e) => {
      const k = MAP[e.code]
      if (k) input.keys.delete(k)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])
}

// Vector de movimiento (x: derecha, y: adelante) combinando teclado y joystick
export function readMove() {
  let x = input.x
  let y = input.y
  if (input.keys.has('left')) x -= 1
  if (input.keys.has('right')) x += 1
  if (input.keys.has('up')) y += 1
  if (input.keys.has('down')) y -= 1
  const len = Math.hypot(x, y)
  if (len > 1) { x /= len; y /= len }
  return [x, y]
}
