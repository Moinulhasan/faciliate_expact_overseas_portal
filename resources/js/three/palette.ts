import { Color, LineBasicMaterial, MeshStandardMaterial } from "three";

// Brand tokens (resources/css/tokens.css) as three.js colours.
export const C = {
  night: new Color("#06120d"),
  night2: new Color("#0d1f17"),
  forest: new Color("#12392a"),
  brand: new Color("#1c7949"),
  cta: new Color("#73bf44"),
  ctaHi: new Color("#a6db80"),
  ink: new Color("#eef5f0"),
  muted: new Color("#a9bdb1"),
};

// shortcut: module-level shared materials (created once, reused by every scene, never disposed —
// a few KB of GPU state). Move into a per-Canvas context if scenes ever need per-instance tweaks.
export const M = {
  solid: new MeshStandardMaterial({ color: C.night2, roughness: 0.75, metalness: 0.15, flatShading: true }),
  panel: new MeshStandardMaterial({ color: C.forest, roughness: 0.6, metalness: 0.2, flatShading: true }),
  brand: new MeshStandardMaterial({ color: C.brand, roughness: 0.5, metalness: 0.2, flatShading: true }),
  glow: new MeshStandardMaterial({ color: C.cta, emissive: C.cta, emissiveIntensity: 1.4, roughness: 0.4 }),
  soft: new MeshStandardMaterial({ color: C.ink, emissive: C.ctaHi, emissiveIntensity: 0.25, roughness: 0.5 }),
  edge: new LineBasicMaterial({ color: C.cta, transparent: true, opacity: 0.55 }),
  edgeDim: new LineBasicMaterial({ color: C.cta, transparent: true, opacity: 0.22 }),
};
