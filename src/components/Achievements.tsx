import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Users, Target, Calendar, Award, Zap, Crown } from 'lucide-react';

const Achievements = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...prev, index]);
          }
        },
        { threshold: 0.2 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const achievements = [
    {
      id: 1,
      title: 'Team Captain - Kho Kho',
      organization: 'SGSITS University Team',
      description: 'Led the university Kho Kho team to the finals of Inter-University Championship. Demonstrated exceptional leadership, strategic planning, and team coordination skills under pressure.',
      achievement: 'Inter-University Finals',
      year: '2024',
      type: 'Sports Leadership',
      icon: Crown,
      color: 'from-yellow-400/20 to-orange-400/20',
      borderColor: 'border-yellow-400/40',
      textColor: 'text-yellow-600 dark:text-yellow-300'
    },
    {
      id: 2,
      title: 'Team Captain - Volleyball',
      organization: 'SGSITS University Team',
      description: 'Successfully captained the volleyball team to Inter-University finals. Coordinated training sessions, developed game strategies, and fostered team spirit that led to outstanding performance.',
      achievement: 'Inter-University Finals',
      year: '2024',
      type: 'Sports Leadership',
      icon: Trophy,
      color: 'from-blue-400/20 to-cyan-400/20',
      borderColor: 'border-blue-400/40',
      textColor: 'text-blue-600 dark:text-blue-300'
    },
    {
      id: 3,
      title: 'Athletic Excellence Award',
      organization: 'SGSITS Sports Committee',
      description: 'Recognized for outstanding contribution to university sports programs and exceptional leadership qualities demonstrated across multiple sports disciplines.',
      achievement: 'Excellence in Sports Leadership',
      year: '2024',
      type: 'Recognition',
      icon: Medal,
      color: 'from-purple-400/20 to-pink-400/20',
      borderColor: 'border-purple-400/40',
      textColor: 'text-purple-600 dark:text-purple-300'
    },
    {
      id: 4,
      title: 'Team Building & Strategy',
      organization: 'Sports Leadership Program',
      description: 'Developed and implemented training methodologies that improved team performance by 40%. Organized inter-departmental tournaments and mentored junior players.',
      achievement: 'Leadership Development',
      year: '2023-2024',
      type: 'Leadership',
      icon: Users,
      color: 'from-emerald-400/20 to-teal-400/20',
      borderColor: 'border-emerald-400/40',
      textColor: 'text-emerald-600 dark:text-emerald-300'
    }
  ];

  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-yellow-400/40">
            <Award className="w-4 h-4 mr-2" />
            Achievements & Leadership
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Curricular Activities</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Beyond academics and technology, I believe in holistic development through sports leadership, 
            team building, and extracurricular excellence that shapes character and builds resilience.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            
            return (
              <div
                key={achievement.id}
                ref={el => itemRefs.current[index] = el}
                className={`
                  transform transition-all duration-700 ease-out
                  ${visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                  }
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className={`
                  group relative overflow-hidden cursor-pointer
                  bg-card/80 backdrop-blur-lg border ${achievement.borderColor}
                  transition-all duration-500 ease-out
                  hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2
                  hover:border-primary/60
                `}>
                  {/* Animated Background */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${achievement.color}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  `} />

                  {/* Cursor Following Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 animate-shimmer" />
                  </div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`
                        p-3 rounded-xl bg-gradient-to-br ${achievement.color} 
                        border ${achievement.borderColor} shadow-lg
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <IconComponent className={`w-6 h-6 ${achievement.textColor}`} />
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs mb-2 border-primary/30">
                          <Calendar className="w-3 h-3 mr-1" />
                          {achievement.year}
                        </Badge>
                        <div>
                          <Badge className={`text-xs bg-gradient-to-r ${achievement.color} ${achievement.textColor} ${achievement.borderColor}`}>
                            {achievement.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {achievement.title}
                    </CardTitle>
                    
                    <p className="text-sm text-primary/80 font-medium mb-1">
                      {achievement.organization}
                    </p>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {achievement.description}
                    </p>
                    
                    {/* Achievement Highlight */}
                    <div className={`
                      p-4 rounded-xl bg-gradient-to-r ${achievement.color}
                      border ${achievement.borderColor}
                      group-hover:shadow-lg transition-shadow duration-300
                    `}>
                      <div className="flex items-center gap-3">
                        <Target className={`w-5 h-5 ${achievement.textColor}`} />
                        <div>
                          <p className="text-xs text-muted-foreground font-medium mb-1">Key Achievement</p>
                          <p className={`font-bold ${achievement.textColor}`}>
                            {achievement.achievement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Enhanced Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
                </Card>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-card/80 backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400/20 rounded-xl mb-4">
              <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold mb-1">2</h3>
            <p className="text-sm text-muted-foreground">Sports Captain Positions</p>
          </Card>
          
          <Card className="text-center p-6 bg-card/80 backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-400/20 rounded-xl mb-4">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-1">50+</h3>
            <p className="text-sm text-muted-foreground">Team Members Mentored</p>
          </Card>
          
          <Card className="text-center p-6 bg-card/80 backdrop-blur-lg border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-400/20 rounded-xl mb-4">
              <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <h3 className="text-2xl font-bold mb-1">2</h3>
            <p className="text-sm text-muted-foreground">Inter-University Finals</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Achievements;