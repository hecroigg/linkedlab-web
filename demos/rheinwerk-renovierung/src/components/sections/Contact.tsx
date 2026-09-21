"use client";

import { ArrowUpRight, CheckCircle2, ImagePlus, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return (
    <section className="section contact" id="kontakt">
      <div className="shell contact-grid">
        <Reveal className="contact-intro"><span className="eyebrow">Projekt anfragen</span><h2>Was möchten Sie<br /><em>verändern?</em></h2><p>Erzählen Sie uns kurz von Ihrem Vorhaben. In einem realen Kundenprojekt würden wir uns persönlich bei Ihnen melden.</p><div className="contact-details"><span><MapPin /> RheinWerk Renovierung<br /><small>Mannheim, Deutschland</small></span><span><Phone /> Kontaktangaben<br /><small>Fiktiver Konzeptbetrieb</small></span></div><div className="concept-note">Portfolio-Demo: RheinWerk ist kein realer Betrieb. Das Formular versendet keine Daten.</div></Reveal>
        <Reveal className="form-panel" delay={0.12}>
          {sent ? <div className="form-success" role="status"><CheckCircle2 /><span>Demo-Anfrage vorbereitet</span><h3>Vielen Dank für Ihr Interesse.</h3><p>In einer echten Website würde die Anfrage jetzt sicher an den Betrieb übermittelt.</p><button className="text-link" type="button" onClick={() => setSent(false)}>Weitere Anfrage testen</button></div> :
          <form onSubmit={handleSubmit}>
            <div className="field-grid"><label><span>Name *</span><input name="name" type="text" required placeholder="Ihr Name" autoComplete="name" /></label><label><span>Telefonnummer</span><input name="phone" type="tel" placeholder="+49 ..." autoComplete="tel" /></label></div>
            <label><span>E-Mail *</span><input name="email" type="email" required placeholder="name@beispiel.de" autoComplete="email" /></label>
            <label><span>Projektart *</span><select name="project" defaultValue="" required><option value="" disabled>Bitte auswählen</option><option>Badsanierung</option><option>Fliesenarbeiten</option><option>Boden</option><option>Innenrenovierung</option><option>Trockenbau</option><option>Sonstiges</option></select></label>
            <label><span>Projektbeschreibung</span><textarea name="description" rows={4} placeholder="Worum geht es bei Ihrem Projekt?" /></label>
            <label className="upload-field"><input name="image" type="file" accept="image/*" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} /><ImagePlus aria-hidden="true" /><span>{fileName || "Optional: Projektfoto hinzufügen"}<small>JPG, PNG oder WEBP</small></span></label>
            <button className="button button-dark submit-button" type="submit">Kostenloses Angebot anfragen <ArrowUpRight /></button><small className="form-disclaimer">Mit dem Absenden testen Sie ausschließlich die Demo-Interaktion.</small>
          </form>}
        </Reveal>
      </div>
    </section>
  );
}
