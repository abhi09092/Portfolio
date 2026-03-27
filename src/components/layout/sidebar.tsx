"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/lib/context/SidebarContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Home, 
  MonitorPlay, 
  PlaySquare, 
  History, 
  ListVideo, 
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

const mainLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/#projects", icon: MonitorPlay },
  { name: "Experience", href: "/about", icon: PlaySquare },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
];

const personalLinks = [
  { name: "Resume", href: "/resume.pdf", icon: History },
  { name: "Skills", href: "/about#skills", icon: ListVideo },
  { name: "Contact", href: "/contact", icon: Clock },
];

const subscriptions = [
  { name: "Google", color: "bg-red-500", unread: true },
  { name: "Stanford Univ", color: "bg-blue-500", unread: false },
  { name: "Open Source", color: "bg-green-500", unread: true },
  { name: "Freelance", color: "bg-purple-500", unread: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex flex-col py-3">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-6 px-6 py-2.5 hover:bg-muted/80 transition-colors mx-3 rounded-xl",
                isActive ? "bg-muted font-medium text-foreground" : "text-foreground"
              )}
            >
              <Icon size={20} className={isActive ? "fill-foreground" : ""} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-sm tracking-tight">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="my-1 border-t border-border/40 mx-3" />

      {/* You Section */}
      <div className="flex flex-col py-2">
        <Link href="/about" className="flex items-center gap-2 px-6 py-2 hover:bg-muted/80 rounded-xl mx-3 group transition-colors">
          <span className="font-semibold text-[15px] tracking-tight text-foreground">You</span>
          <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
        
        {personalLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-6 px-6 py-2.5 hover:bg-muted/80 transition-colors mx-3 rounded-xl text-foreground"
            >
              <Icon size={20} className="text-foreground" strokeWidth={1.5} />
              <span className="text-sm tracking-tight">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="my-1 border-t border-border/40 mx-3" />

      {/* Subscriptions Section (Mocked as Clients/Experience) */}
      <div className="flex flex-col py-2">
        <h3 className="px-6 py-2 font-semibold text-[15px] tracking-tight text-foreground">Subscriptions</h3>
        
        {subscriptions.map((sub) => (
          <Link
            key={sub.name}
            href="#"
            className="flex items-center gap-5 px-6 py-2 hover:bg-muted/80 transition-colors mx-3 rounded-xl group relative"
          >
            <div className={cn("w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white", sub.color)}>
              {sub.name.charAt(0)}
            </div>
            <span className="text-sm tracking-tight text-foreground/90 truncate flex-1">{sub.name}</span>
            {sub.unread && (
              <div className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
            )}
          </Link>
        ))}
        
        <button className="flex items-center gap-5 px-6 py-2.5 hover:bg-muted/80 transition-colors mx-3 rounded-xl text-foreground mt-1">
          <ChevronDown size={20} strokeWidth={1.5} />
          <span className="text-sm tracking-tight">Show more</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-60 h-[calc(100vh-4rem)] sticky top-16 left-0 overflow-y-auto hidden lg:flex flex-col bg-background border-r border-border/40 pb-10 hide-scrollbar z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-[2px]"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-60 bg-background border-r border-border z-[70] lg:hidden flex flex-col shadow-2xl"
            >
              {/* Mobile Header (YouTube style) */}
              <div className="h-16 flex items-center px-4 shrink-0 border-b border-border/40">
                <button 
                  onClick={closeSidebar}
                  className="p-2 hover:bg-muted/80 rounded-full transition-colors"
                >
                  <motion.div animate={{ rotate: 90 }}>
                    <div className="w-5 h-0.5 bg-foreground mb-1.5" />
                    <div className="w-5 h-0.5 bg-foreground mb-1.5" />
                    <div className="w-5 h-0.5 bg-foreground" />
                  </motion.div>
                </button>
                <Link href="/" className="ml-4 font-bold text-xl tracking-tight flex items-center gap-1.5">
                  <div className="bg-red-600 text-white p-1 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </div>
                  <span className="font-semibold tracking-tighter">AviTube</span>
                </Link>
              </div>
              <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
                {sidebarContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
