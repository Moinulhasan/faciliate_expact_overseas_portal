// Soft breathing points; optional upward drift (steam, sparks, data) when uRise > 0.
uniform float uTime;
uniform float uSize;
uniform float uRise;
uniform float uHeight;
attribute float aRand;
varying float vAlpha;

void main() {
  vec3 p = position;
  if (uRise > 0.0) {
    float t = fract(uTime * uRise * (0.6 + aRand * 0.8) + aRand);
    p.y += t * uHeight;
    p.x += sin(t * 6.2831 + aRand * 12.0) * 0.08;
    vAlpha = sin(t * 3.14159);
  } else {
    vAlpha = 0.55 + 0.45 * sin(uTime * 1.4 + aRand * 6.2831);
  }
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (0.6 + aRand * 0.8) * (300.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
