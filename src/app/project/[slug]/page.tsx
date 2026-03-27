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
  const project = allProjects.find((p) => p.link.split("/").pop() === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Back
        </Link>
        <span className="text-border">/</span>
        <Link href="/#projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground">{project.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Main Content (3 columns) */}
        <div className="lg:col-span-3 flex flex-col gap-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={project.thumbnail}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">
                Traditional solutions in this space were too slow, hard to integrate, and didn't scale well with user demand. The client needed a robust platform capable of handling real-time data efficiently without sacrificing user experience.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">The Solution</h2>
              <p className="text-muted-foreground leading-relaxed">
                I engineered a modern full-stack application leveraging the latest frameworks to ensure high performance. We implemented an event-driven architecture that decoupled services and boosted overall throughput by 40%.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Real-time data synchronization",
                "Advanced role-based access control",
                "Automated nightly reporting",
                "Seamless third-party API integrations",
                "Optimized edge-network caching",
                "Responsive mobile-first design"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 p-1 rounded-full text-primary">
                    <ChevronRight size={14} />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar (1 column) - Amazon Style Sticky Buy-Box Equivalent */}
        <div className="lg:col-span-1 border border-border rounded-xl p-6 bg-card sticky top-24 flex flex-col gap-6 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">Actions</h3>
            <div className="flex flex-col gap-3">
              <a 
                href="#"
                className="w-full bg-primary text-primary-foreground flex items-center justify-center gap-2 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
              <a 
                href="#"
                className="w-full bg-transparent border border-border text-foreground flex items-center justify-center gap-2 py-3 rounded-md font-medium hover:bg-muted transition-colors"
              >
                <GithubIcon />
                View Source
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="bg-muted text-muted-foreground px-3 py-1 rounded-md text-sm font-medium border border-border/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border pb-2">Impact Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-primary">40%</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Perf Boost</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-primary">10k+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
