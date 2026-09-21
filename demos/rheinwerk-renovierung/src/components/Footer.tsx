import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer" id="konzept-hinweis">
      <div className="shell footer-top"><a className="brand brand-footer" href="#top"><span className="brand-mark">RW</span><span><strong>RHEINWERK</strong><small>RENOVIERUNG</small></span></a><a className="back-top" href="#top" aria-label="Zurück nach oben"><ArrowUp /></a></div>
      <div className="shell footer-grid"><div><span className="footer-label">Navigation</span><a href="#leistungen">Leistungen</a><a href="#projekte">Projekte</a><a href="#ablauf">Ablauf</a><a href="#kontakt">Kontakt</a></div><div><span className="footer-label">Leistungen</span><span>Badsanierung</span><span>Fliesenarbeiten</span><span>Bodenverlegung</span><span>Innenausbau</span></div><div><span className="footer-label">Einsatzgebiet</span><span>Mannheim</span><span>Ludwigshafen</span><span>Heidelberg</span><span>Rhein-Neckar</span></div><div><span className="footer-label">Hinweis</span><span>Fiktiver Konzeptbetrieb</span><span>Keine reale Dienstleistung</span><a href="#konzept-hinweis">Impressum · Demo</a><a href="#konzept-hinweis">Datenschutz · Demo</a></div></div>
      <div className="shell footer-bottom"><span>© 2026 RheinWerk Konzept</span><span>Concept Project by <strong>LinkedLab</strong></span></div>
    </footer>
  );
}
