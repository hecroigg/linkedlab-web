"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [["Leistungen", "#leistungen"], ["Projekte", "#projekte"], ["Über uns", "#qualitaet"], ["Ablauf", "#ablauf"], ["Kontakt", "#kontakt"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="RheinWerk Startseite">
        <span className="brand-mark" aria-hidden="true">RW</span>
        <span><strong>RHEINWERK</strong><small>RENOVIERUNG</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="#kontakt">Angebot anfragen <ArrowUpRight size={16} /></a>
      <button className="menu-button" type="button" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          {links.map(([label, href], index) => <a href={href} key={href} onClick={() => setOpen(false)}><span>0{index + 1}</span> {label}</a>)}
          <a className="button button-light" href="#kontakt" onClick={() => setOpen(false)}>Kostenloses Angebot anfragen <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </header>
  );
}
