import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/lib/context/NotificationContext";
import { SidebarProvider } from "@/lib/context/SidebarContext";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/ui/preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avi Pandit | Developer Portfolio",
  description: "Modern developer portfolio featuring projects, skills, and interactive terminal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NotificationProvider>
            <SidebarProvider>
              <Preloader />
              <Navbar />
              <div className="flex flex-1 w-full relative">
                <Sidebar />
                <div className="flex flex-1 flex-col min-w-0 w-full overflow-x-hidden">
                  <main className="flex-1 flex flex-col">
                    {children}
                  </main>
                  <Footer />
                </div>
              </div>
            </SidebarProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
