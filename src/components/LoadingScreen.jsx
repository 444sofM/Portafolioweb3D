import { useProgress } from '@react-three/drei'
import './LoadingScreen.css'

export default function LoadingScreen({ onEnter, entered, sceneReady }) {
  const { progress: assetsProgress, active } = useProgress()
  // Sin assets externos useProgress se queda en 0, por eso se combina con sceneReady
  const ready = sceneReady && !active
  const progress = ready ? 100 : sceneReady ? assetsProgress : Math.min(assetsProgress, 90)

  return (
    <div className={`loading ${entered ? 'loading--hidden' : ''}`} aria-hidden={entered}>
      <div className="loading__card">
        <h1>Portafolio 3D · Isla Interactiva</h1>
        <p className="loading__subtitle">Explora la isla para conocer mi trabajo.</p>

        <ul className="loading__controls">
          <li><strong>Arrastrar</strong> con el mouse: rotar la cámara</li>
          <li><strong>Rueda</strong>: acercar / alejar</li>
        </ul>

        <div className="loading__bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="loading__bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <button type="button" onClick={onEnter} disabled={!ready}>
          {ready ? 'Entrar' : `Cargando ${Math.round(progress)}%`}
        </button>
      </div>
    </div>
  )
}