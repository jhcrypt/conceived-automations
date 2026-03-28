import { useRef, useEffect } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particleCount = 60;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 2 + 1,
        color: i % 2 === 0 ? '#8b5cf6' : '#06b6d4'
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 400;

      // Update and Draw
      particles.forEach((p1, i) => {
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.z -= 4;

        // Smoothly reset particles that float too close
        if (p1.z <= 10) {
          p1.z = width;
          p1.x = (Math.random() - 0.5) * width;
          p1.y = (Math.random() - 0.5) * height;
        }
        // Wrap around edges smoothly
        if (p1.x < -width / 2) p1.x = width / 2;
        if (p1.x > width / 2) p1.x = -width / 2;
        if (p1.y < -height / 2) p1.y = height / 2;
        if (p1.y > height / 2) p1.y = -height / 2;

        // Projection
        const scale1 = focalLength / (focalLength + p1.z);
        const x1 = cx + p1.x * scale1;
        const y1 = cy + p1.y * scale1;

        // Connection lines removed for cleaner look

        // Draw Particle
        ctx.beginPath();
        ctx.arc(x1, y1, p1.size * scale1, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = Math.min(1, scale1 * 1.5);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.width = window.innerWidth;
        height = canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" />;
}
