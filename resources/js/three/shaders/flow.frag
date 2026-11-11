// Dashes travelling along a tube (uv.x runs along its length). Pipes, cables, routes.
uniform float uTime;
uniform float uSpeed;
uniform float uRepeat;
uniform float uBase;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float d = fract(vUv.x * uRepeat - uTime * uSpeed);
  float pulse = smoothstep(0.0, 0.55, d) * (1.0 - smoothstep(0.55, 0.68, d));
  float a = uBase + pulse * 0.95;
  gl_FragColor = vec4(uColor * (0.6 + pulse), a);
}
