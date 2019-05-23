precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform float xfact;
uniform float yfact;
uniform float zfact;
attribute vec3 position;
attribute vec3 offset;
attribute vec3 color;
attribute vec2 uv;
attribute float speed;
attribute float start;
attribute float size;
varying vec2 vUv;
varying vec3 vColor;
void main() {
  vUv = uv;
  vColor = color;
  vec3 displace = offset;
  displace *= vec3(xfact, yfact, zfact);
  vec3 scale = vec3(size+cos(time+start), size+cos(time+start), 1.);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale + displace, 1.0);
}