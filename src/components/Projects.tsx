import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2, Sparkles } from 'lucide-react';
import EnhancedProjectCard from './EnhancedProjectCard';
import aiStudyAssistant from '@/assets/ai-study-assistant.jpg';
import campusEvents from '@/assets/campus-events.jpg';
import blockchainVoting from '@/assets/blockchain-voting.jpg';
import chatApp from '@/assets/chat-app.jpg';
import aslConverter from '@/assets/asl-converter-hero.jpg';
import studyCompanion from '@/assets/study-companion-hero.jpg';

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
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
      title: 'American Sign Language Converter',
      description: 'AI/ML project converting ASL from live video to text in real time using OpenCV for hand detection and a CNN classifier. Includes confidence overlay and streaming pipeline.',
      image: aslConverter,
      tech: ['Python', 'OpenCV', 'TensorFlow/Keras', 'CNN'],
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
      tech: ['React', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
      status: 'Completed',
      year: '2024',
      category: 'Frontend'
    },
  ];

  const categories = ['All', 'Full Stack', 'AI/ML', 'Frontend', 'Backend', 'Web Development'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Featured Work
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">My Projects</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my technical expertise through innovative projects that solve real-world problems.
          </p>
          
          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
            >
              <EnhancedProjectCard
                project={project}
                index={index}
                isVisible={visibleProjects.includes(index)}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Want to See More?</h3>
            <p className="text-muted-foreground mb-6">
              Explore my complete collection of projects and contributions on GitHub.
            </p>
            <Button size="lg" className="group">
              <Github className="w-5 h-5 mr-3" />
              View All Projects
              <ExternalLink className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;