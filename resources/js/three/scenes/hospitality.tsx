import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { C, M } from "../palette";
import { EBox, ECyl, GridFloor, Sparkles } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0, 1.9, 5.6], target: [0, 0.8, 0] };

// Silver-service reveal: the cloche lifts, steam rises, then it settles again. Glasses and cutlery around.
export default function Hospitality() {
  const cloche = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime % 7;
    // 0–1.2 s lift, hold, 4.2–5.4 s lower, rest
    const lift = t < 1.2 ? t / 1.2 : t < 4.2 ? 1 : t < 5.4 ? 1 - (t - 4.2) / 1.2 : 0;
    const e = lift * lift * (3 - 2 * lift);
    if (cloche.current) {
      cloche.current.position.y = 0.86 + e * 0.75;
      cloche.current.rotation.z = e * 0.18;
    }
  });

  return (
    <group position={[0, -0.3, 0]}>
      <GridFloor />
      {/* Table */}
      <ECyl r={1.7} h={0.08} seg={48} position={[0, 0.7, 0]} material={M.panel} />
      <ECyl r={0.12} h={0.7} seg={12} position={[0, 0.35, 0]} />
      {/* Plate + dish */}
      <ECyl r={0.62} rTop={0.7} h={0.05} seg={40} position={[0, 0.77, 0]} material={M.soft} edge={M.edgeDim} />
      <ECyl r={0.32} rTop={0.22} h={0.12} seg={24} position={[0, 0.85, 0]} material={M.brand} />
      {/* Cloche */}
      <group ref={cloche} position={[0, 0.86, 0]}>
        <mesh material={M.solid}>
          <sphereGeometry args={[0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.555, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color={C.cta} wireframe transparent opacity={0.35} />
        </mesh>
        <ECyl r={0.06} h={0.1} seg={12} position={[0, 0.58, 0]} material={M.glow} edge={M.edgeDim} />
      </group>
      <Sparkles count={45} area={[0.5, 0.1, 0.5]} position={[0, 0.95, 0]} rise={0.35} height={1.4} size={0.08} color={C.ink} />
      {/* Glasses + cutlery */}
      {[
        [-1.05, 0.45],
        [1.1, -0.35],
      ].map(([x, z]) => (
        <group key={x} position={[x, 0.74, z]}>
          <ECyl r={0.08} h={0.02} seg={16} />
          <ECyl r={0.012} h={0.22} seg={6} position={[0, 0.12, 0]} material={M.glow} edge={M.edgeDim} />
          <ECyl r={0.06} rTop={0.11} h={0.22} seg={16} position={[0, 0.34, 0]} material={M.soft} edge={M.edge} />
        </group>
      ))}
      <EBox size={[0.05, 0.02, 0.7]} position={[-0.85, 0.75, -0.2]} material={M.soft} />
      <EBox size={[0.05, 0.02, 0.7]} position={[0.85, 0.75, 0.3]} material={M.soft} />
      <Sparkles count={40} area={[5, 2.5, 3]} position={[0, 1.8, -0.5]} size={0.035} />
    </group>
  );
}
