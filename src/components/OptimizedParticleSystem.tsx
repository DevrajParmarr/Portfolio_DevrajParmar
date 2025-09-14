import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

interface OptimizedParticleSystemProps {
  particleCount?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
}

const OptimizedParticleSystem: React.FC<OptimizedParticleSystemProps> = ({
  particleCount = 30,
  speed = 1,
  interactive = true,
  className = "fixed inset-0 pointer-events-none z-0"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(true);

  // Optimized particle creation
  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.3 + 0.1,
    hue: Math.random() * 60 + 220, // Blue to purple range
    life: 0,
    maxLife: Math.random() * 200 + 100
  }), [speed]);

  // Initialize particles
  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));
  }, [particleCount, createParticle]);

  // Optimized particle update with object pooling
  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement) => {
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life++;

    // Mouse interaction (only if interactive)
    if (interactive) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80) {
        const force = (80 - distance) / 80 * 0.001;
        particle.vx -= dx * force;
        particle.vy -= dy * force;
      }
    }

    // Boundary wrapping (more efficient than bouncing)
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    // Fade effect based on life
    const lifeFactor = particle.life / particle.maxLife;
    particle.opacity = Math.max(0.1, 0.3 * (1 - lifeFactor));

    // Reset particle if life exceeded
    if (particle.life >= particle.maxLife) {
      Object.assign(particle, createParticle(canvas));
    }
  }, [interactive, createParticle]);

  // Optimized rendering with batch operations
  const render = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Clear with fade effect for trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Batch render particles
    particlesRef.current.forEach(particle => {
      // Update particle
      updateParticle(particle, canvas);

      // Draw particle with optimized path operations
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = `hsl(${particle.hue}, 60%, 60%)`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw connections (optimized with distance check)
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = 'hsl(240, 60%, 60%)';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = dx * dx + dy * dy; // Skip sqrt for performance

        if (distance < 8100) { // 90px squared
          const alpha = (8100 - distance) / 8100 * 0.3;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
  }, [updateParticle]);

  // Animation loop with RAF optimization
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActiveRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    render(ctx, canvas);
    animationRef.current = requestAnimationFrame(animate);
  }, [render]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactive) return;
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, [interactive]);

  // Handle resize with debouncing
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeParticles(canvas);
  }, [initializeParticles]);

  // Visibility API optimization
  const handleVisibilityChange = useCallback(() => {
    isActiveRef.current = !document.hidden;
    if (isActiveRef.current) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize
    handleResize();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isActiveRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleMouseMove, handleResize, handleVisibilityChange, animate]);

  return <canvas ref={canvasRef} className={className} />;
};

export default OptimizedParticleSystem;