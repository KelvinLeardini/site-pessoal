"use client";

import { useEffect, useRef } from "react";

export default function MorphingBlob3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Tenta contexto WebGL2 ou WebGL1
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    // Shaders GLSL para renderizar o 3D Morphing Metaball exatamente como no HubTech
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;

      void main() {
        // Normaliza as coordenadas mantendo a proporção de aspecto centralizada
        vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        st.y = -st.y; // Inverte Y para orientação correta

        float t = u_time * 0.35;
        vec2 p = st * 1.5;

        // Fórmula volumétrica de Metaballs do HubTech
        float field = 0.0;
        
        // 5 núcleos de massa que se fundem e deformam em 3D
        for (int i = 0; i < 5; i++) {
          float fi = float(i);
          float speed = 1.2 + 0.5 * sin(fi * 12.34);
          float angle = -fi * 1.57;
          vec2 dir1 = vec2(cos(angle), sin(angle));
          vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.0));
          vec2 center = 0.32 * (dir1 * sin(t * speed + fi * 1.23) + dir2 * cos(t * (speed * 0.75) + fi * 2.17));
          
          float dist = length(p - center);
          field += pow(clamp(1.0 - dist / 0.72, 0.0, 1.0), 3.0);
        }

        // Borda suave e iluminação 3D com curvatura esférica
        float threshold = 0.62;
        float edge = smoothstep(threshold - 0.15, threshold + 0.05, field);

        if (edge <= 0.005) {
          discard;
        }

        // Iluminação 3D (Simulação de vetor normal / relevo)
        float nx = (field - 0.5);
        vec3 normal = normalize(vec3(p.x, p.y, sqrt(max(0.01, 1.0 - dot(p, p)))));
        vec3 lightDir = normalize(vec3(-0.4, 0.6, 0.8));
        float diffuse = clamp(dot(normal, lightDir), 0.0, 1.0);
        float specular = pow(clamp(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 12.0);

        // Paleta do HubTech: Cinza Metálico / Cerâmica translúcida suave
        vec3 baseColor = mix(vec3(0.09, 0.10, 0.13), vec3(0.72, 0.74, 0.80), diffuse);
        baseColor += vec3(0.85, 0.88, 0.95) * specular * 0.45;

        // Reflexo sutil quente no contorno
        float rim = 1.0 - clamp(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
        baseColor += vec3(0.88, 0.40, 0.22) * pow(rim, 3.5) * 0.35;

        float alpha = edge * 0.65;
        gl_FragColor = vec4(baseColor, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad fullscreen para cobrir o canvas
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    // Habilita transparência / alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let animationId: number;
    const startTime = performance.now();
    let isVisible = true;
    let isRunning = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.clientWidth || 800;
      const height = canvas.clientHeight || 550;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      // Se saiu da tela, interrompe o loop
      if (!isVisible) {
        isRunning = false;
        return;
      }

      const elapsed = (performance.now() - startTime) * 0.001;
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, elapsed);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Se o usuário prefere reduzir movimento, desenha um único frame cerâmico estático
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    // Cria o observador que vigia se o canvas está na tela
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      // Se voltou para a tela e o loop está pausado, religa o motor
      if (isVisible && !isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(render);
      }
    });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="hero-3d-blob-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-3d-blob-canvas" />
    </div>
  );
}

