uniform vec3 uBase;
uniform vec3 uTip;
varying float vH;

void main() {
  gl_FragColor = vec4(mix(uBase, uTip, smoothstep(0.0, 1.0, vH)), 1.0);
}
