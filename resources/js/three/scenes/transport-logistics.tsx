import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { C, M } from "../palette";
import { EBox, ECyl, FlowTube, GridFloor } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [1.6, 2.6, 6], target: [0, 0.8, 0] };

function Rack({ x }: { x: number }) {
  return (
    <group position={[x, 0, -0.9]}>
      {[0, 1, 2].map((lvl) => (
        <group key={lvl} position={[0, 0.05 + lvl * 0.75, 0]}>
          <EBox size={[1.5, 0.04, 0.6]} material={M.panel} edge={M.edgeDim} />
          {[-0.5, 0, 0.5].map((bx, k) =>
            (lvl + k + Math.round(x)) % 4 !== 0 ? (
              <EBox key={bx} size={[0.4, 0.36, 0.45]} position={[bx, 0.2, 0]} material={(lvl + k) % 2 ? M.brand : M.solid} />
            ) : null,
          )}
        </group>
      ))}
      {[-0.74, 0.74].map((px) => (
        <EBox key={px} size={[0.04, 2.3, 0.04]} position={[px, 1.15, 0.28]} material={M.glow} edge={M.edgeDim} />
      ))}
    </group>
  );
}

// Warehouse aisle: forklift shuttles a pallet and lifts it to the racks; route lines flow on the floor.
export default function TransportLogistics() {
  const truck = useRef<Group>(null);
  const forks = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const s = Math.sin(t * 0.5);
    if (truck.current) truck.current.position.x = s * 1.4;
    if (forks.current) forks.current.position.y = 0.18 + Math.max(0, Math.sin(t * 0.5 + Math.PI / 2)) * 0.6;
  });

  return (
    <group position={[0, -0.45, 0]}>
      <GridFloor />
      <Rack x={-1.6} />
      <Rack x={0} />
      <Rack x={1.6} />
      <FlowTube sharp points={[[-3, 0.02, 0.4], [3, 0.02, 0.4]]} radius={0.012} speed={0.3} repeat={12} />
      <FlowTube sharp points={[[-3, 0.02, 1.2], [-0.4, 0.02, 1.2], [-0.4, 0.02, 2.2]]} radius={0.012} speed={0.4} repeat={10} color={C.ctaHi} />
      {/* Forklift (faces -z, toward the racks) */}
      <group ref={truck} position={[0, 0, 0.75]}>
        <EBox size={[0.6, 0.35, 0.8]} position={[0, 0.3, 0.1]} material={M.brand} />
        <EBox size={[0.55, 0.04, 0.5]} position={[0, 0.85, 0.2]} material={M.solid} />
        {[-0.24, 0.24].map((x) => (
          <EBox key={x} size={[0.04, 0.6, 0.04]} position={[x, 0.6, 0.38]} edge={M.edgeDim} />
        ))}
        {[-0.28, 0.28].map((x) => (
          <EBox key={x} size={[0.04, 1.2, 0.05]} position={[x, 0.6, -0.33]} material={M.glow} edge={M.edgeDim} />
        ))}
        <group ref={forks} position={[0, 0.18, -0.6]}>
          <EBox size={[0.08, 0.03, 0.5]} position={[-0.16, 0, 0]} material={M.glow} edge={M.edgeDim} />
          <EBox size={[0.08, 0.03, 0.5]} position={[0.16, 0, 0]} material={M.glow} edge={M.edgeDim} />
          <EBox size={[0.46, 0.34, 0.42]} position={[0, 0.2, 0]} material={M.panel} />
        </group>
        {[
          [-0.32, 0.35],
          [0.32, 0.35],
          [-0.32, -0.15],
          [0.32, -0.15],
        ].map(([x, z]) => (
          <ECyl key={`${x}${z}`} r={0.12} h={0.08} seg={14} position={[x, 0.12, z]} rotation={[0, 0, Math.PI / 2]} material={M.solid} />
        ))}
      </group>
    </group>
  );
}
