export default function Water() {
  return (
    <>
      {/* Fondo marino profundo que continúa más allá del terreno */}
      <mesh rotation-x={-Math.PI / 2} position-y={-0.57}>
        <circleGeometry args={[140, 64]} />
        <meshStandardMaterial color="#3bbccf" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0}>
        <circleGeometry args={[140, 64]} />
        <meshPhysicalMaterial
          color="#6fe0d4"
          transparent
          opacity={0.6}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
    </>
  )
}