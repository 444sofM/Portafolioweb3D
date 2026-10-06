import Terrain from '../components/Terrain.jsx'
import Water from '../components/Water.jsx'
import Decor from '../components/Decor.jsx'

export default function Island() {
  return (
    <group>
      <Terrain />
      <Water />
      <Decor />
    </group>
  )
}