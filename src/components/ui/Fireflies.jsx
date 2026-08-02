import { useEffect, useRef } from "react";
import styles from "./Fireflies.module.css";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

// A subtle firefly field. Each mote has a pseudo-depth `z` (0=far, 1=near) that
// drives its size, brightness, drift speed, glow and mouse-parallax — giving the
// flat matrix grid a sense of 3D space. Canvas 2D, so it stays cheap.
export default function Fireflies() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      t = 0;
    let mx = 0.5,
      my = 0.5;
    let particles = [];
    let bigs = [];
    let nextBig = 3;
    const COUNT = window.innerWidth < 700 ? 380 : 850;
    const rand = (a, b) => a + Math.random() * (b - a);
    // Star palette: mostly white / blue-white, some warm, a few brand-tinted.
    const starColor = () => {
      const r = Math.random();
      if (r < 0.58) return "255,255,255";
      if (r < 0.78) return "214,226,255";
      if (r < 0.9) return "255,241,214";
      if (r < 0.96) return "150,140,255";
      return "120,220,240";
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: COUNT }, () => {
        // Bias toward small/far motes so there are many tiny ones.
        const z = Math.pow(Math.random(), 2.2);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.5 + z * 2.2,
          vx: rand(-0.15, 0.15) * (0.3 + z),
          vy: rand(-0.1, 0.1) * (0.3 + z),
          phase: Math.random() * Math.PI * 2,
          col: starColor(),
        };
      });
    };

    const paint = (animate) => {
      ctx.clearRect(0, 0, w, h);
      const px = mx - 0.5;
      const py = my - 0.5;
      for (const p of particles) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
        const ox = px * p.z * 42; // near motes parallax more → depth
        const oy = py * p.z * 42;
        // Sharper twinkle for a star field.
        const twinkle = animate
          ? 0.35 + 0.65 * Math.pow(Math.sin(t * 1.8 + p.phase) * 0.5 + 0.5, 2)
          : 0.7;
        const col = p.col;
        const cx = p.x + ox;
        const cy = p.y + oy;
        // Fade near the edges so wrapping is seamless — no popping / loop feel.
        const edge = 60;
        const ef = Math.max(
          0,
          Math.min(1, cx / edge, (w - cx) / edge, cy / edge, (h - cy) / edge),
        );
        const alpha = (0.2 + p.z * 0.6) * twinkle * ef;
        if (alpha <= 0.003) continue;
        if (p.r < 1.15) {
          // Tiny far star — cheap crisp point (no gradient), keeps the count high.
          ctx.fillStyle = `rgba(${col},${alpha})`;
          ctx.fillRect(cx, cy, 1, 1);
        } else {
          // Nearer star — soft halo + bright core.
          const glow = p.r * 3.2;
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, glow);
          g.addColorStop(0, `rgba(${col},${alpha * 0.6})`);
          g.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, glow, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${col},${Math.min(1, alpha + 0.15)})`;
          ctx.beginPath();
          ctx.arc(cx, cy, Math.max(0.5, p.r * 0.55), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Occasionally a large firefly drifts across the screen and fades away.
    const spawnBig = () => {
      const fromLeft = Math.random() < 0.5;
      bigs.push({
        x: fromLeft ? -60 : w + 60,
        y: rand(h * 0.12, h * 0.88),
        vx: (fromLeft ? 1 : -1) * rand(0.28, 0.55),
        vy: rand(-0.14, 0.14),
        r: rand(8, 15),
        age: 0,
        life: rand(11, 17),
        phase: Math.random() * Math.PI * 2,
        col:
          Math.random() < 0.6
            ? "255,255,255"
            : Math.random() < 0.5
              ? "214,226,255"
              : "150,140,255",
      });
    };

    const drawBigs = () => {
      if (t > nextBig) {
        spawnBig();
        nextBig = t + rand(6, 12);
      }
      bigs = bigs.filter((b) => b.age < b.life);
      for (const b of bigs) {
        b.age += 0.016;
        b.x += b.vx;
        b.y += b.vy + Math.sin(t * 0.6 + b.phase) * 0.25;
        const env = Math.sin(Math.PI * (b.age / b.life)); // fade in → out
        const tw = 0.75 + 0.25 * Math.sin(t * 2 + b.phase);
        const alpha = 0.55 * env * tw;
        const col = b.col;
        const glow = b.r * 5;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glow);
        g.addColorStop(0, `rgba(${col},${alpha})`);
        g.addColorStop(0.35, `rgba(${col},${alpha * 0.4})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, glow, 0, Math.PI * 2);
        ctx.fill();
        // bright core
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      t += 0.016;
      paint(true);
      drawBigs();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    const onResize = () => {
      resize();
      init();
      if (reduced) paint(false);
    };

    resize();
    init();
    window.addEventListener("resize", onResize);

    if (reduced) {
      paint(false); // one static frame, no loop, no parallax
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  return (
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
  );
}
