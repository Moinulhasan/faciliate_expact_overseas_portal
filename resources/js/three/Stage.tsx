import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { MathUtils, Vector3, type Group } from "three";
import { C } from "./palette";

export interface SceneConfig {
  camera?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
}

// Slow idle drift + pointer parallax (±6°, CLAUDE.md M1) applied to the whole scene.
function Parallax({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const k = 1 - Math.exp(-dt * 3);
    g.rotation.y = MathUtils.lerp(g.rotation.y, state.pointer.x * 0.1 + Math.sin(t * 0.15) * 0.12, k);
    g.rotation.x = MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.06, k);
  });
  return <group ref={ref}>{children}</group>;
}

function LookAt({ target }: { target: [number, number, number] }) {
  useFrame(({ camera }) => camera.lookAt(...target));
  return null;
}

// Hero-background composition: slide the scene right so its subject sits at ~70% of the width,
// clear of the headline on the left. Uses the visible width at the target depth, so it adapts on resize.
function Compose({ target, shift, children }: { target: [number, number, number]; shift: number; children: ReactNode }) {
  const t = useMemo(() => new Vector3(...target), [target]);
  const width = useThree((s) => s.viewport.getCurrentViewport(s.camera, t).width);
  return <group position={[width * shift, 0, 0]}>{children}</group>;
}

// One Canvas per page (≤ 1 WebGL context, CLAUDE.md §5.6), full-bleed behind the hero.
// Pointer events come from the whole hero <section> (the canvas sits under the text), pauses off-screen.
export function Stage({ children, config = {} }: { children: ReactNode; config?: SceneConfig }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const { camera: cam = [0, 1.8, 6.2], target = [0, 0.6, 0], fov = 38 } = config;
  // Scenes were authored tight for a small panel; as a full hero background they need ~40% more room.
  const camera = cam.map((v, i) => target[i] + (v - target[i]) * 1.4) as [number, number, number];
  // Narrow canvases (< lg) put text across the full width, so keep the scene centred there.
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

  return (
    <div ref={wrap} aria-hidden className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
      {source && (
        <Canvas
          eventSource={source}
          eventPrefix="client"
          dpr={[1, 1.5]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: camera, fov, near: 0.1, far: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => requestAnimationFrame(() => setReady(true))}
        >
          <fog attach="fog" args={[C.night, 7, 16]} />
          <ambientLight intensity={0.55} color={C.ink} />
          <directionalLight position={[4, 6, 5]} intensity={1.6} color={C.ink} />
          <pointLight position={[-3.5, 2.5, -1.5]} intensity={18} distance={12} color={C.cta} />
          <pointLight position={[3, 0.5, 3]} intensity={6} distance={10} color={C.ctaHi} />
          <LookAt target={target} />
          <Compose target={target} shift={shift}>
            <Parallax>{children}</Parallax>
          </Compose>
        </Canvas>
      )}
    </div>
  );
}
