import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code2, Database, Globe, Brain, Zap, Star, Sparkles } from 'lucide-react';
import { AdvancedMotionEngine } from '@/utils/advancedMotion';

const AdvancedSkills: React.FC = () => {
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<AdvancedMotionEngine | null>(null);

  const skillCategories = [
    {
      icon: Code2,
      title: 'Programming Languages',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'C/C++', level: 90, description: 'System programming & competitive coding' },
        { name: 'JavaScript/TypeScript', level: 85, description: 'Modern web development' },
        { name: 'PHP', level: 80, description: 'Server-side development' },
        { name: 'Data Structures & Algorithms', level: 88, description: 'Problem solving expertise' },
      ],
    },
    {
      icon: Globe,
      title: 'Web Development',
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'React.js/Next.js', level: 90, description: 'Component-based architecture' },
        { name: 'Node.js/Express.js', level: 85, description: 'Backend API development' },
        { name: 'HTML/CSS', level: 92, description: 'Semantic markup & styling' },
        { name: 'RESTful APIs', level: 85, description: 'API design & integration' },
      ],
    },
    {
      icon: Database,
      title: 'Databases & Tools',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'MongoDB', level: 85, description: 'NoSQL database design' },
        { name: 'SQL', level: 80, description: 'Relational database management' },
        { name: 'Git/GitHub', level: 88, description: 'Version control & collaboration' },
        { name: 'VS Code', level: 90, description: 'Development environment' },
      ],
    },
    {
      icon: Brain,
      title: 'Competitive Programming',
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'LeetCode (350+ problems)', level: 85, description: 'Algorithm optimization' },
        { name: 'CodeChef (1500+ rating)', level: 80, description: 'Contest participation' },
        { name: 'GeeksforGeeks', level: 85, description: 'Technical interviews' },
        { name: 'Problem Solving', level: 88, description: 'Analytical thinking' },
      ],
    },
  ];

  const tools = [
    { name: 'Git', category: 'Version Control' },
    { name: 'VS Code', category: 'Editor' },
    { name: 'Jupyter Notebook', category: 'Data Science' },
    { name: 'Windows', category: 'OS' },
    { name: 'Linux', category: 'OS' },
    { name: 'Leaflet.js', category: 'Mapping' },
    { name: 'OpenStreetMap API', category: 'API' },
    { name: 'JWT', category: 'Authentication' }
  ];

  useEffect(() => {
    if (!skillsRef.current) return;

    engineRef.current = new AdvancedMotionEngine();
    
    // Create intersection observer for skills
    const observer = AdvancedMotionEngine.createAdvancedObserver(
      skillsRef.current.querySelectorAll('.skill-card'),
      'morphIn',
      100
    );

    // Add 3D effects to skill cards
    const cards = skillsRef.current.querySelectorAll('.skill-card');
    const cleanups: (() => void)[] = [];
    
    cards.forEach((card, index) => {
      const cleanup = AdvancedMotionEngine.add3DTiltEffect(card as HTMLElement, 8);
      cleanups.push(cleanup);
      
      // Magnetic effect
      const magneticCleanup = AdvancedMotionEngine.add3DMagneticEffect(card as HTMLElement, 0.1);
      cleanups.push(magneticCleanup);
    });

    // Particle system
    engineRef.current.createParticleSystem(skillsRef.current, 30);

    return () => {
      observer.disconnect();
      cleanups.forEach(cleanup => cleanup());
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, []);

  return (
    <section 
      ref={skillsRef}
      id="skills" 
      className="py-24 px-4 bg-secondary/20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-ultraFloat" />
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-liquidMotion" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 holographic rounded-lg opacity-20 animate-morphPulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="glass-ultra mb-6 px-6 py-3 text-sm font-medium animate-bounceIn">
            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
            Technical Expertise
          </Badge>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 animate-textReveal">
            <span className="gradient-text">Skills &</span>{' '}
            <span 
              className="holographic inline-block"
              style={{
                background: 'var(--gradient-holographic)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Technologies
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            A comprehensive overview of my technical expertise across multiple domains,
            <span className="text-primary font-semibold"> continuously evolving</span> with the latest technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className={`skill-card glass-ultra group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 ${
                  activeCategory === categoryIndex ? 'ring-2 ring-primary/50' : ''
                }`}
                onMouseEnter={() => setActiveCategory(categoryIndex)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{ animationDelay: `${categoryIndex * 150}ms` }}
              >
                {/* Holographic Background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} 
                />
                
                {/* Particle Container */}
                <div className="particle-container absolute inset-0 pointer-events-none" />

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-4 text-2xl">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
                      <Icon className="w-8 h-8 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skill.name} 
                      className="skill-item space-y-3 p-4 rounded-lg glass-card hover:glass-depth transition-all duration-300"
                      style={{ animationDelay: `${categoryIndex * 150 + skillIndex * 50}ms` }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-lg">{skill.name}</span>
                          <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-bold text-lg">{skill.level}%</span>
                          {skill.level >= 90 && <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />}
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Progress
                          value={activeCategory === categoryIndex ? skill.level : 0}
                          className="h-3 bg-muted/30"
                          style={{
                            transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            transitionDelay: `${skillIndex * 100}ms`,
                          }}
                        />
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full opacity-30 blur-sm"
                          style={{ 
                            width: activeCategory === categoryIndex ? `${skill.level}%` : '0%',
                            transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            transitionDelay: `${skillIndex * 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Enhanced Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </Card>
            );
          })}
        </div>

        {/* Tools & Technologies */}
        <Card className="glass-ultra overflow-hidden animate-slideInUp" style={{ animationDelay: '600ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-3xl">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-lg blur-lg" />
                <Zap className="w-8 h-8 text-accent relative z-10" />
              </div>
              Tools & Technologies
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  className="tool-item glass-card p-4 rounded-lg hover:glass-depth transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${700 + index * 50}ms` }}
                >
                  <Badge
                    variant="secondary"
                    className="w-full justify-center glass-card hover:neon-glow transition-all duration-300 py-2 group-hover:scale-105"
                  >
                    <span className="font-semibold">{tool.name}</span>
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {tool.category}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdvancedSkills;