import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { MeshStandardMaterial } from "three";
import { C, M } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, E as EBox, S as Sparkles } from "./parts-CUtjbVIT.js";
const config = { camera: [2.6, 2.6, 5.8], target: [0, 1.4, 0] };
const COLS = 5;
const ROWS = 6;
function FacilityManagement() {
  const ring = useRef(null);
  const fans = useRef([]);
  const windows = useRef([]);
  const mats = useMemo(
    () => Array.from({ length: COLS * ROWS }, () => new MeshStandardMaterial({ color: C.night2, emissive: C.cta, emissiveIntensity: 0 })),
    []
  );
  useEffect(() => () => mats.forEach((m) => m.dispose()), [mats]);
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const y = 0.2 + (Math.sin(t * 0.45) + 1) / 2 * 2.4;
    if (ring.current) ring.current.position.y = y;
    windows.current.forEach((w, i) => {
      if (!w) return;
      const m = mats[i];
      const near = Math.max(0, 1 - Math.abs(w.position.y - y) / 0.35);
      m.emissiveIntensity = Math.max(m.emissiveIntensity * (1 - dt * 0.35), near * 1.2);
    });
    fans.current.forEach((f) => f && (f.rotation.y += dt * 5));
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.4, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsx(EBox, { size: [2, 2.8, 1.4], position: [0, 1.4, 0], material: M.solid }),
    Array.from({ length: COLS * ROWS }, (_, i) => {
      const c = i % COLS;
      const r = Math.floor(i / COLS);
      return /* @__PURE__ */ jsx(
        "mesh",
        {
          ref: (m) => {
            if (m) windows.current[i] = m;
          },
          position: [-0.72 + c * 0.36, 0.35 + r * 0.42, 0.705],
          material: mats[i],
          children: /* @__PURE__ */ jsx("planeGeometry", { args: [0.24, 0.26] })
        },
        i
      );
    }),
    /* @__PURE__ */ jsxs("mesh", { ref: ring, rotation: [Math.PI / 2, 0, 0], children: [
      /* @__PURE__ */ jsx("torusGeometry", { args: [1.45, 0.02, 8, 64] }),
      /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.ctaHi })
    ] }),
    [-0.5, 0.5].map((x, i) => /* @__PURE__ */ jsxs("group", { position: [x, 2.95, 0], children: [
      /* @__PURE__ */ jsx(EBox, { size: [0.6, 0.25, 0.6], material: M.panel }),
      /* @__PURE__ */ jsx("group", { ref: (g) => fans.current[i] = g, position: [0, 0.14, 0], children: [0, 1, 2].map((k) => /* @__PURE__ */ jsx(EBox, { size: [0.46, 0.015, 0.09], rotation: [0, k * Math.PI / 3, 0], material: M.glow, edge: M.edgeDim }, k)) })
    ] }, x)),
    /* @__PURE__ */ jsx(Sparkles, { count: 40, area: [3, 3, 2], position: [0, 1.5, 0.8], size: 0.04 })
  ] });
}
export {
  config,
  FacilityManagement as default
};
