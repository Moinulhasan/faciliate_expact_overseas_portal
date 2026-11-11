import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { C, M } from "../palette";
import { EBox, ECyl, FlowTube, GridFloor, Sparkles } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0.4, 2, 6.4], target: [0, 0.9, 0] };

// Offshore platform with derrick, flare and live pipelines flowing to shore.
export default function OilGas() {
  const bob = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (bob.current) bob.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.03;
  });

  return (
    <group position={[0, -0.5, 0]}>
      <GridFloor />
      <group ref={bob} position={[0.5, 0, 0]}>
        {[-0.7, 0.7].map((x) =>
          [-0.5, 0.5].map((z) => <ECyl key={`${x}${z}`} r={0.09} h={1.2} seg={8} position={[x, 0.6, z]} />),
        )}
        <EBox size={[1.9, 0.16, 1.4]} position={[0, 1.25, 0]} material={M.panel} />
        <EBox size={[0.8, 0.45, 0.6]} position={[-0.45, 1.55, 0.25]} />
        <EBox size={[0.5, 0.3, 0.5]} position={[0.5, 1.48, 0.35]} material={M.brand} />
        {/* Derrick: 4-sided tapered lattice */}
        <ECyl r={0.42} rTop={0.06} h={2} seg={4} position={[0.3, 2.33, -0.25]} rotation={[0, Math.PI / 4, 0]} />
        <EBox size={[0.08, 0.08, 0.08]} position={[0.3, 3.36, -0.25]} material={M.glow} />
        {/* Flare boom + flame */}
        <EBox size={[1.2, 0.05, 0.05]} position={[-1.4, 1.95, -0.3]} rotation={[0, 0, 0.5]} />
        <Sparkles count={40} area={[0.18, 0.05, 0.18]} position={[-1.95, 2.25, -0.3]} rise={0.9} height={0.7} size={0.09} color={C.ctaHi} />
      </group>
      {/* Pipelines */}
      <FlowTube points={[[0, 0.05, 0.5], [-1, 0.05, 1.2], [-2.2, 0.05, 1.1], [-3.2, 0.05, 1.6]]} radius={0.035} speed={0.45} />
      <FlowTube points={[[0.6, 0.05, 0.6], [0.2, 0.05, 1.6], [-1.4, 0.05, 2.2], [-3, 0.05, 2.4]]} radius={0.03} speed={0.35} repeat={7} />
      <FlowTube points={[[1.2, 0.05, 0.2], [2.2, 0.05, 0.9], [2.6, 0.05, 2.2]]} radius={0.03} speed={0.5} color={C.ctaHi} />
      <Sparkles count={40} area={[6, 2, 4]} position={[0, 1.6, 0]} size={0.035} />
    </group>
  );
}
