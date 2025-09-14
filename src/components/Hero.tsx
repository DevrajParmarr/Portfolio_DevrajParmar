import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState, memo } from 'react';
import OptimizedParticleSystem from './OptimizedParticleSystem';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

const Hero = memo(() => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const { elementRef, isVisible } = useOptimizedAnimation({ threshold: 0.3 });
  const words = ['MERN Developer', 'Problem Solver', 'Competitive Programmer', 'Route Optimizer'];

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % words.length;
      const fullText = words[current];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

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
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section ref={elementRef} className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Optimized Background */}
      <OptimizedParticleSystem particleCount={25} speed={0.8} />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 animated-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-background/80" />
      
      {/* Optimized Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-2xl animate-float" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Welcome Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Available for opportunities</span>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight relative">
            <div className="flex flex-col items-center gap-2">
              <span className="relative">
                Hi, I'm
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="gradient-text relative">
                Devraj Parmar
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-shimmer" />
              </span>
            </div>
          </h1>
          
          {/* Dynamic Typing Text */}
          <div className="text-xl md:text-2xl mb-8 h-16 flex items-center justify-center">
            <span className="text-muted-foreground">A passionate </span>
            <span className="text-foreground ml-2 font-semibold min-w-[280px] text-left">
              {text}<span className="animate-pulse text-foreground/50">|</span>
            </span>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Final year <span className="text-foreground font-medium">Computer Engineering</span> student at{' '}
            <span className="text-foreground font-medium">SGSITS, Indore</span>.<br />
            <span className="text-sm">JEE AIR 40,236 • CodeChef 1680+ Rating • 450+ DSA Problems Solved</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 relative">
          <Button 
            size="lg" 
            className="group btn-hover shadow-lg relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0" 
            onClick={scrollToProjects}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
            <ArrowDown className="w-5 h-5 mr-2 group-hover:animate-bounce relative z-10" />
            <span className="relative z-10">Explore My Work</span>
          </Button>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-hover"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </Button>
            <Button variant="outline" size="lg" className="btn-hover">
              <Download className="w-5 h-5 mr-2" />
              Resume
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-4">
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:devraj@example.com", label: "Email" }
          ].map(({ icon: Icon, href, label }, index) => (
            <Button 
              key={index} 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:scale-110 transition-all duration-200"
              title={label}
              asChild
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="w-5 h-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;