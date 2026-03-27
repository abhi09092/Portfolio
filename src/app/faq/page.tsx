"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaqTable } from "@/components/faq/FaqTable";
import { StudyPlanSection } from "@/components/faq/StudyPlanSection";
import { FaqSidebar } from "@/components/faq/FaqSidebar";
import { Search, List, LayoutGrid } from "lucide-react";
import { faqItems } from "@/lib/data";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState("All Topics");

  // Filter items based on search, category, and topic
  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !activeCategory || item.category === activeCategory;
      
      const matchesTopic = activeTopic === "All Topics" || item.category === activeTopic;

      return matchesSearch && matchesCategory && matchesTopic;
    });
  }, [searchQuery, activeCategory, activeTopic]);

  const topics = ["All Topics", "Technical", "Career", "Personal"];

  return (
    <div className="flex-1 w-full bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Top Header */}
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-foreground mb-6"
          >
            Study Plan
          </motion.h1>
          <StudyPlanSection 
            activeCategory={activeCategory} 
            onSelectCategory={(cat) => setActiveCategory(cat === activeCategory ? null : cat)} 
          />
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Table Filters/Actions Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {topics.map((topic) => (
                  <button 
                    key={topic}
                    onClick={() => setActiveTopic(topic)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                      activeTopic === topic 
                        ? "bg-muted text-foreground border-border/40" 
                        : "hover:bg-muted/50 text-muted-foreground border-transparent"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="relative group">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-muted/30 border border-border/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 w-full md:w-64 transition-all"
                  />
                </div>
                <div className="flex items-center p-1 bg-muted/30 border border-border/40 rounded-lg">
                  <button className="p-1.5 bg-muted rounded-md text-foreground shadow-sm">
                    <List size={16} />
                  </button>
                  <button className="p-1.5 text-muted-foreground hover:text-foreground">
                    <LayoutGrid size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* The Main Table */}
            <FaqTable items={filteredItems} />
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <FaqSidebar onTagClick={(tag) => setSearchQuery(tag)} />
          </aside>
        </div>
      </div>
    </div>
  );
}
