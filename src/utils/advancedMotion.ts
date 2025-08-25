// Advanced Physics-Based Motion System
export interface SpringConfig {
  tension: number;
  friction: number;
  mass: number;
  velocity: number;
}

export interface MotionTokens {
  springs: Record<string, SpringConfig>;
  easings: Record<string, string>;
  durations: Record<string, number>;
  stagger: Record<string, number>;
  physics: Record<string, any>;
}

// Ultimate Motion Design System
export const motionTokens: MotionTokens = {
  springs: {
    ultra: { tension: 400, friction: 40, mass: 1, velocity: 0 },
    bouncy: { tension: 300, friction: 10, mass: 1, velocity: 0 },
    gentle: { tension: 120, friction: 14, mass: 1, velocity: 0 },
    precise: { tension: 400, friction: 30, mass: 1, velocity: 0 },
    elastic: { tension: 180, friction: 12, mass: 1, velocity: 0 },
    liquid: { tension: 100, friction: 8, mass: 0.8, velocity: 0 }
  },
  
  easings: {
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    precise: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    liquid: 'cubic-bezier(0.23, 1, 0.32, 1)',
    magnetic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    morphic: 'cubic-bezier(0.77, 0, 0.175, 1)'
  },
  
  durations: {
    instant: 100,
    quick: 200,
    smooth: 300,
    gentle: 500,
    slow: 700,
    dramatic: 1000,
    cinematic: 1500
  },
  
  stagger: {
    tight: 25,
    quick: 50,
    normal: 100,
    slow: 150,
    dramatic: 200,
    cinematic: 300
  },
  
  physics: {
    gravity: 9.81,
    friction: 0.98,
    restitution: 0.8,
    airResistance: 0.02
  }
};

// Advanced Animation Engine
export class AdvancedMotionEngine {
  private rafId: number | null = null;
  private observers: Map<string, IntersectionObserver> = new Map();
  private particles: Particle[] = [];
  
  // Spring Physics Animation
  static createSpringAnimation(
    element: HTMLElement, 
    target: { x?: number; y?: number; scale?: number; rotate?: number },
    config: SpringConfig = motionTokens.springs.smooth
  ): Promise<void> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const startValues = {
        x: 0, y: 0, scale: 1, rotate: 0
      };
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / 1000, 1);
        
        // Spring physics calculation
        const springForce = -config.tension * progress;
        const dampingForce = -config.friction * config.velocity;
        const acceleration = (springForce + dampingForce) / config.mass;
        
        config.velocity += acceleration;
        const displacement = config.velocity * progress;
        
        // Apply transforms
        const transforms = [];
        if (target.x !== undefined) transforms.push(`translateX(${startValues.x + displacement * target.x}px)`);
        if (target.y !== undefined) transforms.push(`translateY(${startValues.y + displacement * target.y}px)`);
        if (target.scale !== undefined) transforms.push(`scale(${startValues.scale + displacement * (target.scale - 1)})`);
        if (target.rotate !== undefined) transforms.push(`rotate(${startValues.rotate + displacement * target.rotate}deg)`);
        
        element.style.transform = transforms.join(' ');
        
        if (progress < 1 && Math.abs(config.velocity) > 0.01) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(animate);
    });
  }
  
  // 3D Magnetic Effect
  static add3DMagneticEffect(element: HTMLElement, strength = 0.3): () => void {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 200;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = deltaX * force * 0.5;
        const moveY = deltaY * force * 0.5;
        const rotateX = deltaY * force * 0.1;
        const rotateY = deltaX * force * -0.1;
        
        element.style.transform = `
          translate3d(${moveX}px, ${moveY}px, 0) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
          perspective(1000px)
        `;
        element.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
      element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }
  
  // Advanced 3D Tilt Effect
  static add3DTiltEffect(element: HTMLElement, maxTilt = 15): () => void {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;
      
      element.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px)
        scale3d(1.02, 1.02, 1.02)
      `;
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }
  
  // Particle System
  createParticleSystem(container: HTMLElement, count = 50): void {
    for (let i = 0; i < count; i++) {
      const particle = new Particle(container);
      this.particles.push(particle);
    }
    this.animateParticles();
  }
  
  private animateParticles(): void {
    const animate = () => {
      this.particles.forEach(particle => particle.update());
      this.rafId = requestAnimationFrame(animate);
    };
    animate();
  }
  
  // Advanced Scroll Parallax
  static createScrollParallax(element: HTMLElement, speed = 0.5, direction = 'vertical'): () => void {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate if element is in viewport
      if (elementTop < scrolled + windowHeight && elementTop + elementHeight > scrolled) {
        const progress = (scrolled + windowHeight - elementTop) / (windowHeight + elementHeight);
        const moveDistance = (progress - 0.5) * 200 * speed;
        
        if (direction === 'vertical') {
          element.style.transform = `translate3d(0, ${moveDistance}px, 0)`;
        } else {
          element.style.transform = `translate3d(${moveDistance}px, 0, 0)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }
  
  // Intersection Observer with Advanced Animations
  static createAdvancedObserver(
    elements: NodeListOf<Element> | Element[], 
    animationType: 'fadeUp' | 'scaleIn' | 'slideInRight' | 'morphIn' = 'fadeUp',
    staggerDelay = 100
  ): IntersectionObserver {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const delay = index * staggerDelay;
            
            setTimeout(() => {
              element.classList.add(`animate-${animationType}`);
              element.style.animationDelay = `${delay}ms`;
            }, delay);
            
            observer.unobserve(element);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
      }
    );
    
    elements.forEach(el => observer.observe(el));
    return observer;
  }
  
  // Cleanup
  destroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.observers.forEach(observer => observer.disconnect());
    this.particles = [];
  }
}

// Particle Class
class Particle {
  private element: HTMLElement;
  private x: number = 0;
  private y: number = 0;
  private vx: number = 0;
  private vy: number = 0;
  private size: number = 0;
  private opacity: number = 0;
  private container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }
  
  private init(): void {
    this.element = document.createElement('div');
    this.element.className = 'particle-dot';
    this.size = Math.random() * 3 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
    
    this.element.style.cssText = `
      position: absolute;
      width: ${this.size}px;
      height: ${this.size}px;
      background: radial-gradient(circle, hsl(var(--primary)) ${this.opacity}, transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
    `;
    
    this.reset();
    this.container.appendChild(this.element);
  }
  
  private reset(): void {
    this.x = Math.random() * this.container.offsetWidth;
    this.y = Math.random() * this.container.offsetHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }
  
  update(): void {
    this.x += this.vx;
    this.y += this.vy;
    
    // Boundary collision
    if (this.x < 0 || this.x > this.container.offsetWidth) this.vx *= -1;
    if (this.y < 0 || this.y > this.container.offsetHeight) this.vy *= -1;
    
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }
}

// Accessibility Support
export const respectsReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getAccessibleMotionConfig = (): MotionTokens => {
  if (respectsReducedMotion()) {
    return {
      ...motionTokens,
      durations: Object.keys(motionTokens.durations).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {} as Record<string, number>)
    };
  }
  return motionTokens;
};