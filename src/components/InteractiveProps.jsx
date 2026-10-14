import Interactive from './Interactive.jsx'
import Beach from './zones/Beach.jsx'
import Vanity from './zones/Vanity.jsx'
import Gym from './zones/Gym.jsx'
import VampireCabin from './zones/VampireCabin.jsx'
import DjStage from './zones/DjStage.jsx'
import { ZONES, facingCenter } from '../data/layout.js'

const MODELS = {
  about: Vanity,
  skills: Gym,
  experience: VampireCabin,
  projects: DjStage,
  contact: Beach,
}

export default function InteractiveProps({ activeId, onSelect }) {
  return ZONES.map(({ id, x, z, scale }) => {
    const Model = MODELS[id]
    return (
      <Interactive
        key={id}
        id={id}
        x={x}
        z={z}
        scale={scale}
        rotY={facingCenter(x, z)}
        active={activeId === id}
        onSelect={onSelect}
      >
        <Model />
      </Interactive>
    )
  })
}