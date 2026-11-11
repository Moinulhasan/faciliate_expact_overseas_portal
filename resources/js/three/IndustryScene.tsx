import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Stage, type SceneConfig } from "./Stage";

type SceneModule = { default: ComponentType; config?: SceneConfig };

// One lazy chunk per scene: a page only downloads its own industry's scene.
const scenes = import.meta.glob<SceneModule>("./scenes/*.tsx");

export const hasScene = (slug: string) => `./scenes/${slug}.tsx` in scenes;

// WebGL failures (context lost, driver issues) must never break the page — the static visual stays.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function IndustryScene({ slug }: { slug: string }) {
  const [mod, setMod] = useState<SceneModule | null>(null);

  useEffect(() => {
    let alive = true;
    scenes[`./scenes/${slug}.tsx`]?.().then((m) => alive && setMod(m));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!mod) return null;
  const Scene = mod.default;
  return (
    <SceneBoundary>
      <Stage config={mod.config}>
        <Scene />
      </Stage>
    </SceneBoundary>
  );
}
