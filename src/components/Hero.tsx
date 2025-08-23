import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['MERN Developer', 'Problem Solver', 'Competitive Programmer', 'Route Optimizer'];

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const createParticles = () => {
    return Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }}
      />
    ));
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Particles */}
      <div className="particles">
        {createParticles()}
      </div>

      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-primary/5 transition-all duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.05), transparent 40%)`
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float animate-morphing" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float animate-parallax" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-1/4 right-1/3 w-8 h-8 text-primary/30 animate-float" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute bottom-1/3 left-1/4 w-6 h-6 text-accent/40 animate-float" style={{ animationDelay: '3s' }} />
        <Sparkles className="absolute top-1/3 left-1/2 w-4 h-4 text-primary/25 animate-float" style={{ animationDelay: '5s' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-reveal mb-4">
            <span className="text-sm text-primary font-medium tracking-wider uppercase animate-text-glow">
              Welcome to my digital world
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-reveal">
            <span style={{ animationDelay: '0.1s' }}>Hi,</span>{' '}
            <span style={{ animationDelay: '0.2s' }}>I'm</span>{' '}
            <span className="gradient-text animate-text-glow" style={{ animationDelay: '0.3s' }}>
              Devraj Parmar
            </span>
          </h1>
          
          <div className="text-2xl md:text-4xl mb-8 h-16 flex items-center justify-center animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            <span className="text-muted-foreground">A </span>
            <span className="text-primary ml-2 typing-cursor font-semibold min-w-[250px] text-left gradient-text">
              {text}
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
            UG IV Year <span className="text-primary font-medium">Computer Engineering</span> student at{' '}
            <span className="text-accent font-medium">SGSITS, Indore</span>.<br />
            JEE AIR 40,236 • CodeChef 1500+ Rating • 350+ DSA Problems Solved
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-bounce-in stagger-animation" style={{ animationDelay: '0.9s' }}>
          <Button 
            size="lg" 
            className="neon-glow btn-advanced group hover-scale animate-glow"
            onClick={scrollToProjects}
          >
            <ArrowDown className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="glass-card border-primary/30 hover:border-primary btn-advanced tilt-on-hover"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Button>
          <Button 
            variant="ghost"
            size="lg" 
            className="glass-card btn-advanced hover-scale"
          >
            <Download className="w-4 h-4 mr-2" />
            Resume
          </Button>
        </div>

        <div className="flex justify-center gap-6 animate-slide-up-fade stagger-animation" style={{ animationDelay: '1.1s' }}>
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#", label: "Email" }
          ].map(({ icon: Icon, href, label }, index) => (
            <Button 
              key={index}
              variant="ghost" 
              size="icon" 
              className="rounded-full hover-scale magnetic-effect glass-card border border-primary/20 hover:border-primary/50 group"
              style={{ '--stagger-delay': index } as any}
              title={label}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
          ))}
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToProjects}>
          <div className="flex flex-col items-center gap-2 group">
            <span className="text-xs text-muted-foreground tracking-wider uppercase group-hover:text-primary transition-colors">
              Explore
            </span>
            <div className="relative">
              <ArrowDown className="w-6 h-6 text-primary animate-pulse group-hover:translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;