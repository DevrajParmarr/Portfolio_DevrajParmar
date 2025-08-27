import React, { useRef, useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Code2, Trophy, Zap, Briefcase } from 'lucide-react';

const Profile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    { icon: Code2, text: "450+ DSA problems solved", delay: 0 },
    { icon: Trophy, text: "CodeChef 1680+ 3 Star", delay: 100 },
    { icon: Zap, text: "Full‑stack development", delay: 200 },
    { icon: Briefcase, text: "Open to internships", delay: 300 }
  ];

  return (
    <section id="about" className="px-4 py-16 relative">
      <div 
        ref={containerRef}
        className={`max-w-6xl mx-auto relative transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Subtle Background */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl" />
        
        <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 items-center">
            
            {/* Avatar Section */}
            <div className="relative mx-auto lg:mx-0 group">
              <Avatar className="w-40 h-40 ring-2 ring-primary/20 relative transition-all duration-300 group-hover:ring-primary/40">
                <AvatarImage 
                  src="/lovable-uploads/c882c21f-79e8-474e-af59-e43da507196e.png" 
                  alt="Profile headshot photo" 
                  className="object-cover" 
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  DP
                </AvatarFallback>
              </Avatar>
              
              <div className="absolute -bottom-2 -right-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Final-year Computer Engineering student at <span className="text-primary font-semibold">SGSITS, Indore</span>. 
                  Passionate about AI/ML, full‑stack development, and building tools that help students learn faster.
                </p>
              </div>

              {/* Achievement Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`group flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${achievement.delay}ms` }}
                    >
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {achievement.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Python', 'AI/ML', 'MongoDB', 'TypeScript'].map((skill, index) => (
                  <Badge 
                    key={skill}
                    variant="secondary"
                    className={`transition-all duration-200 hover:bg-primary hover:text-primary-foreground ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${200 + index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;