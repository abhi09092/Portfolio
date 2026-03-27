"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useNotifications } from "@/lib/context/NotificationContext";

export default function ContactPage() {
  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Fire the contextual notification to update the Navbar Bell globally
    addNotification({
      title: formData.name,
      message: formData.message.length > 50 ? formData.message.substring(0, 50) + "..." : formData.message,
      time: "Just now"
    });

    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-12 lg:flex-row min-h-[calc(100vh-8rem)]">
      
      {/* Left Column - Contact Info */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/3 flex flex-col gap-8"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Get in touch</h1>
          <p className="text-muted-foreground text-lg">
            Have a question, a project idea, or just want to say hi? Contact me through the form or my social links.
          </p>
        </div>

        <div className="flex flex-col gap-6 mt-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40 w-fit md:w-full max-w-[400px]">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Mail className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Email</p>
              <a href="mailto:hello@avi.dev" className="text-foreground font-semibold hover:underline">abhisheksharmaa.233@gmail.com</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40 w-fit md:w-full max-w-[400px]">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Location</p>
              <p className="text-foreground font-semibold">Jalandhar, Punjab, India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/40 w-fit md:w-full max-w-[400px]">
             <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Phone className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Phone</p>
              <p className="text-foreground font-semibold">+91 9170231926</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Column - Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:w-2/3"
      >
        <div className="bg-[#18181b] sm:bg-[#141417]/80 rounded-2xl md:p-8 sm:border sm:border-border/30 h-fit relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#141417] z-10 p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground max-w-md">
                  Thanks for reaching out! I've automatically pushed a notification to your Navbar to test the system. Check the bell icon above!
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground/80 pl-1">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground/80 pl-1">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground/80 pl-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground/80 pl-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Avi, I loved your portfolio..."
                    rows={6}
                    className="bg-background/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder:text-muted-foreground/50 resize-y min-h-[150px]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-8 py-4 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
