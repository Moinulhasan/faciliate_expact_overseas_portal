import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ExtrudeGeometry, Shape } from "three";
import { C, M } from "./IndustryScene-BYn2JAVN.js";
import { u as useDisposable, a as ShaderPlane, b as ECyl, F as FlowTube, c as Edged } from "./parts-CUtjbVIT.js";
const radarFrag = "// Radar sweep on a disc: rotating wedge with a fading tail, range rings and a soft rim.\nuniform float uTime;\nuniform vec3 uColor;\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 p = vUv - 0.5;\n  float r = length(p) * 2.0;\n  if (r > 1.0) discard;\n  float a = atan(p.y, p.x) / 6.28318 + 0.5;\n  float sweep = fract(a - uTime * 0.18);\n  float tail = pow(sweep, 10.0);\n  float rings = smoothstep(0.03, 0.0, abs(fract(r * 4.0) - 0.5) - 0.47);\n  float rim = smoothstep(0.92, 1.0, r);\n  float alpha = tail * 0.75 + rings * 0.18 + rim * 0.35;\n  gl_FragColor = vec4(uColor, alpha * (1.0 - r * 0.35));\n}\n";
const config = { camera: [0, 2.6, 5.6], target: [0, 0.7, 0] };
function shieldShape() {
  const s = new Shape();
  s.moveTo(0, 0.75);
  s.bezierCurveTo(0.3, 0.6, 0.55, 0.62, 0.62, 0.6);
  s.bezierCurveTo(0.62, 0.05, 0.45, -0.45, 0, -0.75);
  s.bezierCurveTo(-0.45, -0.45, -0.62, 0.05, -0.62, 0.6);
  s.bezierCurveTo(-0.55, 0.62, -0.3, 0.6, 0, 0.75);
  return s;
}
function Security() {
  const shield = useRef(null);
  const cam = useRef(null);
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
    const a = i / 10 * Math.PI * 2;
    return [Math.cos(a) * 2.3, Math.sin(a) * 2.3];
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.3, 0], children: [
    /* @__PURE__ */ jsx(ShaderPlane, { frag: radarFrag, size: [5, 5], rotation: [-Math.PI / 2, 0, 0], position: [0, 0.01, 0], uniforms: { uColor: C.cta } }),
    posts.map(([x, z], i) => /* @__PURE__ */ jsx(ECyl, { r: 0.03, h: 0.5, seg: 6, position: [x, 0.25, z], material: M.glow, edge: M.edgeDim }, i)),
    /* @__PURE__ */ jsx(FlowTube, { points: [...posts, posts[0]].map(([x, z]) => [x, 0.42, z]), radius: 0.012, speed: 0.15, repeat: 10 }),
    /* @__PURE__ */ jsxs("group", { ref: shield, position: [0, 1.45, 0], children: [
      /* @__PURE__ */ jsx(Edged, { geometry: geo, material: M.brand }),
      /* @__PURE__ */ jsx("mesh", { position: [0, 0.02, 0.12], material: M.glow, scale: [0.5, 0.5, 1], children: /* @__PURE__ */ jsx("circleGeometry", { args: [0.3, 6] }) })
    ] }),
    /* @__PURE__ */ jsxs("group", { position: [-1.6, 0, -0.6], children: [
      /* @__PURE__ */ jsx(ECyl, { r: 0.04, h: 1.6, seg: 8, position: [0, 0.8, 0] }),
      /* @__PURE__ */ jsxs("group", { ref: cam, position: [0, 1.6, 0], children: [
        /* @__PURE__ */ jsx("mesh", { material: M.solid, rotation: [Math.PI, 0, 0], children: /* @__PURE__ */ jsx("sphereGeometry", { args: [0.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2] }) }),
        /* @__PURE__ */ jsx("mesh", { position: [0.12, -0.08, 0], material: M.glow, children: /* @__PURE__ */ jsx("sphereGeometry", { args: [0.035, 10, 8] }) }),
        /* @__PURE__ */ jsxs("mesh", { position: [0.9, -0.5, 0], rotation: [0, 0, Math.PI / 2 + 0.55], children: [
          /* @__PURE__ */ jsx("coneGeometry", { args: [0.35, 1.6, 20, 1, true] }),
          /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.cta, transparent: true, opacity: 0.07, depthWrite: false })
        ] })
      ] })
    ] })
  ] });
}
export {
  config,
  Security as default
};
