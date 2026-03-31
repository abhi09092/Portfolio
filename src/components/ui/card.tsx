import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";

interface CardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  link: string;
  className?: string;
  variant?: "default" | "featured";
  topNumber?: number;
}

export function ProjectCard({
  title,
  slug,
  thumbnail,
  techStack,
  className,
  variant = "default",
  topNumber,
}: CardProps) {
  return (
    <div className={cn("group/card relative w-full cursor-pointer z-10 hover:z-50 transition-all duration-300 ease-in-out", className)}>
      <Link href={`/project/${slug}`} className="absolute inset-0 z-20">
        <span className="sr-only">View {title}</span>
      </Link>
      
      {/* Container that scales on hover */}
      <div className={cn(
        "relative w-full rounded-md transition-all duration-300 ease-out origin-center bg-card border border-transparent",
        variant !== "featured" 
          ? "group-hover/card:scale-110 group-hover/card:-translate-y-4 group-hover/card:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.9)] group-hover/card:border-border/50 z-20 group-hover/card:z-50"
          : "group-hover/card:scale-[1.02] group-hover/card:-translate-y-2 group-hover/card:shadow-xl z-10 group-hover/card:z-20"
      )}>
        {/* Thumbnail container */}
        <div className={cn(
          "relative w-full overflow-hidden rounded-md transition-all duration-300",
          variant !== "featured" && "group-hover/card:rounded-b-none",
          variant === "featured" ? "aspect-[2/3]" : "aspect-video"
        )}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              variant !== "featured" ? "group-hover/card:scale-105" : "group-hover/card:scale-110 z-0"
            )}
          />
          {variant === "featured" && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent z-10 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-none opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                <span className="inline-flex w-auto items-center justify-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-sm text-xs font-bold shadow-lg pointer-events-none">
                  <Play className="w-3 h-3 fill-current" />
                  View Project
                </span>
              </div>
            </>
          )}
        </div>

        {/* Netflix Number overlaid on image */}
        {topNumber !== undefined && (
          <div className="absolute -left-8 sm:-left-12 bottom-0 z-20 select-none pointer-events-none translate-y-0">
            <span className="netflix-number tracking-tighter">
              {topNumber}
            </span>
          </div>
        )}

        {/* Netflix Hover Info Panel (hidden by default, shown on hover) */}
        {variant !== "featured" && (
          <div className="absolute top-full left-0 w-full bg-[#141414] rounded-b-md border border-t-0 border-border/50 text-foreground opacity-0 pointer-events-none group-hover/card:opacity-100 transition-opacity duration-300 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="p-4 flex flex-col gap-3">
              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors z-30 relative">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </button>
                  <button className="h-8 w-8 rounded-full border border-neutral-500 bg-[#2a2a2a]/60 text-white flex items-center justify-center hover:border-white transition-colors z-30 relative">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="h-8 w-8 rounded-full border border-neutral-500 bg-[#2a2a2a]/60 text-white flex items-center justify-center hover:border-white transition-colors z-30 relative">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                </div>
                <button className="h-8 w-8 rounded-full border border-neutral-500 bg-[#2a2a2a]/60 text-white flex items-center justify-center hover:border-white transition-colors z-30 relative">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                <span className="text-green-500 font-semibold">98% match</span>
                <span className="border border-neutral-600 px-1 rounded-sm text-neutral-300">U/A 13+</span>
                <span className="text-neutral-300">2024</span>
                <span className="border border-neutral-600 px-1 rounded-sm text-neutral-300 text-[8px] sm:text-[10px]">HD</span>
              </div>

              {/* Title / Genres */}
              <div>
                 <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
                 <p className="text-xs text-muted-foreground flex flex-wrap gap-x-1.5 gap-y-1 mt-1">
                   {techStack.map((tech, i) => (
                     <span key={tech} className="inline-flex items-center">
                       {tech}
                       {i < techStack.length - 1 && (
                         <span className="mx-1 h-1 w-1 rounded-full bg-neutral-600" />
                       )}
                     </span>
                   ))}
                 </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Original metadata visible when not hovering */}
      <div className={cn(
        "flex flex-col gap-1 mt-2 px-1 transition-opacity duration-300",
        variant !== "featured" && "opacity-100 group-hover/card:opacity-0"
      )}>
        <h3 className="font-semibold tracking-tight text-lg line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground flex flex-wrap gap-x-2 gap-y-1">
          {techStack.map((tech, i) => (
            <span key={tech} className="inline-flex items-center">
              {tech}
              {i < techStack.length - 1 && (
                <span className="mx-1 h-1 w-1 rounded-full bg-muted-foreground/50" />
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
