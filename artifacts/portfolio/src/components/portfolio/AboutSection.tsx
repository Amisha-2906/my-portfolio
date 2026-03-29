import { motion } from "framer-motion";
import { type AboutSection as AboutType } from "@workspace/api-client-react";
import { ChevronRight } from "lucide-react";

export function AboutSection({ about }: { about: AboutType }) {
  return (
    <section id="about" className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="md:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6"
            >
              Professional <br/><span className="text-primary">Summary.</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-20 h-1 bg-primary rounded-full"
            />
          </div>

          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-slate dark:prose-invert text-muted-foreground"
            >
              <p className="lead text-xl text-foreground font-medium mb-8">
                {about.summary}
              </p>
              
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-bold text-foreground mb-4 font-display uppercase tracking-wider">Key Highlights</h3>
                {about.highlights.map((highlight, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border shadow-sm"
                  >
                    <div className="mt-0.5 bg-primary/10 text-primary p-1 rounded-md shrink-0">
                      <ChevronRight size={16} />
                    </div>
                    <p className="text-foreground font-medium m-0">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
