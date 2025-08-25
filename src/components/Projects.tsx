import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2, Sparkles } from 'lucide-react';
import Advanced3DCard from './Advanced3DCard';
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
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-ultraFloat" />
        <div className="absolute bottom-1/4 left-1/6 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-liquidMotion" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 holographic rounded-lg opacity-20 animate-morphPulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <Badge className="glass-ultra mb-6 px-6 py-3 text-sm font-medium animate-bounceIn">
            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
            Featured Work
          </Badge>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 animate-textReveal">
            <span className="gradient-text">Revolutionary</span>{' '}
            <span 
              className="holographic inline-block"
              style={{
                background: 'var(--gradient-holographic)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Projects
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            A showcase of my technical expertise and creative problem-solving through
            <span className="text-primary font-semibold"> innovative projects</span> that push the boundaries of web development.
          </p>
          
          <div className="flex justify-center flex-wrap gap-4 mt-10 animate-slideUpStagger" style={{ animationDelay: '500ms' }}>
            {['All', 'Full Stack', 'AI/ML', 'Frontend', 'Backend'].map((category, index) => (
              <Badge 
                key={category}
                className="glass-depth hover:glass-ultra cursor-pointer transition-all duration-300 px-4 py-2 hover:scale-105 magnetic-btn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Revolutionary 3D Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <Advanced3DCard
              key={project.id}
              project={project}
              index={index}
              isVisible={visibleProjects.includes(index)}
              onHover={setHoveredProject}
              isHovered={hoveredProject === project.id}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-slideInUp" style={{ animationDelay: '800ms' }}>
          <div className="glass-ultra p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Explore More?</h3>
            <p className="text-muted-foreground mb-6">
              Discover the complete collection of my projects and contributions on GitHub.
            </p>
            <Button 
              size="lg" 
              className="advanced-btn neon-glow magnetic-btn px-8 py-4 text-lg font-semibold group"
            >
              <Github className="w-5 h-5 mr-3 group-hover:animate-spin" />
              View All Projects
              <ExternalLink className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;