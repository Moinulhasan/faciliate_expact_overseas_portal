import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { C, M } from "../palette";
import { EBox, ECyl, GridFloor, Sparkles } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0.4, 1.8, 6], target: [0, 1, 0] };

// Stocked shelves with price tags bobbing, and a shopping bag turning in front.
export default function Retail() {
  const bag = useRef<Group>(null);
  const tags = useRef<(Group | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (bag.current) {
      bag.current.rotation.y = t * 0.5;
      bag.current.position.y = 0.95 + Math.sin(t * 1.2) * 0.07;
    }
    tags.current.forEach((g, i) => g && (g.rotation.z = Math.sin(t * 1.8 + i) * 0.18));
  });

  const products = (lvl: number) =>
    Array.from({ length: 7 }, (_, k) => {
      const x = -1.5 + k * 0.5;
      const kind = (k + lvl) % 3;
      return kind === 0 ? (
        <ECyl key={k} r={0.12} h={0.36} seg={14} position={[x, 0.2, 0]} material={M.brand} />
      ) : kind === 1 ? (
        <EBox key={k} size={[0.3, 0.42, 0.22]} position={[x, 0.23, 0]} material={M.panel} />
      ) : (
        <ECyl key={k} r={0.08} rTop={0.05} h={0.44} seg={10} position={[x, 0.24, 0]} material={M.soft} edge={M.edgeDim} />
      );
    });

  return (
    <group position={[0, -0.45, 0]}>
      <GridFloor />
      <group position={[0, 0, -0.9]}>
        <EBox size={[3.8, 2.5, 0.06]} position={[0, 1.25, -0.3]} material={M.solid} edge={M.edgeDim} />
        {[0, 1, 2].map((lvl) => (
          <group key={lvl} position={[0, 0.15 + lvl * 0.78, 0]}>
            <EBox size={[3.8, 0.05, 0.6]} material={M.panel} edge={M.edge} />
            {products(lvl)}
            <group ref={(g) => (tags.current[lvl] = g)} position={[0.8 - lvl * 0.9, -0.02, 0.32]}>
              <mesh position={[0, -0.1, 0]} material={M.glow}>
                <planeGeometry args={[0.28, 0.14]} />
              </mesh>
            </group>
          </group>
        ))}
      </group>
      {/* Shopping bag */}
      <group ref={bag} position={[1.2, 0.95, 0.9]}>
        <EBox size={[0.7, 0.8, 0.32]} material={M.brand} />
        {[-0.17, 0.17].map((x) => (
          <mesh key={x} position={[x, 0.42, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.1, 0.012, 8, 20, Math.PI]} />
            <meshStandardMaterial color={C.cta} emissive={C.cta} emissiveIntensity={1} />
          </mesh>
        ))}
        <mesh position={[0, 0.05, 0.165]} material={M.glow}>
          <circleGeometry args={[0.12, 24]} />
        </mesh>
      </group>
      <Sparkles count={40} area={[5, 2.6, 2]} position={[0, 1.4, 0]} size={0.035} />
    </group>
  );
}
