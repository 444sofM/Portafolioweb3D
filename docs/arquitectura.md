# Arquitectura técnica

## Stack
- **Vite 6** (bundler) + **React 19**
- **Three.js** vía **React Three Fiber** y **@react-three/drei**
- Despliegue: GitHub Pages con GitHub Actions
- Planeado: Zustand (estado, Sprint 3), cannon-es/Rapier (físicas, Sprint 3), Blender → GLB con Draco (Sprint 2)

## Árbol de componentes (Sprint 1)
```mermaid
flowchart TD
  main[main.jsx] --> App
  App --> Canvas[Canvas R3F]
  App --> LoadingScreen[LoadingScreen HTML]
  Canvas --> Scene
  App --> LabelsOverlay[Etiquetas DOM]
  App --> ZonePanel[Panel de información]
  Scene --> Lights[Luces + sombras]
  Scene --> OrbitControls
  Scene --> LabelProjector[Proyecta etiquetas 3D a 2D]
  Scene --> Island
  Island --> Terrain
  Island --> Water
  Island --> Decor[Sombrillas, toallas, flotadores...]
  Decor --> InteractiveProps[Polvera, perfume, paleta, bolso, sombrero]
```

## Flujo de carga
```mermaid
sequenceDiagram
  participant U as Usuario
  participant L as LoadingScreen
  participant C as Canvas
  U->>L: Abre la URL
  L-->>U: Nombre, controles, progreso
  C-->>L: onCreated (escena lista)
  L-->>U: Habilita "Entrar"
  U->>L: Clic en "Entrar"
  L-->>U: Se oculta, escena visible
```

## Decisiones
| Decisión | Motivo |
|---|---|
| Vite + R3F | Arranque rápido, componentes declarativos |
| `base: './'` en Vite | Rutas relativas válidas en cualquier hosting |
| Terreno procedural, estilo playa (Sprint 1) | Isla provisional hasta tener el modelo de Blender (Sprint 2) |
| Etiquetas DOM proyectadas (no drei `Html`) | `Html` lanza errores de React 19 al desmontar su root |
| Contenido en `src/data/content.js` | Editar la información sin tocar componentes 3D |
| Shadow map `percentage` | `soft` (PCFSoft) fue removido de Three r18x |