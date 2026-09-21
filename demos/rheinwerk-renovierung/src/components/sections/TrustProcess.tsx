import { Check, CircleDotDashed } from "lucide-react";
import { processSteps } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

const values = ["Kostenlose Beratung", "Transparente Angebote", "Pünktliche Umsetzung", "Hochwertige Materialien", "Saubere Baustelle", "Persönlicher Ansprechpartner"];

export function TrustProcess() {
  return (
    <>
      <section className="section quality" id="qualitaet">
        <div className="shell quality-grid">
          <Reveal className="quality-title"><span className="eyebrow eyebrow-light">Warum RheinWerk</span><h2>Gute Arbeit beginnt<br />vor dem ersten <em>Handgriff.</em></h2></Reveal>
          <Reveal className="quality-copy" delay={0.1}><p className="quality-lead">Klare Absprachen, realistische Zeitpläne und Respekt vor Ihrem Zuhause.</p><p>Wir denken das Projekt als Ganzes: vom Materialanschluss bis zur Kommunikation. Damit Sie jederzeit wissen, was als Nächstes passiert.</p></Reveal>
          <div className="value-rail">{values.map((value, index) => <Reveal className="value-item" delay={index * 0.045} key={value}><span>{String(index + 1).padStart(2, "0")}</span><Check size={19} /><strong>{value}</strong></Reveal>)}</div>
        </div>
      </section>
      <section className="section process" id="ablauf">
        <div className="shell">
          <Reveal className="section-heading process-heading"><div><span className="eyebrow">Der Ablauf</span><h2>Vier Schritte.<br />Ein klarer Weg.</h2></div><p>Von der ersten Idee bis zum fertig renovierten Raum bleiben Planung und Verantwortung in einer Hand.</p></Reveal>
          <div className="process-list">{processSteps.map((step, index) => <Reveal className="process-step" delay={index * 0.08} key={step.number}><div className="process-marker"><CircleDotDashed /><span>{step.number}</span></div><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div>
        </div>
      </section>
    </>
  );
}
