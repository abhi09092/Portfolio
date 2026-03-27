"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Terminal, Menu, Search, Mic, Plus, Bell, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/lib/context/NotificationContext";
import { useSidebar } from "@/lib/context/SidebarContext";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  // Voice Modal State
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Waiting for microphone...");
  const [interimText, setInterimText] = useState("");
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  // Notification State
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { toggleSidebar } = useSidebar();
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    if (query.includes("about") || query.includes("me") || query.includes("experience")) {
      router.push("/about");
    } else if (query.includes("skill") || query.includes("tech")) {
      router.push("/about#skills");
    } else if (query.includes("contact") || query.includes("hire") || query.includes("email")) {
      router.push("/contact");
    } else if (query.includes("project") || query.includes("work") || query.includes("portfolio")) {
      router.push("/#projects");
    } else if (query.includes("terminal") || query.includes("cmd") || query.includes("command")) {
      router.push("/terminal");
    } else if (query.includes("resume") || query.includes("cv")) {
      window.open("/resume.pdf", "_blank");
    } else {
      alert(`Search results for: "${searchQuery}"\n\n(Hint: try searching for 'projects', 'skills', 'about', or 'terminal')`);
    }
  };

  const startListening = () => {
    setIsVoiceModalOpen(true);
    setInterimText("");
    setVoiceStatus("Listening...");

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus("Voice search is not supported by your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true; // Enable live transcription
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceStatus("Listening...");
    };

    recognition.onresult = (event: any) => {
      let currentInterim = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }
      
      if (currentInterim) {
        setInterimText(currentInterim);
      }
      
      if (finalTranscript) {
        setInterimText(finalTranscript);
        setSearchQuery(finalTranscript);
        
        // Wait briefly, then close modal and search automatically
        setTimeout(() => {
          closeVoiceModal();
          const query = finalTranscript.toLowerCase();
          if (query.includes("about") || query.includes("me") || query.includes("experience")) router.push("/about");
          else if (query.includes("skill") || query.includes("tech")) router.push("/about#skills");
          else if (query.includes("contact") || query.includes("hire") || query.includes("email")) router.push("/contact");
          else if (query.includes("project") || query.includes("work") || query.includes("portfolio")) router.push("/#projects");
          else if (query.includes("terminal") || query.includes("cmd") || query.includes("command")) router.push("/terminal");
          else if (query.includes("resume") || query.includes("cv")) window.open("/resume.pdf", "_blank");
          else alert(`Voice searched: "${finalTranscript}"\n\n(Hint: try searching for 'projects', 'skills', 'about', or 'terminal')`);
        }, 800);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setVoiceStatus("To search by voice, go to your browser settings and allow access to microphone");
      } else {
        setVoiceStatus("Didn't hear that. Try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!interimText) {
        setVoiceStatus("Microphone is off. Click to try again.");
      }
    };

    setRecognitionInstance(recognition);
    recognition.start();
  };

  const closeVoiceModal = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
    }
    setIsVoiceModalOpen(false);
    setIsListening(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40">
      <div className="w-full px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center gap-4 shrink-0 w-auto">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-muted/80 rounded-full transition-colors"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-1.5 focus:outline-none">
            <div className="bg-red-600 text-white p-1 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <span className="font-semibold tracking-tighter">AviTube</span>
          </Link>
        </div>
        
        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-[720px] flex items-center gap-3 ml-2 lg:ml-10">
          <form onSubmit={handleSearch} className="flex flex-1 items-center bg-background border border-border/50 rounded-full overflow-hidden hover:border-border/80 transition-colors shadow-inner">
            <div className="hidden sm:flex px-4 border-r border-border/40">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portfolios, skills, projects..." 
              className="flex-1 bg-transparent px-4 py-2 outline-none w-full"
            />
            <button type="submit" className="bg-muted px-5 py-2 hover:bg-muted/80 transition-colors border-l border-border/50">
              <Search size={20} className="text-foreground" strokeWidth={1.5} />
            </button>
          </form>
          <button 
            type="button"
            onClick={startListening}
            className={cn(
              "p-2.5 rounded-full transition-colors shrink-0",
              isListening ? "bg-red-500/20 text-red-500 cursor-wait animate-pulse" : "bg-muted hover:bg-muted/80 text-foreground"
            )}
            title="Search with your voice"
          >
            <Mic size={20} className="stroke-current" strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Right Section - Icons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4">
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1.5 rounded-full transition-colors text-sm font-bold shadow-lg shadow-primary/20"
          >
            <Plus size={18} strokeWidth={2.5} /> Resume
          </a>
          
          <div className="relative">
            <button 
              onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
              className="p-2 hover:bg-muted/80 rounded-full transition-colors relative"
            >
              <Bell size={20} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 shrink-0 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600 border-2 border-background text-[10px] font-bold text-white shadow-sm">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            
            {isNotificationMenuOpen && (
              <div className="absolute right-0 mt-2 w-[320px] bg-[#282828] rounded-xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)] border border-white/10 z-50 overflow-hidden transform origin-top-right transition-all">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <span className="font-semibold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-[#3ea6ff] hover:text-[#5eb3ff]">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto hide-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                      <Bell className="w-8 h-8 opacity-20" />
                      Your notifications live here.
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={cn("px-4 py-3 flex gap-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5", !n.read && "bg-[#3ea6ff]/10")}>
                        <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-lg font-bold text-white bg-green-600/80">
                           {n.title.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="text-[13px] text-white font-medium mb-0.5">{n.title}</div>
                           <div className="text-[13px] text-muted-foreground leading-snug line-clamp-2">{n.message}</div>
                           <div className="text-[11px] text-muted-foreground mt-1">{n.time}</div>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#3ea6ff] shrink-0 mt-2" />}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/terminal" 
            className="p-2 hover:bg-muted/80 rounded-full transition-colors hidden md:block"
            aria-label="Open Terminal"
          >
            <Terminal size={20} strokeWidth={1.5} />
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-muted/80 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />
            ) : (
              <div className="w-[20px] h-[20px]" />
            )}
          </button>

          <div className="w-8 h-8 rounded-full overflow-hidden ml-2 cursor-pointer border border-border shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
              alt="Avatar"
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </div>

      {/* Voice Search Modal mapped precisely to YouTube dark visual specs */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/60 backdrop-blur-sm">
          <div className="bg-[#212121] w-full max-w-[600px] h-[400px] shadow-2xl relative p-8 flex flex-col pt-12 rounded opacity-100 transform scale-100 transition-all duration-200">
            <button 
              onClick={closeVoiceModal}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-[28px] font-normal text-white mt-1 mb-4 leading-tight">
              {interimText || voiceStatus}
            </h2>
            
            <div className="mt-auto flex justify-center pb-8">
              <button 
                onClick={() => {
                  if (!isListening) startListening();
                  else closeVoiceModal();
                }}
                className={cn(
                  "w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all",
                  isListening 
                    ? "bg-[#cc0000] text-white animate-pulse" 
                    : "bg-[#303030] text-white hover:bg-[#3f3f3f]"
                )}
              >
                <Mic size={32} strokeWidth={isListening ? 2 : 1.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
