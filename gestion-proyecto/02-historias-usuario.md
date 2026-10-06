# Historias de Usuario — Portafolio Isla 3D

Formato: **Como** [rol] **quiero** [funcionalidad] **para** [beneficio].
Estimación en Fibonacci: 2 (muy simple) · 3 (simple) · 5 (media) · 8 (compleja) · 13 (muy compleja).
Prioridad: Alta / Media / Baja (MoSCoW simplificado).

---

## EP-01 · Fundamentos y Configuración de la Escena 3D

### HU-01 — Escena base
**Como** visitante **quiero** ver una escena 3D cargar correctamente al entrar al sitio **para** comenzar a explorar el portafolio.

**Criterios de Aceptación:**
```gherkin
Escenario: Carga inicial de la escena
  Dado que el usuario abre la URL del portafolio
  Cuando la página termina de cargar
  Entonces se muestra un canvas 3D a pantalla completa
  Y se renderiza una cámara con vista inicial hacia la isla
```
**Prioridad:** Alta · **Estimación:** 3 · **Épica:** EP-01

### HU-02 — Cámara y controles básicos
**Como** visitante **quiero** poder rotar y hacer zoom sobre la escena con el mouse **para** observar la isla desde distintos ángulos.

```gherkin
Escenario: Rotación de cámara con el mouse
  Dado que la escena 3D está cargada
  Cuando el usuario arrastra el mouse sobre el canvas
  Entonces la cámara orbita alrededor del punto central de la isla
  Y el zoom responde a la rueda del mouse dentro de límites definidos
```
**Prioridad:** Alta · **Estimación:** 3 · **Épica:** EP-01

### HU-03 — Responsive del canvas
**Como** visitante **quiero** que la escena se adapte al tamaño de mi pantalla **para** verla correctamente en distintos dispositivos.

```gherkin
Escenario: Cambio de tamaño de ventana
  Dado que el portafolio está abierto en el navegador
  Cuando el usuario redimensiona la ventana
  Entonces el renderer y la cámara actualizan su aspect ratio automáticamente
  Y no se generan barras negras ni distorsión de la imagen
```
**Prioridad:** Media · **Estimación:** 2 · **Épica:** EP-01

---

## EP-02 · Modelado y Ambientación de la Isla

### HU-04 — Isla con geometrías y materiales base
**Como** visitante **quiero** ver una isla con terreno, agua y vegetación básica **para** tener un entorno visualmente atractivo desde el inicio.

```gherkin
Escenario: Renderizado de la isla base
  Dado que la escena ha cargado
  Cuando la cámara enfoca el centro del mapa
  Entonces se observa una isla con geometría de terreno y material base
  Y se distinguen al menos 2 zonas (ej. playa y zona central)
```
**Prioridad:** Alta · **Estimación:** 5 · **Épica:** EP-02

### HU-05 — Materiales PBR y matcaps en props
**Como** visitante **quiero** ver materiales realistas (metal, madera, vidrio) en los objetos de la isla **para** percibir una escena con mayor calidad visual.

```gherkin
Escenario: Aplicación de material PBR
  Dado que un objeto 3D de la isla tiene un material PBR asignado
  Cuando la luz de la escena incide sobre él
  Entonces el objeto refleja luz y sombra de forma físicamente coherente
  Y las texturas de rugosidad/metalness se ven aplicadas correctamente
```
**Prioridad:** Media · **Estimación:** 5 · **Épica:** EP-02

### HU-06 — Modelado del personaje en Blender
**Como** visitante **quiero** ver un personaje 3D representando a la desarrolladora **para** identificar quién guía el recorrido.

```gherkin
Escenario: Importación del personaje modelado
  Dado que el modelo del personaje fue exportado en formato glTF desde Blender
  Cuando se carga la escena
  Entonces el personaje aparece con su textura y proporciones correctas
  Y no presenta errores de normales o geometría rota
```
**Prioridad:** Alta · **Estimación:** 8 · **Épica:** EP-02

### HU-07 — Texturizado y UV wrapping de props
**Como** desarrolladora **quiero** que los props de la isla tengan UVs correctamente desplegados **para** que las texturas no se vean distorsionadas.

```gherkin
Escenario: Verificación de UVs
  Dado un prop modelado en Blender con su mapa UV
  Cuando se aplica una textura de prueba tipo cuadrícula
  Entonces la cuadrícula se muestra uniforme sin estiramientos visibles
```
**Prioridad:** Media · **Estimación:** 5 · **Épica:** EP-02

---

## EP-03 · Iluminación y Puesta en Escena

### HU-08 — Iluminación general de la isla
**Como** visitante **quiero** ver la isla con una iluminación ambiental y direccional coherente **para** percibir una atmósfera de día/atardecer definida.

```gherkin
Escenario: Iluminación de la escena
  Dado que la escena 3D está cargada
  Cuando se activa la luz direccional principal (sol)
  Entonces los objetos proyectan sombras en la dirección correcta
  Y la luz ambiental evita zonas completamente negras
```
**Prioridad:** Alta · **Estimación:** 5 · **Épica:** EP-03

### HU-09 — Sombras dinámicas
**Como** visitante **quiero** ver sombras proyectadas por el personaje y los props **para** percibir profundidad y realismo.

```gherkin
Escenario: Sombra del personaje al moverse
  Dado que el personaje se desplaza sobre el terreno
  Cuando cambia de posición
  Entonces su sombra se actualiza en tiempo real respecto a la luz principal
```
**Prioridad:** Media · **Estimación:** 5 · **Épica:** EP-03

---

## EP-04 · Interacción, Navegación y Físicas del Personaje

### HU-10 — Movimiento del personaje con teclado
**Como** visitante **quiero** mover al personaje con las teclas WASD/flechas **para** explorar libremente la isla.

```gherkin
Escenario: Desplazamiento con teclado
  Dado que el personaje está en la escena
  Cuando el usuario presiona la tecla "W" o flecha arriba
  Entonces el personaje avanza en la dirección hacia la que mira
  Y su animación cambia de "idle" a "caminar"
```
**Prioridad:** Alta · **Estimación:** 8 · **Épica:** EP-04

### HU-11 — Colisiones y físicas básicas
**Como** visitante **quiero** que el personaje no atraviese objetos sólidos ni se caiga del mapa **para** tener una experiencia de navegación creíble.

```gherkin
Escenario: Colisión con un objeto sólido
  Dado que el personaje se mueve hacia un prop con colisionador
  Cuando entra en contacto con su límite
  Entonces el personaje se detiene o desliza en lugar de atravesarlo

Escenario: Límite de la isla
  Dado que el personaje llega al borde de la isla
  Cuando intenta avanzar más allá del límite
  Entonces el sistema de físicas impide que caiga fuera del mapa
```
**Prioridad:** Alta · **Estimación:** 8 · **Épica:** EP-04

### HU-12 — Interacción con objetos (click/hover)
**Como** visitante **quiero** hacer clic u acercarme a objetos de la isla **para** activar información relacionada con la desarrolladora.

```gherkin
Escenario: Hover sobre objeto interactivo
  Dado que el mouse pasa sobre un objeto marcado como interactivo
  Cuando el objeto detecta el evento hover
  Entonces se resalta visualmente (highlight/glow)

Escenario: Activación de contenido
  Dado que el personaje se acerca a un objeto interactivo o hace clic sobre él
  Cuando se cumple la condición de activación
  Entonces se despliega un panel/texto 3D con la información asociada
```
**Prioridad:** Alta · **Estimación:** 5 · **Épica:** EP-04

### HU-13 — Cámara en tercera persona siguiendo al personaje
**Como** visitante **quiero** que la cámara siga al personaje mientras se mueve **para** mantener siempre buena visibilidad durante la exploración.

```gherkin
Escenario: Seguimiento de cámara
  Dado que el personaje se desplaza por la isla
  Cuando cambia de posición
  Entonces la cámara mantiene una distancia y ángulo relativo constante
  Y no atraviesa geometría del entorno
```
**Prioridad:** Media · **Estimación:** 5 · **Épica:** EP-04

---

## EP-05 · Contenido Interactivo del Portafolio

### HU-14 — Zona "Sobre mí"
**Como** reclutador/visitante **quiero** encontrar una zona de la isla con información personal y profesional **para** conocer a la desarrolladora.

```gherkin
Escenario: Visualización de la zona "Sobre mí"
  Dado que el personaje llega a la zona marcada como "Sobre mí"
  Cuando se activa el punto de interés
  Entonces se muestra un texto 3D o panel HTML con presentación, foto/avatar y datos clave
```
**Prioridad:** Alta · **Estimación:** 5 · **Épica:** EP-05

### HU-15 — Zona "Proyectos"
**Como** reclutador/visitante **quiero** ver mis proyectos de programación representados como objetos/estructuras en la isla **para** explorar mi portafolio de forma interactiva.

```gherkin
Escenario: Exploración de un proyecto
  Dado que el personaje se acerca a un objeto que representa un proyecto
  Cuando interactúa con él (clic o cercanía)
  Entonces se despliega una tarjeta con nombre, descripción, tecnologías y enlace (repo/demo)

Escenario: Múltiples proyectos
  Dado que existen varios proyectos en el portafolio
  Cuando el usuario recorre la zona de proyectos
  Entonces cada proyecto se representa con un objeto 3D distinto y no se solapan
```
**Prioridad:** Alta · **Estimación:** 8 · **Épica:** EP-05

### HU-16 — Zona "Habilidades / Stack Tecnológico"
**Como** visitante **quiero** ver mis habilidades técnicas representadas visualmente **para** identificar rápidamente mis competencias.

```gherkin
Escenario: Visualización de habilidades
  Dado que el personaje llega a la zona de habilidades
  Cuando se activa el punto de interés
  Entonces se muestran íconos/logos o texto 3D con lenguajes y herramientas dominadas
```
**Prioridad:** Media · **Estimación:** 3 · **Épica:** EP-05

### HU-17 — Zona "Contacto"
**Como** reclutador/visitante **quiero** encontrar mis datos de contacto y redes **para** poder comunicarme con la desarrolladora.

```gherkin
Escenario: Visualización de contacto
  Dado que el personaje llega a la zona de contacto
  Cuando se activa el punto de interés
  Entonces se muestra un panel con correo, LinkedIn, GitHub y/o formulario de contacto
  Y los enlaces externos abren en una nueva pestaña
```
**Prioridad:** Alta · **Estimación:** 3 · **Épica:** EP-05

### HU-18 — Multimedia 3D (video/imagen embebida)
**Como** visitante **quiero** ver un video o imagen embebido dentro de la escena 3D **para** conocer una demo o certificación destacada.

```gherkin
Escenario: Reproducción de video embebido
  Dado que existe una pantalla/objeto 3D con multimedia asociada
  Cuando el usuario hace clic sobre ella
  Entonces el video se reproduce dentro de una textura/plano en la escena
  Y cuenta con control de pausa/reproducción
```
**Prioridad:** Baja · **Estimación:** 5 · **Épica:** EP-05

---

## EP-06 · Optimización, Rendimiento y WebGPU/TSL

### HU-19 — Panel de depuración de rendimiento
**Como** desarrolladora **quiero** ver estadísticas de FPS, draw calls y memoria mientras navego la escena **para** identificar cuellos de botella.

```gherkin
Escenario: Visualización de estadísticas
  Dado que la escena está en modo desarrollo
  Cuando se activa el panel de estadísticas (ej. stats.js)
  Entonces se muestran FPS, draw calls y triángulos en tiempo real
```
**Prioridad:** Media · **Estimación:** 2 · **Épica:** EP-06

### HU-20 — Optimización de assets y carga progresiva
**Como** visitante **quiero** que la isla cargue en un tiempo razonable **para** no abandonar el sitio por lentitud.

```gherkin
Escenario: Tiempo de carga optimizado
  Dado que el usuario abre el portafolio con conexión estándar
  Cuando la escena carga todos sus assets
  Entonces el tiempo total de carga es menor a 8 segundos
  Y se muestra una pantalla/barra de carga mientras tanto

Escenario: Modelos comprimidos
  Dado que los modelos 3D fueron exportados desde Blender
  Cuando se integran al proyecto
  Entonces están comprimidos con Draco o Meshopt y su peso es reducido respecto al original
```
**Prioridad:** Alta · **Estimación:** 8 · **Épica:** EP-06

### HU-21 — Exploración de WebGPU/TSL
**Como** desarrolladora **quiero** implementar al menos un efecto usando WebGPU y TSL **para** aplicar los contenidos finales del curso al proyecto.

```gherkin
Escenario: Efecto con TSL
  Dado que el navegador soporta WebGPU
  Cuando se activa el renderer basado en WebGPU
  Entonces al menos un material/efecto de la escena usa un shader escrito con TSL
  Y existe un fallback a WebGL si el navegador no soporta WebGPU
```
**Prioridad:** Baja · **Estimación:** 8 · **Épica:** EP-06

---

## EP-07 · Despliegue, Documentación y Gestión del Proyecto

### HU-22 — Despliegue público del portafolio
**Como** visitante **quiero** acceder al portafolio mediante una URL pública **para** poder verlo sin instalar nada.

```gherkin
Escenario: Acceso a la URL de producción
  Dado que el proyecto fue desplegado (ej. Vercel/Netlify)
  Cuando el usuario abre la URL pública
  Entonces el portafolio carga correctamente en producción
  Y no muestra errores de consola relacionados con rutas de assets
```
**Prioridad:** Alta · **Estimación:** 3 · **Épica:** EP-07

### HU-23 — Pantalla de introducción / loading screen
**Como** visitante **quiero** ver una pantalla de bienvenida con instrucciones de navegación **para** saber cómo interactuar con la isla antes de empezar.

```gherkin
Escenario: Pantalla de bienvenida
  Dado que el usuario ingresa por primera vez al portafolio
  Cuando la escena aún no ha cargado completamente
  Entonces se muestra una pantalla con el nombre del portafolio, controles básicos y botón "Entrar"
```
**Prioridad:** Media · **Estimación:** 3 · **Épica:** EP-07
