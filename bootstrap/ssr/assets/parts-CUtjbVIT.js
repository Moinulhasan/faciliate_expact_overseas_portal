import { jsx, jsxs } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useMemo, useEffect } from "react";
import { Vector3, CurvePath, LineCurve3, CatmullRomCurve3, TubeGeometry, BoxGeometry, EdgesGeometry, BufferGeometry, BufferAttribute, ShaderMaterial, AdditiveBlending, CylinderGeometry } from "three";
import { C, M } from "./IndustryScene-BYn2JAVN.js";
const basicVert = "varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
const flowFrag = "// Dashes travelling along a tube (uv.x runs along its length). Pipes, cables, routes.\nuniform float uTime;\nuniform float uSpeed;\nuniform float uRepeat;\nuniform float uBase;\nuniform vec3 uColor;\nvarying vec2 vUv;\n\nvoid main() {\n  float d = fract(vUv.x * uRepeat - uTime * uSpeed);\n  float pulse = smoothstep(0.0, 0.55, d) * (1.0 - smoothstep(0.55, 0.68, d));\n  float a = uBase + pulse * 0.95;\n  gl_FragColor = vec4(uColor * (0.6 + pulse), a);\n}\n";
const pointsFrag = "uniform vec3 uColor;\nvarying float vAlpha;\n\nvoid main() {\n  vec2 c = gl_PointCoord - 0.5;\n  float r = dot(c, c);\n  if (r > 0.25) discard;\n  float soft = 1.0 - smoothstep(0.05, 0.25, r);\n  gl_FragColor = vec4(uColor, soft * vAlpha);\n}\n";
const pointsVert = "// Soft breathing points; optional upward drift (steam, sparks, data) when uRise > 0.\nuniform float uTime;\nuniform float uSize;\nuniform float uRise;\nuniform float uHeight;\nattribute float aRand;\nvarying float vAlpha;\n\nvoid main() {\n  vec3 p = position;\n  if (uRise > 0.0) {\n    float t = fract(uTime * uRise * (0.6 + aRand * 0.8) + aRand);\n    p.y += t * uHeight;\n    p.x += sin(t * 6.2831 + aRand * 12.0) * 0.08;\n    vAlpha = sin(t * 3.14159);\n  } else {\n    vAlpha = 0.55 + 0.45 * sin(uTime * 1.4 + aRand * 6.2831);\n  }\n  vec4 mv = modelViewMatrix * vec4(p, 1.0);\n  gl_PointSize = uSize * (0.6 + aRand * 0.8) * (300.0 / -mv.z);\n  gl_Position = projectionMatrix * mv;\n}\n";
function useDisposable(make, deps) {
  const obj = useMemo(make, deps);
  useEffect(() => () => obj.dispose(), [obj]);
  return obj;
}
function useTimedShader(frag, uniforms, opts = {}) {
  const mat = useDisposable(
    () => new ShaderMaterial({
      vertexShader: opts.vert ?? basicVert,
      fragmentShader: frag,
      uniforms: { uTime: { value: 0 }, ...Object.fromEntries(Object.entries(uniforms).map(([k, v]) => [k, { value: v }])) },
      transparent: true,
      depthWrite: false,
      ...opts.additive === false ? {} : { blending: AdditiveBlending },
      ...opts.side !== void 0 ? { side: opts.side } : {}
    }),
    [frag]
  );
  useFrame((_, dt) => {
    mat.uniforms.uTime.value += dt;
  });
  return mat;
}
function Edged({
  geometry,
  material = M.solid,
  edge = M.edge,
  ...props
}) {
  const edges = useDisposable(() => new EdgesGeometry(geometry, 25), [geometry]);
  return /* @__PURE__ */ jsxs("group", { ...props, children: [
    /* @__PURE__ */ jsx("mesh", { geometry, material }),
    /* @__PURE__ */ jsx("lineSegments", { geometry: edges, material: edge })
  ] });
}
function EBox({ size, material, edge, ...props }) {
  const g = useDisposable(() => new BoxGeometry(...size), [size.join()]);
  return /* @__PURE__ */ jsx(Edged, { geometry: g, material, edge, ...props });
}
function ECyl({
  r,
  h,
  seg = 16,
  rTop = r,
  material,
  edge,
  ...props
}) {
  const g = useDisposable(() => new CylinderGeometry(rTop, r, h, seg), [r, rTop, h, seg]);
  return /* @__PURE__ */ jsx(Edged, { geometry: g, material, edge, ...props });
}
function FlowTube({
  points,
  radius = 0.025,
  color = C.cta,
  speed = 0.35,
  repeat = 5,
  base = 0.1,
  sharp = false
}) {
  const geo = useDisposable(() => {
    const v = points.map((p) => new Vector3(...p));
    let curve;
    if (sharp) {
      const path = new CurvePath();
      for (let i = 0; i < v.length - 1; i++) path.add(new LineCurve3(v[i], v[i + 1]));
      curve = path;
    } else curve = new CatmullRomCurve3(v);
    return new TubeGeometry(curve, sharp ? 64 * (v.length - 1) : 96, radius, 8, false);
  }, [JSON.stringify(points), radius, sharp]);
  const mat = useTimedShader(flowFrag, { uSpeed: speed, uRepeat: repeat, uBase: base, uColor: color });
  return /* @__PURE__ */ jsx("mesh", { geometry: geo, material: mat });
}
function Sparkles({
  count = 60,
  area = [3, 2, 2],
  color = C.ctaHi,
  size = 0.06,
  rise = 0,
  height = 1,
  seed = 1,
  ...props
}) {
  const geo = useDisposable(() => {
    let s = seed * 9301;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
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
  return /* @__PURE__ */ jsx("group", { ...props, children: /* @__PURE__ */ jsx("points", { geometry: geo, material: mat }) });
}
function ShaderPlane({ frag, size = [2, 2], uniforms = {}, ...props }) {
  const mat = useTimedShader(frag, { uColor: C.cta, ...uniforms });
  return /* @__PURE__ */ jsx("group", { ...props, children: /* @__PURE__ */ jsx("mesh", { material: mat, children: /* @__PURE__ */ jsx("planeGeometry", { args: size }) }) });
}
function GridFloor({ size = 12, divisions = 24, y = 0 }) {
  return /* @__PURE__ */ jsx("gridHelper", { args: [size, divisions, C.brand, C.forest], position: [0, y, 0], children: /* @__PURE__ */ jsx("lineBasicMaterial", { attach: "material", color: C.brand, transparent: true, opacity: 0.28 }) });
}
export {
  EBox as E,
  FlowTube as F,
  GridFloor as G,
  Sparkles as S,
  ShaderPlane as a,
  ECyl as b,
  Edged as c,
  useDisposable as u
};
