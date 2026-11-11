# Pipeline de assets: Blender → glTF/GLB (HT-03)

Flujo estándar para que cualquier modelo se integre sin ajustes manuales.

## 1. Convenciones en Blender
| Tema | Regla |
|---|---|
| Unidades | Metros, escala 1.0. Aplicar escala/rotación antes de exportar (`Ctrl+A → All Transforms`). |
| Origen | Pies del personaje / base del prop en el origen (0,0,0). |
| Orientación | Frente del modelo hacia **-Y** en Blender (→ **+Z** en Three.js al exportar con Y-up). |
| Polígonos | Props ≤ 5 000 tris; personaje ≤ 15 000 tris. |
| Materiales | Principled BSDF (base color, roughness, metallic, normal). Máx. 3 por modelo. |
| UVs | Un mapa UV por malla, sin solapes ni estiramiento (ver §4). |
| Texturas | Potencias de 2 (512/1024/2048), WebP o JPG; sin texturas innecesarias. |
| Nombres | `snake_case`; el nombre del archivo = nombre del asset (`character.glb`). |

## 2. Exportación
Opción A — script (recomendada, ajustes idénticos siempre):
```bash
blender --background personaje.blend --python scripts/blender_export.py -- character
```
Opción B — manual: `File → Export → glTF 2.0 (.glb)` con
**Format** GLB · **+Y Up** · **Apply Modifiers** · **UVs/Normals/Materials** · **Compression (Draco)** nivel 6 · cámaras y luces desactivadas.

El archivo queda en `src/assets/models/<nombre>.glb`.

## 3. Compresión adicional (opcional)
Si el GLB pesa más de ~1 MB:
```bash
npx @gltf-transform/cli optimize src/assets/models/character.glb src/assets/models/character.glb --compress draco --texture-compress webp
```
El decodificador Draco se sirve localmente desde `public/draco/` (sin CDN).

## 4. Verificación de UVs (HU-07)
Abrir la app con `?uvgrid` en la URL (p. ej. `http://localhost:5173/?uvgrid`):
todos los modelos `.glb` cambian sus materiales por una cuadrícula numerada.
Los cuadros deben verse **cuadrados y del mismo tamaño**; si se estiran, corregir el desplegado en Blender.

## 5. Uso en la escena
```jsx
import ModelAsset from '../components/ModelAsset.jsx'

<ModelAsset name="character" position={[0, 0, 6]} scale={1} animation="Idle" />
```
- Busca `src/assets/models/<name>.glb`; si no existe, no renderiza nada (no rompe el build).
- Activa `castShadow`/`receiveShadow` en todas las mallas y reproduce la animación indicada (o la primera).
- El personaje se carga con [Character.jsx](../src/components/Character.jsx) al guardar `character.glb`.

## 6. Materiales PBR y matcaps (HU-05)
Los props procedurales usan [materials.jsx](../src/components/materials.jsx):
`Wood` (veta con mapa de rugosidad), `Glass` (clearcoat + IOR), `Metal`/`Gold` (metalness 1 + Environment), `Matcap` (iluminación horneada).
