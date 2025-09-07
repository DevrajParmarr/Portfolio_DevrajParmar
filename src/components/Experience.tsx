import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-index]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: 'MERN Stack Developer',
      company: 'Umbrella Ltd',
      period: 'Recent Internship',
      location: 'Indore, MP',
      type: 'Internship',
      achievements: [
        'Developed Stock Market Predictor using sentiment analysis of market buzz and news',
        'Implemented real-time data processing for market sentiment tracking',
        'Built responsive frontend with React and integrated backend APIs',
        'Utilized machine learning algorithms for predictive analytics'
      ],
      skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Sentiment Analysis', 'REST APIs']
    },
    {
      title: 'Oracle Certified Professional',
      company: 'Oracle Corporation',
      period: '2024 - Present',
      location: 'Global Certification',
      type: 'Certification',
      achievements: [
        'Achieved 3 level in Oracle Race of Certification Programme',
        'Oracle Cloud Infrastructure (OCI) AI Foundations - Foundations Associate',
        'Oracle Cloud Infrastructure (OCI) Generative AI - Professional Level',
        'Oracle Cloud Infrastructure (OCI) Data Science - Certified Professional',
        'Oracle Cloud Infrastructure (OCI) Foundations - Certified Associate'
      ],
      skills: ['Oracle Cloud', 'AI/ML Foundations', 'Generative AI', 'Data Science', 'Cloud Computing', 'OCI Services']
    },
    {
      title: 'Full Stack Web Developer',
      company: 'AcmeGrade Academy',
      period: '2024',
      location: 'Professional Certification',
      type: 'Certification',
      achievements: [
        'Completed comprehensive Web Development certification program',
        'Mastered modern frontend and backend development practices',
        'Gained expertise in industry-standard development workflows',
        'Demonstrated proficiency in full-stack application development'
      ],
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Database Management', 'API Development']
    },
    {
      title: 'Academic Projects Lead',
      company: 'SGSITS, Indore',
      period: 'Jan 2024 - Present',
      location: 'Indore, MP',
      type: 'Academic',
      achievements: [
        'Led development of Route Optimizer solving HFVRP for 5-100 destinations',
        'Built MERN Stack Online Judge platform with custom compiler',
        'Developed Digital Labour Chowk connecting laborers with clients',
        'Created AI/ML project for real-time ASL to text conversion'
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'Python', 'OpenCV', 'TensorFlow']
    },
    {
      title: 'Competitive Programming',
      company: 'CodeChef & Online Platforms',
      period: '2022 - Present',
      location: 'Remote',
      type: 'Achievement',
      achievements: [
        'Achieved 1500+ rating on CodeChef platform',
        'Solved 350+ Data Structures & Algorithms problems',
        'Secured AIR 40,236 in JEE Main 2022',
        'Active participant in programming contests'
      ],
      skills: ['C++', 'DSA', 'Problem Solving', 'Algorithms', 'Mathematics']
    },
    {
      title: 'Technical Skills Development',
      company: 'Self-Learning & Projects',
      period: '2021 - Present',
      location: 'Continuous',
      type: 'Development',
      achievements: [
        'Mastered full-stack web development with MERN stack',
        'Gained expertise in AI/ML with Python and TensorFlow',
        'Developed proficiency in multiple programming languages',
        'Built responsive and scalable web applications'
      ],
      skills: ['JavaScript', 'React', 'Python', 'Machine Learning', 'Database Design']
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative">
      {/* Symmetric background */}
      <div className="absolute inset-0 bg-[var(--gradient-symmetric)] opacity-30" />
      <div className="absolute inset-0 bg-[var(--gradient-mirror)] opacity-20" />
      
      {/* Symmetric decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-accent/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Symmetric header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
            <Award className="w-8 h-8 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text animate-text-glow">
              Experience & Achievements
            </h2>
            <Award className="w-8 h-8 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            A comprehensive overview of my academic journey, technical achievements, and continuous learning in computer science and engineering.
          </p>
        </div>

        {/* Symmetric timeline layout */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full opacity-50" />
          
          {/* Timeline nodes */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-index={index}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } gap-8 relative`}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-lg animate-pulse z-10" />
                
                {/* Content card */}
                <div className={`w-5/12 ${visibleItems.includes(index) ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                  <Card className="glass-card hover-scale group relative overflow-hidden">
                    {/* Card glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
                    
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={`glass-card animate-bounce-in ${
                          exp.type === 'Academic' ? 'bg-blue-500/20 text-blue-400' :
                          exp.type === 'Achievement' ? 'bg-green-500/20 text-green-400' :
                          exp.type === 'Internship' ? 'bg-orange-500/20 text-orange-400' :
                          exp.type === 'Certification' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {exp.type}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-primary transition-colors animate-text-glow">
                        {exp.title}
                      </CardTitle>
                      
                      <CardDescription className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {exp.company}
                        <span className="mx-2">•</span>
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li 
                                key={achIndex} 
                                className="flex items-start gap-2 text-sm animate-slide-in-right"
                                style={{ animationDelay: `${(index * 0.2) + (achIndex * 0.1)}s` }}
                              >
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-accent">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, skillIndex) => (
                              <Badge 
                                key={skill} 
                                variant="secondary" 
                                className="glass-card hover-scale animate-bounce-in"
                                style={{ '--stagger-delay': skillIndex } as any}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Spacer for opposite side */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;