import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const Profile = () => {
  return <section className="px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 items-center glass-card p-6 rounded-xl animate-fade-in-up">
        <div className="relative mx-auto md:mx-0">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 blur-lg opacity-70" aria-hidden />
          <Avatar className="w-36 h-36 ring-2 ring-border relative">
            <AvatarImage src={"/lovable-uploads/c882c21f-79e8-474e-af59-e43da507196e.png"} alt="Profile headshot photo" className="object-cover" />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-muted-foreground mb-4">
            Final-year Computer Engineering student at SGSITS, Indore. Passionate about AI/ML, full‑stack development, and building tools that help students learn faster.
          </p>
          <ul className="text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li>• Competitive Programmer (CodeChef 1680+ 3 Star)</li>
            <li>• 450+ DSA problems solved</li>
            <li>• Interested in Web Development and Ai-ML Project</li>
            <li>• Open to internships and collaborations</li>
          </ul>
        </div>
      </div>
    </section>;
};
export default Profile;