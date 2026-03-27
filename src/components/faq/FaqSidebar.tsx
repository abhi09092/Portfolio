"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, Trophy, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const companies = [
  { name: "Google", count: 12 },
  { name: "Meta", count: 8 },
  { name: "Amazon", count: 15 },
  { name: "Apple", count: 6 },
  { name: "Netflix", count: 4 },
  { name: "Microsoft", count: 9 },
  { name: "Uber", count: 7 },
  { name: "OpenAI", count: 10 },
];

interface FaqSidebarProps {
  onTagClick?: (tag: string) => void;
}

export function FaqSidebar({ onTagClick }: FaqSidebarProps) {
  // Mock calendar data: 7 columns (days) x 5 rows (weeks)
  // Static array to avoid hydration mismatch from Math.random()
  const calendarDots = [
    true, false, true, true, false, true, false, 
    false, true, true, false, true, true, false,
    true, false, true, false, true, true, true,
    false, true, false, true, false, false, true,
    true, true, false, true, false, true, true
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Statistics Card */}
      <div className="p-5 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
          <Trophy size={18} className="text-yellow-500" />
          <span>Session Stats</span>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">
              <span>Solved</span>
              <span className="text-foreground">4 / 15</span>
            </div>
            <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full" 
                style={{ width: "26%" }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
              <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Rank</div>
              <div className="text-lg font-bold text-foreground">#1,204</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
              <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Points</div>
              <div className="text-lg font-bold text-foreground">148</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Companies */}
      <div className="p-5 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
          <TrendingUp size={18} className="text-blue-500" />
          <span>Trending Companies</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {companies.map((company) => (
            <button
              key={company.name}
              onClick={() => onTagClick?.(company.name)}
              className="px-3 py-1.5 rounded-md bg-muted/40 hover:bg-muted border border-border/20 text-xs font-medium text-foreground transition-colors flex items-center gap-2 group"
            >
              <span>{company.name}</span>
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground/60 transition-colors">
                {company.count}
              </span>
            </button>
          ))}
        </div>
        
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/5 rounded-lg border border-blue-500/20">
          View All Tags
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Activity Calendar */}
      <div className="p-5 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
          <Calendar size={18} className="text-purple-500" />
          <span>Activity Calendar</span>
        </div>
        
        <div className="grid grid-cols-7 gap-1.5">
          {calendarDots.map((active, i) => (
            <div
              key={i}
              className={cn(
                "w-full aspect-square rounded-[2px] transition-colors",
                active 
                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                  : "bg-muted/30"
              )}
            />
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-[1px] bg-muted/30" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-500/30" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-500/60" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-500" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
