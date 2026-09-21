import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  return (
    <section className="section projects" id="projekte">
      <div className="shell">
        <Reveal className="section-heading projects-heading">
          <div><span className="eyebrow">Ausgewählte Referenzen</span><h2>Räume mit<br />klarer Handschrift.</h2></div>
          <p>Sechs fiktive Beispielprojekte zeigen, wie unterschiedlich gute Renovierung aussehen kann – immer präzise, ruhig und passend zum Bestand.</p>
        </Reveal>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal className={`project-card project-${project.size}`} delay={(index % 2) * 0.08} key={`${project.title}-${project.location}`}>
              <article>
                <div className="project-image-wrap"><Image src={project.image} alt={`${project.title} – ${project.service} in ${project.location}`} fill sizes={project.size === "large" ? "(max-width: 768px) 100vw, 62vw" : "(max-width: 768px) 100vw, 42vw"} className="project-image" /><span className="project-number">{project.number}</span><span className="project-open" aria-hidden="true"><ArrowUpRight /></span></div>
                <div className="project-meta"><div><h3>{project.title}</h3><span>{project.location}</span></div><span>{project.service}</span></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
