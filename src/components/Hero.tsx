import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const words = ['MERN Developer', 'Problem Solver', 'Competitive Programmer', 'Route Optimizer'];
  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
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
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const createParticles = () => {
    return Array.from({
      length: 50
    }, (_, i) => <div key={i} className="particle" style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${8 + Math.random() * 4}s`
    }} />);
  };
  return <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Enhanced Particles */}
      <div className="particles">
        {createParticles()}
      </div>

      {/* Symmetric Dynamic Background */}
      <div className="absolute inset-0 transition-all duration-1000" style={{
      background: `
            radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.08), transparent 40%),
            radial-gradient(400px circle at ${window.innerWidth - mousePosition.x}px ${window.innerHeight - mousePosition.y}px, hsl(var(--accent) / 0.06), transparent 40%),
            var(--gradient-hero)
          `
    }} />

      {/* Symmetric Mirror Effect */}
      <div className="absolute inset-0 bg-[var(--gradient-symmetric)] opacity-30" />
      <div className="absolute inset-0 bg-[var(--gradient-mirror)] opacity-20" />
      
      {/* Symmetric Animated Elements */}
      <div className="absolute inset-0">
        {/* Left side elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float animate-morphing" />
        <div className="absolute bottom-1/3 left-1/6 w-48 h-48 bg-primary/15 rounded-full blur-2xl animate-pulse" style={{
        animationDelay: '3s'
      }} />
        
        {/* Right side mirror elements */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float animate-morphing" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute bottom-1/3 right-1/6 w-48 h-48 bg-accent/15 rounded-full blur-2xl animate-pulse" style={{
        animationDelay: '4s'
      }} />
        
        {/* Center elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-parallax" style={{
        animationDelay: '2s'
      }} />
      </div>

      {/* Symmetric Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side sparkles */}
        <Sparkles className="absolute top-1/4 left-1/6 w-8 h-8 text-primary/40 animate-float" style={{
        animationDelay: '1s'
      }} />
        <Sparkles className="absolute bottom-1/3 left-1/4 w-6 h-6 text-primary/30 animate-float" style={{
        animationDelay: '3s'
      }} />
        <Sparkles className="absolute top-2/3 left-1/3 w-5 h-5 text-primary/35 animate-float" style={{
        animationDelay: '5s'
      }} />
        
        {/* Right side mirror sparkles */}
        <Sparkles className="absolute top-1/4 right-1/6 w-8 h-8 text-accent/40 animate-float" style={{
        animationDelay: '2s'
      }} />
        <Sparkles className="absolute bottom-1/3 right-1/4 w-6 h-6 text-accent/30 animate-float" style={{
        animationDelay: '4s'
      }} />
        <Sparkles className="absolute top-2/3 right-1/3 w-5 h-5 text-accent/35 animate-float" style={{
        animationDelay: '6s'
      }} />
        
        {/* Center sparkles */}
        <Sparkles className="absolute top-1/6 left-1/2 transform -translate-x-1/2 w-4 h-4 text-primary/25 animate-float" style={{
        animationDelay: '7s'
      }} />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Symmetric Welcome Badge */}
          <div className="text-reveal mb-8">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass-card border border-primary/30 animate-bounce-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase animate-text-glow">
                Welcome to my Professional Portfolio</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          </div>
          
          {/* Symmetric Main Title */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-reveal leading-tight">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary animate-slide-in-right" />
                  <span style={{
                  animationDelay: '0.1s'
                }}>Hi,</span>{' '}
                  <span style={{
                  animationDelay: '0.2s'
                }}>I'm</span>
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent animate-slide-in-right" />
                </div>
                <span className="gradient-text animate-text-glow text-7xl md:text-9xl" style={{
                animationDelay: '0.3s'
              }}>
                  Devraj Parmar
                </span>
              </div>
            </h1>
            
            {/* Symmetric decorative elements around name */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 animate-fade-in-up" style={{
            animationDelay: '0.8s'
          }} />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-accent/30 animate-fade-in-up" style={{
            animationDelay: '0.9s'
          }} />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 animate-fade-in-up" style={{
            animationDelay: '1.0s'
          }} />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-accent/30 animate-fade-in-up" style={{
            animationDelay: '1.1s'
          }} />
          </div>
          
          <div className="text-2xl md:text-4xl mb-12 h-20 flex items-center justify-center animate-bounce-in" style={{
          animationDelay: '0.5s'
        }}>
            <span className="text-muted-foreground">A </span>
            <span className="text-primary ml-2 typing-cursor font-semibold min-w-[250px] text-left gradient-text">
              {text}
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in-right" style={{
          animationDelay: '0.7s'
        }}>
            UG IV Year <span className="text-primary font-medium">Computer Engineering</span> student at{' '}
            <span className="text-accent font-medium">SGSITS, Indore</span>.<br />
            JEE AIR 40,236 • CodeChef 1500+ Rating • 350+ DSA Problems Solved
          </p>
        </div>

        {/* Enhanced symmetric Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-bounce-in stagger-animation" style={{
        animationDelay: '0.9s'
      }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <Button size="lg" className="neon-glow btn-advanced group hover-scale animate-glow relative" onClick={scrollToProjects}>
              <ArrowDown className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              Explore My Portfolio
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </Button>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-accent/50" />
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary btn-advanced tilt-on-hover group">
              <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Contact Me
            </Button>
            <Button variant="ghost" size="lg" className="glass-card btn-advanced hover-scale group border border-accent/30 hover:border-accent">
              <Download className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              Resume
            </Button>
          </div>
        </div>

        {/* Symmetric Social Links */}
        <div className="flex justify-center items-center gap-8 animate-slide-up-fade stagger-animation mb-12" style={{
        animationDelay: '1.1s'
      }}>
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
          
          {[{
          icon: Github,
          href: "#",
          label: "GitHub",
          color: "text-primary"
        }, {
          icon: Linkedin,
          href: "#",
          label: "LinkedIn",
          color: "text-accent"
        }, {
          icon: Mail,
          href: "#",
          label: "Email",
          color: "text-primary"
        }].map(({
          icon: Icon,
          href,
          label,
          color
        }, index) => <Button key={index} variant="ghost" size="icon" className={`rounded-full hover-scale magnetic-effect glass-card border border-primary/20 hover:border-primary/50 group relative w-14 h-14 ${color}`} style={{
          '--stagger-delay': index
        } as any} title={label}>
              <Icon className="w-6 h-6 group-hover:scale-125 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Button>)}
          
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent/50" />
        </div>

        {/* Symmetric Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group" onClick={scrollToProjects}>
          
        </div>
      </div>
    </section>;
};
export default Hero;