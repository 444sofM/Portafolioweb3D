// Edita este archivo con tu información real. Cada clave coincide con un objeto de la isla.
export const zones = {
  about: {
    label: 'Sobre mí',
    title: 'Sobre mí',
    subtitle: 'Tu Nombre · Desarrolladora de software',
    paragraphs: [
      'Hola, soy Tu Nombre. Me apasiona crear experiencias web creativas e interactivas que combinan diseño y tecnología.',
      'Escribe aquí un párrafo sobre tu historia, tu formación y lo que te motiva.',
    ],
    chips: ['Creativa', 'Curiosa', 'Detallista'],
  },
  experience: {
    label: 'Experiencia',
    title: 'Experiencia profesional',
    subtitle: 'Mi recorrido',
    timeline: [
      { period: '2025 — Actual', role: 'Tu cargo', place: 'Empresa o proyecto', text: 'Describe tus responsabilidades y logros principales.' },
      { period: '2023 — 2025', role: 'Otro cargo', place: 'Empresa o universidad', text: 'Describe brevemente lo que hiciste y aprendiste.' },
    ],
  },
  skills: {
    label: 'Habilidades',
    title: 'Habilidades',
    subtitle: 'Mi paleta de herramientas',
    groups: [
      { name: 'Frontend', items: ['JavaScript', 'React', 'HTML/CSS'] },
      { name: '3D', items: ['Three.js', 'React Three Fiber', 'Blender'] },
      { name: 'Herramientas', items: ['Git', 'Vite', 'Figma'] },
    ],
  },
  projects: {
    label: 'Proyectos',
    title: 'Proyectos',
    subtitle: 'Algunos de mis trabajos',
    projects: [
      { name: 'Proyecto 1', description: 'Descripción corta del proyecto y tu rol.', tags: ['React', 'API'], url: 'https://github.com/tu-usuario/proyecto-1' },
      { name: 'Proyecto 2', description: 'Descripción corta del proyecto y tu rol.', tags: ['Three.js'], url: 'https://github.com/tu-usuario/proyecto-2' },
      { name: 'Proyecto 3', description: 'Descripción corta del proyecto y tu rol.', tags: ['Node.js'], url: 'https://tu-proyecto.vercel.app' },
    ],
  },
  contact: {
    label: 'Contacto',
    title: 'Contacto',
    subtitle: '¡Trabajemos juntas!',
    paragraphs: ['Escríbeme o encuéntrame en mis redes.'],
    links: [
      { label: 'Correo', url: 'mailto:tu-correo@ejemplo.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tu-usuario' },
      { label: 'GitHub', url: 'https://github.com/tu-usuario' },
    ],
  },
}