import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, Calendar, Code, ArrowRight, Zap } from 'lucide-react';

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Calculate tilt
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    
    setMousePosition({ x, y });
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    });
  }, []);

  useEffect(() => {
    if (isHovered && cardRef.current) {
      // Add particle burst effect
      cardRef.current.classList.add('particle-burst');
      const timer = setTimeout(() => {
        cardRef.current?.classList.remove('particle-burst');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  return (
    <div className="project-card-3d">
      <Card
        ref={cardRef}
        className={`
          project-card-inner glow-effect magnetic-card
          group relative overflow-hidden cursor-pointer
          bg-card/80 backdrop-blur-lg border border-border/50
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          ${project.featured ? 'ring-2 ring-primary/30 shadow-2xl shadow-primary/20' : ''}
          hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/25
        `}
        style={{
          transitionDelay: `${index * 100}ms`,
          ...tiltStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated Background Gradient */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
            bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10
          `}
        />

        {/* Cursor-Following Glow */}
        <div
          className={`
            absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-lg
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, 
              hsl(var(--primary) / 0.15) 0%, 
              hsl(var(--accent) / 0.05) 50%,
              transparent 80%)`
          }}
        />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />
          
          {/* Floating Status Badge */}
          <div className="absolute top-4 left-4 animate-float">
            <Badge 
              className={`backdrop-blur-md border-0 shadow-lg ${
                project.status === 'Completed' 
                  ? 'bg-emerald-500/90 text-white shadow-emerald-500/50' 
                  : 'bg-amber-500/90 text-white shadow-amber-500/50'
              }`}
            >
              <Zap className="w-3 h-3 mr-1" />
              {project.status}
            </Badge>
          </div>
          
          {/* Year Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="backdrop-blur-md bg-background/90 border-border/50 shadow-lg">
              <Calendar className="w-3 h-3 mr-1" />
              {project.year}
            </Badge>
          </div>
          
          {/* Featured Indicator */}
          {project.featured && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative animate-pulse-glow">
                <Star className="w-12 h-12 text-yellow-400 fill-current filter drop-shadow-lg" />
                <div className="absolute inset-0 animate-ping">
                  <Star className="w-12 h-12 text-yellow-400/50 fill-current" />
                </div>
              </div>
            </div>
          )}
          
          {/* Interactive Overlay */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent
            flex items-end justify-center pb-6 gap-3
            transition-all duration-300 ease-out
            ${isHovered ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'}
          `}>
            <Button 
              size="sm" 
              variant="secondary"
              className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
            
            <Button 
              size="sm" 
              className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              asChild
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
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
          
          <CardTitle className="text-xl font-bold group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
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
                className="text-xs backdrop-blur-sm bg-secondary/70 hover:bg-secondary transition-all duration-200 hover:scale-105 shadow-sm"
                style={{ animationDelay: `${techIndex * 100}ms` }}
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                +{project.tech.length - 4} more
              </Badge>
            )}
          </div>

          {/* Action Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 font-medium"
          >
            Explore Project
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </CardContent>

        {/* Enhanced border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      </Card>
    </div>
  );
};

export default EnhancedProjectCard;