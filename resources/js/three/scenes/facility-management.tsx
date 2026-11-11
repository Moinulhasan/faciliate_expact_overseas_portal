import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MeshStandardMaterial, type Group, type Mesh } from "three";
import { C, M } from "../palette";
import { EBox, GridFloor, Sparkles } from "../parts";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [2.6, 2.6, 5.8], target: [0, 1.4, 0] };

const COLS = 5;
const ROWS = 6;

// A maintenance ring sweeps the façade; windows it passes light up "serviced". Rooftop fans turn.
export default function FacilityManagement() {
  const ring = useRef<Mesh>(null);
  const fans = useRef<(Group | null)[]>([]);
  const windows = useRef<Mesh[]>([]);
  const mats = useMemo(
    () => Array.from({ length: COLS * ROWS }, () => new MeshStandardMaterial({ color: C.night2, emissive: C.cta, emissiveIntensity: 0 })),
    [],
  );
  useEffect(() => () => mats.forEach((m) => m.dispose()), [mats]);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const y = 0.2 + ((Math.sin(t * 0.45) + 1) / 2) * 2.4;
    if (ring.current) ring.current.position.y = y;
    windows.current.forEach((w, i) => {
      if (!w) return;
      const m = mats[i];
      const near = Math.max(0, 1 - Math.abs(w.position.y - y) / 0.35);
      m.emissiveIntensity = Math.max(m.emissiveIntensity * (1 - dt * 0.35), near * 1.2);
    });
    fans.current.forEach((f) => f && (f.rotation.y += dt * 5));
  });

  return (
    <group position={[0, -0.4, 0]}>
      <GridFloor />
      <EBox size={[2, 2.8, 1.4]} position={[0, 1.4, 0]} material={M.solid} />
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        return (
          <mesh
            key={i}
            ref={(m) => {
              if (m) windows.current[i] = m;
            }}
            position={[-0.72 + c * 0.36, 0.35 + r * 0.42, 0.705]}
            material={mats[i]}
          >
            <planeGeometry args={[0.24, 0.26]} />
          </mesh>
        );
      })}
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.02, 8, 64]} />
        <meshBasicMaterial color={C.ctaHi} />
      </mesh>
      {/* Rooftop units */}
      {[-0.5, 0.5].map((x, i) => (
        <group key={x} position={[x, 2.95, 0]}>
          <EBox size={[0.6, 0.25, 0.6]} material={M.panel} />
          <group ref={(g) => (fans.current[i] = g)} position={[0, 0.14, 0]}>
            {[0, 1, 2].map((k) => (
              <EBox key={k} size={[0.46, 0.015, 0.09]} rotation={[0, (k * Math.PI) / 3, 0]} material={M.glow} edge={M.edgeDim} />
            ))}
          </group>
        </group>
      ))}
      <Sparkles count={40} area={[3, 3, 2]} position={[0, 1.5, 0.8]} size={0.04} />
    </group>
  );
}
