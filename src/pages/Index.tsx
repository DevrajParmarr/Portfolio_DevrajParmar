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

const Index = () => {
  useEffect(() => {
    const observer = initScrollAnimations();
    addMagneticEffect();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="space-y-0">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about" className="py-12 relative">
          <div className="absolute inset-0 bg-[var(--gradient-symmetric)] opacity-20" />
          <Profile />
        </section>
        
        <section id="education" className="relative">
          <div className="absolute inset-0 bg-[var(--gradient-mirror)] opacity-15" />
          <Education />
        </section>
        
        <section id="experience" className="relative">
          <div className="absolute inset-0 bg-[var(--gradient-symmetric)] opacity-25" />
          <Experience />
        </section>
        
        <section id="projects" className="relative">
          <div className="absolute inset-0 bg-[var(--gradient-mirror)] opacity-20" />
          <Projects />
        </section>
        
        <section id="skills" className="relative">
          <div className="absolute inset-0 bg-[var(--gradient-symmetric)] opacity-30" />
          <Skills />
        </section>
        
        <section id="contact" className="relative">
          <div className="absolute inset-0 bg-[var(--gradient-mirror)] opacity-25" />
          <Contact />
        </section>
      </main>
      
      <footer className="py-8 text-center text-muted-foreground border-t border-border/50 glass-card">
        <p className="animate-fade-in-up">© 2024 Devraj Parmar. Built with passion and lots of coding ⚡</p>
      </footer>
    </div>
  );
};

export default Index;
