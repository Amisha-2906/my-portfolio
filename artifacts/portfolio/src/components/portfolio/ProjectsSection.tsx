import { motion } from "framer-motion";
import { type Project as ProjectType } from "@workspace/api-client-react";
import { ExternalLink, BarChart3 } from "lucide-react";

export function ProjectsSection({ projects }: { projects: ProjectType[] }) {
  return (
    <section id="projects" className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Featured Analysis</h2>
            <p className="text-muted-foreground max-w-xl">
              Deep dives into complex datasets, resulting in actionable strategic insights.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-500 flex flex-col h-full"
            >
              <div className="p-8 flex-1 flex flex-col">
                
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    <BarChart3 size={14} />
                    {project.category}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="bg-muted/50 rounded-xl p-4 mb-8 mt-auto border border-border/50">
                  <p className="text-sm font-semibold text-foreground mb-1 uppercase tracking-wider text-primary">Business Impact</p>
                  <p className="text-foreground font-medium">{project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tools.map((tool, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium text-muted-foreground bg-background border border-border px-2.5 py-1 rounded-md">
                      {tool}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
