import { motion } from "framer-motion";
import { Mail, FileText, MapPin, Github, Linkedin } from "lucide-react";
import { type HeroSection as HeroType } from "@workspace/api-client-react";

export function HeroSection({ hero }: { hero: HeroType }) {
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <div className="w-full h-full bg-primary/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        <motion.div 
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            {hero.name}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground mt-2 pb-2">
              {hero.title}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
            <a 
              href={`mailto:${hero.email}`}
              className="px-8 py-3.5 rounded-xl font-medium bg-foreground text-background shadow-lg shadow-black/5 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Mail size={18} />
              Contact Me
            </a>
            {hero.resumeUrl && (
              <a 
                href={hero.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-xl font-medium bg-background border-2 border-border text-foreground hover:border-foreground/20 hover:bg-muted/50 transition-all duration-300 flex items-center gap-2"
              >
                <FileText size={18} />
                Download CV
              </a>
            )}
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 text-muted-foreground">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <MapPin size={16} />
              {hero.location}
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            {hero.linkedin && (
              <a href={hero.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {hero.github && (
              <a href={hero.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="w-full md:w-1/2 lg:w-5/12 aspect-square max-w-[500px] relative hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-muted to-background rounded-[2rem] border border-border/50 shadow-2xl rotate-3 scale-105" />
          <div className="absolute inset-0 bg-card rounded-[2rem] border border-border shadow-xl overflow-hidden flex items-center justify-center p-8">
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-abstract.png`}
              alt="Data abstraction"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
