import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshStandardMaterial, DoubleSide } from "three";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, E as EBox, b as ECyl, F as FlowTube } from "./parts-CUtjbVIT.js";
const config = { camera: [0.6, 2, 5.6], target: [0, 1, 0] };
const sheet = new MeshStandardMaterial({ color: C.ink, emissive: C.ctaHi, emissiveIntensity: 0.12, side: DoubleSide, roughness: 0.8 });
const DOCS = 7;
function OfficeAdmin() {
  const docs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    docs.current.forEach((g, i) => {
      if (!g) return;
      const phase = (t * 0.35 + i / DOCS) % 1;
      const a = phase * Math.PI * 2 + i;
      const orbit = Math.min(1, phase / 0.7);
      const land = Math.max(0, (phase - 0.7) / 0.3);
      const ox = Math.cos(a) * 1.05, oz = Math.sin(a) * 0.55, oy = 1.7 + Math.sin(a * 2) * 0.15;
      const sx = 1.25, sy = 0.86 + i * 0.012, sz = 0.35;
      g.position.set(ox + (sx - ox) * land, oy + (sy - oy) * land, oz + (sz - oz) * land);
      g.rotation.set(-Math.PI / 2 + (1 - land) * Math.sin(a) * 0.6, (1 - land) * a * 0.5, (1 - land) * 0.4);
      g.scale.setScalar(0.6 + orbit * 0.4);
    });
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.45, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsx(EBox, { size: [3.2, 0.08, 1.4], position: [0, 0.8, 0], material: M.panel }),
    [-1.5, 1.5].map((x) => /* @__PURE__ */ jsx(EBox, { size: [0.06, 0.8, 1.3], position: [x, 0.4, 0] }, x)),
    /* @__PURE__ */ jsxs("group", { position: [-0.4, 0.84, -0.35], children: [
      /* @__PURE__ */ jsx(ECyl, { r: 0.18, h: 0.03, seg: 20, position: [0, 0.015, 0] }),
      /* @__PURE__ */ jsx(EBox, { size: [0.06, 0.4, 0.06], position: [0, 0.22, 0] }),
      /* @__PURE__ */ jsx(EBox, { size: [1.5, 0.9, 0.05], position: [0, 0.82, 0], material: M.solid }),
      /* @__PURE__ */ jsx(
        FlowTube,
        {
          points: [[-0.6, 0.55, 0.03], [-0.35, 0.75, 0.03], [-0.1, 0.65, 0.03], [0.15, 0.95, 0.03], [0.4, 0.85, 0.03], [0.6, 1.1, 0.03]],
          radius: 0.012,
          speed: 0.5,
          repeat: 2,
          base: 0.35
        }
      ),
      [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(EBox, { size: [0.1, 0.12 + i * 0.07, 0.01], position: [0.38 + i * 0.13 - 0.2, 0.46 + (0.12 + i * 0.07) / 2, 0.035], material: M.glow, edge: M.edgeDim }, i))
    ] }),
    /* @__PURE__ */ jsx(EBox, { size: [0.8, 0.03, 0.28], position: [-0.4, 0.85, 0.3], material: M.solid }),
    /* @__PURE__ */ jsx(EBox, { size: [0.7, 0.05, 0.5], position: [1.25, 0.85, 0.35], material: M.brand }),
    Array.from({ length: DOCS }, (_, i) => /* @__PURE__ */ jsxs("group", { ref: (g) => docs.current[i] = g, children: [
      /* @__PURE__ */ jsx("mesh", { material: sheet, children: /* @__PURE__ */ jsx("planeGeometry", { args: [0.5, 0.65] }) }),
      [0, 1, 2].map((l) => /* @__PURE__ */ jsx("mesh", { position: [-0.04, 0.18 - l * 0.12, 2e-3], material: M.glow, children: /* @__PURE__ */ jsx("planeGeometry", { args: [0.32 - l * 0.06, 0.02] }) }, l))
    ] }, i))
  ] });
}
export {
  config,
  OfficeAdmin as default
};
