"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { faqItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { IDEAnswerModal } from "@/components/faq/IDEAnswerModal";

interface FaqTableProps {
  items: typeof faqItems;
}

export function FaqTable({ items }: FaqTableProps) {
  const [selectedFaq, setSelectedFaq] = useState<typeof faqItems[0] | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-emerald-500 bg-emerald-500/10";
      case "Medium": return "text-amber-500 bg-amber-500/10";
      case "Hard": return "text-rose-500 bg-rose-500/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/40 bg-muted/30">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-16">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-32">Acceptance</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground w-32">Difficulty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {items.map((faq, index) => (
              <tr 
                key={faq.id}
                onClick={() => setSelectedFaq(faq)}
                className={cn(
                  "group cursor-pointer transition-colors",
                  index % 2 === 0 ? "bg-transparent" : "bg-muted/10",
                  "hover:bg-muted/40"
                )}
              >
                <td className="px-6 py-4">
                  {faq.status === "Solved" ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <Circle size={18} className="text-muted-foreground/40" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground group-hover:text-blue-500 transition-colors">
                      {index + 1}. {faq.question}
                    </span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 text-blue-500 transition-all transform scale-90 group-hover:scale-100" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                  {faq.acceptance}
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getDifficultyColor(faq.difficulty)
                  )}>
                    {faq.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFaq && (
        <IDEAnswerModal 
          isOpen={!!selectedFaq} 
          onClose={() => setSelectedFaq(null)} 
          faq={selectedFaq} 
        />
      )}
    </div>
  );
}
