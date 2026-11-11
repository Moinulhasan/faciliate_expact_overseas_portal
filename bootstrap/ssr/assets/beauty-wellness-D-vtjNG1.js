import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { C, M } from "./IndustryScene-BYn2JAVN.js";
import { a as ShaderPlane, b as ECyl, S as Sparkles } from "./parts-CUtjbVIT.js";
import "three";
const rippleFrag = "// Concentric water ripples expanding from the centre of a plane, fading at the rim.\nuniform float uTime;\nuniform vec3 uColor;\nvarying vec2 vUv;\n\nvoid main() {\n  float r = length(vUv - 0.5);\n  float ring = pow(0.5 + 0.5 * sin(r * 70.0 - uTime * 2.4), 6.0);\n  float fade = 1.0 - smoothstep(0.12, 0.5, r);\n  gl_FragColor = vec4(uColor, ring * fade * 0.55);\n}\n";
const config = { camera: [0, 2.3, 5.6], target: [0, 0.6, 0] };
const stones = [
  // radius, height, y, tilt
  [0.85, 0.32, 0.16, 0.02],
  [0.68, 0.28, 0.47, -0.05],
  [0.52, 0.24, 0.73, 0.06],
  [0.36, 0.2, 0.95, -0.04]
];
function BeautyWellness() {
  const stack = useRef(null);
  const flame = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (stack.current) stack.current.rotation.y = t * 0.15;
    if (flame.current) flame.current.scale.y = 1 + Math.sin(t * 9) * 0.12 + Math.sin(t * 13) * 0.06;
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.3, 0], children: [
    /* @__PURE__ */ jsx(ShaderPlane, { frag: rippleFrag, size: [7, 7], rotation: [-Math.PI / 2, 0, 0], position: [0, 5e-3, 0], uniforms: { uColor: C.cta } }),
    /* @__PURE__ */ jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], children: [
      /* @__PURE__ */ jsx("circleGeometry", { args: [3.4, 64] }),
      /* @__PURE__ */ jsx("meshStandardMaterial", { color: C.night2, roughness: 0.15, metalness: 0.6, transparent: true, opacity: 0.85 })
    ] }),
    /* @__PURE__ */ jsx("group", { ref: stack, children: stones.map(([r, h, y, tilt], i) => /* @__PURE__ */ jsxs("group", { position: [0, y, 0], rotation: [tilt, i, tilt], scale: [1, 1, 0.82], children: [
      /* @__PURE__ */ jsx("mesh", { material: i % 2 ? M.panel : M.brand, scale: [r, h / 2, r], children: /* @__PURE__ */ jsx("sphereGeometry", { args: [1, 32, 16] }) }),
      /* @__PURE__ */ jsxs("mesh", { rotation: [Math.PI / 2, 0, 0], scale: [r, r, 1], children: [
        /* @__PURE__ */ jsx("torusGeometry", { args: [1, 0.012, 6, 48] }),
        /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.cta, transparent: true, opacity: 0.6 })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("group", { position: [1.5, 0, 0.6], children: [
      /* @__PURE__ */ jsx(ECyl, { r: 0.16, h: 0.4, seg: 20, position: [0, 0.2, 0], material: M.soft, edge: M.edgeDim }),
      /* @__PURE__ */ jsx("group", { ref: flame, position: [0, 0.48, 0], children: /* @__PURE__ */ jsx("mesh", { material: M.glow, scale: [0.05, 0.1, 0.05], children: /* @__PURE__ */ jsx("sphereGeometry", { args: [1, 12, 8] }) }) }),
      /* @__PURE__ */ jsx("pointLight", { position: [0, 0.6, 0], intensity: 4, distance: 3, color: C.ctaHi })
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 36, area: [4, 1.5, 3], position: [0, 1.2, 0], rise: 0.08, height: 1.2, size: 0.07, color: C.ctaHi })
  ] });
}
export {
  config,
  BeautyWellness as default
};
