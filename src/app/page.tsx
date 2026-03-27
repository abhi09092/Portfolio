"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { featuredProjects, allProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const allProjectsRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      <Hero />

      {/* Featured Projects - Netflix Style Horizontal Scroll */}
      <section className="relative w-full space-y-4 group/featured py-8">
        <div className="w-full max-w-7xl px-4 mx-auto flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
          <div className="text-sm text-muted-foreground hidden sm:block">Scroll →</div>
        </div>
        
        <div className="relative w-full group">
          {/* Scroll Arrows */}
          <button 
            onClick={() => scrollSlider(featuredRef, "left")}
            className="absolute left-0 top-0 bottom-12 z-20 w-12 md:w-16 bg-gradient-to-r from-background to-transparent opacity-100 md:opacity-0 group-hover/featured:opacity-100 transition-opacity flex items-center justify-start pl-2 md:pl-4 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-foreground/70 hover:text-foreground hover:scale-110 transition-all" />
          </button>
          
          <button 
            onClick={() => scrollSlider(featuredRef, "right")}
            className="absolute right-0 top-0 bottom-12 z-20 w-16 md:w-24 bg-gradient-to-l from-background to-transparent opacity-100 md:opacity-0 group-hover/featured:opacity-100 transition-opacity flex items-center justify-end pr-2 md:pr-4 cursor-pointer"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-foreground/70 hover:text-foreground hover:scale-110 transition-all" />
          </button>

          <div className="w-full">
            <div 
              ref={featuredRef}
              className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-12 pb-32 pt-16 px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2+1rem))] scroll-smooth"
            >
              {featuredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative group w-[80vw] sm:w-[300px] md:w-[340px] flex-none snap-center ml-12 first:ml-12"
                >
                  {/* Project Card */}
                  <div className="relative z-10 w-full h-full">
                    <ProjectCard {...project} variant="featured" topNumber={idx + 1} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Projects - Horizontal Slider */}
      <section id="projects" className="relative w-full space-y-4 py-12 border-t border-border/40 group/all">
        <div className="w-full max-w-7xl px-4 mx-auto flex flex-col gap-2 relative z-10">
          <h2 className="text-2xl font-bold tracking-tight">All Projects</h2>
          <p className="text-muted-foreground">A collection of my recent work across different domains.</p>
        </div>
        
        <div className="relative w-full">
          {/* Scroll Arrows */}
          <button 
            onClick={() => scrollSlider(allProjectsRef, "left")}
            className="absolute left-0 top-0 bottom-12 z-20 w-12 md:w-16 bg-gradient-to-r from-background to-transparent opacity-100 md:opacity-0 group-hover/all:opacity-100 transition-opacity flex items-center justify-start pl-2 md:pl-4 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-foreground/70 hover:text-foreground hover:scale-110 transition-all" />
          </button>
          
          <button 
            onClick={() => scrollSlider(allProjectsRef, "right")}
            className="absolute right-0 top-0 bottom-12 z-20 w-16 md:w-24 bg-gradient-to-l from-background to-transparent opacity-100 md:opacity-0 group-hover/all:opacity-100 transition-opacity flex items-center justify-end pr-2 md:pr-4 cursor-pointer"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-foreground/70 hover:text-foreground hover:scale-110 transition-all" />
          </button>

          <div className="w-full">
            <div 
              ref={allProjectsRef}
              className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-32 pt-16 px-6 md:px-[max(1.5rem,calc((100vw-1280px)/2+1rem))] scroll-smooth"
            >
              {allProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: (idx % 4) * 0.1 
                  }}
                  className="w-[90vw] sm:w-[400px] md:w-[450px] flex-none snap-center"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
