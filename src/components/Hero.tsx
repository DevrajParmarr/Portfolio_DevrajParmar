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
  return <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Welcome Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-primary font-medium">Welcome to my Portfolio</span>
            </div>
          </div>
          
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <div className="flex flex-col items-center gap-2">
                <div>Hi, I'm</div>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Devraj Parmar
                </span>
              </div>
            </h1>
          </div>
          
          <div className="text-xl md:text-2xl mb-12 h-16 flex items-center justify-center">
            <span className="text-muted-foreground">A </span>
            <span className="text-primary ml-2 font-semibold min-w-[250px] text-left">
              {text}<span className="animate-pulse">|</span>
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            UG IV Year <span className="text-primary font-medium">Computer Engineering</span> student at{' '}
            <span className="text-accent font-medium">SGSITS, Indore</span>.<br />
            JEE AIR 40,236 • CodeChef 1500+ Rating • 350+ DSA Problems Solved
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="group" onClick={scrollToProjects}>
            <ArrowDown className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Explore My Portfolio
          </Button>
          
          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="group">
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
            <Button variant="ghost" size="lg" className="group">
              <Download className="w-5 h-5 mr-2" />
              Resume
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#", label: "Email" }
          ].map(({ icon: Icon, href, label }, index) => (
            <Button key={index} variant="ghost" size="icon" className="rounded-full hover:scale-105 transition-transform" title={label}>
              <Icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>
    </section>;
};
export default Hero;