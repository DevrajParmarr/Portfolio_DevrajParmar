import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import { useEffect } from 'react';
import { initScrollAnimations, addMagneticEffect } from '@/utils/scrollAnimations';
import { MotionSystem } from '@/utils/motionSystem';

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    const observer = initScrollAnimations();
    addMagneticEffect();
    
    // Add advanced motion effects
    const magneticElements = document.querySelectorAll('.magnetic-effect');
    const cleanupFunctions: (() => void)[] = [];
    
    magneticElements.forEach((element) => {
      const cleanup = MotionSystem.addMagneticEffect(element as HTMLElement, 0.3);
      cleanupFunctions.push(cleanup);
    });
    
    // Add 3D tilt effects
    const tiltElements = document.querySelectorAll('.tilt-3d');
    tiltElements.forEach((element) => {
      const cleanup = MotionSystem.add3DTilt(element as HTMLElement);
      cleanupFunctions.push(cleanup);
    });
    
    // Add parallax effects
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach((element) => {
      const cleanup = MotionSystem.createParallaxEffect(element as HTMLElement, 0.5);
      cleanupFunctions.push(cleanup);
    });

    return () => {
      observer.disconnect();
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ultra Dynamic Background System */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 animate-liquid-motion bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 animate-holographic-shift opacity-30" />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-morph-pulse" />
          <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-bl from-accent/15 via-transparent to-primary/15 animate-ultra-float" />
        </div>
      </div>
      
      {/* Glass Navigation */}
      <Navigation />
      
      {/* Main Content with Enhanced Scroll Animations */}
      <main className="relative z-10 space-y-0">
        <section id="home" className="scroll-triggered">
          <Hero />
        </section>
        
        <section id="about" className="scroll-triggered parallax-element py-12 relative">
          <div className="absolute inset-0 glass-ultra opacity-10" />
          <Profile />
        </section>
        
        <section id="education" className="scroll-triggered relative">
          <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-5" />
          <Education />
        </section>
        
        <section id="experience" className="scroll-triggered relative">
          <div className="absolute inset-0 glass-ultra opacity-15" />
          <Experience />
        </section>
        
        <section id="projects" className="scroll-triggered relative">
          <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-5" />
          <Projects />
        </section>
        
        <section id="skills" className="scroll-triggered parallax-element relative">
          <div className="absolute inset-0 glass-ultra opacity-20" />
          <Skills />
        </section>
        
        <section id="contact" className="scroll-triggered relative">
          <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-10" />
          <Contact />
        </section>
      </main>
      
      {/* Floating Interactive Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-ultra-float pointer-events-none z-[-1]" />
      <div className="fixed bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-morph-pulse pointer-events-none z-[-1]" />
      <div className="fixed top-1/2 left-1/3 w-16 h-16 bg-primary/5 rounded-full blur-xl animate-float pointer-events-none z-[-1]" />
      <div className="fixed bottom-1/3 right-1/3 w-20 h-20 bg-accent/8 rounded-full blur-xl animate-ultra-float pointer-events-none z-[-1]" />
      
      {/* Ultra Glass Footer */}
      <footer className="py-8 text-center text-muted-foreground border-t border-primary/20 glass-ultra backdrop-blur-2xl relative z-10">
        <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-5" />
        <p className="animate-fade-in-up relative z-10">
          © 2024 Devraj Parmar. Crafted with ⚡ and endless creativity
        </p>
      </footer>
    </div>
  );
};

export default Index;
