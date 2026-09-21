"use client";

import Image from "next/image";
import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);
  return (
    <section className="section before-after-section" aria-labelledby="vergleich-title">
      <div className="shell">
        <Reveal className="comparison-intro">
          <span className="eyebrow">Vorher / Nachher</span><h2 id="vergleich-title">Aus Bestand wird<br /><em>Lebensraum.</em></h2><p>Ziehen Sie den Regler und sehen Sie, wie Material, Licht und eine klare Planung denselben Raum verändern.</p>
        </Reveal>
        <Reveal className="comparison-frame" delay={0.1}>
          <div className="comparison-image" aria-label={`Vorher-Nachher-Vergleich, ${position} Prozent Nachher`}>
            <Image src="/images/bad-vorher.webp" alt="Badezimmer vor der Renovierung" fill sizes="(max-width: 768px) 100vw, 86vw" className="cover-image" />
            <div className="after-layer" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Image src="/images/bad-modern.webp" alt="Dasselbe Badezimmer nach einer hochwertigen Renovierung" fill sizes="(max-width: 768px) 100vw, 86vw" className="cover-image" /></div>
            <span className="compare-label label-before">VORHER</span><span className="compare-label label-after">NACHHER</span>
            <div className="compare-handle" style={{ left: `${position}%` }} aria-hidden="true"><span><MoveHorizontal /></span></div>
            <input className="compare-range" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Vorher-Nachher-Vergleich verschieben" />
          </div>
          <div className="comparison-caption"><span>Projekt 01 / Mannheim</span><span>Komplette Badsanierung · 2026</span></div>
        </Reveal>
      </div>
    </section>
  );
}
