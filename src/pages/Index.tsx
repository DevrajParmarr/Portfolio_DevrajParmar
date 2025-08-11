import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      {/* Scroll to top button and footer can be added here */}
      <footer className="py-8 text-center text-muted-foreground border-t border-border/50">
        <p>© 2024 Devraj Parmar. Built with passion and lots of coding ⚡</p>
      </footer>
    </div>
  );
};

export default Index;
