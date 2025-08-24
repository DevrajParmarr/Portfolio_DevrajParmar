// Ultimate Motion System - Physics-based animations
export const motionConfig = {
  // Spring Physics Configuration
  springs: {
    gentle: { tension: 120, friction: 14, mass: 1 },
    bouncy: { tension: 300, friction: 10, mass: 1 },
    smooth: { tension: 280, friction: 25, mass: 1 },
    precise: { tension: 400, friction: 30, mass: 1 },
    elastic: { tension: 180, friction: 12, mass: 1 }
  },
  
  // Timing Functions
  easings: {
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bouncy: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    precise: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  
  // Duration Tokens
  durations: {
    instant: 100,
    quick: 200,
    smooth: 300,
    gentle: 500,
    slow: 700,
    dramatic: 1000
  },
  
  // Stagger Delays
  stagger: {
    quick: 50,
    normal: 100,
    slow: 150,
    dramatic: 200
  }
};

// Advanced Animation Utilities
export class MotionSystem {
  static createSpringAnimation(element: HTMLElement, config: any) {
    element.style.transition = `all ${config.duration}ms ${config.easing}`;
  }
  
  static addMagneticEffect(element: HTMLElement, strength = 0.3) {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * strength;
      const moveY = y * strength;
      
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${y * 0.1}deg) rotateY(${x * 0.1}deg)`;
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }
  
  static add3DTilt(element: HTMLElement) {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 8;
      const rotateY = (centerX - x) / 8;
      
      element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }
  
  static createParallaxEffect(element: HTMLElement, speed = 0.5) {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      element.style.transform = `translate3d(0, ${parallax}px, 0)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }
  
  static addGlowTrail(element: HTMLElement) {
    const trail = document.createElement('div');
    trail.className = 'glow-trail';
    trail.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, hsl(193 100% 50% / 0.8) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(trail);
    
    const handleMouseMove = (e: MouseEvent) => {
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.opacity = '1';
    };
    
    const handleMouseLeave = () => {
      trail.style.opacity = '0';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeChild(trail);
    };
  }
}

// Accessibility-aware animations
export const respectsReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getAccessibleMotionConfig = () => {
  if (respectsReducedMotion()) {
    return {
      ...motionConfig,
      durations: {
        instant: 0,
        quick: 0,
        smooth: 0,
        gentle: 0,
        slow: 0,
        dramatic: 0
      }
    };
  }
  return motionConfig;
};