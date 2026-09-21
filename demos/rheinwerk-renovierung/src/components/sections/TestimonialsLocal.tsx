import { MapPin, Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function TestimonialsLocal() {
  return (
    <>
      <section className="section testimonials" aria-labelledby="stimmen-title">
        <div className="shell">
          <Reveal className="testimonial-head"><div><span className="eyebrow">Beispielstimmen · Konzeptinhalt</span><h2 id="stimmen-title">Was gute Zusammenarbeit<br /><em>ausmacht.</em></h2></div><p>Diese Stimmen sind fiktive Platzhalter für das Portfolio-Konzept und keine verifizierten Kundenbewertungen.</p></Reveal>
          <div className="testimonial-grid">{testimonials.map((testimonial, index) => <Reveal className="testimonial-card" delay={index * 0.08} key={testimonial.name}><Quote aria-hidden="true" /><blockquote>„{testimonial.quote}“</blockquote><footer><strong>{testimonial.name}</strong><span>{testimonial.project}</span></footer></Reveal>)}</div>
        </div>
      </section>
      <section className="local-section" aria-labelledby="local-title">
        <div className="shell local-grid">
          <Reveal><span className="eyebrow eyebrow-light"><MapPin size={15} /> Rhein-Neckar</span><h2 id="local-title">Renovierung in Mannheim<br />und Umgebung.</h2></Reveal>
          <Reveal className="local-copy" delay={0.1}><p>Ob Badsanierung in Mannheim, neue Böden in Heidelberg oder Innenrenovierung in Ludwigshafen: Wir planen Projekte im gesamten Rhein-Neckar-Raum mit kurzen Wegen und einem festen Ansprechpartner.</p><div className="city-list" aria-label="Einsatzgebiet"><span>Mannheim</span><span>Ludwigshafen</span><span>Heidelberg</span><span>Rhein-Neckar</span></div></Reveal>
        </div>
      </section>
    </>
  );
}
