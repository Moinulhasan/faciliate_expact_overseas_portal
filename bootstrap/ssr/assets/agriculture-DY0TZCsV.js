import { jsxs, jsx } from "react/jsx-runtime";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Object3D, ConeGeometry, ShaderMaterial } from "three";
import { M, C } from "./IndustryScene-BYn2JAVN.js";
import { u as useDisposable, G as GridFloor, E as EBox, S as Sparkles } from "./parts-CUtjbVIT.js";
const swayFrag = "uniform vec3 uBase;\nuniform vec3 uTip;\nvarying float vH;\n\nvoid main() {\n  gl_FragColor = vec4(mix(uBase, uTip, smoothstep(0.0, 1.0, vH)), 1.0);\n}\n";
const swayVert = "// Instanced crop blades bending in the wind; bend grows with height (position.y 0..1).\nuniform float uTime;\nvarying float vH;\n\nvoid main() {\n  vec4 world = instanceMatrix * vec4(position, 1.0);\n  vec3 origin = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;\n  float wave = sin(uTime * 1.6 + origin.x * 0.9 + origin.z * 0.6) + 0.4 * sin(uTime * 3.1 + origin.z * 2.0);\n  float bend = position.y * position.y;\n  world.x += wave * bend * 0.12;\n  world.z += wave * bend * 0.04;\n  vH = position.y;\n  gl_Position = projectionMatrix * viewMatrix * modelMatrix * world;\n}\n";
const config = { camera: [0, 2.2, 6.4], target: [0, 0.5, 0] };
const ROWS = 9;
const PER_ROW = 46;
function Agriculture() {
  const crops = useRef(null);
  const sun = useRef(null);
  const geo = useDisposable(() => new ConeGeometry(0.05, 1, 4, 4, true).translate(0, 0.5, 0), []);
  const mat = useDisposable(
    () => new ShaderMaterial({ vertexShader: swayVert, fragmentShader: swayFrag, uniforms: { uTime: { value: 0 }, uBase: { value: C.forest }, uTip: { value: C.cta } } }),
    []
  );
  useEffect(() => {
    const m = crops.current;
    if (!m) return;
    const o = new Object3D();
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let k = 0; k < PER_ROW; k++) {
        const jitter = Math.sin(r * 12.9 + k * 78.2) * 0.04;
        o.position.set(-2.6 + k * 0.115 + jitter, 0, -1.6 + r * 0.38);
        o.scale.setScalar(0.35 + (Math.sin(k * 3.1 + r) * 0.5 + 0.5) * 0.3);
        o.rotation.y = k;
        o.updateMatrix();
        m.setMatrixAt(i++, o.matrix);
      }
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);
  useFrame(({ clock }, dt) => {
    mat.uniforms.uTime.value += dt;
    if (sun.current) sun.current.position.y = 1.9 + Math.sin(clock.elapsedTime * 0.2) * 0.15;
  });
  return /* @__PURE__ */ jsxs("group", { position: [0, -0.3, 0], children: [
    /* @__PURE__ */ jsx(GridFloor, {}),
    /* @__PURE__ */ jsx("instancedMesh", { ref: crops, args: [geo, mat, ROWS * PER_ROW] }),
    Array.from({ length: ROWS }, (_, r) => /* @__PURE__ */ jsx(EBox, { size: [5.4, 0.04, 0.22], position: [0, 0.02, -1.6 + r * 0.38], material: M.solid, edge: M.edgeDim }, r)),
    [-1.8, 0, 1.8].map((z) => /* @__PURE__ */ jsxs("mesh", { position: [0, 0, z - 0.1], rotation: [0, 0, 0], children: [
      /* @__PURE__ */ jsx("torusGeometry", { args: [2.9, 0.012, 6, 48, Math.PI] }),
      /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.cta, transparent: true, opacity: 0.3 })
    ] }, z)),
    /* @__PURE__ */ jsxs("mesh", { ref: sun, position: [1.7, 1.9, -2.4], children: [
      /* @__PURE__ */ jsx("sphereGeometry", { args: [0.32, 24, 16] }),
      /* @__PURE__ */ jsx("meshBasicMaterial", { color: C.ctaHi })
    ] }),
    /* @__PURE__ */ jsx(Sparkles, { count: 70, area: [5.5, 1.6, 3.4], position: [0, 1, 0], size: 0.04 })
  ] });
}
export {
  config,
  Agriculture as default
};
