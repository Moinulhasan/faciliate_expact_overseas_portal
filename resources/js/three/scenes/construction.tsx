import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { M } from "../palette";
import { EBox, GridFloor, Sparkles } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0.6, 2.4, 6.6], target: [0.2, 1.45, 0] };

// Tower crane slewing over a building whose top floor keeps rising.
export default function Construction() {
  const jib = useRef<Group>(null);
  const trolley = useRef<Group>(null);
  const hook = useRef<Group>(null);
  const floor = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (jib.current) jib.current.rotation.y = Math.sin(t * 0.35) * 0.9;
    if (trolley.current) trolley.current.position.x = -0.6 - (Math.sin(t * 0.7) * 0.5 + 0.5) * 1.1;
    if (hook.current) hook.current.position.y = -0.9 - (Math.sin(t * 0.9) * 0.5 + 0.5) * 0.6;
    if (floor.current) floor.current.scale.y = Math.min(1, (t % 6) / 3) || 0.001;
  });

  return (
    <group position={[0, -0.4, 0]}>
      <GridFloor />
      {/* Building: 5 floors + one rising */}
      <group position={[-0.7, 0, 0]}>
        {[0, 1, 2, 3, 4].map((i) => (
          <EBox key={i} size={[1.7, 0.34, 1.3]} position={[0, 0.17 + i * 0.38, 0]} material={i % 2 ? M.panel : M.solid} />
        ))}
        <group ref={floor} position={[0, 1.9, 0]}>
          <EBox size={[1.7, 0.34, 1.3]} position={[0, 0.17, 0]} material={M.brand} />
        </group>
        {[-0.8, 0.8].map((x) =>
          [-0.6, 0.6].map((z) => <EBox key={`${x}${z}`} size={[0.05, 2.6, 0.05]} position={[x, 1.3, z]} material={M.glow} edge={M.edgeDim} />),
        )}
      </group>

      {/* Tower crane */}
      <group position={[1.35, 0, -0.3]}>
        <EBox size={[0.16, 3.4, 0.16]} position={[0, 1.7, 0]} edge={M.edge} />
        <group ref={jib} position={[0, 3.45, 0]}>
          <EBox size={[3.2, 0.1, 0.12]} position={[-1.1, 0, 0]} />
          <EBox size={[0.9, 0.1, 0.12]} position={[0.85, 0, 0]} />
          <EBox size={[0.35, 0.3, 0.3]} position={[1.15, -0.18, 0]} material={M.brand} />
          <EBox size={[0.22, 0.22, 0.22]} position={[0.05, 0.12, 0]} material={M.panel} />
          <group ref={trolley} position={[-1, -0.08, 0]}>
            <EBox size={[0.16, 0.06, 0.14]} material={M.glow} />
            <group ref={hook} position={[0, -1, 0]}>
              <EBox size={[0.008, 2, 0.008]} position={[0, 1, 0]} material={M.glow} edge={M.edgeDim} />
              <EBox size={[0.42, 0.22, 0.42]} position={[0, -0.12, 0]} material={M.brand} />
            </group>
          </group>
        </group>
      </group>
      <Sparkles count={50} area={[5, 3, 3]} position={[0, 1.5, 0]} size={0.04} />
    </group>
  );
}
