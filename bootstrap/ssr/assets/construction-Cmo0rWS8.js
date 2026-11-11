import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { M } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, E as EBox, S as Sparkles } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [0.6, 2.4, 6.6], target: [0.2, 1.45, 0] };
function Construction() {
  const jib = useRef(null);
  const trolley = useRef(null);
  const hook = useRef(null);
  const floor = useRef(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (jib.current) jib.current.rotation.y = Math.sin(t * 0.35) * 0.9;
    if (trolley.current) trolley.current.position.x = -0.6 - (Math.sin(t * 0.7) * 0.5 + 0.5) * 1.1;
    if (hook.current) hook.current.position.y = -0.9 - (Math.sin(t * 0.9) * 0.5 + 0.5) * 0.6;
    if (floor.current) floor.current.scale.y = Math.min(1, t % 6 / 3) || 1e-3;
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.4, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsxs("group", { position: [-0.7, 0, 0], children: [
      [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(EBox, { size: [1.7, 0.34, 1.3], position: [0, 0.17 + i * 0.38, 0], material: i % 2 ? M.panel : M.solid }, i)),
      /* @__PURE__ */ jsx("group", { ref: floor, position: [0, 1.9, 0], children: /* @__PURE__ */ jsx(EBox, { size: [1.7, 0.34, 1.3], position: [0, 0.17, 0], material: M.brand }) }),
      [-0.8, 0.8].map(
        (x) => [-0.6, 0.6].map((z) => /* @__PURE__ */ jsx(EBox, { size: [0.05, 2.6, 0.05], position: [x, 1.3, z], material: M.glow, edge: M.edgeDim }, `${x}${z}`))
      )
    ] }),
    /* @__PURE__ */ jsxs("group", { position: [1.35, 0, -0.3], children: [
      /* @__PURE__ */ jsx(EBox, { size: [0.16, 3.4, 0.16], position: [0, 1.7, 0], edge: M.edge }),
      /* @__PURE__ */ jsxs("group", { ref: jib, position: [0, 3.45, 0], children: [
        /* @__PURE__ */ jsx(EBox, { size: [3.2, 0.1, 0.12], position: [-1.1, 0, 0] }),
        /* @__PURE__ */ jsx(EBox, { size: [0.9, 0.1, 0.12], position: [0.85, 0, 0] }),
        /* @__PURE__ */ jsx(EBox, { size: [0.35, 0.3, 0.3], position: [1.15, -0.18, 0], material: M.brand }),
        /* @__PURE__ */ jsx(EBox, { size: [0.22, 0.22, 0.22], position: [0.05, 0.12, 0], material: M.panel }),
        /* @__PURE__ */ jsxs("group", { ref: trolley, position: [-1, -0.08, 0], children: [
          /* @__PURE__ */ jsx(EBox, { size: [0.16, 0.06, 0.14], material: M.glow }),
          /* @__PURE__ */ jsxs("group", { ref: hook, position: [0, -1, 0], children: [
            /* @__PURE__ */ jsx(EBox, { size: [8e-3, 2, 8e-3], position: [0, 1, 0], material: M.glow, edge: M.edgeDim }),
            /* @__PURE__ */ jsx(EBox, { size: [0.42, 0.22, 0.42], position: [0, -0.12, 0], material: M.brand })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 50, area: [5, 3, 3], position: [0, 1.5, 0], size: 0.04 })
  ] });
}
export {
  config,
  Construction as default
};
