import { useFrame, type ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  CurvePath,
  CylinderGeometry,
  EdgesGeometry,
  LineCurve3,
  ShaderMaterial,
  TubeGeometry,
  Vector3,
  type LineBasicMaterial,
  type Side,
  type Material,
} from "three";
import basicVert from "./shaders/basic.vert?raw";
import flowFrag from "./shaders/flow.frag?raw";
import pointsFrag from "./shaders/points.frag?raw";
import pointsVert from "./shaders/points.vert?raw";
import { C, M } from "./palette";

type GroupProps = ThreeElements["group"];
type V3 = [number, number, number];

/** useMemo + dispose on change/unmount (CLAUDE.md §9: dispose geometries/materials). */
export function useDisposable<T extends { dispose(): void }>(make: () => T, deps: unknown[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const obj = useMemo(make, deps);
  useEffect(() => () => obj.dispose(), [obj]);
  return obj;
}

/** Shader material whose uTime advances every frame. */
export function useTimedShader(frag: string, uniforms: Record<string, unknown>, opts: { vert?: string; additive?: boolean; side?: Side } = {}) {
  const mat = useDisposable(
    () =>
      new ShaderMaterial({
        vertexShader: opts.vert ?? basicVert,
        fragmentShader: frag,
        uniforms: { uTime: { value: 0 }, ...Object.fromEntries(Object.entries(uniforms).map(([k, v]) => [k, { value: v }])) },
        transparent: true,
        depthWrite: false,
        ...(opts.additive === false ? {} : { blending: AdditiveBlending }),
        ...(opts.side !== undefined ? { side: opts.side } : {}),
      }),
    [frag],
  );
  useFrame((_, dt) => {
    mat.uniforms.uTime.value += dt;
  });
  return mat;
}

/** Solid mesh + glowing edge lines — the blueprint look shared by every scene. */
export function Edged({
  geometry,
  material = M.solid,
  edge = M.edge,
  ...props
}: { geometry: BufferGeometry; material?: Material; edge?: LineBasicMaterial } & GroupProps) {
  const edges = useDisposable(() => new EdgesGeometry(geometry, 25), [geometry]);
  return (
    <group {...props}>
      <mesh geometry={geometry} material={material} />
      <lineSegments geometry={edges} material={edge} />
    </group>
  );
}

export function EBox({ size, material, edge, ...props }: { size: V3; material?: Material; edge?: LineBasicMaterial } & GroupProps) {
  const g = useDisposable(() => new BoxGeometry(...size), [size.join()]);
  return <Edged geometry={g} material={material} edge={edge} {...props} />;
}

export function ECyl({
  r,
  h,
  seg = 16,
  rTop = r,
  material,
  edge,
  ...props
}: { r: number; h: number; seg?: number; rTop?: number; material?: Material; edge?: LineBasicMaterial } & GroupProps) {
  const g = useDisposable(() => new CylinderGeometry(rTop, r, h, seg), [r, rTop, h, seg]);
  return <Edged geometry={g} material={material} edge={edge} {...props} />;
}

/** Tube with dashes flowing along it. `sharp` = orthogonal pipe runs instead of a smooth curve. */
export function FlowTube({
  points,
  radius = 0.025,
  color = C.cta,
  speed = 0.35,
  repeat = 5,
  base = 0.1,
  sharp = false,
}: {
  points: V3[];
  radius?: number;
  color?: Color;
  speed?: number;
  repeat?: number;
  base?: number;
  sharp?: boolean;
}) {
  const geo = useDisposable(() => {
    const v = points.map((p) => new Vector3(...p));
    let curve;
    if (sharp) {
      const path = new CurvePath<Vector3>();
      for (let i = 0; i < v.length - 1; i++) path.add(new LineCurve3(v[i], v[i + 1]));
      curve = path;
    } else curve = new CatmullRomCurve3(v);
    return new TubeGeometry(curve, sharp ? 64 * (v.length - 1) : 96, radius, 8, false);
  }, [JSON.stringify(points), radius, sharp]);
  const mat = useTimedShader(flowFrag, { uSpeed: speed, uRepeat: repeat, uBase: base, uColor: color });
  return <mesh geometry={geo} material={mat} />;
}

/** Soft particles in a box volume; `rise` makes them drift upward (steam, sparks, data). */
export function Sparkles({
  count = 60,
  area = [3, 2, 2],
  color = C.ctaHi,
  size = 0.06,
  rise = 0,
  height = 1,
  seed = 1,
  ...props
}: { count?: number; area?: V3; color?: Color; size?: number; rise?: number; height?: number; seed?: number } & GroupProps) {
  const geo = useDisposable(() => {
    let s = seed * 9301;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd() - 0.5) * area[0];
      pos[i * 3 + 1] = (rnd() - 0.5) * area[1];
      pos[i * 3 + 2] = (rnd() - 0.5) * area[2];
      rand[i] = rnd();
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aRand", new BufferAttribute(rand, 1));
    return g;
  }, [count, area.join(), seed]);
  const mat = useTimedShader(pointsFrag, { uColor: color, uSize: size, uRise: rise, uHeight: height }, { vert: pointsVert });
  return (
    <group {...props}>
      <points geometry={geo} material={mat} />
    </group>
  );
}

/** Flat plane driven by a fragment shader (ripples, radar…). */
export function ShaderPlane({ frag, size = [2, 2], uniforms = {}, ...props }: { frag: string; size?: [number, number]; uniforms?: Record<string, unknown> } & GroupProps) {
  const mat = useTimedShader(frag, { uColor: C.cta, ...uniforms });
  return (
    <group {...props}>
      <mesh material={mat}>
        <planeGeometry args={size} />
      </mesh>
    </group>
  );
}

/** Thin glowing grid floor that fades into the fog. */
export function GridFloor({ size = 12, divisions = 24, y = 0 }: { size?: number; divisions?: number; y?: number }) {
  return (
    <gridHelper args={[size, divisions, C.brand, C.forest]} position={[0, y, 0]}>
      <lineBasicMaterial attach="material" color={C.brand} transparent opacity={0.28} />
    </gridHelper>
  );
}
