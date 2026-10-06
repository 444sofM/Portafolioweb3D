import Terrain from '../components/Terrain.jsx'
import Water from '../components/Water.jsx'
import Decor from '../components/Decor.jsx'

export default function Island({ activeId, onSelect }) {
  return (
    <group>
      <Terrain />
      <Water />
      <Decor activeId={activeId} onSelect={onSelect} />
    </group>
  )
}