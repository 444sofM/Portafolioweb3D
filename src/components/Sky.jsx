import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const SKY_HORIZON = '#ff9fb8'

const vertexShader = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const fragmentShader = /* glsl */ `
  varying vec3 vDir;
  uniform vec3 top;
  uniform vec3 mid;
  uniform vec3 horizon;
  void main() {
    float h = max(vDir.y, 0.0);
    vec3 c = mix(horizon, mid, smoothstep(0.0, 0.3, h));
    c = mix(c, top, smoothstep(0.25, 0.85, h));
    gl_FragColor = vec4(c, 1.0);
    #include <colorspace_fragment>
  }
`

// Dirección del sol (misma que la luz principal de Scene)
export const SUN_DIR = new THREE.Vector3(-28, 15, -10).normalize()

function Clouds() {
  const group = useRef()
  const clouds = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2 + (i % 3) * 0.2
        const r = 85 + (i % 4) * 14
        return { pos: [Math.cos(a) * r, 22 + (i % 5) * 5, Math.sin(a) * r], s: 3 + (i % 3) * 1.4, a }
      }),
    [],
  )
  useFrame((_, dt) => {
    group.current.rotation.y += dt * 0.004
  })
  return (
    <group ref={group}>
      {clouds.map((c, i) => (
        <group key={i} position={c.pos} rotation-y={-c.a} scale={c.s}>
          {[[0, 0, 0, 1.2], [1.3, -0.15, 0.2, 0.9], [-1.3, -0.2, -0.1, 0.85], [0.5, 0.5, 0, 0.8]].map(([x, y, z, r], k) => (
            <mesh key={k} position={[x, y, z]} scale={[r * 1.3, r, r]}>
              <icosahedronGeometry args={[1, 1]} />
              <meshStandardMaterial color="#ffd9ee" emissive="#ff8fc8" emissiveIntensity={0.45} flatShading />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

export default function Sky() {
  const uniforms = useMemo(
    () => ({
      top: { value: new THREE.Color('#5a3a9e') },
      mid: { value: new THREE.Color('#ff6fb5') },
      horizon: { value: new THREE.Color(SKY_HORIZON) },
    }),
    [],
  )
  const sunPos = SUN_DIR.clone().multiplyScalar(170).toArray()

  return (
    <>
      <mesh>
        <sphereGeometry args={[250, 32, 16]} />
        <shaderMaterial
          side={THREE.BackSide}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          depthWrite={false}
          fog={false}
        />
      </mesh>
      <mesh position={sunPos}>
        <icosahedronGeometry args={[14, 1]} />
        <meshBasicMaterial color="#ffe9a0" toneMapped={false} fog={false} />
      </mesh>
      <mesh position={sunPos}>
        <icosahedronGeometry args={[26, 1]} />
        <meshBasicMaterial color="#ffb3d9" transparent opacity={0.22} toneMapped={false} fog={false} depthWrite={false} />
      </mesh>
      <Clouds />
    </>
  )
}