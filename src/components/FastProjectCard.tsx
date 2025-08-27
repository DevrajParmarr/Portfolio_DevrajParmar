import React, { useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, Calendar, Code, ArrowRight } from 'lucide-react';

interface FastProjectCardProps {
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

const FastProjectCard: React.FC<FastProjectCardProps> = ({
  project,
  index,
  isVisible
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  }, []);

  return (
    <Card
      ref={cardRef}
      className={`
        group relative overflow-hidden cursor-pointer
        bg-card/50 backdrop-blur-sm border border-border/50
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${project.featured ? 'ring-1 ring-primary/20' : ''}
        hover:border-primary/40 hover:shadow-lg hover:-translate-y-1
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      {/* Cursor-Following Glow */}
      <div
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-200 rounded-lg
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: `radial-gradient(circle 120px at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--primary) / 0.1) 0%, 
            transparent 60%)`
        }}
      />

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            className={`backdrop-blur-sm ${
              project.status === 'Completed' 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
            }`}
          >
            {project.status}
          </Badge>
        </div>
        
        {/* Year Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="backdrop-blur-sm bg-card/80 border-border/50">
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
        
        {/* Quick Actions Overlay */}
        <div className={`
          absolute inset-0 bg-background/90 backdrop-blur-sm
          flex items-center justify-center gap-3
          transition-all duration-300 ease-out
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button 
            size="sm" 
            variant="secondary"
            className="backdrop-blur-sm bg-card/80 hover:bg-primary/20"
            asChild
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
          
          <Button 
            size="sm" 
            className="backdrop-blur-sm"
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
          <Badge variant="outline" className="text-xs border-primary/30">
            <Code className="w-3 h-3 mr-1" />
            {project.category}
          </Badge>
          {project.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-300 border-yellow-400/30 text-xs">
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
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="text-xs backdrop-blur-sm bg-secondary/50 hover:bg-secondary/80 transition-colors duration-200"
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

        {/* View Details Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full group-hover:bg-primary/10 transition-colors duration-300"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardContent>

      {/* Subtle border glow on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
    </Card>
  );
};

export default FastProjectCard;