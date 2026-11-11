import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect, useMemo, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, MeshStandardMaterial, LineBasicMaterial, Vector3, MathUtils } from "three";
const C = {
  night: new Color("#06120d"),
  night2: new Color("#0d1f17"),
  forest: new Color("#12392a"),
  brand: new Color("#1c7949"),
  cta: new Color("#73bf44"),
  ctaHi: new Color("#a6db80"),
  ink: new Color("#eef5f0"),
  muted: new Color("#a9bdb1")
};
const M = {
  solid: new MeshStandardMaterial({ color: C.night2, roughness: 0.75, metalness: 0.15, flatShading: true }),
  panel: new MeshStandardMaterial({ color: C.forest, roughness: 0.6, metalness: 0.2, flatShading: true }),
  brand: new MeshStandardMaterial({ color: C.brand, roughness: 0.5, metalness: 0.2, flatShading: true }),
  glow: new MeshStandardMaterial({ color: C.cta, emissive: C.cta, emissiveIntensity: 1.4, roughness: 0.4 }),
  soft: new MeshStandardMaterial({ color: C.ink, emissive: C.ctaHi, emissiveIntensity: 0.25, roughness: 0.5 }),
  edge: new LineBasicMaterial({ color: C.cta, transparent: true, opacity: 0.55 }),
  edgeDim: new LineBasicMaterial({ color: C.cta, transparent: true, opacity: 0.22 })
};
function Parallax({ children }) {
  const ref = useRef(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 3);
    g.rotation.y = MathUtils.lerp(g.rotation.y, state.pointer.x * 0.1 + Math.sin(t * 0.15) * 0.12, k);
    g.rotation.x = MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.06, k);
  });
  return /* @__PURE__ */ jsx("group", { ref, children });
}
function LookAt({ target }) {
  useFrame(({ camera }) => camera.lookAt(...target));
  return null;
}
function Compose({ target, shift, children }) {
  const t = useMemo(() => new Vector3(...target), [target]);
  const width = useThree((s) => s.viewport.getCurrentViewport(s.camera, t).width);
  return /* @__PURE__ */ jsx("group", { position: [width * shift, 0, 0], children });
}
function Stage({ children, config = {} }) {
  const wrap = useRef(null);
  const [source, setSource] = useState(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const { camera: cam = [0, 1.8, 6.2], target = [0, 0.6, 0], fov = 38 } = config;
  const camera = cam.map((v, i) => target[i] + (v - target[i]) * 1.4);
  const shift = typeof window !== "undefined" && window.innerWidth >= 1024 ? 0.2 : 0;
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    setSource(el.closest("section"));
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { ref: wrap, "aria-hidden": true, className: `absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`, children: source && /* @__PURE__ */ jsxs(
    Canvas,
    {
      eventSource: source,
      eventPrefix: "client",
      dpr: [1, 1.5],
      frameloop: visible ? "always" : "never",
      camera: { position: camera, fov, near: 0.1, far: 50 },
      gl: { antialias: true, alpha: true, powerPreference: "high-performance" },
      onCreated: () => requestAnimationFrame(() => setReady(true)),
      children: [
        /* @__PURE__ */ jsx("fog", { attach: "fog", args: [C.night, 7, 16] }),
        /* @__PURE__ */ jsx("ambientLight", { intensity: 0.55, color: C.ink }),
        /* @__PURE__ */ jsx("directionalLight", { position: [4, 6, 5], intensity: 1.6, color: C.ink }),
        /* @__PURE__ */ jsx("pointLight", { position: [-3.5, 2.5, -1.5], intensity: 18, distance: 12, color: C.cta }),
        /* @__PURE__ */ jsx("pointLight", { position: [3, 0.5, 3], intensity: 6, distance: 10, color: C.ctaHi }),
        /* @__PURE__ */ jsx(LookAt, { target }),
        /* @__PURE__ */ jsx(Compose, { target, shift, children: /* @__PURE__ */ jsx(Parallax, { children }) })
      ]
    }
  ) });
}
const scenes = /* @__PURE__ */ Object.assign({ "./scenes/agriculture.tsx": () => import("./agriculture-DY0TZCsV.js"), "./scenes/beauty-wellness.tsx": () => import("./beauty-wellness-D-vtjNG1.js"), "./scenes/construction.tsx": () => import("./construction-Cmo0rWS8.js"), "./scenes/drivers.tsx": () => import("./drivers-bp_7SyL2.js"), "./scenes/education.tsx": () => import("./education-BdJmcYcc.js"), "./scenes/engineering-technical.tsx": () => import("./engineering-technical-CF2BsmIe.js"), "./scenes/facility-management.tsx": () => import("./facility-management-BrWz25Rk.js"), "./scenes/healthcare.tsx": () => import("./healthcare-uyjUxXv2.js"), "./scenes/hospitality.tsx": () => import("./hospitality-Cv-JGugL.js"), "./scenes/manufacturing.tsx": () => import("./manufacturing-BaIR569d.js"), "./scenes/mep.tsx": () => import("./mep-86nKl6fF.js"), "./scenes/office-admin.tsx": () => import("./office-admin-DAEG8t2Y.js"), "./scenes/oil-gas.tsx": () => import("./oil-gas-DdSHuehA.js"), "./scenes/retail.tsx": () => import("./retail-CJ5SHcqP.js"), "./scenes/security.tsx": () => import("./security-BRx3mEa6.js"), "./scenes/transport-logistics.tsx": () => import("./transport-logistics-CamX6fE7.js") });
const hasScene = (slug) => `./scenes/${slug}.tsx` in scenes;
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function IndustryScene({ slug }) {
  const [mod, setMod] = useState(null);
  useEffect(() => {
    let alive = true;
    scenes[`./scenes/${slug}.tsx`]?.().then((m) => alive && setMod(m));
    return () => {
      alive = false;
    };
  }, [slug]);
  if (!mod) return null;
  const Scene = mod.default;
  return /* @__PURE__ */ jsx(SceneBoundary, { children: /* @__PURE__ */ jsx(Stage, { config: mod.config, children: /* @__PURE__ */ jsx(Scene, {}) }) });
}
const IndustryScene$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IndustryScene,
  hasScene
}, Symbol.toStringTag, { value: "Module" }));
export {
  C,
  IndustryScene$1 as I,
  M
};
