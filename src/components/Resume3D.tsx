import { useEffect, useRef, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download, GraduationCap, Briefcase, Trophy, Code2,
  RotateCw, Mail, Github, Linkedin, MapPin, Sparkles,
} from 'lucide-react';
import resumePDF from '@/assets/Devraj parmar Resume.pdf';

const orbitTech = ['React', 'Next.js', 'Node', 'MongoDB', 'TypeScript', 'Python', 'C++', 'AI/ML'];

const front = {
  summary:
    'Final-year Computer Engineering student crafting fast, thoughtful products across the MERN stack, with a competitive-programming edge.',
  stats: [
    { icon: Code2, label: 'DSA Problems', value: '450+' },
    { icon: Trophy, label: 'CodeChef', value: '1680+' },
    { icon: GraduationCap, label: 'SGSITS', value: 'B.E. CE' },
    { icon: Briefcase, label: 'Status', value: 'Open' },
  ],
};

const back = {
  experience: [
    { role: 'Full-Stack Developer', org: 'Freelance / Projects', when: '2024 — Present' },
    { role: 'Oracle Certified Engineer', org: 'Oracle', when: '2024' },
  ],
  education: [
    { role: 'B.E. Computer Engineering', org: 'SGSITS, Indore', when: 'Final Year' },
  ],
  highlights: ['RESTful APIs', 'JWT Auth', 'Leaflet.js', 'Data Structures', 'System Design'],
};

const Resume3D = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);
  const frame = useRef<number>();

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    const stage = stageRef.current;
    if (!el || !stage) return;
    const rect = stage.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(-py * 14).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(px * 18).toFixed(2)}deg`);
      el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return (
    <section className="px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 gap-1">
            <Sparkles className="w-3 h-3" /> Interactive
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            My <span className="gradient-text">Resume</span> in 3D
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Move your cursor over the card to tilt it, and flip it to see experience and education.
          </p>
        </div>

        <div
          ref={stageRef}
          className="resume3d-stage relative mx-auto"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {/* orbiting tech ring */}
          <div className="resume3d-orbit" aria-hidden="true">
            {orbitTech.map((t, i) => (
              <span
                key={t}
                className="resume3d-orbit-item"
                style={{ '--i': i, '--total': orbitTech.length } as React.CSSProperties}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            ref={cardRef}
            className={`resume3d-card ${flipped ? 'is-flipped' : ''} ${visible ? 'is-in' : ''}`}
          >
            {/* FRONT */}
            <div className="resume3d-face resume3d-front glass-card rounded-2xl">
              <div className="resume3d-sheen" />
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4" style={{ transform: 'translateZ(40px)' }}>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold gradient-text">Devraj Parmar</h3>
                    <p className="text-muted-foreground mt-1">MERN & Next.js Developer</p>
                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Indore, India
                    </p>
                  </div>
                  <Badge className="bg-emerald-500/15 text-emerald-500 border-emerald-500/30">Available</Badge>
                </div>

                <p
                  className="text-muted-foreground mt-6 leading-relaxed"
                  style={{ transform: 'translateZ(28px)' }}
                >
                  {front.summary}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8" style={{ transform: 'translateZ(52px)' }}>
                  {front.stats.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-xl bg-muted/50 border border-border/50 p-4 text-center">
                      <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-xl font-bold">{value}</div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8 flex flex-wrap items-center gap-3" style={{ transform: 'translateZ(60px)' }}>
                  <Button asChild>
                    <a href={resumePDF} download="Devraj_Parmar_Resume.pdf">
                      <Download className="w-4 h-4 mr-2" /> Download PDF
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setFlipped(true)}>
                    <RotateCw className="w-4 h-4 mr-2" /> Flip card
                  </Button>
                  <div className="flex gap-1 ml-auto">
                    {[
                      { icon: Github, href: 'https://github.com/DevrajParmarr', label: 'GitHub' },
                      { icon: Linkedin, href: 'https://www.linkedin.com/in/devraj-parmar-459363187', label: 'LinkedIn' },
                      { icon: Mail, href: 'mailto:devrajparmar232@gmail.com', label: 'Email' },
                    ].map(({ icon: Icon, href, label }) => (
                      <Button key={label} asChild variant="ghost" size="icon" className="rounded-full" title={label}>
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          <Icon className="w-4 h-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BACK */}
            <div className="resume3d-face resume3d-back glass-card rounded-2xl">
              <div className="resume3d-sheen" />
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                <div className="grid md:grid-cols-2 gap-8" style={{ transform: 'translateZ(40px)' }}>
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold mb-4">
                      <Briefcase className="w-4 h-4 text-primary" /> Experience
                    </h4>
                    <ul className="space-y-4">
                      {back.experience.map((it) => (
                        <li key={it.role} className="border-l-2 border-primary/40 pl-4">
                          <div className="font-medium">{it.role}</div>
                          <div className="text-sm text-muted-foreground">{it.org}</div>
                          <div className="text-xs text-muted-foreground/80">{it.when}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold mb-4">
                      <GraduationCap className="w-4 h-4 text-primary" /> Education
                    </h4>
                    <ul className="space-y-4">
                      {back.education.map((it) => (
                        <li key={it.role} className="border-l-2 border-primary/40 pl-4">
                          <div className="font-medium">{it.role}</div>
                          <div className="text-sm text-muted-foreground">{it.org}</div>
                          <div className="text-xs text-muted-foreground/80">{it.when}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8" style={{ transform: 'translateZ(50px)' }}>
                  <h4 className="font-semibold mb-3">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {back.highlights.map((h) => (
                      <Badge key={h} variant="secondary">{h}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8" style={{ transform: 'translateZ(60px)' }}>
                  <Button variant="outline" onClick={() => setFlipped(false)}>
                    <RotateCw className="w-4 h-4 mr-2" /> Back to front
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="resume3d-shadow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Resume3D;
