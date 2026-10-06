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
  Scene --> Lights[Luces]
  Scene --> OrbitControls
  Scene --> Island
  Island --> Terrain
  Island --> Water
  Island --> Vegetation
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
| Terreno procedural (Sprint 1) | Isla provisional hasta tener el modelo de Blender (Sprint 2) |
| Vegetación con semilla fija | La isla se ve igual en cada carga |