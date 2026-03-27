"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Square, Code2, Terminal, ChevronRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
  difficulty: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  faq: FAQ;
}

export function IDEAnswerModal({ isOpen, onClose, faq }: Props) {
  const [typedAnswer, setTypedAnswer] = useState("");
  const [complete, setComplete] = useState(false);
  const [status, setStatus] = useState<"idle" | "running" | "success">("idle");

  const handleRun = () => {
    setTypedAnswer(faq.answer);
    setStatus("running");
    setTimeout(() => setStatus("success"), 1500);
  };

  const handleSubmit = () => {
    setStatus("running");
    setTimeout(() => {
      setStatus("success");
      // Simulated delay before closing or just showing success
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      setTypedAnswer("");
      setComplete(false);
      let i = 0;
      const interval = setInterval(() => {
        setTypedAnswer(faq.answer.slice(0, i));
        i++;
        if (i > faq.answer.length) {
          clearInterval(interval);
          setComplete(true);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [isOpen, faq.answer]);

  const lines = typedAnswer.split("\n");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-5xl h-full max-h-[85vh] bg-[#1e1e1e] rounded-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden ring-1 ring-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IDE Header */}
            <div className="h-12 border-b border-white/5 bg-[#252525] flex items-center justify-between px-4 shrink-0 z-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] border border-border/20 rounded-md text-sm font-medium text-foreground">
                  <Code2 size={16} className="text-blue-400" />
                  <span>solution.ts</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-semibold px-2">
                  <Terminal size={14} />
                  <span>Console</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-muted/20 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* IDE Body */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
              {/* Sidebar/Numbers */}
              <div className="hidden sm:flex w-12 bg-[#1e1e1e] border-r border-white/5 flex-col items-center py-6 text-muted-foreground/20 font-mono text-sm leading-6 select-none shrink-0">
                {Array.from({ length: Math.max(15, lines.length + 5) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code Area */}
              <div className="flex-1 overflow-y-auto bg-[#1e1e1e] p-6 font-mono text-sm leading-relaxed text-foreground/90 selection:bg-blue-500/30">
                <div className="mb-4 text-blue-400 italic">/**</div>
                <div className="mb-2 text-blue-400 italic"> * @question {faq.question}</div>
                <div className="mb-4 text-blue-400 italic"> */</div>

                <div className="mb-4">
                  <span className="text-purple-400">async function</span> <span className="text-yellow-400">getAnswer</span>() {"{"}
                </div>

                <div className="pl-6 border-l border-border/10">
                  <span className="text-purple-400">const</span> response = <span className="text-emerald-400">"{typedAnswer}"</span>;
                  <div className="mt-4">
                    <span className="text-purple-400">return</span> response;
                  </div>
                </div>

                <div className="mt-4 pb-20">
                  {"}"}
                </div>

                {!complete && (
                  <motion.div 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-blue-500 align-middle ml-1"
                  />
                )}
              </div>

              {/* Console Side Pane (Visible on Status) */}
              <div className={cn(
                "w-full md:w-80 border-t md:border-t-0 md:border-l border-white/5 bg-[#1a1a1a] p-4 font-mono text-xs transition-all duration-300",
                status === "idle" ? "hidden" : "block"
              )}>
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                  <Terminal size={12} />
                  <span>Output</span>
                </div>
                {status === "running" && (
                   <div className="text-blue-400 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                     <span>Compiling and running test cases...</span>
                   </div>
                )}
                {status === "success" && (
                   <div className="space-y-3">
                     <div className="text-emerald-400 font-bold flex items-center gap-2">
                       <CheckCircle2 size={14} />
                       <span>All Test Cases Passed!</span>
                     </div>
                     <div className="text-muted-foreground bg-black/20 p-2 rounded border border-white/5">
                        <div className="mb-1 text-[9px] uppercase">Runtime</div>
                        <div className="text-foreground">42 ms</div>
                     </div>
                     <div className="text-muted-foreground bg-black/20 p-2 rounded border border-white/5">
                        <div className="mb-1 text-[9px] uppercase">Memory</div>
                        <div className="text-foreground">41.2 MB</div>
                     </div>
                   </div>
                )}
              </div>
            </div>

            {/* IDE Footer */}
            <div className="h-12 border-t border-white/5 bg-[#252525] flex items-center justify-between px-6 shrink-0 text-xs text-muted-foreground font-medium z-10">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    status === "success" ? "bg-emerald-500" : "bg-emerald-500 animate-pulse"
                  )} />
                  <span>Language: TypeScript</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span>UTF-8</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  disabled={status === "running"}
                  className="flex items-center gap-2 px-3 py-1 bg-muted/40 hover:bg-muted font-bold text-foreground rounded-md transition-colors disabled:opacity-50"
                  onClick={handleRun}
                >
                  <Play size={14} className="fill-foreground" />
                  Run
                </button>
                <button 
                  disabled={status === "running"}
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md transition-colors shadow-lg disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
