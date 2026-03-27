"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Folder, GitBranch, Check, Clock, FileCode, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
  time: string;
  success: boolean;
}

const PromptHeader = ({ time, success = true }: { time: string, success?: boolean }) => (
  <div className="flex justify-between items-center w-full text-xs sm:text-sm mt-1 select-none">
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-white text-base leading-none"></span>
      <span className="text-[#00e5e5] font-bold">avi</span>
      <span className="text-gray-400">at</span>
      <span className="text-[#00d700] font-bold">MacBookPro</span>
      <span className="text-gray-400">in</span>
      <span className="text-[#d7d700] flex items-center gap-1 font-bold">
        <Folder size={12} className="fill-current" /> ~/portfolio
      </span>
      <span className="text-blue-400 flex items-center gap-1 font-bold ml-1">
        <GitBranch size={12} /> main <span className="text-blue-400 ml-0.5 font-black">✗</span>
      </span>
    </div>
    {time && (
      <div className="flex items-center gap-1.5 shrink-0 opacity-80">
        {success ? <Check size={14} className="text-[#00d700] stroke-[3]" /> : <X size={14} className="text-[#ff5f56] stroke-[3]" />}
        <span className="text-gray-300 flex items-center gap-1"><Clock size={12} /> {time}</span>
      </div>
    )}
  </div>
);

export function TerminalComponent({ onClose }: { onClose?: () => void }) {
  const [input, setInput] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Initial history setup to avoid hydration mismatches with Date
    const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setCurrentTime(now);
    setHistory([
      {
        command: "welcome",
        output: (
          <div className="text-gray-300 mt-1">
            Welcome to Avi's Terminal Portfolio! [Version 1.0.0]<br />
            Type <span className="text-[#00e5e5] font-bold">'help'</span> for a list of available commands.
          </div>
        ),
        time: now,
        success: true
      }
    ]);

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let output: React.ReactNode = "";
    let success = true;
    
    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm mt-1 text-gray-300">
            <span className="text-[#00e5e5] font-bold">ls</span><span>List directory contents</span>
            <span className="text-[#00e5e5] font-bold">about</span><span>Learn about me</span>
            <span className="text-[#00e5e5] font-bold">projects</span><span>View my work</span>
            <span className="text-[#00e5e5] font-bold">skills</span><span>See my tech stack</span>
            <span className="text-[#00e5e5] font-bold">resume</span><span>Download my resume</span>
            <span className="text-[#00e5e5] font-bold">contact</span><span>Get in touch</span>
            <span className="text-[#00e5e5] font-bold">github</span><span>Open GitHub</span>
            <span className="text-[#00e5e5] font-bold">clear</span><span>Clear the terminal</span>
            <span className="text-[#00e5e5] font-bold">sudo hire-me</span><span>???</span>
          </div>
        );
        break;
      case "ls":
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mt-1">
            <span className="text-blue-400 flex items-center gap-1 font-bold"><Folder size={14} className="fill-current" /> src/</span>
            <span className="text-blue-400 flex items-center gap-1 font-bold"><Folder size={14} className="fill-current" /> public/</span>
            <span className="text-[#00d700] flex items-center gap-1"><FileCode size={14} /> package.json</span>
            <span className="text-[#d7d700] flex items-center gap-1"><FileText size={14} /> README.md</span>
            <span className="text-[#00e5e5] flex items-center gap-1"><FileCode size={14} /> tailwind.config.ts</span>
            <span className="text-gray-400 flex items-center gap-1"><FileText size={14} /> .env.local</span>
          </div>
        );
        break;
      case "about":
        output = <div className="text-gray-300 mt-1">I am a Senior Full Stack Engineer with a passion for building beautiful, responsive, and performance-driven web applications... (routing to /about)</div>;
        setTimeout(() => router.push("/about"), 1500);
        break;
      case "projects":
        output = <div className="text-gray-300 mt-1">Routing you to the projects grid...</div>;
        setTimeout(() => {
          if (onClose) onClose();
          router.push("/#projects");
        }, 1500);
        break;
      case "skills":
        output = <div className="text-gray-300 mt-1">React, Next.js, <span className="text-blue-400">TypeScript</span>, Node.js, <span className="text-[#00e5e5]">Tailwind CSS</span>, Python, AWS, Docker...</div>;
        break;
      case "resume":
        output = <div className="text-gray-300 mt-1">Initiating resume download...</div>;
        // In reality, trigger download here
        break;
      case "contact":
        output = <div className="text-gray-300 mt-1">Email me at: <span className="text-[#00e5e5] underline">avi.pandit@example.com</span></div>;
        break;
      case "github":
        output = <div className="text-gray-300 mt-1">Opening GitHub profile...</div>;
        setTimeout(() => window.open('https://github.com', '_blank'), 1000);
        break;
      case "clear":
        setHistory([]);
        return;
      case "sudo hire-me":
        output = (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[#d7d700] font-bold text-lg mt-2"
          >
            🎉 Access Granted! Let's build something amazing together! 🎉
            <br />
            <span className="text-sm font-normal text-gray-300">Redirecting to contact page...</span>
          </motion.div>
        );
        setTimeout(() => router.push("/about"), 3000);
        break;
      case "":
        output = "";
        break;
      default:
        success = false;
        output = <div className="mt-1 text-[#ff5f56]">zsh: command not found: {trimmedCmd}</div>;
    }

    setHistory((prev) => [...prev, { command: cmd, output, time: now, success }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="w-full h-[80vh] max-h-[700px] min-h-[400px] flex flex-col bg-[#1e1e1e] rounded-xl border border-border shadow-2xl overflow-hidden font-mono text-sm isolate">
      {/* MacOS Window Header */}
      <div className="flex items-center px-4 py-3 bg-[#2d2d2d] relative border-b border-black/40 shrink-0 select-none">
        <div className="flex items-center gap-2 z-10">
          <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group outline-none overflow-hidden">
             {onClose && <X size={10} className="opacity-0 group-hover:opacity-100 text-black/60 transition-opacity" />}
          </button>
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-xs text-gray-400 font-bold absolute left-1/2 -translate-x-1/2 tracking-wide z-0">
          Terminal
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-y-auto hide-scrollbar text-gray-300 flex flex-col gap-3" onClick={() => inputRef.current?.focus()}>
        <AnimatePresence initial={false}>
          {history.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-1 pb-2 border-b border-white/5 last:border-b-0"
            >
              <PromptHeader time={item.time} success={item.success} />
              <div className="flex gap-2 items-center mt-1">
                <span className="text-[#ff5f56] font-bold text-base leading-none translate-y-px">$</span>
                <span className="text-gray-100 tracking-wide">{item.command}</span>
              </div>
              {item.output && <div className="ml-0">{item.output}</div>}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Active Prompt */}
        <div className="flex flex-col gap-1 mt-1">
          <PromptHeader time={currentTime} success={true} />
          <div className="flex gap-2 items-center mt-1">
            <span className="text-[#ff5f56] font-bold text-base leading-none translate-y-px">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none border-none text-gray-100 placeholder:text-gray-600 focus:not-italic tracking-wide"
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
