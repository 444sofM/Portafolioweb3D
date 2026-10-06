export default function Water() {
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={0}>
      <circleGeometry args={[60, 64]} />
      <meshStandardMaterial color="#2a8fbd" transparent opacity={0.85} />
    </mesh>
  )
}