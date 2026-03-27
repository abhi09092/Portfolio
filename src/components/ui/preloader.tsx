"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Animate percentage from 0 to 100 over 2 seconds
    let currentScore = 0;
    const duration = 2000;
    const interval = 20;
    const step = 100 / (duration / interval);

    const percentTimer = setInterval(() => {
      currentScore += step;
      if (currentScore >= 100) {
        setPercentage(100);
        clearInterval(percentTimer);
      } else {
        setPercentage(Math.floor(currentScore));
      }
    }, interval);

    // Set a timer to remove the loader after sequence finishes
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);

    return () => {
      clearInterval(percentTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo Sequence */}
            <div className="flex items-center text-5xl md:text-7xl font-bold tracking-tighter">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              >
                Avi
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                className="text-primary"
              >
                .dev
              </motion.span>
            </div>
            
            {/* Percent & Loading Bar Sequence */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <span className="text-sm font-mono text-muted-foreground">
                {percentage}%
              </span>
              <div className="w-48 md:w-64 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
            
            {/* Text Sequence */}
            <div className="h-8 flex items-center justify-center relative w-full mt-2">
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: [0, 1, 0], y: [5, 0, -5] }}
                transition={{ delay: 0.5, duration: 1.5, times: [0, 0.2, 1] }}
                className="text-muted-foreground text-sm font-mono uppercase tracking-widest absolute"
              >
                Initializing...
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="text-foreground text-xl font-medium tracking-wide absolute"
              >
                Welcome.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
