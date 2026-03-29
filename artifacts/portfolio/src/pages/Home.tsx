import { useState } from "react";
import { usePortfolio } from "@/hooks/use-portfolio";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { FloatingEditButton } from "@/components/portfolio/FloatingEditButton";
import { EditorPanel } from "@/components/portfolio/EditorPanel";

// Simplified generic grid layout for sections not explicitly broken out into files for brevity
function GenericGridSection({ title, id, children }: { title: string, id: string, children: React.ReactNode }) {
  return (
    <section id={id} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12 text-center">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const { data, isInitialLoading } = usePortfolio();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  if (isInitialLoading || !data) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar name={data.hero.name} />
      
      <main>
        <HeroSection hero={data.hero} />
        <AboutSection about={data.about} />
        
        {/* SKILLS inline */}
        <section id="skills" className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12 text-center">Technical Arsenal</h2>
            <div className="space-y-8">
              {data.skills.map((skillGroup, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-6">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span key={sIdx} className="px-4 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg text-sm border border-border/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ExperienceSection experience={data.experience} />
        <ProjectsSection projects={data.projects} />

        {/* EDUCATION & CERTS inline for conciseness but maintaining design quality */}
        <section id="education" className="py-24 bg-muted/30 border-y border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-8">Education</h2>
                <div className="space-y-6">
                  {data.education.map(edu => (
                    <div key={edu.id} className="bg-background p-6 rounded-xl border border-border shadow-sm">
                      <h4 className="font-bold text-lg text-foreground">{edu.degree} in {edu.field}</h4>
                      <p className="text-primary font-medium mt-1">{edu.institution}</p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="bg-muted px-2 py-1 rounded-md">{edu.startYear} — {edu.endYear}</span>
                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-8">Certifications</h2>
                <div className="space-y-6">
                  {data.certifications.map(cert => (
                    <div key={cert.id} className="bg-background p-6 rounded-xl border border-border shadow-sm">
                      <h4 className="font-bold text-lg text-foreground">{cert.name}</h4>
                      <p className="text-muted-foreground font-medium mt-1">{cert.issuer}</p>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Issued: {cert.date}
                        {cert.credentialId && <span className="ml-4 opacity-50">ID: {cert.credentialId}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center text-muted-foreground border-t border-border">
        <p className="font-medium">© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
      </footer>

      <FloatingEditButton onClick={() => setIsEditorOpen(true)} />
      
      {isEditorOpen && (
        <EditorPanel 
          portfolio={data} 
          isOpen={isEditorOpen} 
          onClose={() => setIsEditorOpen(false)} 
        />
      )}
    </div>
  );
}
