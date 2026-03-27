"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const techIcons = [
  { name: "React", icon: "⚛️", color: "text-[#61DAFB]", x: 140, y: -40, delay: 0 },
  { name: "TS", icon: "TS", color: "text-[#3178C6]", x: 40, y: 70, delay: 0.2 },
  { name: "JS", icon: "JS", color: "text-[#F7DF1E]", x: 100, y: -120, delay: 0.4 },
  { name: "AWS", icon: "aws", color: "text-[#FF9900]", x: 180, y: 80, delay: 0.6 },
  { name: "Firebase", icon: "🔥", color: "text-[#FFCA28]", x: -30, y: -80, delay: 0.8 },
  { name: "GitHub", icon: "🐙", color: "text-foreground", x: 70, y: 140, delay: 1.0 },
  { name: "Vercel", icon: "▲", color: "text-foreground", x: 160, y: -10, delay: 1.2 },
  { name: "Node", icon: "🟢", x: -90, y: 40, delay: 1.4 },
];

export function TechOrbit() {
  return (
    <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-visible select-none pointer-events-none">
      {/* Background Radar/Grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Concentric Circles */}
        <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-border/20" />
        <div className="absolute w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full border border-border/10" />
        <div className="absolute w-[500px] h-[500px] md:w-[750px] md:h-[750px] rounded-full border border-border/5" />
        
        {/* Cross Lines */}
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-border/20 to-transparent" />
        
        {/* Diagonal Lines */}
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-border/10 to-transparent rotate-45" />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-border/10 to-transparent -rotate-45" />
      </div>

      <div className="relative">
        
        {techIcons.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: tech.x,
              y: tech.y,
            }}
            transition={{ 
              delay: tech.delay,
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.div
              animate={{
                y: [tech.y, tech.y - 20, tech.y],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={cn(
                "absolute p-3 rounded-xl bg-card/40 backdrop-blur-md border border-border/50 shadow-2xl flex items-center justify-center font-bold text-sm md:text-base cursor-default select-none transition-all hover:scale-110 hover:border-primary/50",
                tech.color || "text-foreground"
              )}
              style={{
                width: 50,
                height: 50,
                marginLeft: -25,
                marginTop: -25,
              }}
            >
              {tech.icon}
            </motion.div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
