export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: { type: "spring", stiffness: 260, damping: 28, mass: 0.9 },
} as const;
export const dur = { xs: 0.15, sm: 0.25, md: 0.45, lg: 0.8, xl: 1.2 };
export const gsapEase = { out: "expo.out", inOut: "power3.inOut", soft: "power2.out" };
