import { allProjects } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink, ArrowLeft } from "lucide-react";

// Inline SVGs for Github since we decided to use those
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col gap-6 md:gap-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          Home
        </Link>
        <span className="text-border">/</span>
        <Link href="/#projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium">{project.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 items-start">
        {/* Main Content (3 columns) */}
        <div className="lg:col-span-3 flex flex-col gap-8 md:gap-12">
          {/* Header Info */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 font-bold">4.8</span>
                <div className="flex text-yellow-500">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <span className="text-muted-foreground ml-1">(128 ratings)</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-blue-500 hover:underline cursor-pointer font-medium">Detailed Analytics</span>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-2xl group">
            <Image
              src={`/${project.thumbnail}`}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>

          {/* Amazon style Product Description Section */}
          <div className="space-y-12 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-border/50">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">01</span>
                  The Problem
                </h2>
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                  <p className="text-muted-foreground leading-relaxed text-lg italic">
                    "{project.problem}"
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-sm">02</span>
                  The Solution
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className="space-y-8 pt-12 border-t border-border/50">
              <h2 className="text-3xl font-bold">Key Project Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/40 hover:border-border transition-colors group">
                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ChevronRight size={18} />
                    </div>
                    <div className="space-y-1">
                      <span className="font-semibold text-foreground">{feature}</span>
                      <p className="text-xs text-muted-foreground">Optimized for high performance and seamless integration.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (1 column) - Amazon Style Sticky Buy-Box Equivalent */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="border-2 border-border rounded-xl p-6 bg-card sticky top-24 flex flex-col gap-6 shadow-xl animate-in fade-in slide-in-from-right duration-500">
            <div className="space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Project Status</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-bold text-xl text-foreground">Live & Optimized</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-col gap-3">
                <a 
                  href={project.link}
                  target="_blank"
                  className="w-full bg-primary text-primary-foreground flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  <ExternalLink size={20} />
                  Visit Live Site
                </a>
                <a 
                  href={project.githubLink}
                  target="_blank"
                  className="w-full bg-secondary text-secondary-foreground flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold hover:bg-secondary/80 transition-all active:scale-95 border border-border"
                >
                  <GithubIcon />
                  View Repository
                </a>
              </div>
              <p className="text-[10px] text-center text-muted-foreground uppercase font-medium tracking-tight">
                Secure link provided via Portfolio
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Tech Specifications</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="bg-muted/50 text-foreground px-2.5 py-1 rounded border border-border/50 text-[10px] font-bold uppercase tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.impactMetrics.map((metric, i) => (
                  <div key={i} className="flex flex-col p-3 rounded-lg bg-muted/30 border border-border/50">
                    <span className="text-2xl font-black tracking-tight text-primary">{metric.value}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-muted/20 rounded-lg text-xs text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Designed for Scale & Efficiency
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
