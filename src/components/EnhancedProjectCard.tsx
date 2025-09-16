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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={`
          group relative overflow-hidden cursor-pointer
          bg-card/95 backdrop-blur-sm border border-border/40
          transition-all duration-500 ease-out
          ${project.featured ? 'ring-1 ring-primary/20' : ''}
          hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2
          ${isHovered ? 'shadow-xl shadow-primary/15 ring-1 ring-primary/20 -translate-y-2' : ''}
        `}
      >
        {/* Subtle Background Gradient */}
        <div className={`absolute inset-0 transition-all duration-700 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Professional Border Glow */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${isHovered ? 'ring-1 ring-primary/20' : 'ring-0'}`} />

        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105 brightness-105' : 'scale-100 brightness-100'}`}
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
          <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent flex items-end justify-center pb-6 gap-3 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <Button
              size="sm"
              variant="secondary"
              className="shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              asChild
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>

            <Button
              size="sm"
              className="shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
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
          
          <CardTitle className={`text-xl font-bold transition-all duration-500 ${isHovered ? 'text-primary' : 'text-foreground'}`}>
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
            className={`w-full transition-all duration-500 ${isHovered ? 'bg-primary/10 text-primary shadow-sm' : 'hover:bg-primary/5 hover:text-primary'}`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            View Details
            <ArrowRight className={`w-4 h-4 ml-2 transition-all duration-500 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`} />
          </Button>
        </CardContent>

        {/* Subtle border highlight */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none ${isHovered ? 'ring-1 ring-primary/10' : 'ring-0'}`} />
      </Card>
    </div>
  );
};

export default EnhancedProjectCard;