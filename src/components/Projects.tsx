import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import routeOptimizer from '@/assets/route-optimizer.png';
import labourChowk from '@/assets/labour-chowk.png';
import onlineJudge from '@/assets/online-judge.png';
import missionControl from '@/assets/mission-control.png';
import aslConverter from '@/assets/asl-converter-hero.png';
import excelMerger from '@/assets/excel-merger.png';
import ecommerce from '@/assets/ecommerce.png';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Route Optimizer',
      description:
        'A logistics-focused platform that designs the most optimized delivery routes based on constraints like fleet size, capacity, and distance. Visualizes real-world routes on an interactive map with advanced routing algorithms.',
      image: routeOptimizer,
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Leaflet.js', 'OpenStreetMap API'],
      github: 'https://github.com/DevrajParmarr/Major_Project_CSE',
      demo: 'https://complexrouteoptimizer.netlify.app/',
      featured: true,
    },
    {
      id: 2,
      title: 'Digital Labour Chowk',
      description:
        'A job-matching platform that connects semi-skilled laborers with clients. Users can post jobs, browse opportunities, and connect securely, enabling easy access to real-time employment options.',
      image: labourChowk,
      tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/DevrajParmarr/D_Labour_Chowk',
      demo: '',
      featured: false,
    },
    {
      id: 3,
      title: 'Judge Ur Code with AI Review',
      description:
        'A coding practice platform inspired by LeetCode. Supports C++ problem-solving, test case execution, and AI-powered feedback to improve code quality and enhance problem-solving skills.',
      image: onlineJudge,
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'C++ Compiler'],
      github: 'https://github.com/prakhargupta48/OnlineJudgeMERN',
      demo: 'online-judge-mern.vercel.app',
      featured: true,
    },
    {
      id: 4,
      title: 'Mission Control – Gamified Habit Tracker',
      description:
        'A productivity web app with a space-themed interface. Features gamified task tracking, achievements, daily quizzes, and customizable themes to make discipline and habit-building fun.',
      image: missionControl,
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/DevrajParmarr/Mission-Control---A-Gamified-Habit-Tracker',
      demo: 'https://deciplineyourtasknow.netlify.app/',
      featured: false,
    },
    {
      id: 5,
      title: 'American Sign Language Converter',
      description:
        'Machine learning-based project that converts American Sign Language (ASL) into text in real time. Uses OpenCV for hand detection and CNN models for classification.',
      image: aslConverter,
      tech: ['Python', 'OpenCV', 'TensorFlow/Keras', 'CNN'],
      github: '',
      demo: '',
      featured: true,
    },
    {
      id: 6,
      title: 'Excel File Merger',
      description:
        'A Node.js utility tool for merging multiple Excel files into a single consolidated sheet, simplifying data management workflows.',
      image: excelMerger,
      tech: ['Node.js', 'ExcelJS'],
      github: 'https://github.com/DevrajParmarr/Excel-File-Merger-using-NodeJS',
      demo: '',
      featured: false,
    },
    {
      id: 7,
      title: 'E-Commerce Backend',
      description:
        'A backend system for an e-commerce platform built in PHP. Includes product management, user authentication, and order handling features.',
      image: ecommerce,
      tech: ['PHP', 'MySQL', 'HTML', 'CSS'],
      github: 'https://github.com/DevrajParmarr/E_Commerce-Backend-using-php-',
      demo: '',
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
            A showcase of my technical skills and creative problem-solving, built through
            diverse projects in web development, AI, and machine learning.
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
                <div
                  className={`absolute inset-0 bg-background/90 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {project.github && (
                    <Button size="sm" className="neon-glow" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  {project.featured && <Badge className="neon-glow">Featured</Badge>}
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
          <Button
            variant="outline"
            size="lg"
            className="glass-card border-primary/30 hover:border-primary"
            asChild
          >
            <a href="https://github.com/DevrajParmarr" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;