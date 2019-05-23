precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;
uniform float xf;
uniform float yf;
uniform float zf;
uniform float xversch;
uniform float yversch;
// attribute vec2 versch;
attribute vec3 position;
attribute vec3 offset;
attribute vec3 diffuse;
attribute vec2 uv;
attribute float speed;
attribute float start;
varying vec2 vUv;
float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}
void main() {
  vUv = uv;
  //    float dist = normalize(distance(offset, position));
  //    dist = 1.0/distance(offset, position);    gl_PointSize = 30.0;
  vec3 displace = offset;
  displace.x += xversch + sin(start + time) * xf * diffuse.x;
  displace.y = yversch + sin(start + time * 1.5) * yf * diffuse.y;
  //    displace.y = yfact * sin(start+time*speed);
  displace.z = zf * sin(start + time * speed) * diffuse.z;
  vec3 scale = vec3(0.2, 0.2, 0.2);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale + displace, 1.0);
}