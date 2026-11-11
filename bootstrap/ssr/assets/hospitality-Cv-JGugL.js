import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, b as ECyl, S as Sparkles, E as EBox } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [0, 1.9, 5.6], target: [0, 0.8, 0] };
function Hospitality() {
  const cloche = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime % 7;
    const lift = t < 1.2 ? t / 1.2 : t < 4.2 ? 1 : t < 5.4 ? 1 - (t - 4.2) / 1.2 : 0;
    const e = lift * lift * (3 - 2 * lift);
    if (cloche.current) {
      cloche.current.position.y = 0.86 + e * 0.75;
      cloche.current.rotation.z = e * 0.18;
    }
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.3, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsx(ECyl, { r: 1.7, h: 0.08, seg: 48, position: [0, 0.7, 0], material: M.panel }),
    /* @__PURE__ */ jsx(ECyl, { r: 0.12, h: 0.7, seg: 12, position: [0, 0.35, 0] }),
    /* @__PURE__ */ jsx(ECyl, { r: 0.62, rTop: 0.7, h: 0.05, seg: 40, position: [0, 0.77, 0], material: M.soft, edge: M.edgeDim }),
    /* @__PURE__ */ jsx(ECyl, { r: 0.32, rTop: 0.22, h: 0.12, seg: 24, position: [0, 0.85, 0], material: M.brand }),
    /* @__PURE__ */ jsxs("group", { ref: cloche, position: [0, 0.86, 0], children: [
      /* @__PURE__ */ jsx("mesh", { material: M.solid, children: /* @__PURE__ */ jsx("sphereGeometry", { args: [0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2] }) }),
      /* @__PURE__ */ jsxs("mesh", { children: [
        /* @__PURE__ */ jsx("sphereGeometry", { args: [0.555, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2] }),
        /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.cta, wireframe: true, transparent: true, opacity: 0.35 })
      ] }),
      /* @__PURE__ */ jsx(ECyl, { r: 0.06, h: 0.1, seg: 12, position: [0, 0.58, 0], material: M.glow, edge: M.edgeDim })
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 45, area: [0.5, 0.1, 0.5], position: [0, 0.95, 0], rise: 0.35, height: 1.4, size: 0.08, color: C.ink }),
    [
      [-1.05, 0.45],
      [1.1, -0.35]
    ].map(([x, z]) => /* @__PURE__ */ jsxs("group", { position: [x, 0.74, z], children: [
      /* @__PURE__ */ jsx(ECyl, { r: 0.08, h: 0.02, seg: 16 }),
      /* @__PURE__ */ jsx(ECyl, { r: 0.012, h: 0.22, seg: 6, position: [0, 0.12, 0], material: M.glow, edge: M.edgeDim }),
      /* @__PURE__ */ jsx(ECyl, { r: 0.06, rTop: 0.11, h: 0.22, seg: 16, position: [0, 0.34, 0], material: M.soft, edge: M.edge })
    ] }, x)),
    /* @__PURE__ */ jsx(EBox, { size: [0.05, 0.02, 0.7], position: [-0.85, 0.75, -0.2], material: M.soft }),
    /* @__PURE__ */ jsx(EBox, { size: [0.05, 0.02, 0.7], position: [0.85, 0.75, 0.3], material: M.soft }),
    /* @__PURE__ */ jsx(Sparkles, { count: 40, area: [5, 2.5, 3], position: [0, 1.8, -0.5], size: 0.035 })
  ] });
}
export {
  config,
  Hospitality as default
};
