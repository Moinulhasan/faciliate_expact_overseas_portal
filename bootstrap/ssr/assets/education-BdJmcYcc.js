import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshStandardMaterial, DoubleSide } from "three";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, E as EBox, S as Sparkles, b as ECyl } from "./parts-CUtjbVIT.js";
const config = { camera: [0, 2.4, 5.4], target: [0, 0.7, 0] };
const page = new MeshStandardMaterial({ color: C.ink, emissive: C.ctaHi, emissiveIntensity: 0.15, side: DoubleSide, roughness: 0.7 });
const PAGES = 5;
function Education() {
  const pages = useRef([]);
  const cap = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    pages.current.forEach((g, i) => {
      if (!g) return;
      const local = ((t * 0.5 - i * 0.35) % 2.5 + 2.5) % 2.5;
      const p = Math.min(1, Math.max(0, local / 1.2));
      const e = p * p * (3 - 2 * p);
      g.rotation.z = e * (Math.PI - 0.06) + 0.03;
    });
    if (cap.current) {
      cap.current.position.y = 2.05 + Math.sin(t * 1.2) * 0.08;
      cap.current.rotation.y = t * 0.4;
    }
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.2, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsxs("group", { position: [0, 0.35, 0], rotation: [-0.25, 0, 0], children: [
      /* @__PURE__ */ jsx(EBox, { size: [1.3, 0.05, 1.6], position: [-0.68, 0, 0], rotation: [0, 0, 0.06], material: M.brand }),
      /* @__PURE__ */ jsx(EBox, { size: [1.3, 0.05, 1.6], position: [0.68, 0, 0], rotation: [0, 0, -0.06], material: M.brand }),
      /* @__PURE__ */ jsx(EBox, { size: [1.2, 0.12, 1.5], position: [-0.64, 0.08, 0], rotation: [0, 0, 0.06], material: M.soft, edge: M.edgeDim }),
      /* @__PURE__ */ jsx(EBox, { size: [1.2, 0.12, 1.5], position: [0.64, 0.08, 0], rotation: [0, 0, -0.06], material: M.soft, edge: M.edgeDim }),
      Array.from({ length: PAGES }, (_, i) => /* @__PURE__ */ jsx("group", { ref: (g) => pages.current[i] = g, position: [0, 0.15 + i * 4e-3, 0], children: /* @__PURE__ */ jsx("mesh", { position: [0.6, 0, 0], rotation: [-Math.PI / 2, 0, 0], material: page, children: /* @__PURE__ */ jsx("planeGeometry", { args: [1.18, 1.46] }) }) }, i))
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 50, area: [1.4, 0.1, 1], position: [0, 0.5, 0], rise: 0.25, height: 1.5, size: 0.06 }),
    /* @__PURE__ */ jsxs("group", { ref: cap, position: [0, 2.05, -0.2], rotation: [0.25, 0, 0], children: [
      /* @__PURE__ */ jsx(EBox, { size: [1, 0.04, 1], rotation: [0, Math.PI / 4, 0], material: M.solid }),
      /* @__PURE__ */ jsx(ECyl, { r: 0.32, rTop: 0.36, h: 0.26, seg: 24, position: [0, -0.15, 0], material: M.panel }),
      /* @__PURE__ */ jsx(ECyl, { r: 0.04, h: 0.05, seg: 10, position: [0, 0.04, 0], material: M.glow, edge: M.edgeDim }),
      /* @__PURE__ */ jsx(EBox, { size: [0.012, 0.012, 0.58], position: [0, 0.03, 0.29], rotation: [0, Math.PI / 4, 0], material: M.glow, edge: M.edgeDim }),
      /* @__PURE__ */ jsx(EBox, { size: [0.05, 0.22, 0.05], position: [0.42, -0.08, 0.42], material: M.glow, edge: M.edgeDim })
    ] })
  ] });
}
export {
  config,
  Education as default
};
