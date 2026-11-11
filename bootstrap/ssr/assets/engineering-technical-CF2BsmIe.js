import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { ExtrudeGeometry, Shape, Path } from "three";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { F as FlowTube, S as Sparkles, u as useDisposable, c as Edged } from "./parts-CUtjbVIT.js";
const config = { camera: [0, 0.8, 6], target: [0, 0.6, 0] };
function gearShape(teeth, r, depth = 0.12) {
  const s = new Shape();
  const step = Math.PI * 2 / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      [r - depth, a],
      [r, a + step * 0.15],
      [r, a + step * 0.45],
      [r - depth, a + step * 0.6]
    ];
    pts.forEach(([rr, aa], j) => {
      const x = Math.cos(aa) * rr, y = Math.sin(aa) * rr;
      if (i === 0 && j === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
  }
  s.closePath();
  const hole = new Path();
  hole.absarc(0, 0, r * 0.28, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}
function Gear({ teeth, r, speed, ...props }) {
  const ref = useRef(null);
  const geo = useDisposable(
    () => new ExtrudeGeometry(gearShape(teeth, r), { depth: 0.16, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 1 }),
    [teeth, r]
  );
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });
  return /* @__PURE__ */ jsx("group", { ...props, children: /* @__PURE__ */ jsx("group", { ref, rotation: [0, 0, props.phase ?? 0], children: /* @__PURE__ */ jsx(Edged, { geometry: geo, material: M.panel }) }) });
}
function EngineeringTechnical() {
  const w = 0.6;
  return /* @__PURE__ */ jsxs("group", { position: [0, 0.2, 0], children: [
    /* @__PURE__ */ jsx(Gear, { teeth: 16, r: 1, speed: w, position: [-0.75, 0.55, 0] }),
    /* @__PURE__ */ jsx(Gear, { teeth: 10, r: 0.64, speed: -w * 16 / 10, position: [0.88, 0.95, 0.02], phase: 0.16 }),
    /* @__PURE__ */ jsx(Gear, { teeth: 8, r: 0.52, speed: -w * 16 / 8, position: [0.4, -0.55, 0.04], phase: 0.2 }),
    /* @__PURE__ */ jsx("mesh", { position: [0, 0.3, -0.6], material: M.solid, children: /* @__PURE__ */ jsx("planeGeometry", { args: [16, 9] }) }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[-2.6, 1.6, -0.55], [-1.8, 1.6, -0.55], [-1.8, 2.1, -0.55], [0.2, 2.1, -0.55]], radius: 0.015, speed: 0.8, repeat: 8 }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[2.6, -1, -0.55], [1.6, -1, -0.55], [1.6, -1.4, -0.55], [-0.6, -1.4, -0.55]], radius: 0.015, speed: 0.7, repeat: 8, color: C.ctaHi }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[2.6, 1.7, -0.55], [2, 1.7, -0.55], [2, 0.2, -0.55], [1.7, 0.2, -0.55]], radius: 0.015, speed: 1, repeat: 6 }),
    /* @__PURE__ */ jsx(FlowTube, { sharp: true, points: [[-2.6, -0.6, -0.55], [-2, -0.6, -0.55], [-2, -1.6, -0.55], [-1, -1.6, -0.55]], radius: 0.015, speed: 0.6, repeat: 6 }),
    /* @__PURE__ */ jsx(Sparkles, { count: 50, area: [5, 3.4, 1], position: [0, 0.3, 0.2], size: 0.035 })
  ] });
}
export {
  config,
  EngineeringTechnical as default
};
