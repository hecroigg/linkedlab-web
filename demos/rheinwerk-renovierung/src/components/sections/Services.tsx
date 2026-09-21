"use client";

import { Bath, Blocks, Grid3X3, Hammer, Layers3, MoveRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Grid3X3, Bath, Layers3, Blocks, Hammer, MoveRight];

export function Services() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section services" id="leistungen">
      <div className="shell">
        <Reveal className="section-heading services-heading">
          <div><span className="eyebrow">Leistungen</span><h2>Ein Ansprechpartner.<br />Viele Gewerke.</h2></div>
          <p>Wir verbinden Planung, Materialgefühl und zuverlässige Ausführung – für Räume, die nicht nur neu aussehen, sondern langfristig funktionieren.</p>
        </Reveal>
        <div className="service-list">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.article className="service-row" key={service.id} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55, delay: index * 0.055 }}>
                <span className="service-number">{service.number}</span><div className="service-icon" aria-hidden="true"><Icon /></div><h3>{service.title}</h3><p>{service.description}</p><span className="service-detail">{service.detail}</span><MoveRight className="service-arrow" aria-hidden="true" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
