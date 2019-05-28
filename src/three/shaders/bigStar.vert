precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform vec3 color;
attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute float size;
attribute float speed;
varying vec3 vColor;
// attribute float start;
varying vec2 vUv;
void main() {
  vUv = uv;
  vColor = color;
  vec3 displace = offset;
  vec3 scale = vec3(size * .1, size * .1, 1.0);
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(1.0, 1.0, 1.0, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale + displace, 1.0);
}