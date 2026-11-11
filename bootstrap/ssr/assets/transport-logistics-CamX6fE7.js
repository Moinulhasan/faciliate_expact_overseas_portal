import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { C, M } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, F as FlowTube, E as EBox, b as ECyl } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [1.6, 2.6, 6], target: [0, 0.8, 0] };
function Rack({ x }) {
  return /* @__PURE__ */ jsxs("group", { position: [x, 0, -0.9], children: [
    [0, 1, 2].map((lvl) => /* @__PURE__ */ jsxs("group", { position: [0, 0.05 + lvl * 0.75, 0], children: [
      /* @__PURE__ */ jsx(EBox, { size: [1.5, 0.04, 0.6], material: M.panel, edge: M.edgeDim }),
      [-0.5, 0, 0.5].map(
        (bx, k) => (lvl + k + Math.round(x)) % 4 !== 0 ? /* @__PURE__ */ jsx(EBox, { size: [0.4, 0.36, 0.45], position: [bx, 0.2, 0], material: (lvl + k) % 2 ? M.brand : M.solid }, bx) : null
      )
    ] }, lvl)),
    [-0.74, 0.74].map((px) => /* @__PURE__ */ jsx(EBox, { size: [0.04, 2.3, 0.04], position: [px, 1.15, 0.28], material: M.glow, edge: M.edgeDim }, px))
  ] });
}
function TransportLogistics() {
  const truck = useRef(null);
  const forks = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const s = Math.sin(t * 0.5);
    if (truck.current) truck.current.position.x = s * 1.4;
    if (forks.current) forks.current.position.y = 0.18 + Math.max(0, Math.sin(t * 0.5 + Math.PI / 2)) * 0.6;
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.45, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsx(Rack, { x: -1.6 }),
    /* @__PURE__ */ jsx(Rack, { x: 0 }),
    /* @__PURE__ */ jsx(Rack, { x: 1.6 }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[-3, 0.02, 0.4], [3, 0.02, 0.4]], radius: 0.012, speed: 0.3, repeat: 12 }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[-3, 0.02, 1.2], [-0.4, 0.02, 1.2], [-0.4, 0.02, 2.2]], radius: 0.012, speed: 0.4, repeat: 10, color: C.ctaHi }),
    /* @__PURE__ */ jsxs("group", { ref: truck, position: [0, 0, 0.75], children: [
      /* @__PURE__ */ jsx(EBox, { size: [0.6, 0.35, 0.8], position: [0, 0.3, 0.1], material: M.brand }),
      /* @__PURE__ */ jsx(EBox, { size: [0.55, 0.04, 0.5], position: [0, 0.85, 0.2], material: M.solid }),
      [-0.24, 0.24].map((x) => /* @__PURE__ */ jsx(EBox, { size: [0.04, 0.6, 0.04], position: [x, 0.6, 0.38], edge: M.edgeDim }, x)),
      [-0.28, 0.28].map((x) => /* @__PURE__ */ jsx(EBox, { size: [0.04, 1.2, 0.05], position: [x, 0.6, -0.33], material: M.glow, edge: M.edgeDim }, x)),
      /* @__PURE__ */ jsxs("group", { ref: forks, position: [0, 0.18, -0.6], children: [
        /* @__PURE__ */ jsx(EBox, { size: [0.08, 0.03, 0.5], position: [-0.16, 0, 0], material: M.glow, edge: M.edgeDim }),
        /* @__PURE__ */ jsx(EBox, { size: [0.08, 0.03, 0.5], position: [0.16, 0, 0], material: M.glow, edge: M.edgeDim }),
        /* @__PURE__ */ jsx(EBox, { size: [0.46, 0.34, 0.42], position: [0, 0.2, 0], material: M.panel })
      ] }),
      [
        [-0.32, 0.35],
        [0.32, 0.35],
        [-0.32, -0.15],
        [0.32, -0.15]
      ].map(([x, z]) => /* @__PURE__ */ jsx(ECyl, { r: 0.12, h: 0.08, seg: 14, position: [x, 0.12, z], rotation: [0, 0, Math.PI / 2], material: M.solid }, `${x}${z}`))
    ] })
  ] });
}
export {
  config,
  TransportLogistics as default
};
