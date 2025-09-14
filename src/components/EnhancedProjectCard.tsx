import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star, Calendar, Code, ArrowRight, Zap } from 'lucide-react';
import { useMouseTracker, useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

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

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = memo(({
  project,
  index,
  isVisible
}) => {
  const { elementRef: mouseRef, position: mousePosition } = useMouseTracker();
  const { elementRef: animationRef, isVisible: cardVisible } = useOptimizedAnimation({ 
    delay: index * 100,
    threshold: 0.1 
  });

  // Simplified mouse tracking with performance optimization
  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${((mousePosition.y - 50) / 50) * -4}deg) rotateY(${((mousePosition.x - 50) / 50) * 4}deg)`,
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  return (
    <div 
      ref={(el) => {
        if (mouseRef) mouseRef.current = el as HTMLElement;
        if (animationRef) animationRef.current = el as HTMLElement;
      }}
      className="project-card-enhanced gpu-accelerated"
    >
      <Card
        className={`
          group relative overflow-hidden cursor-pointer
          bg-card/95 backdrop-blur-sm border border-border/40
          transition-all duration-300 ease-out
          ${cardVisible ? 'fade-up-optimized' : 'opacity-0'}
          ${project.featured ? 'ring-1 ring-primary/20 shadow-lg shadow-primary/10' : ''}
          hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10
        `}
        style={{
          ...tiltStyle,
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Subtle Background Gradient */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-gradient-to-br from-primary/5 via-accent/3 to-secondary/5
          `}
        />

        {/* Cursor-Following Subtle Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-lg opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 120px at ${mousePosition.x}% ${mousePosition.y}%, 
              hsl(var(--primary) / 0.08) 0%, 
              transparent 70%)`
          }}
        />

        {/* Subtle Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />

        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
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
          
          {/* Interactive Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent flex items-end justify-center pb-6 gap-3 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100">
            <Button 
              size="sm" 
              variant="secondary"
              className="shadow-sm hover:shadow-md transition-all duration-200"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
            
            <Button 
              size="sm" 
              className="shadow-sm hover:shadow-md transition-all duration-200"
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
          
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
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

          {/* Action Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </CardContent>

        {/* Subtle border highlight */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </Card>
    </div>
  );
});

EnhancedProjectCard.displayName = 'EnhancedProjectCard';

export default EnhancedProjectCard;