// Concentric water ripples expanding from the centre of a plane, fading at the rim.
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  float r = length(vUv - 0.5);
  float ring = pow(0.5 + 0.5 * sin(r * 70.0 - uTime * 2.4), 6.0);
  float fade = 1.0 - smoothstep(0.12, 0.5, r);
  gl_FragColor = vec4(uColor, ring * fade * 0.55);
}
