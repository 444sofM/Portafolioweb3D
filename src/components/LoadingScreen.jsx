import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import './LoadingScreen.css'

const NAME = '[MI NOMBRE]'

export default function LoadingScreen({ onEnter, entered, sceneReady }) {
  const { progress: assetsProgress, active } = useProgress()
  const [glow, setGlow] = useState(false)
  // Sin assets externos useProgress se queda en 0, por eso se combina con sceneReady
  const ready = sceneReady && !active
  const progress = ready ? 100 : sceneReady ? assetsProgress : Math.min(assetsProgress, 90)

  // Al llegar al 100% el 444 brilla un momento y luego se entra a la isla
  useEffect(() => {
    if (!ready || entered) return
    setGlow(true)
    const t = setTimeout(onEnter, 2200)
    return () => clearTimeout(t)
  }, [ready, entered, onEnter])

  return (
    <div className={`loading ${entered ? 'loading--hidden' : ''}`} aria-hidden={entered}>
      <div className="loading__card">
        <h1>{NAME}</h1>
        {glow ? (
          <div className="loading__444">444</div>
        ) : (
          <>
            <p className="loading__subtitle">Cargando la isla…</p>
            <div className="loading__bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <div className="loading__bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
