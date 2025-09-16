import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Calendar, MapPin, Star, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const Education = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showAllEducation, setShowAllEducation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-education-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-education-index]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const education = [
    {
      degree: 'Bachelor of Engineering (Computer Engineering)',
      institution: 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS)',
      location: 'Indore, Madhya Pradesh',
      period: '2022 - 2026',
      grade: '6.96 CGPA',
      status: 'UG IV Year (Final Year)',
      highlights: [
        'Core subjects: Data Structures, ML ,Algorithms, DBMS, OS, Computer Networks',
        'Specialized in Machine Learning and AI applications',
        'Active participant in technical events and programming contests',
        'Leading multiple academic projects in full-stack development - ML Engineer'
      ],
      achievements: [
        'Consistent academic performance',
        'Project leadership roles',
        'Technical event participation'
      ]
    },
    {
      degree: 'Higher Secondary Education (12th Grade)',
      institution: 'Jawahar Navodaya Vidyalaya',
      location: 'Shajapur, Madhya Pradesh',
      period: '2020',
      grade: '89.00%',
      status: 'CBSE Board',
      highlights: [
        'Science stream with Mathematics, Physics, Chemistry',
        'Strong foundation in analytical and problem-solving skills',
        'Qualified for JEE Main examination',
        'Leadership roles in school activities'
      ],
      achievements: [
        'Merit performance in board exams',
        'JEE Main qualification',
        'School leadership positions'
      ]
    },
    {
      degree: 'Secondary Education (10th Grade)',
      institution: 'Jawahar Navodaya Vidyalaya',
      location: 'Shajapur, Madhya Pradesh',
      period: '2018',
      grade: '92.40%',
      status: 'CBSE Board',
      highlights: [
        'Excellent academic performance across all subjects',
        'Strong foundation in Mathematics and Science',
        'Participation in various academic competitions',
        'Consistent high performance throughout school years'
      ],
      achievements: [
        'Outstanding board exam results',
        'Academic excellence awards',
        'Competitive exam preparations'
      ]
    }
  ];

  const achievements = [
    {
      title: 'JEE Main 2022',
      description: 'All India Rank: 40,236',
      icon: Award,
      color: 'text-yellow-400'
    },
    {
      title: 'CodeChef Rating',
      description: '1680+ Competitive Programming',
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      title: 'Problem Solving',
      description: '550+ DSA Problems Solved',
      icon: Star,
      color: 'text-blue-400'
    }
  ];

  return (
    <section id="education" className="py-20 px-4 relative">
      {/* Symmetric background effects */}
      <div className="absolute inset-0 bg-[var(--gradient-mirror)] opacity-20" />
      <div className="absolute top-1/4 left-0 w-1/3 h-64 bg-gradient-to-r from-primary/10 to-transparent blur-3xl" />
      <div className="absolute top-1/4 right-0 w-1/3 h-64 bg-gradient-to-l from-accent/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Symmetric header with decorative elements */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-primary/50" />
            <GraduationCap className="w-10 h-10 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold gradient-text animate-text-glow">
              Educational Journey
            </h2>
            <GraduationCap className="w-10 h-10 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-20 h-px bg-gradient-to-l from-transparent via-primary to-primary/50" />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            Building a strong foundation in computer science through comprehensive academic excellence and continuous learning.
          </p>
        </div>

        {/* Key Achievements Banner */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="glass-card text-center group hover-scale animate-bounce-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <IconComponent className={`w-8 h-8 mx-auto mb-3 ${achievement.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Education Cards in Symmetric Layout */}
        <div className="space-y-8">
          {education.slice(0, showAllEducation ? education.length : 1).map((edu, index) => (
            <div
              key={index}
              data-education-index={index}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <Card className={`w-full max-w-4xl glass-card group relative overflow-hidden tilt-on-hover ${
                visibleCards.includes(index) ? 'animate-card-entry' : 'opacity-0'
              }`} style={{ animationDelay: `${index * 0.3}s` }}>

                {/* Symmetric glow effects */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                <div className="flex flex-col md:flex-row">
                  {/* Left side - Academic Info */}
                  <div className="md:w-2/3 p-6 md:p-8">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge className="glass-card bg-primary/20 text-primary animate-bounce-in">
                          {edu.status}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {edu.period}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {edu.location}
                        </div>
                      </div>

                      <CardTitle className="text-2xl md:text-3xl mb-2 group-hover:text-primary transition-colors animate-text-glow">
                        {edu.degree}
                      </CardTitle>

                      <CardDescription className="text-lg font-semibold text-foreground">
                        {edu.institution}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-3">Academic Highlights:</h4>
                          <ul className="space-y-2">
                            {edu.highlights.map((highlight, hIndex) => (
                              <li
                                key={hIndex}
                                className="flex items-start gap-3 text-sm animate-slide-in-right"
                                style={{ animationDelay: `${(index * 0.3) + (hIndex * 0.1)}s` }}
                              >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 animate-pulse" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-accent mb-3">Key Achievements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.achievements.map((achievement, aIndex) => (
                              <Badge
                                key={aIndex}
                                variant="secondary"
                                className="glass-card hover-scale animate-bounce-in"
                                style={{ '--stagger-delay': aIndex } as React.CSSProperties}
                              >
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  {/* Right side - Grade Display */}
                  <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <div className="text-center relative z-10">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow">
                        <GraduationCap className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold gradient-text mb-2 animate-text-glow">
                        {edu.grade}
                      </h3>
                      <p className="text-sm text-muted-foreground">Performance</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        {!showAllEducation && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAllEducation(true)}
              className="group btn-enhanced shadow-lg relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
              <GraduationCap className="w-5 h-5 mr-2 group-hover:animate-bounce relative z-10" />
              <span className="relative z-10">Explore More About Education</span>
              <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform relative z-10" />
            </Button>
          </div>
        )}

        {/* Show Less Button */}
        {showAllEducation && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAllEducation(false)}
              variant="outline"
              className="btn-enhanced"
            >
              <ChevronUp className="w-5 h-5 mr-2" />
              Show Less
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;