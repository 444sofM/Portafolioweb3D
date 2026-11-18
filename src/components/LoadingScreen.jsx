import { useCallback, useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import './IntroScreen.css'

const NAME = 'Ana Sofia Mezu Vargas'

// x/y en %, s = tamaño, d = profundidad del parallax, t/delay = flotación
const FLOATERS = [
  { e: '🌴', x: 8, y: 14, s: '3.2rem', d: 1.2, t: '4.5s', delay: '0s' },
  { e: '⭐', x: 82, y: 10, s: '2rem', d: 0.6, t: '3.2s', delay: '-1s' },
  { e: '🦋', x: 90, y: 38, s: '2.4rem', d: 1.5, t: '3.8s', delay: '-2s' },
  { e: '💖', x: 5, y: 52, s: '2rem', d: 0.8, t: '4s', delay: '-0.5s' },
  { e: '🐚', x: 84, y: 76, s: '2.4rem', d: 1, t: '5s', delay: '-1.5s' },
  { e: '🌸', x: 14, y: 82, s: '2.6rem', d: 1.4, t: '4.2s', delay: '-3s' },
  { e: '✨', x: 48, y: 6, s: '1.8rem', d: 0.5, t: '2.8s', delay: '-0.8s' },
  { e: '🍹', x: 70, y: 88, s: '2.4rem', d: 0.9, t: '4.8s', delay: '-2.2s' },
  { e: '🎧', x: 26, y: 5, s: '2.2rem', d: 0.7, t: '3.6s', delay: '-1.2s' },
  { e: '🌺', x: 93, y: 60, s: '1.8rem', d: 0.4, t: '3.4s', delay: '-0.3s' },
]

const BURST_ICONS = ['⭐', '✨', '💖', '🌸', '🦋']

let letterIndex = 0
const WORDS = NAME.split(' ').map((word) =>
  [...word].map((char) => ({ char, i: letterIndex++ })),
)

export default function LoadingScreen({ onEnter, entered, sceneReady }) {
  const { progress: assetsProgress, active } = useProgress()
  const rootRef = useRef(null)
  const [bursts, setBursts] = useState([])
  // Sin assets externos useProgress se queda en 0, por eso se combina con sceneReady
  const ready = sceneReady && !active
  const progress = ready ? 100 : sceneReady ? assetsProgress : Math.min(assetsProgress, 90)

  // Parallax: el puntero actualiza variables CSS sin re-renderizar React
  const handleMove = useCallback((e) => {
    const el = rootRef.current
    if (!el) return
    el.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
    el.style.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
  }, [])

  // Cada clic suelta unas estrellas que desaparecen solas
  const handleClick = useCallback((e) => {
    const now = Date.now()
    const items = Array.from({ length: 6 }, (_, k) => {
      const angle = (Math.PI * 2 * k) / 6 + Math.random()
      const dist = 50 + Math.random() * 60
      return {
        id: `${now}-${k}`,
        icon: BURST_ICONS[(k + now) % BURST_ICONS.length],
        x: e.clientX,
        y: e.clientY,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
      }
    })
    setBursts((prev) => [...prev, ...items])
    setTimeout(() => setBursts((prev) => prev.filter((b) => !items.includes(b))), 850)
  }, [])

  useEffect(() => {
    if (!ready || entered) return
    const onKey = (e) => e.key === 'Enter' && onEnter()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ready, entered, onEnter])

  return (
    <div
      ref={rootRef}
      className={`loading ${ready ? 'loading--ready' : ''} ${entered ? 'loading--hidden' : ''}`}
      aria-hidden={entered}
      onPointerMove={handleMove}
      onPointerDown={handleClick}
    >
      {FLOATERS.map((f) => (
        <div
          key={f.e + f.x}
          className="loading__floater"
          style={{ '--x': `${f.x}%`, '--y': `${f.y}%`, '--s': f.s, '--d': f.d, '--t': f.t, '--delay': f.delay }}
          aria-hidden="true"
        >
          <span>{f.e}</span>
        </div>
      ))}

      <div className="loading__card">
        <div className="loading__444">444</div>
        <p className="loading__kicker">Portafolio 3D</p>
        <h1 className="loading__name" aria-label={NAME}>
          {WORDS.map((word, w) => (
            <span key={w} className="loading__word" aria-hidden="true">
              {word.map(({ char, i }) => (
                <span key={i} className="loading__letter" style={{ '--i': i }}>
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="loading__subtitle">Bienvenido a mi isla ✨</p>

        <ul className="loading__hints" aria-label="Controles">
          <li>🖱️ Arrastra para girar</li>
          <li>🔍 Rueda para acercar</li>
          <li>🏝️ Toca los letreros</li>
        </ul>

        <div className="loading__status" aria-live="polite">
          {ready ? (
            <button type="button" className="loading__enter" onClick={onEnter} autoFocus>
              Entrar a la isla 🌴
            </button>
          ) : (
            <>
              <div className="loading__bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                <div className="loading__bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="loading__percent">Cargando la isla… {Math.round(progress)}%</span>
            </>
          )}
        </div>
      </div>

      {bursts.map((b) => (
        <span key={b.id} className="loading__burst" style={{ '--x': `${b.x}px`, '--y': `${b.y}px`, '--dx': `${b.dx}px`, '--dy': `${b.dy}px` }} aria-hidden="true">
          {b.icon}
        </span>
      ))}
    </div>
  )
}
