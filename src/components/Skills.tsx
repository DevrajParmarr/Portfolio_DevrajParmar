import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Database, Globe, Cpu, Brain, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';

const Skills = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      icon: Code2,
      title: 'Programming Languages',
      skills: [
        { name: 'C/C++', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'PHP', level: 80 },
        { name: 'Data Structures & Algorithms', level: 88 },
      ],
    },
    {
      icon: Globe,
      title: 'Web Development',
      skills: [
        { name: 'React.js/Next.js', level: 90 },
        { name: 'Node.js/Express.js', level: 85 },
        { name: 'HTML/CSS', level: 92 },
        { name: 'RESTful APIs', level: 85 },
      ],
    },
    {
      icon: Database,
      title: 'Databases & Tools',
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'SQL', level: 80 },
        { name: 'Git/GitHub', level: 88 },
        { name: 'VS Code', level: 90 },
      ],
    },
    {
      icon: Brain,
      title: 'Competitive Programming',
      skills: [
        { name: 'LeetCode (350+ problems)', level: 85 },
        { name: 'CodeChef (1500+ rating)', level: 80 },
        { name: 'GeeksforGeeks', level: 85 },
        { name: 'Problem Solving', level: 88 },
      ],
    },
  ];

  const tools = [
    'Git', 'VS Code', 'Jupyter Notebook', 'Windows', 'Linux', 'Leaflet.js', 'OpenStreetMap API', 'JWT'
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools 
            I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="glass-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <Progress
                        value={inView ? skill.level : 0}
                        className="h-2"
                        style={{
                          transition: 'all 1s ease-out',
                          transitionDelay: `${index * 0.1 + 0.3}s`,
                        }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tools & Technologies */}
        <Card className="glass-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-primary" />
              Tools & Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <Badge
                  key={tool}
                  variant="secondary"
                  className="glass-card hover:neon-glow transition-all duration-300 cursor-default"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;