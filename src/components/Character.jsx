import ModelAsset from './ModelAsset.jsx'
import { terrainHeight } from './Terrain.jsx'

const SPAWN = [0, 6]

// Personaje de la desarrolladora (HU-06). Aparece al guardar `character.glb` en src/assets/models.
export default function Character() {
  const [x, z] = SPAWN
  return <ModelAsset name="character" position={[x, terrainHeight(x, z), z]} />
}
