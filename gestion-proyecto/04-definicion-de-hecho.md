# Definición de Hecho (Definition of Done) General

Una Historia de Usuario o Historia Técnica se considera **Terminada (Done)** cuando cumple TODO lo siguiente:

1. El código está desarrollado, integrado a la rama principal y compila/corre sin errores.
2. Se probó manualmente en al menos 2 navegadores (Chrome/Edge) y en escritorio.
3. Cumple todos los Criterios de Aceptación (Gherkin) definidos en la historia.
4. No introduce caídas de FPS perceptibles (mínimo 30 FPS en escena completa) ni errores en consola.
5. Los assets 3D (modelos/texturas) están optimizados (compresión Draco/Meshopt, texturas en formato adecuado, tamaño controlado).
6. El código sigue la convención de nombres y estructura de carpetas acordada en el repositorio.
7. Se hizo commit con mensaje descriptivo y Pull Request revisado (o autorevisado si se trabaja solo) antes de mergear.
8. La funcionalidad es visible/reproducible en el enlace de despliegue (Vercel/Netlify/GitHub Pages) del sprint correspondiente.
9. Se actualizó el tablero (Taiga) moviendo la tarjeta a "Done" y registrando horas/puntos reales si aplica.
10. No rompe funcionalidades previamente entregadas (regresión revisada).
