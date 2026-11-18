import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/**
 * Aurora field: layered value noise, a slow domain warp and faint contour
 * lines. Pointer position lifts a halo. Everything is computed per pixel on the
 * GPU and rendered straight into an alpha canvas that the page composites.
 */
const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * vnoise(p);
    p = p * 2.03 + 17.0;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  float aspect = uRes.x / min(uRes.x, uRes.y);
  float t = uTime * 0.035;

  vec2 q = p * vec2(1.15, 1.9) + vec2(t * 0.9, -t * 0.55);
  float warp = fbm(q * 0.85 + fbm(q * 1.6 + t * 0.6) * 0.8);
  float n = fbm(q + vec2(warp * 0.85, -warp * 0.6));

  float ribbon = smoothstep(0.34, 0.82, n);
  float veil = smoothstep(0.55, 0.95, fbm(q * 1.5 - vec2(t * 0.4, t * 0.7)));

  float iso = abs(fract(n * 9.0 + t * 0.35) - 0.5);
  float contour = smoothstep(0.075, 0.0, iso);

  vec3 mint = vec3(0.235, 0.870, 0.640);
  vec3 aqua = vec3(0.180, 0.850, 0.960);
  vec3 col = mix(mint, aqua, clamp(0.42 + p.x * 0.55 + (n - 0.5) * 1.1, 0.0, 1.0));

  float field = ribbon * 0.34 + veil * 0.22 + contour * 0.20;

  vec2 m = uMouse * vec2(aspect, 1.0);
  float d = length(p - m);
  float halo = exp(-d * d * 5.0) * 0.45;

  float alpha = field * 0.72 + halo * 0.42;
  alpha *= smoothstep(1.45, 0.10, length(p * vec2(0.82, 1.0)));
  alpha = clamp(alpha, 0.0, 0.34);

  fragColor = vec4(col, alpha);
}`;

export function ShaderField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display = "none";
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    let dpr = 1;
    let visible = true;
    let raf = 0;
    let time = Math.random() * 40;
    let last = performance.now();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, rect.width < 768 ? 1.15 : 1.6);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = () => {
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 1.6;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 1.4;
    };

    const onVisibility = () => {
      const hidden = document.hidden;
      if (hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!hidden && !raf && visible && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else if (visible && !raf && !document.hidden && !reduced) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.01 },
    );

    resize();
    // First frame always drawn, so reduced-motion visitors still get the field.
    gl.uniform1f(uTime, time);
    gl.uniform2f(uMouse, 0, 0);
    draw();

    if (!reduced) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      observer.observe(canvas);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (raf === 0) draw();
    });
    ro.observe(canvas);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
