import { jsx, Fragment } from "react/jsx-runtime";
import { router, createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
import { LazyMotion, MotionConfig } from "motion/react";
import { useState, useEffect } from "react";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function getTier() {
  if (typeof window === "undefined") return "static";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator;
  const saveData = nav.connection?.saveData ?? false;
  const mem = nav.deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 8;
  const webgl = !!document.createElement("canvas").getContext("webgl2");
  if (reduced || saveData || !webgl) return "static";
  if (mem !== void 0 && mem < 4 || cores <= 4 || innerWidth < 768) return "lite";
  return "full";
}
function useTier() {
  const [tier, setTier] = useState("static");
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setTier(getTier());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return tier;
}
function SmoothScroll({ children }) {
  const tier = useTier();
  useEffect(() => {
    if (tier !== "full") return;
    let cleanup = () => {
    };
    let cancelled = false;
    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });
        const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t) => lenis.raf(t * 1e3);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        window.__lenis = lenis;
        const off = router.on("navigate", () => {
          lenis.scrollTo(0, { immediate: true });
          ScrollTrigger.refresh();
        });
        cleanup = () => {
          off();
          gsap.ticker.remove(tick);
          lenis.destroy();
          window.__lenis = void 0;
        };
      }
    );
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [tier]);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const loadFeatures = () => import("motion/react").then((mod) => mod.domAnimation);
function Providers({ children }) {
  return /* @__PURE__ */ jsx(LazyMotion, { features: loadFeatures, strict: true, children: /* @__PURE__ */ jsx(MotionConfig, { reducedMotion: "user", children: /* @__PURE__ */ jsx(SmoothScroll, { children }) }) });
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => title ? `${title} — Facilitate Expat Overseas` : "Facilitate Expat Overseas",
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "./Pages/About.tsx": () => import("./assets/About-XR4BFt4H.js"), "./Pages/Contact.tsx": () => import("./assets/Contact-CXBSc2rT.js"), "./Pages/Countries/Index.tsx": () => import("./assets/Index-DHOwQmOV.js"), "./Pages/Countries/Show.tsx": () => import("./assets/Show-Cb3_BrQV.js"), "./Pages/Employers.tsx": () => import("./assets/Employers-C_e5G4iy.js"), "./Pages/Home.tsx": () => import("./assets/Home-BCd2Wgt_.js"), "./Pages/Industries/Index.tsx": () => import("./assets/Index-mvKcMwyb.js"), "./Pages/Industries/Show.tsx": () => import("./assets/Show-DqC4MQWD.js"), "./Pages/Jobs/Index.tsx": () => import("./assets/Index-Cw0MNzUY.js"), "./Pages/WorkAbroad.tsx": () => import("./assets/WorkAbroad-ClSOjDjF.js") })),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(Providers, { children: /* @__PURE__ */ jsx(App, { ...props }) })
  })
);
export {
  useTier as u
};
