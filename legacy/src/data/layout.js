// Posición de cada escena temática. Cada id coincide con una clave de content.js.
// labelY es la altura (en unidades de mundo) donde flota la etiqueta.
export const ZONES = [
  { id: 'contact', x: 7, z: 7.3, scale: 1.15, labelY: 4.6 },
  { id: 'about', x: -9.5, z: 4.5, scale: 1.2, labelY: 5.6 },
  { id: 'skills', x: 10, z: -3, scale: 1.2, labelY: 4.9 },
  { id: 'experience', x: -7.5, z: -6.8, scale: 1.2, labelY: 5 },
  { id: 'projects', x: 2, z: -10.5, scale: 1.1, labelY: 4.8 },
]

// Radio plano alrededor de cada escena, para que apoyen bien sobre la arena.
export const ZONE_FLAT_RADIUS = 5.4

// Gira cada escena para que su frente (+z) mire al centro de la isla.
export const facingCenter = (x, z) => Math.atan2(-x, -z)