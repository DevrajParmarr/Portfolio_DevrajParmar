import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, Download, Sparkles, Zap, Code2 } from 'lucide-react';
import { AdvancedMotionEngine } from '@/utils/advancedMotion';

const RevolutionaryHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const particleEngineRef = useRef<AdvancedMotionEngine | null>(null);

  const taglines = [
    "Crafting Digital Experiences",
    "Building Tomorrow's Web",
    "Code. Create. Innovate.",
    "Full-Stack Excellence"
  ];

  // Initialize advanced effects
  useEffect(() => {
    setIsLoaded(true);
    
    if (heroRef.current) {
      // Create particle system
      particleEngineRef.current = new AdvancedMotionEngine();
      particleEngineRef.current.createParticleSystem(heroRef.current, 80);
      
      // Add magnetic effects to interactive elements
      const buttons = heroRef.current.querySelectorAll('.magnetic-btn');
      buttons.forEach(btn => {
        AdvancedMotionEngine.add3DMagneticEffect(btn as HTMLElement, 0.2);
      });
    }

    return () => {
      if (particleEngineRef.current) {
        particleEngineRef.current.destroy();
      }
    };
  }, []);

  // Mouse tracking for advanced backgrounds
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Advanced typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--primary) / 0.15) 0%, 
            hsl(var(--accent) / 0.1) 40%, 
            transparent 70%),
          radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, 
            hsl(var(--neon-purple) / 0.1) 0%, 
            transparent 50%),
          linear-gradient(135deg, 
            hsl(var(--background)) 0%, 
            hsl(var(--background) / 0.95) 100%)
        `
      }}
    >
      {/* Ultra Advanced Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-ultraFloat" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-ultraFloat" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-ultraFloat" style={{ animationDelay: '4s' }} />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />
        
        {/* Holographic Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 holographic rounded-lg opacity-20 animate-morphPulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 holographic rounded-full opacity-30 animate-liquidMotion" />
      </div>
      
      {/* Main Content */}
      <div className={`relative z-20 text-center max-w-5xl mx-auto transition-all duration-1000 ${isLoaded ? 'animate-heroEntry' : 'opacity-0 translate-y-10'}`}>
        {/* Welcome Badge */}
        <Badge 
          className="glass-ultra mb-8 px-6 py-3 text-sm font-medium animate-bounceIn magnetic-btn"
          style={{ animationDelay: '300ms' }}
        >
          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
          Welcome to My Digital Universe
        </Badge>
        
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="block animate-textReveal" style={{ animationDelay: '500ms' }}>
            Hi, I'm{' '}
            <span 
              className="gradient-text relative inline-block"
              style={{
                background: `linear-gradient(45deg, 
                  hsl(var(--primary)), 
                  hsl(var(--accent)), 
                  hsl(var(--neon-purple))
                )`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'holographicShift 3s ease-in-out infinite'
              }}
            >
              Deep Patel
            </span>
          </span>
        </h1>
        
        {/* Dynamic Tagline */}
        <div className="h-20 mb-8 flex items-center justify-center">
          <h2 
            className={`text-2xl md:text-4xl font-bold text-muted-foreground transition-all duration-500 ${
              isTyping ? 'animate-typeWriter' : 'opacity-50'
            }`}
          >
            {taglines[currentTagline]}
            <span className="animate-pulse">|</span>
          </h2>
        </div>
        
        {/* Bio */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fadeInUp"
          style={{ animationDelay: '800ms' }}
        >
          Final-year Computer Engineering student passionate about creating 
          <span className="text-primary font-semibold"> cutting-edge web experiences</span> and 
          <span className="text-accent font-semibold"> innovative AI solutions</span>. 
          Let's build the future together.
        </p>
        
        {/* Action Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-slideUpStagger"
          style={{ animationDelay: '1000ms' }}
        >
          <Button 
            size="lg" 
            className="advanced-btn neon-glow magnetic-btn px-8 py-6 text-lg font-semibold group"
            onClick={scrollToProjects}
          >
            <Code2 className="w-5 h-5 mr-3 group-hover:animate-spin" />
            Explore My Work
            <Zap className="w-5 h-5 ml-3 group-hover:animate-pulse" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="glass-ultra border-primary/30 hover:border-primary magnetic-btn px-8 py-6 text-lg font-semibold group"
          >
            <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" />
            Download Resume
          </Button>
        </div>
        
        {/* Social Links */}
        <div 
          className="flex items-center justify-center gap-8 animate-slideInUp"
          style={{ animationDelay: '1200ms' }}
        >
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
          ].map(({ icon: Icon, href, label }, index) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link glass-depth p-4 rounded-full hover:glass-ultra transition-all duration-300 magnetic-btn group"
              style={{ animationDelay: `${1300 + index * 100}ms` }}
            >
              <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ animationDelay: '1500ms' }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
      
      {/* Floating Action Buttons */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
        {['projects', 'skills', 'experience', 'contact'].map((section, index) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
            className="nav-dot glass-depth w-4 h-4 rounded-full hover:w-6 hover:h-6 transition-all duration-300 magnetic-btn"
            title={section.charAt(0).toUpperCase() + section.slice(1)}
            style={{ animationDelay: `${1600 + index * 100}ms` }}
          />
        ))}
      </div>
    </section>
  );
};

export default RevolutionaryHero;