import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import MouseGlow from '@/components/MouseGlow';
const Index = () => {

  return (
    <div className="min-h-screen bg-background relative">
      <MouseGlow />
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] animated-bg opacity-10" />
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Glass Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about" className="py-20">
          <Profile />
        </section>
        
        <section id="education" className="py-20">
          <Education />
        </section>
        
        <section id="experience" className="py-20">
          <Experience />
        </section>
        
        <section id="projects" className="py-20">
          <Projects />
        </section>
        
        <section id="skills" className="py-20">
          <Skills />
        </section>
        
        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>
      
      {/* Simple Footer */}
      <footer className="py-8 text-center text-muted-foreground border-t border-border">
        <p>© 2024 Devraj Parmar. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
