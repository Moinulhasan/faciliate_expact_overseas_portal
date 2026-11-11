import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshStandardMaterial, type Group } from "three";
import { C, M } from "../palette";
import { EBox, ECyl, FlowTube, GridFloor } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [3.2, 2.8, 5.4], target: [0, 1.15, 0] };

const glass = new MeshStandardMaterial({ color: C.forest, transparent: true, opacity: 0.12, depthWrite: false });

// Building cutaway: electrical, water and HVAC runs pulsing through the floors; rooftop fan spinning.
export default function Mep() {
  const fan = useRef<Group>(null);
  useFrame((_, dt) => {
    if (fan.current) fan.current.rotation.y += dt * 4;
  });

  return (
    <group position={[0, -0.5, 0]}>
      <GridFloor />
      {[0, 1, 2].map((i) => (
        <EBox key={i} size={[2.8, 0.9, 1.8]} position={[0, 0.45 + i * 0.92, 0]} material={glass} edge={M.edgeDim} />
      ))}
      {/* Electrical (lime), water (light), HVAC duct (thick, slow) */}
      <FlowTube sharp points={[[-1.3, 0.05, 0.8], [-1.3, 2.5, 0.8], [1.2, 2.5, 0.8], [1.2, 1.4, 0.8]]} radius={0.022} speed={0.9} repeat={10} />
      <FlowTube sharp points={[[-1.1, 0.05, -0.7], [-1.1, 1.8, -0.7], [0.4, 1.8, -0.7], [0.4, 0.6, -0.7], [1.2, 0.6, -0.7]]} radius={0.03} speed={0.4} color={C.ctaHi} repeat={6} />
      <FlowTube sharp points={[[1.3, 2.9, 0], [1.3, 2.7, 0], [-1, 2.7, 0], [-1, 0.9, 0]]} radius={0.07} speed={0.2} base={0.16} color={C.muted} repeat={4} />
      {/* Panels / junction boxes */}
      <EBox size={[0.3, 0.42, 0.1]} position={[-1.3, 0.7, 0.86]} material={M.brand} />
      <EBox size={[0.24, 0.24, 0.1]} position={[1.2, 1.4, 0.86]} material={M.glow} edge={M.edgeDim} />
      {/* Rooftop AC unit */}
      <group position={[0.9, 2.95, -0.2]}>
        <EBox size={[0.8, 0.3, 0.8]} material={M.panel} />
        <group ref={fan} position={[0, 0.17, 0]}>
          {[0, 1, 2, 3].map((i) => (
            <EBox key={i} size={[0.6, 0.02, 0.12]} rotation={[0, (i * Math.PI) / 4, 0]} material={M.glow} edge={M.edgeDim} />
          ))}
        </group>
        <ECyl r={0.33} h={0.04} seg={24} position={[0, 0.16, 0]} material={glass} />
      </group>
    </group>
  );
}
