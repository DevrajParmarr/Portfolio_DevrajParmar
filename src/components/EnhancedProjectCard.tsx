import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, Calendar, Code, ArrowRight, Zap, Sparkles } from 'lucide-react';

interface EnhancedProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    github: string;
    demo: string;
    featured: boolean;
    status: string;
    year: string;
    category: string;
  };
  index: number;
  isVisible: boolean;
}

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({
  project,
  index,
  isVisible
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Magnetic effect - stronger pull when close to center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    setMousePosition({ x, y });
    setMagneticOffset({ 
      x: deltaX * 8, // Magnetic strength
      y: deltaY * 8 
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  const dynamicTransform = {
    transform: isHovered 
      ? `perspective(1200px) rotateX(${((mousePosition.y - 50) / 50) * -8}deg) rotateY(${((mousePosition.x - 50) / 50) * 8}deg) translateZ(20px) scale(1.02) translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0)` 
      : `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1) translate3d(0px, 0px, 0)`,
    transition: isHovered 
      ? 'transform 0.2s cubic-bezier(0.23, 1, 0.320, 1)' 
      : 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)'
  };

  // Entrance animation with stagger
  useEffect(() => {
    if (isVisible && cardRef.current) {
      const card = cardRef.current;
      card.style.animation = `slideInUp 0.8s cubic-bezier(0.23, 1, 0.320, 1) ${index * 150}ms both`;
    }
  }, [isVisible, index]);

  return (
    <div 
      ref={cardRef}
      className="project-card-enhanced relative transform-gpu will-change-transform"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={`
          group relative overflow-hidden cursor-pointer
          bg-card/95 backdrop-blur-sm border border-border/40
          transition-all duration-300 ease-out
          ${project.featured ? 'ring-1 ring-primary/20' : ''}
          hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20
          ${isHovered ? 'shadow-2xl shadow-primary/30 ring-2 ring-primary/30' : ''}
        `}
        style={dynamicTransform}
      >
        {/* Dynamic Background Gradient */}
        <div className={`absolute inset-0 transition-all duration-500 bg-gradient-to-br from-primary/5 via-accent/3 to-secondary/5 ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`} />

        {/* Enhanced Cursor-Following Glow */}
        <div
          ref={glowRef}
          className={`absolute inset-0 pointer-events-none transition-all duration-200 rounded-lg ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, 
              hsl(var(--primary) / ${isHovered ? 0.15 : 0.05}) 0%, 
              hsl(var(--primary) / 0.05) 40%,
              transparent 70%)`,
            transform: `scale(${isHovered ? 1.1 : 1})`,
          }}
        />

        {/* Dynamic Shimmer with Multiple Layers */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-all duration-1000 ${isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-70'}`} />
        
        {/* Floating Particles Effect */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>

        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-100'}`}
            loading="lazy"
          />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              className={`backdrop-blur-sm border-0 shadow-sm ${
                project.status === 'Completed' 
                  ? 'bg-emerald-500/80 text-white' 
                  : 'bg-amber-500/80 text-white'
              }`}
            >
              <Zap className="w-3 h-3 mr-1" />
              {project.status}
            </Badge>
          </div>
          
          {/* Year Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="backdrop-blur-sm bg-background/80 border-border/30 shadow-sm">
              <Calendar className="w-3 h-3 mr-1" />
              {project.year}
            </Badge>
          </div>
          
          {/* Featured Indicator */}
          {project.featured && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Star className="w-8 h-8 text-yellow-400 fill-current opacity-80" />
            </div>
          )}
          
          {/* Interactive Overlay with Enhanced Animations */}
          <div className={`absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent flex items-end justify-center pb-6 gap-3 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button 
              size="sm" 
              variant="secondary"
              className={`shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isHovered ? 'animate-slideInUp' : ''}`}
              style={{ animationDelay: '100ms' }}
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
            
            <Button 
              size="sm" 
              className={`shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isHovered ? 'animate-slideInUp' : ''}`}
              style={{ animationDelay: '200ms' }}
              asChild
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-xs border-primary/40 bg-primary/10 font-medium">
              <Code className="w-3 h-3 mr-1" />
              {project.category}
            </Badge>
            {project.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-600 dark:text-yellow-300 border-yellow-400/40 text-xs shadow-lg">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
          </div>
          
          <CardTitle className={`text-xl font-bold transition-all duration-300 ${isHovered ? 'text-primary scale-105' : 'text-foreground scale-100'}`}>
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 pb-6">
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 4).map((tech, techIndex) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="text-xs bg-secondary/60 hover:bg-secondary transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline" className="text-xs hover:bg-primary/5 transition-colors">
                +{project.tech.length - 4} more
              </Badge>
            )}
          </div>

          {/* Enhanced Action Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={`w-full transition-all duration-300 ${isHovered ? 'bg-primary/10 text-primary scale-105 shadow-md' : 'hover:bg-primary/5 hover:text-primary'}`}
          >
            <Sparkles className={`w-4 h-4 mr-2 transition-all duration-300 ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`} />
            View Details
            <ArrowRight className={`w-4 h-4 ml-2 transition-all duration-300 ${isHovered ? 'translate-x-2 scale-110' : 'translate-x-0 scale-100'}`} />
          </Button>
        </CardContent>

        {/* Dynamic border highlight with pulse effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-lg transition-all duration-500 -z-10 ${isHovered ? 'opacity-100 scale-105 animate-pulse' : 'opacity-0 scale-100'}`} />
      </Card>
    </div>
  );
};

export default EnhancedProjectCard;