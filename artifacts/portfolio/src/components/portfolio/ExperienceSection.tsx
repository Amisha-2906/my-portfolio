import { motion } from "framer-motion";
import { type Experience as ExpType } from "@workspace/api-client-react";
import { Calendar, MapPin } from "lucide-react";

export function ExperienceSection({ experience }: { experience: ExpType[] }) {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A track record of delivering data-driven value across organizations.
          </p>
        </div>

        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[35%] top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>
              
              {/* Timeline Line (Mobile) */}
              <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-border"></div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                
                {/* Left Side: Meta info */}
                <div className="md:w-[35%] md:text-right relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-33px] md:left-auto md:right-[-29px] top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--background))] z-10"></div>
                  
                  <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                  <div className="flex items-center md:justify-end gap-2 text-muted-foreground mt-1 mb-2">
                    <Calendar size={14} />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex items-center md:justify-end gap-2 text-muted-foreground text-sm">
                    <MapPin size={14} />
                    {exp.location}
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="md:w-[65%] pb-8 md:pb-12">
                  <h4 className="text-xl font-display font-bold text-primary mb-3">{exp.role}</h4>
                  <p className="text-muted-foreground mb-6 font-medium">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-foreground/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0"></span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-semibold tracking-wide">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
