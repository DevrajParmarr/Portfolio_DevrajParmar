import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['MERN Developer', 'Problem Solver', 'Competitive Programmer', 'Route Optimizer'];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Welcome Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Available for opportunities</span>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <div className="flex flex-col items-center gap-2">
              <span>Hi, I'm</span>
              <span className="gradient-text">Devraj Parmar</span>
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="group btn-hover shadow-lg" 
            onClick={scrollToProjects}
          >
            <ArrowDown className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Explore My Work
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
};

export default Hero;