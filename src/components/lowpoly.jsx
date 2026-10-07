// Paleta y materiales compartidos del estilo low poly glam.
export const C = {
  pink: '#ff77c8',
  hotPink: '#ff3d9a',
  fuchsia: '#e0147f',
  turq: '#2ed3c6',
  gold: '#f5c04a',
  purple: '#3a1650',
  deepPurple: '#2a0f3a',
  velvet: '#8a1560',
  cream: '#fff2d9',
  white: '#fff6fb',
  black: '#1d1024',
}

export function Lp({ color, rough = 0.65, metal = 0, ...rest }) {
  return <meshStandardMaterial color={color} flatShading roughness={rough} metalness={metal} {...rest} />
}

export function Gold(props) {
  return <Lp color={C.gold} rough={0.3} metal={0.7} {...props} />
}

// Material que brilla (con Bloom): toneMapped false permite superar el blanco.
export function Neon({ color, intensity = 2.6 }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      toneMapped={false}
      flatShading
    />
  )
}