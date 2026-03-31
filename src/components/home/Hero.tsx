"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { TechOrbit } from "./TechOrbit";
import Link from "next/link";
import { useState, useEffect } from "react";

const words = [
  "Full Stack developer",
  "UI/UX",
  "Software Developer",
  "Graphic Designer",
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
    <section className="relative w-full flex items-start justify-center pt-12 md:pt-16 pb-10 overflow-hidden px-4 bg-background">

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
        
        {/* LEFT */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">

          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-muted/30 text-xs md:text-sm font-medium mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </motion.div>

          {/* Heading */}
          <div className="flex flex-col gap-6 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-tight"
            >
              Hi, I'm Abhishek Sharma.
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 mt-2">
                <span className="text-muted-foreground">I build</span>

                <div className="relative h-[1.2em] min-w-[160px] sm:min-w-[240px] md:min-w-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary whitespace-nowrap"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Senior Full Stack Engineer specializing in premium 
              experiences and modern backend architectures.
            </motion.p>
          </div>

          {/* BUTTONS (FIXED + RESPONSIVE) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3 sm:gap-4"
          >
            {/* Primary */}
            <Link 
              href="#projects" 
              className="w-full sm:w-auto justify-center text-sm px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2 transition-all hover:shadow-lg active:scale-95"
            >
              View Details
              <ChevronRight size={16} />
            </Link>

            {/* Secondary */}
            <Link 
              href="/about" 
              className="w-full sm:w-auto justify-center text-sm px-5 py-3 rounded-full border border-border bg-muted/20 text-foreground hover:bg-muted/40 font-medium transition-all flex items-center gap-2"
            >
              About Me
              <ArrowRight size={16} />
            </Link>

            {/* Resume */}
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center text-sm px-5 py-3 rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 font-medium transition-all flex items-center gap-2"
            >
              Resume
            </a>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex-1 w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] pointer-events-none"
        >
          <TechOrbit />
        </motion.div>
      </div>
    </section>
  );
}
