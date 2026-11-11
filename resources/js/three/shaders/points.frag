uniform vec3 uColor;
varying float vAlpha;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = dot(c, c);
  if (r > 0.25) discard;
  float soft = 1.0 - smoothstep(0.05, 0.25, r);
  gl_FragColor = vec4(uColor, soft * vAlpha);
}
