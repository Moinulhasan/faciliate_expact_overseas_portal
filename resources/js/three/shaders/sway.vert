// Instanced crop blades bending in the wind; bend grows with height (position.y 0..1).
uniform float uTime;
varying float vH;

void main() {
  vec4 world = instanceMatrix * vec4(position, 1.0);
  vec3 origin = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float wave = sin(uTime * 1.6 + origin.x * 0.9 + origin.z * 0.6) + 0.4 * sin(uTime * 3.1 + origin.z * 2.0);
  float bend = position.y * position.y;
  world.x += wave * bend * 0.12;
  world.z += wave * bend * 0.04;
  vH = position.y;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * world;
}
