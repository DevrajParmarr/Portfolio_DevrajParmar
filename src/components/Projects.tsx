import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Play, Star, Eye, Calendar, Code2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import aiStudyAssistant from '@/assets/ai-study-assistant.jpg';
import campusEvents from '@/assets/campus-events.jpg';
import blockchainVoting from '@/assets/blockchain-voting.jpg';
import chatApp from '@/assets/chat-app.jpg';
import aslConverter from '@/assets/asl-converter-hero.jpg';
import studyCompanion from '@/assets/study-companion-hero.jpg';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects(prev => [...prev, index]);
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Route Optimizer',
      description: 'Full-stack web application solving the Heterogeneous Fleet Vehicle Routing Problem (HFVRP) for 5-100 destinations using 2-50 vehicles. Implements multiple routing algorithms with interactive map interface.',
      image: aiStudyAssistant,
      relatedImages: [aiStudyAssistant],
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Leaflet.js', 'OpenStreetMap API'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      status: 'Completed',
      year: '2025',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'MERN Stack Online Judge',
      description: 'Competitive programming platform with secure user authentication using JWT, custom compiler for multiple languages, and responsive frontend with problem listing and filtering.',
      image: campusEvents,
      relatedImages: [campusEvents],
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      status: 'In Progress',
      year: '2024',
      category: 'Backend'
    },
    {
      id: 3,
      title: 'Digital Labour Chowk',
      description: 'Platform connecting laborers and clients, facilitating real-time job opportunities. Features user registration, job posting, and application management with secure database handling.',
      image: blockchainVoting,
      relatedImages: [blockchainVoting],
      tech: ['PHP', 'SQL', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      status: 'Completed',
      year: '2024',
      category: 'Web Development'
    },
    {
      id: 4,
      title: 'American Sign Language Converter (Real-time)',
      description: 'AI/ML project converting ASL from live video to text in real time using OpenCV for hand detection and a CNN classifier. Includes confidence overlay and streaming pipeline.',
      image: aslConverter,
      relatedImages: [aslConverter],
      tech: ['Python', 'OpenCV', 'TensorFlow/Keras', 'CNN', 'Real-time Inference'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
      status: 'Completed',
      year: '2024',
      category: 'AI/ML'
    },
    {
      id: 5,
      title: 'CSE Study Companion',
      description: 'Upgraded tool for CSE students: tasks with focus timer (Pomodoro), daily quiz, gamification (XP/levels), and daily insights. Built with a sleek responsive UI.',
      image: studyCompanion,
      relatedImages: [studyCompanion],
      tech: ['React', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      status: 'Completed',
      year: '2024',
      category: 'Frontend'
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-bounce-in">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">My Work</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-reveal">
            <span>Featured</span> <span className="gradient-text animate-text-glow">Projects</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            A showcase of my technical skills and creative problem-solving through 
            various projects I've built during my computer science journey.
          </p>
          
          <div className="flex justify-center gap-4 mt-8 animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
            {['All', 'Full Stack', 'AI/ML', 'Frontend', 'Backend'].map((category, index) => (
              <Badge 
                key={category}
                className="glass-card hover-scale cursor-pointer transition-all duration-300"
                style={{ '--stagger-delay': index } as any}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className={`project-card glass-card group relative overflow-hidden tilt-on-hover ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              } ${visibleProjects.includes(index) ? 'animate-card-entry' : 'opacity-0'}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 0.15}s`,
                '--stagger-delay': index
              } as any}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                
                {/* Status badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className={`glass-card animate-bounce-in ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </Badge>
                </div>
                
                {/* Year badge */}
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="glass-card animate-bounce-in" style={{ animationDelay: '0.1s' }}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.year}
                  </Badge>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                {/* Overlay with action buttons */}
                <div className={`absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-500 ${
                  hoveredProject === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <Button size="sm" className="neon-glow btn-advanced animate-bounce-in" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" variant="secondary" className="glass-card btn-advanced animate-bounce-in" style={{ animationDelay: '0.1s' }} asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="glass-card animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="glass-card text-xs animate-slide-in-right">
                    {project.category}
                  </Badge>
                  {project.featured && (
                    <Badge className="neon-glow animate-glow">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardTitle className="text-xl group-hover:text-primary transition-all duration-300 animate-text-glow">
                  {project.title}
                </CardTitle>
                
                <CardDescription className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4 stagger-animation">
                  {project.tech.map((tech, techIndex) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="glass-card hover-scale animate-slide-up-fade"
                      style={{ '--stagger-delay': techIndex } as any}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Related images */}
                {project.relatedImages?.length ? (
                  <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-sm text-muted-foreground font-medium">Project Gallery</p>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {project.relatedImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative group flex-shrink-0 animate-slide-in-right"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <img
                            src={img}
                            alt={`${project.title} gallery ${idx + 1}`}
                            loading="lazy"
                            className="w-24 h-16 rounded-md object-cover hover-scale glass-card border border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>

              {/* Enhanced glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 animate-glow -z-10" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Want to see more?</p>
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-card border-primary/30 hover:border-primary btn-advanced group animate-bounce-in"
            >
              <Github className="w-4 h-4 mr-2 group-hover:animate-spin" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;