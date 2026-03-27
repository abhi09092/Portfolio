import { experience, skills, achievements, certifications } from "@/lib/data";
import { Download, MapPin, Building2, Calendar, CheckCircle2, Trophy, Award, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col gap-16">
      {/* LinkedIn-style Profile Header */}
      <section className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden pb-8 relative">
        {/* Cover Image */}
        <div className="w-full h-32 md:h-48 relative bg-muted">
          <Image
            src="about.jpg"
            alt="Cover Profile"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Profile Content */}
        <div className="px-6 md:px-8 relative">
          {/* Avatar */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-card bg-card absolute -top-16 md:-top-20 z-10 shrink-0">
            <Image
              src="profile.jpg"
              alt="Abhishek Sharma"
              fill
              className="object-cover"
            />
          </div>

          {/* Spacer to push content down below the absolute avatar */}
          <div className="h-20 md:h-24"></div>

          <div className="flex flex-col md:flex-row gap-6 justify-between items-start mt-2">
            {/* Main Info */}
            <div className="flex flex-col gap-3 flex-1">
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  Abhishek Sharma
                  <CheckCircle2 size={18} className="text-muted-foreground" />
                  <span className="text-sm font-normal text-muted-foreground ml-1">He/Him</span>
                </h1>
                <p className="text-base text-foreground mt-1 font-medium leading-relaxed max-w-2xl">
                  Full-Stack MERN Developer | React.js • Node.js • Next.js | UI-Focused Developer | Building scalable systems | Graphic Designer | Leadership & Entrepreneurial Skills
                </p>
              </div>
              
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mt-1">
                <div className="flex flex-wrap items-center gap-y-1 gap-x-1.5">
                  <span>Jalandhar, Punjab, India</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer font-medium">Contact info</span>
                </div>
                <div>
                  <a href="https://abhisheksharmaaaa.vercel.app/" className="text-blue-600 dark:text-blue-500 font-medium hover:underline inline-flex items-center gap-1">
                    abhisheksharma.com <ExternalLink size={12} />
                  </a>
                </div>
                <div className="mt-1">
                  <span className="text-blue-600 dark:text-blue-500 font-medium hover:underline cursor-pointer">500+ connections</span>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-3">
                <a 
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-1.5 rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm"
                >
                  Download Resume
                </a>
              </div>
            </div>

            {/* Right Side Links (Company / Education) */}
            <div className="flex flex-col gap-3 md:w-56 shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-border w-full md:w-auto">
               {/* Sample Company */}
               <div className="flex items-center gap-3 hover:bg-muted/50 p-2 -m-2 rounded-md transition-colors cursor-pointer group">
                 <div className="w-8 h-8 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border">
                   <Building2 size={16} className="text-foreground" />
                 </div>
                 <span className="text-sm font-semibold group-hover:text-blue-500 group-hover:underline">CyperCode</span>
               </div>
               {/* Sample Education */}
               <div className="flex items-center gap-3 hover:bg-muted/50 p-2 -m-2 rounded-md transition-colors cursor-pointer group mt-1">
                 <div className="w-8 h-8 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border">
                   <Award size={16} className="text-foreground" />
                 </div>
                 <span className="text-sm font-semibold group-hover:text-blue-500 group-hover:underline">Lovely Professional University</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight mb-4">About</h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          I'm a passionate engineer who loves bridging the gap between design and engineering. With over 2 years of experience, I specialize in building robust web applications and designing scalable systems from the ground up.
        </p>
      </section>

      {/* Achievements Section - Highlight Stats */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight border-b border-border pb-2 flex items-center gap-2">
          <Trophy className="text-yellow-500" size={24} /> Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <div key={idx} className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-start gap-3 hover:border-primary/50 transition-colors">
              <div className="text-3xl font-bold tracking-tight text-primary">
                {item.metric}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Layout for Timeline & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Experience Timeline */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight border-b border-border pb-2 flex items-center gap-2">
            <Building2 size={24} className="text-blue-500" /> Experience
          </h2>
          <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {experience.map((job, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-card border border-border p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg">{job.company}</h3>
                  </div>
                  <div className="text-primary font-medium mb-1">{job.role}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <Calendar size={14} /> {job.period}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight border-b border-border pb-2 flex items-center gap-2">
            <CheckCircle2 size={24} className="text-green-500" /> Skills
          </h2>
          <div className="flex flex-col gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="bg-card p-5 rounded-xl border border-border shadow-sm">
                <h3 className="font-semibold mb-3 text-foreground">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground border border-border/50"
                    >
                      <CheckCircle2 size={12} className="text-green-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section - Grid Layout */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold tracking-tight border-b border-border pb-2 flex items-center gap-2">
          <Award className="text-purple-500" size={24} /> Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div key={idx} className="bg-card p-5 rounded-xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Award className="text-muted-foreground" size={20} />
                </div>
                <h3 className="font-semibold">{cert.name}</h3>
                <p className="text-sm text-primary font-medium">{cert.platform}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} /> {cert.date}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <a 
                  href={cert.link}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  View Certificate <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
