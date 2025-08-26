import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Eye, Star, Zap, Calendar, Code, ArrowRight } from 'lucide-react';

interface OptimizedProjectCardProps {
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

const OptimizedProjectCard: React.FC<OptimizedProjectCardProps> = ({
  project,
  index,
  isVisible
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    
    // Apply 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * 8;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * -8;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(20px)
      scale3d(1.02, 1.02, 1.02)
    `;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
    }
  }, []);

  return (
    <Card
      ref={cardRef}
      className={`
        group relative overflow-hidden cursor-pointer
        bg-gradient-to-br from-card/50 via-card/80 to-card/50
        backdrop-blur-xl border border-border/50
        transition-all duration-700 ease-out transform-gpu
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${project.featured ? 'ring-1 ring-primary/20' : ''}
        hover:border-primary/30 hover:shadow-2xl
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${index * 100}ms`,
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    >
      {/* Dynamic Glow Effect */}
      <div
        ref={glowRef}
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--primary) / 0.15) 0%, 
            hsl(var(--accent) / 0.1) 30%, 
            transparent 70%)`
        }}
      />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient" />
      </div>

      {/* Image Section with Creative Hover */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        
        {/* Status Indicator */}
        <div className="absolute top-3 left-3">
          <Badge 
            className={`glass-card animate-slide-in-left ${
              project.status === 'Completed' 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' 
                : 'bg-amber-500/20 text-amber-400 border-amber-400/30'
            }`}
          >
            <Zap className="w-3 h-3 mr-1" />
            {project.status}
          </Badge>
        </div>
        
        {/* Year Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="glass-card animate-slide-in-right">
            <Calendar className="w-3 h-3 mr-1" />
            {project.year}
          </Badge>
        </div>
        
        {/* Featured Star */}
        {project.featured && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Star className="w-8 h-8 text-yellow-400 animate-pulse fill-current" />
          </div>
        )}
        
        {/* Interactive Overlay */}
        <div className={`
          absolute inset-0 bg-background/95 backdrop-blur-sm
          flex items-center justify-center gap-3
          transition-all duration-500 ease-out
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button 
            size="sm" 
            className="glass-card hover:glass-ultra animate-bounce-in transform-gpu"
            asChild
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
          
          <Button 
            size="sm" 
            variant="secondary" 
            className="glass-card hover:glass-ultra animate-bounce-in"
            style={{ animationDelay: '100ms' }}
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
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge className="glass-card text-xs">
            <Code className="w-3 h-3 mr-1" />
            {project.category}
          </Badge>
          {project.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 border-yellow-400/30">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech, techIndex) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="text-xs glass-card hover:glass-ultra transition-all duration-300 transform-gpu hover:scale-105"
              style={{ 
                animationDelay: `${techIndex * 50}ms`
              }}
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.tech.length - 4}
            </Badge>
          )}
        </div>

        {/* Action Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full group-hover:bg-primary/10 transition-all duration-300"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>

      {/* Enhanced Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    </Card>
  );
};

export default OptimizedProjectCard;