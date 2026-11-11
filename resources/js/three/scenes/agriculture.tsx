import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { ConeGeometry, Object3D, ShaderMaterial, type InstancedMesh, type Mesh } from "three";
import { C, M } from "../palette";
import { EBox, GridFloor, Sparkles, useDisposable } from "../parts";
import swayFrag from "../shaders/sway.frag?raw";
import swayVert from "../shaders/sway.vert?raw";
import type { SceneConfig } from "../Stage";

export const config: SceneConfig = { camera: [0, 2.2, 6.4], target: [0, 0.5, 0] };

const ROWS = 9;
const PER_ROW = 46;

// Rows of crops swaying in a GPU wind field under a rising sun, inside a greenhouse frame.
export default function Agriculture() {
  const crops = useRef<InstancedMesh>(null);
  const sun = useRef<Mesh>(null);
  const geo = useDisposable(() => new ConeGeometry(0.05, 1, 4, 4, true).translate(0, 0.5, 0), []);
  const mat = useDisposable(
    () => new ShaderMaterial({ vertexShader: swayVert, fragmentShader: swayFrag, uniforms: { uTime: { value: 0 }, uBase: { value: C.forest }, uTip: { value: C.cta } } }),
    [],
  );

  useEffect(() => {
    const m = crops.current;
    if (!m) return;
    const o = new Object3D();
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let k = 0; k < PER_ROW; k++) {
        const jitter = Math.sin(r * 12.9 + k * 78.2) * 0.04;
        o.position.set(-2.6 + k * 0.115 + jitter, 0, -1.6 + r * 0.38);
        o.scale.setScalar(0.35 + (Math.sin(k * 3.1 + r) * 0.5 + 0.5) * 0.3);
        o.rotation.y = k;
        o.updateMatrix();
        m.setMatrixAt(i++, o.matrix);
      }
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }, dt) => {
    mat.uniforms.uTime.value += dt;
    if (sun.current) sun.current.position.y = 1.9 + Math.sin(clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <group position={[0, -0.3, 0]}>
      <GridFloor />
      <instancedMesh ref={crops} args={[geo, mat, ROWS * PER_ROW]} />
      {/* Soil beds */}
      {Array.from({ length: ROWS }, (_, r) => (
        <EBox key={r} size={[5.4, 0.04, 0.22]} position={[0, 0.02, -1.6 + r * 0.38]} material={M.solid} edge={M.edgeDim} />
      ))}
      {/* Greenhouse arches */}
      {[-1.8, 0, 1.8].map((z) => (
        <mesh key={z} position={[0, 0, z - 0.1]} rotation={[0, 0, 0]}>
          <torusGeometry args={[2.9, 0.012, 6, 48, Math.PI]} />
          <meshBasicMaterial color={C.cta} transparent opacity={0.3} />
        </mesh>
      ))}
      <mesh ref={sun} position={[1.7, 1.9, -2.4]}>
        <sphereGeometry args={[0.32, 24, 16]} />
        <meshBasicMaterial color={C.ctaHi} />
      </mesh>
      <Sparkles count={70} area={[5.5, 1.6, 3.4]} position={[0, 1, 0]} size={0.04} />
    </group>
  );
}
