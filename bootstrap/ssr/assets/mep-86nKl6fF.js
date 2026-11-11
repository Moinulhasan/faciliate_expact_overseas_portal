import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshStandardMaterial } from "three";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, E as EBox, F as FlowTube, b as ECyl } from "./parts-CUtjbVIT.js";
const config = { camera: [3.2, 2.8, 5.4], target: [0, 1.15, 0] };
const glass = new MeshStandardMaterial({ color: C.forest, transparent: true, opacity: 0.12, depthWrite: false });
function Mep() {
  const fan = useRef(null);
  useFrame((_, dt) => {
    if (fan.current) fan.current.rotation.y += dt * 4;
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.5, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    [0, 1, 2].map((i) => /* @__PURE__ */ jsx(EBox, { size: [2.8, 0.9, 1.8], position: [0, 0.45 + i * 0.92, 0], material: glass, edge: M.edgeDim }, i)),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[-1.3, 0.05, 0.8], [-1.3, 2.5, 0.8], [1.2, 2.5, 0.8], [1.2, 1.4, 0.8]], radius: 0.022, speed: 0.9, repeat: 10 }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[-1.1, 0.05, -0.7], [-1.1, 1.8, -0.7], [0.4, 1.8, -0.7], [0.4, 0.6, -0.7], [1.2, 0.6, -0.7]], radius: 0.03, speed: 0.4, color: C.ctaHi, repeat: 6 }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[1.3, 2.9, 0], [1.3, 2.7, 0], [-1, 2.7, 0], [-1, 0.9, 0]], radius: 0.07, speed: 0.2, base: 0.16, color: C.muted, repeat: 4 }),
    /* @__PURE__ */ jsx(EBox, { size: [0.3, 0.42, 0.1], position: [-1.3, 0.7, 0.86], material: M.brand }),
    /* @__PURE__ */ jsx(EBox, { size: [0.24, 0.24, 0.1], position: [1.2, 1.4, 0.86], material: M.glow, edge: M.edgeDim }),
    /* @__PURE__ */ jsxs("group", { position: [0.9, 2.95, -0.2], children: [
      /* @__PURE__ */ jsx(EBox, { size: [0.8, 0.3, 0.8], material: M.panel }),
      /* @__PURE__ */ jsx("group", { ref: fan, position: [0, 0.17, 0], children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(EBox, { size: [0.6, 0.02, 0.12], rotation: [0, i * Math.PI / 4, 0], material: M.glow, edge: M.edgeDim }, i)) }),
      /* @__PURE__ */ jsx(ECyl, { r: 0.33, h: 0.04, seg: 24, position: [0, 0.16, 0], material: glass })
    ] })
  ] });
}
export {
  config,
  Mep as default
};
