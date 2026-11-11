import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { C, M } from "./IndustryScene-BYn2JAVN.js";
import { E as EBox, b as ECyl } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [1.1, 2.6, 4.4], target: [0.4, 0.2, -1.6] };
const DASHES = 10;
const BLOCKS = 7;
const SPAN = 14;
const loop = (v) => (v % SPAN + SPAN) % SPAN - SPAN / 2;
function Drivers() {
  const dashes = useRef([]);
  const blocks = useRef([]);
  const wheels = useRef([]);
  const car = useRef(null);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const d = t * 3.2;
    dashes.current.forEach((g, i) => g && (g.position.z = loop(i * (SPAN / DASHES) + d)));
    blocks.current.forEach((g, i) => g && (g.position.z = loop(i * (SPAN / BLOCKS) + d)));
    wheels.current.forEach((w) => w && (w.rotation.x -= dt * 9));
    if (car.current) car.current.position.y = 0.02 + Math.sin(t * 7) * 6e-3;
  });
  return /* @__PURE__ */ jsxs("group", { children: [
    /* @__PURE__ */ jsxs("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, -1e-3, 0], children: [
      /* @__PURE__ */ jsx("planeGeometry", { args: [2.6, SPAN] }),
      /* @__PURE__ */ jsx("meshStandardMaterial", { color: C.night2, roughness: 0.9 })
    ] }),
    [-1.3, 1.3].map((x) => /* @__PURE__ */ jsx(EBox, { size: [0.04, 0.02, SPAN], position: [x, 0.01, 0], material: M.glow, edge: M.edgeDim }, x)),
    Array.from({ length: DASHES }, (_, i) => /* @__PURE__ */ jsx("group", { ref: (g) => dashes.current[i] = g, children: /* @__PURE__ */ jsx(EBox, { size: [0.06, 0.01, 0.55], position: [0, 6e-3, 0], material: M.soft, edge: M.edgeDim }) }, i)),
    Array.from({ length: BLOCKS }, (_, i) => {
      const h = 0.6 + i * 7 % 5 * 0.35;
      return /* @__PURE__ */ jsx("group", { ref: (g) => blocks.current[i] = g, children: /* @__PURE__ */ jsx(EBox, { size: [0.9, h, 1.2], position: [i % 2 ? -2.2 : 2.3, h / 2, 0], material: i % 3 ? M.solid : M.panel, edge: M.edgeDim }) }, i);
    }),
    /* @__PURE__ */ jsxs("group", { ref: car, position: [0.55, 0.02, 0.6], children: [
      /* @__PURE__ */ jsx(EBox, { size: [0.9, 0.3, 1.9], position: [0, 0.3, 0], material: M.brand }),
      /* @__PURE__ */ jsx(EBox, { size: [0.78, 0.26, 0.95], position: [0, 0.58, 0.12], material: M.solid }),
      [
        [-0.46, 0.62],
        [0.46, 0.62],
        [-0.46, -0.62],
        [0.46, -0.62]
      ].map(([x, z], i) => /* @__PURE__ */ jsx("group", { ref: (g) => wheels.current[i] = g, position: [x, 0.16, z], children: /* @__PURE__ */ jsx(ECyl, { r: 0.16, h: 0.12, seg: 14, rotation: [0, 0, Math.PI / 2], material: M.solid }) }, i)),
      [-0.3, 0.3].map((x) => /* @__PURE__ */ jsxs("group", { position: [x, 0.32, -0.96], children: [
        /* @__PURE__ */ jsx("mesh", { material: M.glow, children: /* @__PURE__ */ jsx("boxGeometry", { args: [0.16, 0.06, 0.02] }) }),
        /* @__PURE__ */ jsxs("mesh", { position: [0, -0.05, -1.4], rotation: [-Math.PI / 2 + 0.04, 0, 0], children: [
          /* @__PURE__ */ jsx("coneGeometry", { args: [0.45, 2.8, 20, 1, true] }),
          /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.ctaHi, transparent: true, opacity: 0.08, depthWrite: false })
        ] })
      ] }, x))
    ] })
  ] });
}
export {
  config,
  Drivers as default
};
