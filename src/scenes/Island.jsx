import Terrain from '../components/Terrain.jsx'
import Water from '../components/Water.jsx'
import Vegetation from '../components/Vegetation.jsx'

export default function Island() {
  return (
    <group>
      <Terrain />
      <Water />
      <Vegetation />
    </group>
  )
}