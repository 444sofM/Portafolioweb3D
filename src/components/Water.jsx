export default function Water() {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.57}>
        <circleGeometry args={[160, 48]} />
        <meshStandardMaterial color="#1fb9c9" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0}>
        <circleGeometry args={[160, 48]} />
        <meshPhysicalMaterial
          color="#34e6d4"
          transparent
          opacity={0.8}
          roughness={0.55}
          metalness={0}
          specularIntensity={0.25}
        />
      </mesh>
      {/* Espuma en la orilla */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.03}>
        <ringGeometry args={[15.1, 15.7, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>
    </>
  )
}