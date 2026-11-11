import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { C, M } from "../palette";
import { EBox, ECyl } from "../parts";
import type { SceneConfig } from "../Stage";

// High chase-cam from behind: road vanishes into the distance, blocks flank it, nothing occludes the car.
export const config: SceneConfig = { camera: [1.1, 2.6, 4.4], target: [0.4, 0.2, -1.6] };

const DASHES = 10;
const BLOCKS = 7;
const SPAN = 14;
const loop = (v: number) => ((v % SPAN) + SPAN) % SPAN - SPAN / 2;

// Night drive: chauffeur sedan with headlight beams, lane markings and city blocks streaming past.
export default function Drivers() {
  const dashes = useRef<(Group | null)[]>([]);
  const blocks = useRef<(Group | null)[]>([]);
  const wheels = useRef<(Group | null)[]>([]);
  const car = useRef<Group>(null);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const d = t * 3.2;
    dashes.current.forEach((g, i) => g && (g.position.z = loop(i * (SPAN / DASHES) + d)));
    blocks.current.forEach((g, i) => g && (g.position.z = loop(i * (SPAN / BLOCKS) + d)));
    wheels.current.forEach((w) => w && (w.rotation.x -= dt * 9));
    if (car.current) car.current.position.y = 0.02 + Math.sin(t * 7) * 0.006;
  });

  return (
    <group>
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[2.6, SPAN]} />
        <meshStandardMaterial color={C.night2} roughness={0.9} />
      </mesh>
      {[-1.3, 1.3].map((x) => (
        <EBox key={x} size={[0.04, 0.02, SPAN]} position={[x, 0.01, 0]} material={M.glow} edge={M.edgeDim} />
      ))}
      {Array.from({ length: DASHES }, (_, i) => (
        <group key={i} ref={(g) => (dashes.current[i] = g)}>
          <EBox size={[0.06, 0.01, 0.55]} position={[0, 0.006, 0]} material={M.soft} edge={M.edgeDim} />
        </group>
      ))}
      {/* City blocks */}
      {Array.from({ length: BLOCKS }, (_, i) => {
        const h = 0.6 + ((i * 7) % 5) * 0.35;
        return (
          <group key={i} ref={(g) => (blocks.current[i] = g)}>
            <EBox size={[0.9, h, 1.2]} position={[i % 2 ? -2.2 : 2.3, h / 2, 0]} material={i % 3 ? M.solid : M.panel} edge={M.edgeDim} />
          </group>
        );
      })}
      {/* Sedan, heading -z */}
      <group ref={car} position={[0.55, 0.02, 0.6]}>
        <EBox size={[0.9, 0.3, 1.9]} position={[0, 0.3, 0]} material={M.brand} />
        <EBox size={[0.78, 0.26, 0.95]} position={[0, 0.58, 0.12]} material={M.solid} />
        {[
          [-0.46, 0.62],
          [0.46, 0.62],
          [-0.46, -0.62],
          [0.46, -0.62],
        ].map(([x, z], i) => (
          <group key={i} ref={(g) => (wheels.current[i] = g)} position={[x, 0.16, z]}>
            <ECyl r={0.16} h={0.12} seg={14} rotation={[0, 0, Math.PI / 2]} material={M.solid} />
          </group>
        ))}
        {[-0.3, 0.3].map((x) => (
          <group key={x} position={[x, 0.32, -0.96]}>
            <mesh material={M.glow}>
              <boxGeometry args={[0.16, 0.06, 0.02]} />
            </mesh>
            <mesh position={[0, -0.05, -1.4]} rotation={[-Math.PI / 2 + 0.04, 0, 0]}>
              <coneGeometry args={[0.45, 2.8, 20, 1, true]} />
              <meshBasicMaterial color={C.ctaHi} transparent opacity={0.08} depthWrite={false} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
