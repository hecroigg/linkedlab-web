"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="scene-loader" aria-label="3D-Szene wird geladen"><span /><span /><span /></div>,
});
const trust = ["Kostenlose Beratung", "Transparente Angebote", "Saubere Umsetzung"];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 34 };
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true"><span>PLANUNG · MATERIAL · HANDWERK · PRÄZISION ·</span></div>
      <div className="hero-scene" aria-hidden="true"><HeroScene /></div>
      <div className="hero-content shell">
        <motion.div className="hero-kicker" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}><span>Renovierung & Innenausbau</span><span>Mannheim · Rhein-Neckar</span></motion.div>
        <motion.h1 initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>Ihr Zuhause.<em>Neu gedacht.</em></motion.h1>
        <motion.div className="hero-bottom" initial={initial} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.3 }}>
          <div className="hero-copy">
            <p>Hochwertige Renovierungen, Fliesenarbeiten und Badsanierungen – präzise geplant, sauber umgesetzt.</p>
            <div className="hero-actions"><a className="button button-dark" href="#kontakt">Kostenloses Angebot <ArrowUpRight size={18} /></a><a className="text-link" href="#projekte">Projekte ansehen <ArrowDown size={17} /></a></div>
          </div>
          <div className="hero-trust" aria-label="Ihre Vorteile">{trust.map((item) => <span key={item}><Check size={15} /> {item}</span>)}</div>
        </motion.div>
      </div>
      <div className="hero-index" aria-hidden="true"><span>01</span><div /><span>06</span></div>
    </section>
  );
}
