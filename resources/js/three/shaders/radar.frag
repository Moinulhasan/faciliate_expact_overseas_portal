// Radar sweep on a disc: rotating wedge with a fading tail, range rings and a soft rim.
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  vec2 p = vUv - 0.5;
  float r = length(p) * 2.0;
  if (r > 1.0) discard;
  float a = atan(p.y, p.x) / 6.28318 + 0.5;
  float sweep = fract(a - uTime * 0.18);
  float tail = pow(sweep, 10.0);
  float rings = smoothstep(0.03, 0.0, abs(fract(r * 4.0) - 0.5) - 0.47);
  float rim = smoothstep(0.92, 1.0, r);
  float alpha = tail * 0.75 + rings * 0.18 + rim * 0.35;
  gl_FragColor = vec4(uColor, alpha * (1.0 - r * 0.35));
}
