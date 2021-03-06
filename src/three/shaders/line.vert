precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform float xf;
uniform float yf;
uniform float zf;
uniform float xversch;
uniform float yversch;
attribute vec3 position;
attribute vec3 diffuse;
attribute vec3 color;
attribute vec2 uv;
attribute float linex;
attribute float speed;
attribute float start;
attribute float size;
varying vec2 vUv;
varying vec3 vColor;
float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}
void main() {
  vUv = uv;
  vColor = color;
  float abc = linex;
  vec3 displace = vec3(abc, 1.0, 1.0);
  displace.x += xversch + sin(start + time) * xf * diffuse.x;
  displace.y = yversch + sin(start + time * 1.5) * yf * diffuse.y;
  displace.z = zf * sin(start + time * speed) * diffuse.z;
  vec3 scale = vec3(size, size, 0.2);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale + displace, 1.0);
}