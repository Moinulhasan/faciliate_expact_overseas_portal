import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, E as EBox, S as Sparkles, b as ECyl } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [0.4, 1.8, 6], target: [0, 1, 0] };
function Retail() {
  const bag = useRef(null);
  const tags = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (bag.current) {
      bag.current.rotation.y = t * 0.5;
      bag.current.position.y = 0.95 + Math.sin(t * 1.2) * 0.07;
    }
    tags.current.forEach((g, i) => g && (g.rotation.z = Math.sin(t * 1.8 + i) * 0.18));
  });
  const products = (lvl) => Array.from({ length: 7 }, (_, k) => {
    const x = -1.5 + k * 0.5;
    const kind = (k + lvl) % 3;
    return kind === 0 ? /* @__PURE__ */ jsx(ECyl, { r: 0.12, h: 0.36, seg: 14, position: [x, 0.2, 0], material: M.brand }, k) : kind === 1 ? /* @__PURE__ */ jsx(EBox, { size: [0.3, 0.42, 0.22], position: [x, 0.23, 0], material: M.panel }, k) : /* @__PURE__ */ jsx(ECyl, { r: 0.08, rTop: 0.05, h: 0.44, seg: 10, position: [x, 0.24, 0], material: M.soft, edge: M.edgeDim }, k);
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.45, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsxs("group", { position: [0, 0, -0.9], children: [
      /* @__PURE__ */ jsx(EBox, { size: [3.8, 2.5, 0.06], position: [0, 1.25, -0.3], material: M.solid, edge: M.edgeDim }),
      [0, 1, 2].map((lvl) => /* @__PURE__ */ jsxs("group", { position: [0, 0.15 + lvl * 0.78, 0], children: [
        /* @__PURE__ */ jsx(EBox, { size: [3.8, 0.05, 0.6], material: M.panel, edge: M.edge }),
        products(lvl),
        /* @__PURE__ */ jsx("group", { ref: (g) => tags.current[lvl] = g, position: [0.8 - lvl * 0.9, -0.02, 0.32], children: /* @__PURE__ */ jsx("mesh", { position: [0, -0.1, 0], material: M.glow, children: /* @__PURE__ */ jsx("planeGeometry", { args: [0.28, 0.14] }) }) })
      ] }, lvl))
    ] }),
    /* @__PURE__ */ jsxs("group", { ref: bag, position: [1.2, 0.95, 0.9], children: [
      /* @__PURE__ */ jsx(EBox, { size: [0.7, 0.8, 0.32], material: M.brand }),
      [-0.17, 0.17].map((x) => /* @__PURE__ */ jsxs("mesh", { position: [x, 0.42, 0], rotation: [0, 0, 0], children: [
        /* @__PURE__ */ jsx("torusGeometry", { args: [0.1, 0.012, 8, 20, Math.PI] }),
        /* @__PURE__ */ jsx("meshStandardMaterial", { color: C.cta, emissive: C.cta, emissiveIntensity: 1 })
      ] }, x)),
      /* @__PURE__ */ jsx("mesh", { position: [0, 0.05, 0.165], material: M.glow, children: /* @__PURE__ */ jsx("circleGeometry", { args: [0.12, 24] }) })
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 40, area: [5, 2.6, 2], position: [0, 1.4, 0], size: 0.035 })
  ] });
}
export {
  config,
  Retail as default
};
