# Sprint Backlog — 4 Sprints (alineados a la Bitácora)

> Entrega previa (10%): **Product Backlog + Sprint Backlog** → antes del **6 oct 2026** (semana 5).
> Entrega previa (10%): **Wireframes** → antes del **20 oct 2026** (semana 7). Se ejecuta como parte del Sprint 1 (HT-09).

---

## Sprint 1 — 06/10/2026 → 03/11/2026 (Entrega 20% — semana 9)
**Objetivo del sprint:** Tener la escena 3D base funcionando (isla mínima, cámara, controles) y la documentación/wireframes entregados.

| ID | Historia | Tipo | Estimación | Prioridad |
|----|----------|------|------------|-----------|
| HT-01 | Configuración del repositorio | Técnica | 2 | Alta |
| HT-02 | Setup Three.js/R3F | Técnica | 3 | Alta |
| HT-09 | Documentación técnica y wireframes | Técnica | 3 | Alta |
| HU-01 | Escena base | Usuario | 3 | Alta |
| HU-02 | Cámara y controles básicos | Usuario | 3 | Alta |
| HU-03 | Responsive del canvas | Usuario | 2 | Media |
| HU-04 | Isla con geometrías y materiales base | Usuario | 5 | Alta |
| HU-23 | Pantalla de introducción / loading | Usuario | 3 | Media |
| HT-07 | CI/CD y despliegue automático | Técnica | 3 | Media |
| HU-22 | Despliegue público del portafolio | Usuario | 3 | Alta |

**Total puntos:** 30

---

## Sprint 2 — 04/11/2026 → 17/11/2026 (Entrega 20% — semana 11)
**Objetivo del sprint:** Isla modelada y texturizada en Blender, materiales PBR/matcaps e iluminación aplicada.

| ID | Historia | Tipo | Estimación | Prioridad |
|----|----------|------|------------|-----------|
| HT-03 | Pipeline de exportación de assets Blender | Técnica | 5 | Alta |
| HU-06 | Modelado del personaje en Blender | Usuario | 8 | Alta |
| HU-07 | Texturizado y UV wrapping de props | Usuario | 5 | Media |
| HU-05 | Materiales PBR y matcaps en props | Usuario | 5 | Media |
| HU-08 | Iluminación general de la isla | Usuario | 5 | Alta |
| HU-09 | Sombras dinámicas | Usuario | 5 | Media |

**Total puntos:** 33

---

## Sprint 3 — 18/11/2026 → 01/12/2026 (Entrega 20% — semana 13)
**Objetivo del sprint:** Personaje navegable con físicas, cámara en tercera persona, y primeras zonas de contenido interactivo.

| ID | Historia | Tipo | Estimación | Prioridad |
|----|----------|------|------------|-----------|
| HT-04 | Sistema de gestión de estado | Técnica | 5 | Media |
| HT-05 | Integración del motor de físicas | Técnica | 5 | Alta |
| HU-10 | Movimiento del personaje con teclado | Usuario | 8 | Alta |
| HU-11 | Colisiones y físicas básicas | Usuario | 8 | Alta |
| HU-13 | Cámara en tercera persona | Usuario | 5 | Media |
| HT-06 | Sistema de zonas/puntos de interés reutilizable | Técnica | 5 | Alta |
| HU-12 | Interacción con objetos (click/hover) | Usuario | 5 | Alta |

**Total puntos:** 41

---

## Sprint 4 — 02/12/2026 → 15/12/2026 (Entrega 20% — semana 15, Entrega Final)
**Objetivo del sprint:** Contenido completo del portafolio, optimización, WebGPU/TSL y pulido final para entrega.

| ID | Historia | Tipo | Estimación | Prioridad |
|----|----------|------|------------|-----------|
| HU-14 | Zona "Sobre mí" | Usuario | 5 | Alta |
| HU-15 | Zona "Proyectos" | Usuario | 8 | Alta |
| HU-16 | Zona "Habilidades" | Usuario | 3 | Media |
| HU-17 | Zona "Contacto" | Usuario | 3 | Alta |
| HU-18 | Multimedia 3D embebida | Usuario | 5 | Baja |
| HT-08 | Monitoreo de performance | Técnica | 3 | Media |
| HU-19 | Panel de depuración de rendimiento | Usuario | 2 | Media |
| HU-20 | Optimización de assets y carga progresiva | Usuario | 8 | Alta |
| HT-10 | Spike WebGPU/TSL | Técnica | 8 | Baja |
| HU-21 | Exploración de WebGPU/TSL | Usuario | 8 | Baja |

**Total puntos:** 53 (si el tiempo aprieta, HU-21/HT-10 y HU-18 son las primeras candidatas a mover a "nice to have"/backlog).

---

## Uso en Taiga (Kanban + Scrum)
- Cada Sprint = un **Milestone/Sprint** en Taiga con las fechas de inicio/fin de esta tabla.
- Dentro de cada sprint, usa la vista **Taskboard** (Kanban: To Do / In Progress / Ready for Test / Done) para mover las tarjetas día a día.
- El **Backlog** general (product backlog) contiene todas las Historias de Usuario + Técnicas sin asignar a sprint todavía; se van arrastrando al sprint correspondiente según esta tabla.
