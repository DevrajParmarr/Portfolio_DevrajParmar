import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react';
import { MotionSystem } from '@/utils/motionSystem';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionChange);
    
    // Add magnetic effect to nav
    if (navRef.current) {
      const cleanup = MotionSystem.addMagneticEffect(navRef.current, 0.1);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scroll', handleSectionChange);
        cleanup();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      {/* Glass Navigation Header */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'glass-ultra backdrop-blur-2xl border-b border-primary/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with 3D effect */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('home')}
                className="text-2xl font-bold gradient-text hover:scale-110 transition-all duration-300 tilt-3d"
              >
                DP
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`group relative px-4 py-2 rounded-lg transition-all duration-300 magnetic-effect ${
                        activeSection === item.id
                          ? 'text-primary bg-primary/10 shadow-neon'
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                      style={{ '--stagger-delay': index } as any}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      
                      {/* Animated underline */}
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                        activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                      
                      {/* Hover glow */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative glass-card hover:glass-ultra w-10 h-10 magnetic-effect"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 rotate-0 scale-100 transition-all duration-300" />
                ) : (
                  <Moon className="w-5 h-5 rotate-90 scale-100 transition-all duration-300" />
                )}
              </Button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  className="glass-card hover:glass-ultra w-10 h-10 magnetic-effect"
                >
                  {isOpen ? (
                    <X className="w-6 h-6 rotate-90 transition-all duration-300" />
                  ) : (
                    <Menu className="w-6 h-6 rotate-0 transition-all duration-300" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={menuRef}
          className={`md:hidden absolute top-full left-0 right-0 glass-ultra backdrop-blur-2xl border-b border-primary/20 transition-all duration-500 transform ${
            isOpen 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 magnetic-effect ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10 shadow-neon'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                  style={{ 
                    '--stagger-delay': index,
                    animationDelay: `${index * 100}ms`
                  } as any}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Mobile active indicator */}
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-3">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-3 h-3 rounded-full transition-all duration-300 magnetic-effect ${
                activeSection === item.id
                  ? 'bg-primary shadow-neon scale-125'
                  : 'bg-muted-foreground/30 hover:bg-primary/60 hover:scale-110'
              }`}
              title={item.label}
              style={{ '--stagger-delay': index } as any}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;