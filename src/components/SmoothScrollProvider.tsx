import React, { createContext, useContext, useEffect, useRef } from 'react';

interface SmoothScrollContextType {
  scrollToSection: (sectionId: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within SmoothScrollProvider');
  }
  return context;
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const isScrollingRef = useRef(false);

  const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId) as HTMLElement;
    if (!element || isScrollingRef.current) return;

    const targetPosition = element.offsetTop - 80; // Account for fixed header
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) * 0.5, 1000); // Max 1s, adaptive based on distance
    
    let startTime: number | null = null;
    isScrollingRef.current = true;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      const currentPosition = startPosition + (distance * easedProgress);
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isScrollingRef.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    // Add smooth scroll behavior to anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const sectionId = target.getAttribute('href')!;
        scrollToSection(sectionId);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};