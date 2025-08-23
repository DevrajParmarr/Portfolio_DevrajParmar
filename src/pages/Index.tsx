import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
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
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about" className="py-12">
          <Profile />
        </section>
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-muted-foreground border-t border-border/50 glass-card">
        <p className="animate-fade-in-up">© 2024 Devraj Parmar. Built with passion and lots of coding ⚡</p>
      </footer>
    </div>
  );
};

export default Index;
