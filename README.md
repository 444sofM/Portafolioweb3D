# Portafolio Web 3D — Isla Interactiva

Portafolio profesional en 3D: una isla explorable construida con React Three Fiber (Three.js) + Vite.

## Requisitos
- Node.js 20+
- npm 10+

## Instalación y ejecución
```bash
npm install
npm run dev       # servidor de desarrollo (http://localhost:5173)
npm run build     # build de producción en /dist
npm run preview   # previsualizar el build
```

## Estructura del proyecto
```
src/
  scenes/        # Isla y subescenas
  components/    # Personaje, zonas, overlays de UI
  hooks/         # useKeyboardControls, usePhysics, etc.
  store/         # estado global (zustand)
  shaders/       # shaders GLSL / TSL
  assets/
    models/      # .glb exportados de Blender
    textures/
public/          # archivos estáticos
docs/            # arquitectura y wireframes
gestion-proyecto/ # Product Backlog, Sprint Backlog y DoD
```

## Convenciones
- Componentes React: `PascalCase.jsx`; hooks: `useCamelCase.js`.
- Assets 3D en `.glb` (Draco/Meshopt) dentro de `src/assets/models`.
- Commits descriptivos con el ID de historia, p. ej. `feat(HU-01): escena base`.

## Gestión
Scrum + Kanban en Taiga. Ver [gestion-proyecto/](gestion-proyecto/).
