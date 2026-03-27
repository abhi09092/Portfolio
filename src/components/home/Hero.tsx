"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { TechOrbit } from "./TechOrbit";
import Link from "next/link";
import { useState, useEffect } from "react";

const words = [
  "digital products.",
  "full stack apps.",
  "web experiences.",
  "software solutions.",
  "graphic designs.",
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex items-start justify-center pt-16 md:pt-20 pb-12 overflow-hidden px-4 bg-background">

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-muted/30 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </motion.div>
          
          <div className="flex flex-col gap-8 mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-foreground leading-[1.1] md:leading-[1]"
            >
              Hi, I'm Avi Pandit.<br />
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 md:gap-x-6 mt-2">
                <span className="text-muted-foreground whitespace-nowrap">I build</span>
                <div className="relative h-[1.1em] min-w-[280px] sm:min-w-[400px] md:min-w-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary whitespace-nowrap pb-2"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Senior Full Stack Engineer specializing in premium 
              experiences and modern backend architectures.
            </motion.p>
          </div>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link 
              href="#projects" 
              className="group relative px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold flex items-center gap-2 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 shadow-2xl shadow-primary/20 border border-white/10"
            >
              <span className="relative">View Details</span>
              <ChevronRight className="relative group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link 
              href="/about" 
              className="px-10 py-5 rounded-full border border-border bg-muted/20 backdrop-blur-md text-foreground hover:bg-muted/40 font-bold transition-all hover:border-foreground/40 active:scale-95 flex items-center gap-2"
            >
              About Me
              <ArrowRight size={18} />
            </Link>
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md text-primary hover:bg-primary/10 font-bold transition-all hover:border-primary/60 active:scale-95 flex items-center gap-2"
            >
              Resume
            </a>
          </motion.div>
        </div>

        {/* Right: Tech Orbit Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          className="flex-1 w-full max-w-[600px] relative pointer-events-none"
        >
          <TechOrbit />
        </motion.div>
      </div>
      
    </section>
  );
}
