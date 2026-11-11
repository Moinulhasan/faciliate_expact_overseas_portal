import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { C, M } from "../palette";
import { EBox, FlowTube, Sparkles } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0, 0.6, 6], target: [0, 0.4, 0] };

const ecg: [number, number, number][] = [
  [-3, 0, 0], [-1.4, 0, 0], [-1.2, 0.18, 0], [-1.05, 0, 0], [-0.85, -0.25, 0], [-0.65, 1.1, 0], [-0.45, -0.55, 0],
  [-0.25, 0, 0], [0.15, 0, 0], [0.4, 0.28, 0], [0.65, 0, 0], [3, 0, 0],
];

// Rotating DNA helix, a pulsing medical cross and a live ECG trace.
export default function Healthcare() {
  const helix = useRef<Group>(null);
  const cross = useRef<Group>(null);
  const rungs = useMemo(() => Array.from({ length: 22 }, (_, i) => i), []);

  useFrame(({ clock }, dt) => {
    if (helix.current) helix.current.rotation.y += dt * 0.5;
    const t = clock.elapsedTime;
    const beat = Math.max(0, Math.sin(t * 5)) ** 8; // quick double-beat feel
    if (cross.current) cross.current.scale.setScalar(1 + beat * 0.08);
  });

  return (
    <group position={[0, 0.2, 0]}>
      <group ref={helix} position={[-1.3, 0.4, -0.3]} rotation={[0, 0, 0.18]}>
        {rungs.map((i) => {
          const y = -1.6 + i * 0.15;
          const a = i * 0.55;
          const x = Math.cos(a) * 0.45;
          const z = Math.sin(a) * 0.45;
          return (
            <group key={i} position={[0, y, 0]}>
              <mesh position={[x, 0, z]} material={M.glow}>
                <sphereGeometry args={[0.06, 12, 8]} />
              </mesh>
              <mesh position={[-x, 0, -z]} material={M.soft}>
                <sphereGeometry args={[0.06, 12, 8]} />
              </mesh>
              <EBox size={[0.9, 0.015, 0.015]} rotation={[0, -a, 0]} material={M.brand} edge={M.edgeDim} />
            </group>
          );
        })}
      </group>

      <group ref={cross} position={[1.3, 0.8, 0]}>
        <EBox size={[0.36, 1.1, 0.24]} material={M.brand} />
        <EBox size={[1.1, 0.36, 0.24]} material={M.brand} />
        <EBox size={[0.2, 0.7, 0.26]} material={M.glow} edge={M.edgeDim} />
        <EBox size={[0.7, 0.2, 0.26]} material={M.glow} edge={M.edgeDim} />
      </group>

      <group position={[0, -1.2, 0.4]}>
        <FlowTube sharp points={ecg} radius={0.022} speed={0.32} repeat={1} base={0.18} />
        <mesh position={[0, 0.2, -0.05]}>
          <planeGeometry args={[6, 1.8]} />
          <meshBasicMaterial color={C.night2} transparent opacity={0.6} />
        </mesh>
      </group>
      <Sparkles count={60} area={[6, 3.5, 2]} position={[0, 0.3, -0.5]} size={0.04} />
    </group>
  );
}
