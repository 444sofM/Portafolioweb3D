import { useEffect, useRef, useState } from 'react'
import { input } from '../hooks/useInput.js'

const R = 50

// Joystick virtual: solo aparece en dispositivos táctiles
export default function Joystick() {
  const [visible, setVisible] = useState(false)
  const [knob, setKnob] = useState({ x: 0, y: 0 })
  const base = useRef(null)
  const activeId = useRef(null)

  useEffect(() => {
    setVisible(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  if (!visible) return null

  const update = (e) => {
    const rect = base.current.getBoundingClientRect()
    let dx = e.clientX - (rect.left + rect.width / 2)
    let dy = e.clientY - (rect.top + rect.height / 2)
    const len = Math.hypot(dx, dy)
    if (len > R) { dx = (dx / len) * R; dy = (dy / len) * R }
    setKnob({ x: dx, y: dy })
    input.x = dx / R
    input.y = -dy / R
  }
  const end = () => {
    activeId.current = null
    setKnob({ x: 0, y: 0 })
    input.x = 0
    input.y = 0
  }

  return (
    <div
      ref={base}
      className="joystick"
      onPointerDown={(e) => {
        activeId.current = e.pointerId
        e.currentTarget.setPointerCapture(e.pointerId)
        update(e)
      }}
      onPointerMove={(e) => activeId.current === e.pointerId && update(e)}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <div className="joystick-knob" style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} />
    </div>
  )
}
