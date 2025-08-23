import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Play } from 'lucide-react';
import { useState } from 'react';
import aiStudyAssistant from '@/assets/ai-study-assistant.jpg';
import campusEvents from '@/assets/campus-events.jpg';
import blockchainVoting from '@/assets/blockchain-voting.jpg';
import chatApp from '@/assets/chat-app.jpg';
import aslConverter from '@/assets/asl-converter-hero.jpg';
import studyCompanion from '@/assets/study-companion-hero.jpg';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical skills and creative problem-solving through 
            various projects I've built during my computer science journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`project-card glass-card group relative overflow-hidden animate-fade-in-up hover-scale ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Overlay with action buttons */}
                <div className={`absolute inset-0 bg-background/90 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button size="sm" className="neon-glow" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" variant="secondary" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  {project.featured && (
                    <Badge className="neon-glow">Featured</Badge>
                  )}
                </div>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="glass-card">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Related images */}
                {project.relatedImages?.length ? (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">Related images</p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {project.relatedImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${project.title} related ${idx + 1}`}
                          loading="lazy"
                          className="w-24 h-16 rounded-md object-cover hover-scale"
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </CardContent>

              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary">
            <Github className="w-4 h-4 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;