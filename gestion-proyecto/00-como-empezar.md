# Cómo empezar — Guía rápida

## 1. Crear el espacio en Taiga (entregable de gestión)
1. Regístrate en https://taiga.io (cuenta gratuita).
2. Crea un proyecto nuevo → elige plantilla **Scrum** (incluye Backlog + Sprints) y activa el módulo **Kanban** en Configuración → Módulos (para tener ambas vistas, como pide el entregable).
3. En **Configuración del proyecto → General**, marca **"Este proyecto es público"** para obtener el enlace público que debes entregar.
4. Crea las 7 Épicas del archivo [01-epicas.md](gestion-proyecto/01-epicas.md).
5. Copia cada Historia de Usuario del archivo [02-historias-usuario.md](gestion-proyecto/02-historias-usuario.md) como "User Story", pega la descripción Como/Quiero/Para, los criterios Gherkin en la sección de descripción o en un campo custom, asigna épica, prioridad (tags) y puntos (Fibonacci ya soporta ese scheme por defecto en Taiga).
6. Repite con las Historias Técnicas del archivo [03-historias-tecnicas.md](gestion-proyecto/03-historias-tecnicas.md) (márcalas con el tag "técnica" o "chore").
7. Crea los 4 Sprints (Milestones) con las fechas exactas del archivo [05-sprint-backlog.md](gestion-proyecto/05-sprint-backlog.md) y arrastra cada historia al sprint indicado.
8. Pega el contenido de [04-definicion-de-hecho.md](gestion-proyecto/04-definicion-de-hecho.md) en la Wiki del proyecto en Taiga.

## 2. Wireframes (entrega semana 7 — 20 oct)
Antes de modelar en 3D, dibuja (Figma, Excalidraw o papel escaneado):
- Mapa 2D de la isla (top-down) marcando zonas: entrada, Sobre mí, Proyectos, Habilidades, Contacto.
- Flujo de pantallas: Loading screen → Escena 3D → Paneles de interacción (mockup del panel HTML/3D que aparece al hacer clic en un objeto).
- Boceto del personaje (referencia visual para Blender).

## 3. Repositorio de código
- Inicializa el proyecto con Vite + React Three Fiber (o Three.js vanilla si prefieres control total).
- Estructura sugerida:
```
src/
  scenes/        # Isla, subescenas
  components/    # Character, Zones, UI overlays
  assets/
    models/      # .glb exportados de Blender
    textures/
  hooks/         # useKeyboardControls, usePhysics, etc.
  store/         # estado global (zustand)
public/
```
- Sube el repo a GitHub y conecta despliegue automático (Vercel es el más simple con Vite).

## 4. Orden de trabajo recomendado (coincide con el temario semanal)
1. Semanas 1-4 (fundamentos, geometrías, materiales, PBR, iluminación) → practica en sandbox mientras se arma Sprint 1.
2. Semana 5 → entregas Product Backlog + Sprint Backlog (los 5 archivos de `gestion-proyecto/`).
3. Semanas 6-7 → HTML3D/texto, físicas → alimenta Sprint 1 y wireframes.
4. Semana 8-9 → mecánicas de navegación + cierre Sprint 1.
5. Semanas 9-11 → Blender (modelado, PBR, UV, baking) → Sprint 2.
6. Semana 12 → importación/optimización de modelos → arranca Sprint 3.
7. Semana 13 → debug y performance → cierre Sprint 3.
8. Semana 14 → WebGPU/TSL → Sprint 4.
9. Semana 15 → entrega final.

## 5. Próximos pasos que puedo ayudarte a hacer ahora mismo
- Escribir tú misma el contenido de las historias en Taiga (yo ya dejé todo redactado, solo copiar/pegar).
- Si quieres, puedo **generar el scaffold del proyecto Three.js/React Three Fiber** en este workspace para que ya tengas HU-01/HU-02/HT-01/HT-02 resueltas técnicamente.
- Puedo ayudarte a armar el wireframe en texto/Markdown o Mermaid como punto de partida antes de pasarlo a Figma.
