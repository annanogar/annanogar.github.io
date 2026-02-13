#version 300 es

precision highp float;
out vec4 outColor;
uniform float u_time;
uniform vec2 u_resolution;

// Hash function for randomness
float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

// Signed distance function for a classic heart shape
float heartSDF(vec2 p) {
 // Center and scale
 p.y += 0.25;

 float x = p.x;
 float y = p.y;
 float a = x*x + y*y - 1.0;

 return a*a*a - x*x*y*y*y;
}

// Neon color palette
vec3 neonColor(float t) {
  return mix(vec3(1.0, 0.1, 0.5), vec3(1.0, 0.8, 0.2), 0.5 + 0.5 * sin(t));
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 col = vec3(0.0);
  float afterglow = 0.0;
  int heartCount = 80;
  float speed = 0.6;
  float spread = 2.5;
  float glowStrength = 0.04;
  float heartSize = 0.08;

  for (int i = 0; i < heartCount; i++) {
    float fi = float(i);
    float t = fract(u_time * speed * (0.7 + hash(fi)) + hash(fi));
    float z = mix(0.2, 1.2, t);
    float angle = hash(fi + 1.0) * 6.2831;
    float radius = mix(0.2, spread, hash(fi + 2.0));

    vec2 pos = vec2(cos(angle), sin(angle)) * radius * z;
    pos += vec2(hash(fi + 3.0) - 0.5, hash(fi + 4.0) - 0.5) * 0.2 * z;
    pos /= z;

    float sdf = heartSDF((uv - pos) / (heartSize * (1.2 - 0.7 * z)));
    float glow = exp(-10.0 * abs(sdf));
    float core = smoothstep(0.0, 0.0001, -sdf);

    vec3 heartCol = neonColor(fi * 0.13 + u_time * 0.5);
    col += heartCol * core * (1.0 - t) * 1.2;

    afterglow += glow * 0.5 * (1.0 - t);
  }

  // Afterglow effect
  //col += vec3(1.0, 0.2, 0.7) * afterglow * glowStrength;

  // Vignette
  float vignette = smoothstep(1.2, 0.7, length(uv));
  col *= vignette;

//  outColor = vec4(col, 1.0);
  float alpha = 1.0;
  if (col == vec3(0.0)) alpha = 0.0; // or use your own logic for background
  outColor = vec4(col, alpha);
}
