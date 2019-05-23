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
attribute vec3 diffuse;
attribute vec2 uv;
attribute float speed;
attribute float start;
varying vec2 vUv;
varying vec3 vColor;
void main() {
  vUv = uv;
  vColor = color;
  float dist = normalize(distance(offset, position));
  dist = distance(offset, position);
  gl_PointSize = 30.0;
  vec3 displace = offset;
  displace.x = xfact * cos(start + time * speed) * diffuse.x;
  displace.y = yfact * sin(start + time * speed) * diffuse.y;
  displace.z = zfact * sin(start + time * speed) * diffuse.z;
  vec3 scale = vec3(dist * .1, dist * .1, dist * 1.);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale + displace, 1.0);
}