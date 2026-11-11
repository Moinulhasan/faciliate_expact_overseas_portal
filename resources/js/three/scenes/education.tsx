import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, MeshStandardMaterial, type Group } from "three";
import { C, M } from "../palette";
import { EBox, ECyl, GridFloor, Sparkles } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0, 2.4, 5.4], target: [0, 0.7, 0] };

const page = new MeshStandardMaterial({ color: C.ink, emissive: C.ctaHi, emissiveIntensity: 0.15, side: DoubleSide, roughness: 0.7 });
const PAGES = 5;

// Open book with pages turning in sequence, knowledge particles rising to a floating graduation cap.
export default function Education() {
  const pages = useRef<(Group | null)[]>([]);
  const cap = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    pages.current.forEach((g, i) => {
      if (!g) return;
      const local = ((t * 0.5 - i * 0.35) % 2.5 + 2.5) % 2.5; // each page flips once per cycle
      const p = Math.min(1, Math.max(0, local / 1.2));
      const e = p * p * (3 - 2 * p);
      g.rotation.z = e * (Math.PI - 0.06) + 0.03; // +Z lifts the page up over the spine to the left side
    });
    if (cap.current) {
      cap.current.position.y = 2.05 + Math.sin(t * 1.2) * 0.08;
      cap.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      <GridFloor />
      <group position={[0, 0.35, 0]} rotation={[-0.25, 0, 0]}>
        {/* Covers + page blocks */}
        <EBox size={[1.3, 0.05, 1.6]} position={[-0.68, 0, 0]} rotation={[0, 0, 0.06]} material={M.brand} />
        <EBox size={[1.3, 0.05, 1.6]} position={[0.68, 0, 0]} rotation={[0, 0, -0.06]} material={M.brand} />
        <EBox size={[1.2, 0.12, 1.5]} position={[-0.64, 0.08, 0]} rotation={[0, 0, 0.06]} material={M.soft} edge={M.edgeDim} />
        <EBox size={[1.2, 0.12, 1.5]} position={[0.64, 0.08, 0]} rotation={[0, 0, -0.06]} material={M.soft} edge={M.edgeDim} />
        {/* Turning pages hinge at the spine */}
        {Array.from({ length: PAGES }, (_, i) => (
          <group key={i} ref={(g) => (pages.current[i] = g)} position={[0, 0.15 + i * 0.004, 0]}>
            <mesh position={[0.6, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} material={page}>
              <planeGeometry args={[1.18, 1.46]} />
            </mesh>
          </group>
        ))}
      </group>
      <Sparkles count={50} area={[1.4, 0.1, 1]} position={[0, 0.5, 0]} rise={0.25} height={1.5} size={0.06} />
      {/* Graduation cap */}
      <group ref={cap} position={[0, 2.05, -0.2]} rotation={[0.25, 0, 0]}>
        <EBox size={[1, 0.04, 1]} rotation={[0, Math.PI / 4, 0]} material={M.solid} />
        <ECyl r={0.32} rTop={0.36} h={0.26} seg={24} position={[0, -0.15, 0]} material={M.panel} />
        <ECyl r={0.04} h={0.05} seg={10} position={[0, 0.04, 0]} material={M.glow} edge={M.edgeDim} />
        <EBox size={[0.012, 0.012, 0.58]} position={[0, 0.03, 0.29]} rotation={[0, Math.PI / 4, 0]} material={M.glow} edge={M.edgeDim} />
        <EBox size={[0.05, 0.22, 0.05]} position={[0.42, -0.08, 0.42]} material={M.glow} edge={M.edgeDim} />
      </group>
    </group>
  );
}
