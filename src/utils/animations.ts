// Simple animation utilities for smooth effects
export const fadeInUp = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
};

export const slideIn = {
  initial: { opacity: 0, transform: 'translateX(-20px)' },
  animate: { opacity: 1, transform: 'translateX(0px)' },
  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
};

export const scaleIn = {
  initial: { opacity: 0, transform: 'scale(0.9)' },
  animate: { opacity: 1, transform: 'scale(1)' },
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
};

// Intersection Observer utility for scroll animations
export const createScrollObserver = (callback: (isVisible: boolean) => void, threshold = 0.1) => {
  return new IntersectionObserver(
    ([entry]) => {
      callback(entry.isIntersecting);
    },
    { threshold, rootMargin: '50px' }
  );
};

// Smooth scroll function
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  }
};

// Throttle function for performance
export const throttle = <T extends (...args: unknown[]) => unknown>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};