import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { M } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, E as EBox, b as ECyl, S as Sparkles } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [0.8, 2.4, 6], target: [0, 0.6, 0] };
const BOXES = 6;
const LEN = 4.8;
function Manufacturing() {
  const items = useRef([]);
  const shoulder = useRef(null);
  const elbow = useRef(null);
  const base = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    items.current.forEach((g, i) => {
      if (g) g.position.x = ((t * 0.45 + i * LEN / BOXES) % LEN + LEN) % LEN - LEN / 2;
    });
    const cycle = t * 0.45 * BOXES / LEN;
    const dip = Math.pow(Math.sin(cycle * Math.PI), 2);
    if (shoulder.current) shoulder.current.rotation.x = 0.25 + dip * 0.25;
    if (elbow.current) elbow.current.rotation.x = 1.5 + dip * 0.35;
    if (base.current) base.current.rotation.y = Math.sin(t * 0.5) * 0.2;
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.4, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsx(EBox, { size: [LEN + 0.4, 0.12, 0.8], position: [0, 0.5, 0.4], material: M.panel }),
    Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ jsx(ECyl, { r: 0.05, h: 0.82, seg: 8, position: [-2.4 + i * 0.44, 0.58, 0.4], rotation: [Math.PI / 2, 0, 0], edge: void 0 }, i)),
    [-2.2, 2.2].map((x) => /* @__PURE__ */ jsx(EBox, { size: [0.12, 0.5, 0.7], position: [x, 0.25, 0.4] }, x)),
    Array.from({ length: BOXES }, (_, i) => /* @__PURE__ */ jsx("group", { ref: (g) => items.current[i] = g, position: [0, 0.8, 0.4], children: /* @__PURE__ */ jsx(EBox, { size: [0.42, 0.34, 0.42], material: i % 2 ? M.brand : M.solid }) }, i)),
    /* @__PURE__ */ jsxs("group", { ref: base, position: [0.2, 0, -0.75], children: [
      /* @__PURE__ */ jsx(ECyl, { r: 0.32, h: 0.25, seg: 16, position: [0, 0.12, 0], material: M.panel }),
      /* @__PURE__ */ jsxs("group", { position: [0, 0.3, 0], children: [
        /* @__PURE__ */ jsx(ECyl, { r: 0.12, h: 0.2, seg: 12, position: [0, 0.1, 0], material: M.glow, edge: void 0 }),
        /* @__PURE__ */ jsxs("group", { ref: shoulder, position: [0, 0.2, 0], children: [
          /* @__PURE__ */ jsx(EBox, { size: [0.18, 1.2, 0.18], position: [0, 0.6, 0] }),
          /* @__PURE__ */ jsxs("group", { ref: elbow, position: [0, 1.2, 0], children: [
            /* @__PURE__ */ jsx(EBox, { size: [0.14, 1, 0.14], position: [0, 0.5, 0], material: M.brand }),
            /* @__PURE__ */ jsxs("group", { position: [0, 1, 0], children: [
              /* @__PURE__ */ jsx(EBox, { size: [0.26, 0.08, 0.2], material: M.glow }),
              /* @__PURE__ */ jsx(EBox, { size: [0.04, 0.16, 0.18], position: [-0.1, -0.1, 0] }),
              /* @__PURE__ */ jsx(EBox, { size: [0.04, 0.16, 0.18], position: [0.1, -0.1, 0] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 30, area: [0.8, 0.3, 0.8], position: [0.2, 0.95, 0.4], size: 0.05 })
  ] });
}
export {
  config,
  Manufacturing as default
};
