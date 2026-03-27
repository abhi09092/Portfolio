"use client";

import { motion } from "framer-motion";
import { BookOpen, Code, Target, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    title: "Soft Skills",
    subtitle: "Master the Art of Communication",
    problems: 15,
    color: "from-orange-500 to-orange-600",
    icon: BookOpen,
    tag: "Essential"
  },
  {
    title: "Tech Stack",
    subtitle: "Deep Dive into Modern Web Tech",
    problems: 42,
    color: "from-blue-500 to-blue-600",
    icon: Code,
    tag: "Most Popular"
  },
  {
    title: "Career Goals",
    subtitle: "Scaling to Senior & Beyond",
    problems: 8,
    color: "from-purple-500 to-purple-600",
    icon: Target,
    tag: "Future"
  }
];

interface StudyPlanSectionProps {
  activeCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export function StudyPlanSection({ activeCategory, onSelectCategory }: StudyPlanSectionProps) {
  // Map card titles to data categories
  const categoryMap: Record<string, string> = {
    "Soft Skills": "Personal",
    "Tech Stack": "Technical",
    "Career Goals": "Career"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {plans.map((plan, i) => {
        const Icon = plan.icon;
        const category = categoryMap[plan.title];
        const isActive = activeCategory === category;

        return (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "group relative overflow-hidden rounded-2xl p-6 cursor-pointer",
              "bg-gradient-to-br transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
              plan.color,
              isActive ? "ring-4 ring-blue-500/50 scale-[1.02] shadow-xl" : "opacity-90 hover:opacity-100"
            )}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
            
            <div className="relative z-10 flex flex-col h-full text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  <Icon size={24} />
                </div>
                {plan.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-md">
                    {plan.tag}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform">{plan.title}</h3>
              <p className="text-white/80 text-xs font-medium mb-4 line-clamp-1">{plan.subtitle}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs font-bold bg-black/10 w-fit px-3 py-1.5 rounded-full">
                <Star size={12} className="fill-white" />
                <span>{plan.problems} Questions</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
