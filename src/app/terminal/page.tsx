import { TerminalComponent } from "@/components/ui/terminal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TerminalPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-4 h-[calc(100vh-8rem)]">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ArrowLeft size={16} /> Back to GUI
      </Link>
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 items-center justify-center">
        <TerminalComponent />
      </div>
    </div>
  );
}
