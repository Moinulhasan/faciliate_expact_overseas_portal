import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { C, M } from "../palette";
import { ECyl, ShaderPlane, Sparkles } from "../parts";
import rippleFrag from "../shaders/ripple.frag?raw";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0, 2.3, 5.6], target: [0, 0.6, 0] };

const stones: [number, number, number, number][] = [
  // radius, height, y, tilt
  [0.85, 0.32, 0.16, 0.02],
  [0.68, 0.28, 0.47, -0.05],
  [0.52, 0.24, 0.73, 0.06],
  [0.36, 0.2, 0.95, -0.04],
];

// Balanced spa stones on still water: ripples spread from the base, petals drift, a candle glows.
export default function BeautyWellness() {
  const stack = useRef<Group>(null);
  const flame = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (stack.current) stack.current.rotation.y = t * 0.15;
    if (flame.current) flame.current.scale.y = 1 + Math.sin(t * 9) * 0.12 + Math.sin(t * 13) * 0.06;
  });

  return (
    <group position={[0, -0.3, 0]}>
      <ShaderPlane frag={rippleFrag} size={[7, 7]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} uniforms={{ uColor: C.cta }} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshStandardMaterial color={C.night2} roughness={0.15} metalness={0.6} transparent opacity={0.85} />
      </mesh>
      <group ref={stack}>
        {stones.map(([r, h, y, tilt], i) => (
          <group key={i} position={[0, y, 0]} rotation={[tilt, i, tilt]} scale={[1, 1, 0.82]}>
            <mesh material={i % 2 ? M.panel : M.brand} scale={[r, h / 2, r]}>
              <sphereGeometry args={[1, 32, 16]} />
            </mesh>
            {/* single glowing rim instead of a dense wireframe */}
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={[r, r, 1]}>
              <torusGeometry args={[1, 0.012, 6, 48]} />
              <meshBasicMaterial color={C.cta} transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>
      {/* Candle */}
      <group position={[1.5, 0, 0.6]}>
        <ECyl r={0.16} h={0.4} seg={20} position={[0, 0.2, 0]} material={M.soft} edge={M.edgeDim} />
        <group ref={flame} position={[0, 0.48, 0]}>
          <mesh material={M.glow} scale={[0.05, 0.1, 0.05]}>
            <sphereGeometry args={[1, 12, 8]} />
          </mesh>
        </group>
        <pointLight position={[0, 0.6, 0]} intensity={4} distance={3} color={C.ctaHi} />
      </group>
      <Sparkles count={36} area={[4, 1.5, 3]} position={[0, 1.2, 0]} rise={0.08} height={1.2} size={0.07} color={C.ctaHi} />
    </group>
  );
}
