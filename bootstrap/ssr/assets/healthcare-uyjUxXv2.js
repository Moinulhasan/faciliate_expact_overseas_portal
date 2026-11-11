import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { E as EBox, F as FlowTube, S as Sparkles } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [0, 0.6, 6], target: [0, 0.4, 0] };
const ecg = [
  [-3, 0, 0],
  [-1.4, 0, 0],
  [-1.2, 0.18, 0],
  [-1.05, 0, 0],
  [-0.85, -0.25, 0],
  [-0.65, 1.1, 0],
  [-0.45, -0.55, 0],
  [-0.25, 0, 0],
  [0.15, 0, 0],
  [0.4, 0.28, 0],
  [0.65, 0, 0],
  [3, 0, 0]
];
function Healthcare() {
  const helix = useRef(null);
  const cross = useRef(null);
  const rungs = useMemo(() => Array.from({ length: 22 }, (_, i) => i), []);
  useFrame(({ clock }, dt) => {
    if (helix.current) helix.current.rotation.y += dt * 0.5;
    const t = clock.elapsedTime;
    const beat = Math.max(0, Math.sin(t * 5)) ** 8;
    if (cross.current) cross.current.scale.setScalar(1 + beat * 0.08);
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, 0.2, 0], children: [
    /* @__PURE__ */ jsx("group", { ref: helix, position: [-1.3, 0.4, -0.3], rotation: [0, 0, 0.18], children: rungs.map((i) => {
      const y = -1.6 + i * 0.15;
      const a = i * 0.55;
      const x = Math.cos(a) * 0.45;
      const z = Math.sin(a) * 0.45;
      return /* @__PURE__ */ jsxs("group", { position: [0, y, 0], children: [
        /* @__PURE__ */ jsx("mesh", { position: [x, 0, z], material: M.glow, children: /* @__PURE__ */ jsx("sphereGeometry", { args: [0.06, 12, 8] }) }),
        /* @__PURE__ */ jsx("mesh", { position: [-x, 0, -z], material: M.soft, children: /* @__PURE__ */ jsx("sphereGeometry", { args: [0.06, 12, 8] }) }),
        /* @__PURE__ */ jsx(EBox, { size: [0.9, 0.015, 0.015], rotation: [0, -a, 0], material: M.brand, edge: M.edgeDim })
      ] }, i);
    }) }),
    /* @__PURE__ */ jsxs("group", { ref: cross, position: [1.3, 0.8, 0], children: [
      /* @__PURE__ */ jsx(EBox, { size: [0.36, 1.1, 0.24], material: M.brand }),
      /* @__PURE__ */ jsx(EBox, { size: [1.1, 0.36, 0.24], material: M.brand }),
      /* @__PURE__ */ jsx(EBox, { size: [0.2, 0.7, 0.26], material: M.glow, edge: M.edgeDim }),
      /* @__PURE__ */ jsx(EBox, { size: [0.7, 0.2, 0.26], material: M.glow, edge: M.edgeDim })
    ] }),
    /* @__PURE__ */ jsxs("group", { position: [0, -1.2, 0.4], children: [
      /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: ecg, radius: 0.022, speed: 0.32, repeat: 1, base: 0.18 }),
      /* @__PURE__ */ jsxs("mesh", { position: [0, 0.2, -0.05], children: [
        /* @__PURE__ */ jsx("planeGeometry", { args: [6, 1.8] }),
        /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.night2, transparent: true, opacity: 0.6 })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 60, area: [6, 3.5, 2], position: [0, 0.3, -0.5], size: 0.04 })
  ] });
}
export {
  config,
  Healthcare as default
};
