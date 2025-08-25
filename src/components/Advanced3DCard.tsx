import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Eye, Star, Zap } from 'lucide-react';
import { AdvancedMotionEngine } from '@/utils/advancedMotion';

interface Advanced3DCardProps {
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
  onHover: (id: number | null) => void;
  isHovered: boolean;
}

const Advanced3DCard: React.FC<Advanced3DCardProps> = ({
  project,
  index,
  isVisible,
  onHover,
  isHovered
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current) return;

    const cleanup = AdvancedMotionEngine.add3DTiltEffect(cardRef.current, 12);
    const magneticCleanup = AdvancedMotionEngine.add3DMagneticEffect(cardRef.current, 0.15);
    
    // Enhanced particle effect on hover
    if (isHovered) {
      const particleContainer = cardRef.current.querySelector('.particle-container');
      if (particleContainer) {
        const engine = new AdvancedMotionEngine();
        engine.createParticleSystem(particleContainer as HTMLElement, 20);
      }
    }

    return () => {
      cleanup();
      magneticCleanup();
    };
  }, [isHovered]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsLoaded(true), index * 100);
    }
  }, [isVisible, index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  };

  return (
    <Card
      ref={cardRef}
      className={`
        advanced-3d-card glass-ultra group relative overflow-hidden cursor-pointer
        transform-gpu transition-all duration-700 ease-out
        ${isLoaded ? 'animate-morphIn' : 'opacity-0 scale-95'}
        ${isHovered ? 'z-20 scale-105' : 'z-10'}
        ${project.featured ? 'border-2 border-primary/30' : ''}
      `}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={handleMouseMove}
      style={{
        animationDelay: `${index * 150}ms`,
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    >
      {/* Holographic Background Layer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--neon-cyan) / 0.1) 0%, 
            hsl(var(--neon-purple) / 0.05) 50%, 
            transparent 100%)`
        }}
      />
      
      {/* Particle Container */}
      <div className="particle-container absolute inset-0 pointer-events-none" />
      
      {/* Aurora Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-purple-500/10 animate-aurora" />
      </div>

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-30">
          <Badge 
            className={`glass-depth animate-slideInLeft ${
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
        <div className="absolute top-4 right-4 z-30">
          <Badge className="glass-depth animate-slideInRight">
            {project.year}
          </Badge>
        </div>
        
        {/* Featured Star */}
        {project.featured && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <Star className="w-8 h-8 text-yellow-400 animate-pulse" fill="currentColor" />
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
        
        {/* Interactive Overlay */}
        <div className={`
          absolute inset-0 bg-background/96 backdrop-blur-sm
          flex items-center justify-center gap-4
          transition-all duration-500 ease-out
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button 
            size="sm" 
            className="advanced-btn neon-glow animate-bounceIn transform-gpu"
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
            className="advanced-btn glass-ultra animate-bounceIn"
            style={{ animationDelay: '100ms' }}
            asChild
          >
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo
            </a>
          </Button>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="advanced-btn glass-depth animate-bounceIn"
            style={{ animationDelay: '200ms' }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <Badge className="glass-depth text-xs animate-slideInLeft">
            {project.category}
          </Badge>
          {project.featured && (
            <Badge className="holographic animate-shimmer">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 animate-textReveal">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <p className="text-muted-foreground mb-4 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="glass-card hover:glass-ultra transition-all duration-300 animate-slideInRight transform-gpu hover:scale-105"
              style={{ 
                animationDelay: `${techIndex * 50}ms`,
                '--tech-index': techIndex 
              } as React.CSSProperties}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* Enhanced Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/10 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
      
      {/* Shimmer Animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
    </Card>
  );
};

export default Advanced3DCard;