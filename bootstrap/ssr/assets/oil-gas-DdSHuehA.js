import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { G as GridFloor, b as ECyl, E as EBox, S as Sparkles, F as FlowTube } from "./parts-CUtjbVIT.js";
import "three";
const config = { camera: [0.4, 2, 6.4], target: [0, 0.9, 0] };
function OilGas() {
  const bob = useRef(null);
  useFrame(({ clock }) => {
    if (bob.current) bob.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.03;
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.5, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsxs("group", { ref: bob, position: [0.5, 0, 0], children: [
      [-0.7, 0.7].map(
        (x) => [-0.5, 0.5].map((z) => /* @__PURE__ */ jsx(ECyl, { r: 0.09, h: 1.2, seg: 8, position: [x, 0.6, z] }, `${x}${z}`))
      ),
      /* @__PURE__ */ jsx(EBox, { size: [1.9, 0.16, 1.4], position: [0, 1.25, 0], material: M.panel }),
      /* @__PURE__ */ jsx(EBox, { size: [0.8, 0.45, 0.6], position: [-0.45, 1.55, 0.25] }),
      /* @__PURE__ */ jsx(EBox, { size: [0.5, 0.3, 0.5], position: [0.5, 1.48, 0.35], material: M.brand }),
      /* @__PURE__ */ jsx(ECyl, { r: 0.42, rTop: 0.06, h: 2, seg: 4, position: [0.3, 2.33, -0.25], rotation: [0, Math.PI / 4, 0] }),
      /* @__PURE__ */ jsx(EBox, { size: [0.08, 0.08, 0.08], position: [0.3, 3.36, -0.25], material: M.glow }),
      /* @__PURE__ */ jsx(EBox, { size: [1.2, 0.05, 0.05], position: [-1.4, 1.95, -0.3], rotation: [0, 0, 0.5] }),
      /* @__PURE__ */ jsx(Sparkles, { count: 40, area: [0.18, 0.05, 0.18], position: [-1.95, 2.25, -0.3], rise: 0.9, height: 0.7, size: 0.09, color: C.ctaHi })
    ] }),
    /* @__PURE__ */ jsx(FlowTube, { points: [[0, 0.05, 0.5], [-1, 0.05, 1.2], [-2.2, 0.05, 1.1], [-3.2, 0.05, 1.6]], radius: 0.035, speed: 0.45 }),
    /* @__PURE__ */ jsx(FlowTube, { points: [[0.6, 0.05, 0.6], [0.2, 0.05, 1.6], [-1.4, 0.05, 2.2], [-3, 0.05, 2.4]], radius: 0.03, speed: 0.35, repeat: 7 }),
    /* @__PURE__ */ jsx(FlowTube, { points: [[1.2, 0.05, 0.2], [2.2, 0.05, 0.9], [2.6, 0.05, 2.2]], radius: 0.03, speed: 0.5, color: C.ctaHi }),
    /* @__PURE__ */ jsx(Sparkles, { count: 40, area: [6, 2, 4], position: [0, 1.6, 0], size: 0.035 })
  ] });
}
export {
  config,
  OilGas as default
};
