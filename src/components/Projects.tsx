import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Play } from 'lucide-react';
import { useState } from 'react';
import aiStudyAssistant from '@/assets/ai-study-assistant.jpg';
import campusEvents from '@/assets/campus-events.jpg';
import blockchainVoting from '@/assets/blockchain-voting.jpg';
import chatApp from '@/assets/chat-app.jpg';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Study Assistant',
      description: 'A machine learning application that helps students organize study materials and generates personalized quizzes using natural language processing.',
      image: aiStudyAssistant,
      tech: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
    },
    {
      id: 2,
      title: 'Campus Event Manager',
      description: 'Full-stack web application for managing university events with real-time notifications and interactive calendar features.',
      image: campusEvents,
      tech: ['React', 'Firebase', 'Material-UI', 'TypeScript'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
    },
    {
      id: 3,
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting system built on Ethereum blockchain with smart contracts and web3 integration.',
      image: blockchainVoting,
      tech: ['Solidity', 'Web3.js', 'React', 'Truffle', 'MetaMask'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true,
    },
    {
      id: 4,
      title: 'Real-time Chat App',
      description: 'Modern chat application with real-time messaging, file sharing, and video call functionality.',
      image: chatApp,
      tech: ['Socket.io', 'Express', 'React', 'WebRTC', 'Redis'],
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
              className={`project-card glass-card group relative overflow-hidden ${
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Overlay with action buttons */}
                <div className={`absolute inset-0 bg-background/90 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button size="sm" className="neon-glow">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" variant="secondary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
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