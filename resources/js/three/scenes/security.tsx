import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ExtrudeGeometry, Shape, type Group } from "three";
import { C, M } from "../palette";
import { ECyl, Edged, FlowTube, ShaderPlane, useDisposable } from "../parts";
import radarFrag from "../shaders/radar.frag?raw";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0, 2.6, 5.6], target: [0, 0.7, 0] };

function shieldShape() {
  const s = new Shape();
  s.moveTo(0, 0.75);
  s.bezierCurveTo(0.3, 0.6, 0.55, 0.62, 0.62, 0.6);
  s.bezierCurveTo(0.62, 0.05, 0.45, -0.45, 0, -0.75);
  s.bezierCurveTo(-0.45, -0.45, -0.62, 0.05, -0.62, 0.6);
  s.bezierCurveTo(-0.55, 0.62, -0.3, 0.6, 0, 0.75);
  return s;
}

// Radar sweep across a secured perimeter, a floating shield and a CCTV dome panning the site.
export default function Security() {
  const shield = useRef<Group>(null);
  const cam = useRef<Group>(null);
  const geo = useDisposable(() => new ExtrudeGeometry(shieldShape(), { depth: 0.14, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 }).center(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (shield.current) {
      shield.current.rotation.y = Math.sin(t * 0.6) * 0.5;
      shield.current.position.y = 1.45 + Math.sin(t * 1.1) * 0.06;
    }
    if (cam.current) cam.current.rotation.y = Math.sin(t * 0.5) * 0.9;
  });

  const posts = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return [Math.cos(a) * 2.3, Math.sin(a) * 2.3] as const;
  });

  return (
    <group position={[0, -0.3, 0]}>
      <ShaderPlane frag={radarFrag} size={[5, 5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} uniforms={{ uColor: C.cta }} />
      {/* Perimeter fence */}
      {posts.map(([x, z], i) => (
        <ECyl key={i} r={0.03} h={0.5} seg={6} position={[x, 0.25, z]} material={M.glow} edge={M.edgeDim} />
      ))}
      <FlowTube points={[...posts, posts[0]].map(([x, z]) => [x, 0.42, z] as [number, number, number])} radius={0.012} speed={0.15} repeat={10} />
      {/* Shield */}
      <group ref={shield} position={[0, 1.45, 0]}>
        <Edged geometry={geo} material={M.brand} />
        <mesh position={[0, 0.02, 0.12]} material={M.glow} scale={[0.5, 0.5, 1]}>
          <circleGeometry args={[0.3, 6]} />
        </mesh>
      </group>
      {/* CCTV dome on a pole */}
      <group position={[-1.6, 0, -0.6]}>
        <ECyl r={0.04} h={1.6} seg={8} position={[0, 0.8, 0]} />
        <group ref={cam} position={[0, 1.6, 0]}>
          <mesh material={M.solid} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0.12, -0.08, 0]} material={M.glow}>
            <sphereGeometry args={[0.035, 10, 8]} />
          </mesh>
          <mesh position={[0.9, -0.5, 0]} rotation={[0, 0, Math.PI / 2 + 0.55]}>
            <coneGeometry args={[0.35, 1.6, 20, 1, true]} />
            <meshBasicMaterial color={C.cta} transparent opacity={0.07} depthWrite={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
