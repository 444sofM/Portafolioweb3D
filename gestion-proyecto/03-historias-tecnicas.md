# Historias Técnicas Habilitadoras

Son historias para el equipo de desarrollo (no aportan valor directo visible al usuario final, pero habilitan el trabajo de las Historias de Usuario). Mismo formato de estimación Fibonacci y prioridad.

### HT-01 — Configuración del repositorio y estructura del proyecto
**Como** desarrolladora **quiero** tener un repositorio Git organizado con estructura de carpetas (assets, components, scenes, shaders) **para** trabajar de forma escalable durante todo el curso.

**Prioridad:** Alta · **Estimación:** 2 · **Épica:** EP-01

**DoD específico:** README con instrucciones de instalación/ejecución, `.gitignore` configurado, estructura de carpetas documentada.

---

### HT-02 — Setup del entorno Three.js / React Three Fiber
**Como** desarrolladora **quiero** dejar configurado el bundler (Vite), Three.js/R3F y dependencias base **para** empezar a construir la escena sin fricción técnica.

**Prioridad:** Alta · **Estimación:** 3 · **Épica:** EP-01

---

### HT-03 — Pipeline de exportación de assets desde Blender
**Como** desarrolladora **quiero** definir un flujo estándar de exportación (formato glTF/GLB, compresión Draco, escala y ejes) **para** que todos los modelos importados se integren sin errores.

**Prioridad:** Alta · **Estimación:** 5 · **Épica:** EP-02

---

### HT-04 — Sistema de gestión de estado de la escena
**Como** desarrolladora **quiero** un manejo centralizado del estado (ej. Zustand) para posición del personaje, objetos activos y UI **para** evitar lógica dispersa y bugs de sincronización.

**Prioridad:** Media · **Estimación:** 5 · **Épica:** EP-04

---

### HT-05 — Integración del motor de físicas
**Como** desarrolladora **quiero** integrar una librería de físicas (cannon-es / rapier) al proyecto **para** habilitar colisiones y gravedad de forma reutilizable.

**Prioridad:** Alta · **Estimación:** 5 · **Épica:** EP-04

---

### HT-06 — Sistema de zonas/puntos de interés reutilizable
**Como** desarrolladora **quiero** crear un componente genérico "PuntoDeInteres" configurable por posición y contenido **para** no duplicar lógica en cada zona del portafolio (Sobre mí, Proyectos, Contacto, etc).

**Prioridad:** Alta · **Estimación:** 5 · **Épica:** EP-05

---

### HT-07 — Configuración de CI/CD y despliegue automático
**Como** desarrolladora **quiero** un pipeline que despliegue automáticamente a Vercel/Netlify en cada push a main **para** tener siempre una versión pública actualizada del portafolio.

**Prioridad:** Media · **Estimación:** 3 · **Épica:** EP-07

---

### HT-08 — Sistema de monitoreo de performance
**Como** desarrolladora **quiero** integrar herramientas de profiling (stats.js, Chrome DevTools performance) **para** detectar cuellos de botella antes de cada entrega de sprint.

**Prioridad:** Media · **Estimación:** 3 · **Épica:** EP-06

---

### HT-09 — Documentación técnica y wireframes
**Como** desarrolladora **quiero** documentar la arquitectura del proyecto y wireframes de la isla (mapa de zonas) **para** entregar el artefacto solicitado en la semana 7 y guiar el desarrollo.

**Prioridad:** Alta · **Estimación:** 3 · **Épica:** EP-07

---

### HT-10 — Investigación y prueba de concepto WebGPU/TSL
**Como** desarrolladora **quiero** crear un spike técnico probando el renderer WebGPU y TSL en un componente aislado **para** validar viabilidad antes de integrarlo a la escena principal.

**Prioridad:** Baja · **Estimación:** 8 · **Épica:** EP-06
