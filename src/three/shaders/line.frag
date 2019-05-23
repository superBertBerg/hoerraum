precision highp float;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  //    float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
  //    vec4 colB = vec4(grey, grey, grey, 1.0);
  float border = 0.4;
  float radius = 0.5;
  float distinner = radius - distance(uv, vec2(0.5));
  float t = smoothstep(0.0, border, distinner);
  // "   ",
  vec4 color = vec4(1.0, 1.0, 1.0, 0.0);
  color.a = t;
  gl_FragColor = color;
  // "	gl_FragColor = vec4(1, 0.0, 0.0, 1.0);",
}