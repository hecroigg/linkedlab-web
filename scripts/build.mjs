import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { content, paths } from "../src/content.mjs";
import { site } from "../src/site.config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const baseUrl = (
  process.env.SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://linkedlab.pages.dev")
).replace(/\/$/, "");

const pageKeys = ["home", "websites", "systems", "pricing", "process", "projects", "contact", "legal", "privacy"];

const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const icon = (name) => {
  const icons = {
    arrow: '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5"/></svg>',
    check: '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="m4 10 4 4 8-8"/></svg>',
    external: '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M7 5h8v8M15 5l-9 9"/></svg>',
    menu: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>'
  };
  return icons[name] || "";
};

const brand = () => `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 34 34"><path d="M8 7v19h18"/><circle cx="8" cy="7" r="3"/><circle cx="8" cy="26" r="3"/><circle cx="26" cy="26" r="3"/></svg></span><span><strong>LinkedLab</strong><small>${site.descriptor}</small></span>`;

const button = (label, href, variant = "primary", external = false) => `<a class="button button--${variant}" href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${esc(label)} ${icon(external ? "external" : "arrow")}</a>`;

const tags = (items) => `<ul class="tag-list">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;

const cards = (items, className = "feature-grid") => `<div class="${className}">${items.map(([title, text], index) => `<article class="feature-card"><span class="feature-index">${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}</div>`;

const checklist = (items) => `<ul class="check-list">${items.map((item) => `<li>${icon("check")}<span>${esc(item)}</span></li>`).join("")}</ul>`;

const sectionHead = (kicker, title, text = "", level = 2) => `<div class="section-head"><p class="eyebrow">${esc(kicker)}</p><h${level}>${esc(title)}</h${level}>${text ? `<p>${esc(text)}</p>` : ""}</div>`;

const cta = (lang, title, text = "") => {
  const t = content[lang];
  return `<section class="cta-band"><div><p class="eyebrow">${esc(t.common.ownership)}</p><h2>${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ""}</div>${button(t.common.talk, paths[lang].contact, "light")}</section>`;
};

function renderHome(lang) {
  const t = content[lang];
  const p = t.home;
  return `
    <section class="hero hero--home">
      <div class="hero__copy">
        <p class="eyebrow">${esc(p.heroKicker)}</p>
        <h1>${esc(p.heroTitle)}</h1>
        <p class="hero__lead">${esc(p.heroText)}</p>
        <div class="button-row">${button(t.common.primaryCta, paths[lang].contact)}${button(t.common.secondaryCta, paths[lang].pricing, "ghost")}</div>
        <p class="hero__note">${esc(p.heroNote)}</p>
      </div>
      <div class="hero__visual"><img src="/assets/linkedlab-hero.webp" width="1536" height="1024" alt="" fetchpriority="high"><span class="visual-label visual-label--one">${esc(t.ui.noLockIn)}</span><span class="visual-label visual-label--two">${esc(t.ui.yours)}</span></div>
    </section>
    <section class="trust-strip" aria-label="LinkedLab principles">${p.trust.map(([title, text]) => `<div><strong>${esc(title)}</strong><span>${esc(text)}</span></div>`).join("")}</section>
    <section class="section split-intro"><div>${sectionHead(p.problemKicker, p.problemTitle)}</div><p class="large-copy">${esc(p.problemText)}</p></section>
    <section class="section section--soft">
      ${sectionHead(t.common.eyebrow, p.servicesTitle)}
      <div class="service-grid">
        <article class="service-card service-card--primary"><span class="pill">${esc(p.websiteCard.label)}</span><h3>${esc(p.websiteCard.title)}</h3><p>${esc(p.websiteCard.text)}</p>${checklist(p.websiteCard.bullets)}${button(t.common.learnMore, paths[lang].websites, "text")}</article>
        <article class="service-card"><span class="pill pill--subtle">${esc(p.systemsCard.label)}</span><h3>${esc(p.systemsCard.title)}</h3><p>${esc(p.systemsCard.text)}</p>${checklist(p.systemsCard.bullets)}${button(t.common.learnMore, paths[lang].systems, "text")}</article>
      </div>
    </section>
    <section class="section principle-section">${sectionHead(t.common.eyebrow, p.differenceTitle)}${cards(p.differences, "principle-grid")}</section>
    <section class="section price-preview"><div>${sectionHead(t.nav.pricing, p.priceTitle, p.priceText)}<div class="button-row">${button(t.common.secondaryCta, paths[lang].pricing)}${button(t.common.talk, paths[lang].contact, "outline")}</div></div><div class="price-lockup"><span>${esc(t.common.founding)}</span><strong>${esc(site.pricing.founding.onePage.from)}€</strong><small>${esc(t.common.from)}</small></div></section>
    <section class="section section--navy process-preview">${sectionHead(t.nav.process, p.processTitle)}<ol class="process-list">${p.process.map(([n, title, text]) => `<li><span>${n}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></li>`).join("")}</ol>${button(t.nav.process, paths[lang].process, "light")}</section>
    <section class="section work-preview"><div>${sectionHead(t.nav.projects, p.workTitle, p.workText)}${button(t.nav.projects, paths[lang].projects, "outline")}</div><div class="mini-projects"><article><span>01</span><strong>LinkedLab</strong><small>${esc(t.ui.projectTypes[0])}</small></article><article class="mini-projects__lluna"><span>02</span><strong>Lluna Blanca</strong><small>${esc(t.ui.projectTypes[1])}</small></article></div></section>
    ${cta(lang, p.finalTitle, p.finalText)}`;
}

function renderWebsites(lang) {
  const t = content[lang], p = t.websites;
  return `
    <section class="hero hero--inner"><div class="hero__copy">${sectionHead(p.kicker, p.title, p.intro, 1)}<div class="button-row">${button(t.common.primaryCta, paths[lang].contact)}${button(t.common.secondaryCta, paths[lang].pricing, "ghost")}</div></div><div class="hero-proof"><span>01</span><strong>${esc(t.ui.fast)}</strong><span>02</span><strong>${esc(t.ui.local)}</strong><span>03</span><strong>${esc(t.ui.yours)}</strong></div></section>
    <section class="section">${sectionHead(p.kicker, p.outcomesTitle)}${cards(p.outcomes)}</section>
    <section class="section section--soft inclusion"><div>${sectionHead(t.common.eyebrow, p.includedTitle)}${checklist(p.included)}</div><aside><p class="eyebrow">${esc(t.ui.local)}</p><h3>${esc(p.idealTitle)}</h3><p>${esc(p.idealText)}</p>${tags(site.serviceAreas.map((area) => area === "Remote" ? t.ui.remote : area))}</aside></section>
    <section class="ownership-banner"><p>${esc(t.common.ownership)}</p><div class="ownership-line">${t.ui.ownershipAssets.map((item) => `<span>${esc(item)}</span>`).join("")}</div></section>
    ${cta(lang, p.finalTitle)}`;
}

function renderSystems(lang) {
  const t = content[lang], p = t.systems;
  return `
    <section class="hero hero--inner hero--systems"><div class="hero__copy">${sectionHead(p.kicker, p.title, p.intro, 1)}${button(t.common.talk, paths[lang].contact)}</div><div class="system-diagram" aria-hidden="true"><span>${esc(t.ui.system[0])}</span><span>${esc(t.ui.system[1])}</span><strong>${esc(t.ui.system[2])}</strong><span>${esc(t.ui.system[3])}</span><span>${esc(t.ui.system[4])}</span></div></section>
    <section class="distinction"><p>${esc(p.distinction)}</p></section>
    <section class="section">${sectionHead(p.kicker, p.useCasesTitle)}${cards(p.useCases)}</section>
    <section class="section section--soft split-intro"><div>${sectionHead(t.common.eyebrow, p.principleTitle)}</div><div><p class="large-copy">${esc(p.principleText)}</p><p class="note-box">${esc(p.pricingNote)}</p></div></section>
    ${cta(lang, p.finalTitle)}`;
}

function renderPricing(lang) {
  const t = content[lang], p = t.pricing;
  return `
    <section class="hero hero--inner"><div class="hero__copy">${sectionHead(p.kicker, p.title, p.intro, 1)}${button(t.common.talk, paths[lang].contact)}</div><div class="price-statement"><small>${esc(t.common.founding)}</small><strong>${site.pricing.founding.onePage.from}€</strong><span>${esc(t.common.from)}</span></div></section>
    <section class="section pricing-section">${sectionHead(p.kicker, p.foundingTitle, p.foundingText)}<div class="pricing-grid">${p.plans.map(([name, price, description, points], index) => `<article class="pricing-card${index === 1 ? " pricing-card--featured" : ""}">${index === 1 ? `<span class="pill">${esc(t.ui.mostChosen)}</span>` : ""}<h3>${esc(name)}</h3><strong>${esc(price)}</strong><p>${esc(description)}</p>${checklist(points)}${button(t.common.talk, paths[lang].contact, index === 1 ? "primary" : "outline")}</article>`).join("")}</div></section>
    <section class="standard-prices"><div><p class="eyebrow">${esc(p.futureTitle)}</p></div>${p.futurePlans.map(([name, price]) => `<div><span>${esc(name)}</span><strong>${esc(price)}</strong></div>`).join("")}</section>
    <section class="section care-section"><div><span class="pill">${esc(t.common.optional)}</span><h2>${esc(p.careTitle)}</h2><p>${esc(p.careText)}</p></div><aside><p>${esc(p.withoutCare)}</p></aside></section>
    <section class="payment-strip"><h2>${esc(p.paymentTitle)}</h2><p>${esc(p.paymentText)}</p><div><span>50%</span><span>→</span><span>50%</span></div></section>
    <section class="section faq-section">${sectionHead("FAQ", p.faqTitle)}<div class="faq-list">${p.faqs.map(([q, a], index) => `<details${index === 0 ? " open" : ""}><summary>${esc(q)}<span>+</span></summary><p>${esc(a)}</p></details>`).join("")}</div></section>
    ${cta(lang, p.finalTitle)}`;
}

function renderProcess(lang) {
  const t = content[lang], p = t.process;
  return `
    <section class="hero hero--inner"><div class="hero__copy">${sectionHead(p.kicker, p.title, p.intro, 1)}${button(t.common.talk, paths[lang].contact)}</div><div class="process-orbit" aria-hidden="true"><span>01</span><i></i><span>05</span><i></i><span>10</span></div></section>
    <section class="section timeline">${p.steps.map(([n, title, text]) => `<article><span>${n}</span><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></article>`).join("")}</section>
    <section class="section section--soft split-intro"><div>${sectionHead(t.common.eyebrow, p.prepTitle)}</div><p class="large-copy">${esc(p.prepText)}</p></section>
    ${cta(lang, p.finalTitle)}`;
}

function renderProjects(lang) {
  const t = content[lang], p = t.projects;
  return `
    <section class="hero hero--inner"><div class="hero__copy">${sectionHead(p.kicker, p.title, p.intro, 1)}${button(t.common.talk, paths[lang].contact)}</div><div class="project-count"><strong>02</strong><span>${esc(t.ui.selectedProjects)}</span></div></section>
    <section class="section project-list">${p.items.map(([name, type, text, status], index) => `<article><div class="project-art project-art--${index + 1}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(name)}</strong></div><div class="project-copy"><span class="pill pill--subtle">${esc(status)}</span><p class="eyebrow">${esc(type)}</p><h2>${esc(name)}</h2><p>${esc(text)}</p>${index === 1 ? '<a class="text-link" href="https://llunablancablanes.com" target="_blank" rel="noreferrer">llunablancablanes.com '+icon("external")+'</a>' : ""}</div></article>`).join("")}<p class="portfolio-note">${esc(p.note)}</p></section>
    ${cta(lang, p.finalTitle)}`;
}

function renderContact(lang) {
  const t = content[lang], p = t.contact;
  return `
    <section class="contact-hero"><div>${sectionHead(p.kicker, p.title, p.intro, 1)}<p class="response-time"><span></span>${esc(p.response)}</p></div><article class="contact-card"><span class="contact-icon">@</span><p class="eyebrow">${esc(p.instagramTitle)}</p><h2>${esc(site.instagramHandle)}</h2><p>${esc(p.instagramText)}</p>${button(p.button, site.instagram, "primary", true)}<small>${esc(p.finalNote)}</small></article></section>
    <section class="section message-guide">${sectionHead(t.common.eyebrow, p.messageGuideTitle)}${checklist(p.messageGuide)}</section>`;
}

function renderLegal(lang, privacy = false) {
  const t = content[lang];
  const title = privacy ? t.legal.privacyTitle : t.legal.title;
  const intro = privacy ? t.legal.privacyIntro : t.legal.intro;
  const legal = site.legal;
  const copy = {
    de: { warning: "PLATZHALTER · Vor Veröffentlichung vervollständigen", details: "Angaben zum Unternehmen", tax: "Steuerangaben", liability: "Haftung für Inhalte und Links", liabilityText: "Die endgültige Fassung ist anhand der tatsächlichen Unternehmensform, Leistungen und externen Links rechtlich zu prüfen. LinkedLab bietet keine Rechtsberatung.", controller: "Verantwortliche Stelle", hosting: "Technische Bereitstellung", hostingText: "Diese statische Website ist für Cloudflare Pages vorbereitet. Vor Veröffentlichung sind Hosting-Vertrag, Server-Logs, Auftragsverarbeitung und Datenübermittlungen in der finalen Erklärung korrekt abzubilden.", contact: "Kontaktaufnahme", contactText: "Wenn Sie LinkedLab über Instagram oder einen später eingerichteten E-Mail-Kanal kontaktieren, werden die von Ihnen übermittelten Angaben zur Bearbeitung der Anfrage verarbeitet. Die tatsächlichen Kontaktwege und Löschfristen sind vor Veröffentlichung zu ergänzen.", analytics: "Analytics und Cookies", analyticsText: "In der aktuellen Fassung sind keine Analyse- oder Marketing-Tracker eingebaut. Falls später zustimmungspflichtige Dienste ergänzt werden, müssen Einwilligungsverwaltung und Erklärung entsprechend aktualisiert werden.", rights: "Ihre Rechte", rightsText: "Die endgültige Fassung muss die anwendbaren Rechte, zuständige Aufsichtsbehörde und Kontaktwege passend zur tatsächlichen Unternehmenssituation enthalten. LinkedLab bietet keine Rechtsberatung." },
    en: { warning: "PLACEHOLDER · Complete before publication", details: "Business details", tax: "Tax details", liability: "Liability for content and links", liabilityText: "The final version must be reviewed against the actual business structure, services and external links. LinkedLab does not provide legal advice.", controller: "Data controller", hosting: "Technical hosting", hostingText: "This static website is prepared for Cloudflare Pages. Before publication, the hosting agreement, server logs, data processing and international transfers must be described accurately in the final policy.", contact: "Contacting LinkedLab", contactText: "If you contact LinkedLab through Instagram or a future email channel, the information you provide will be processed to handle the enquiry. The actual contact channels and retention periods must be added before publication.", analytics: "Analytics and cookies", analyticsText: "The current version includes no analytics or marketing trackers. If services requiring consent are added later, the consent management and this policy must be updated accordingly.", rights: "Your rights", rightsText: "The final version must include the applicable rights, supervisory authority and contact routes for the actual business situation. LinkedLab does not provide legal advice." },
    es: { warning: "BORRADOR · Completar antes de publicar", details: "Datos del negocio", tax: "Datos fiscales", liability: "Responsabilidad sobre contenidos y enlaces", liabilityText: "La versión final debe revisarse según la forma jurídica, los servicios y los enlaces externos reales. LinkedLab no ofrece asesoramiento jurídico.", controller: "Responsable del tratamiento", hosting: "Alojamiento técnico", hostingText: "Esta web estática está preparada para Cloudflare Pages. Antes de publicar, la política final debe describir correctamente el contrato de alojamiento, los registros del servidor, el tratamiento de datos y las posibles transferencias internacionales.", contact: "Contacto con LinkedLab", contactText: "Si contactas con LinkedLab por Instagram o mediante un futuro canal de email, los datos enviados se tratarán para responder a la solicitud. Antes de publicar deben añadirse los canales reales y los plazos de conservación.", analytics: "Analítica y cookies", analyticsText: "La versión actual no incluye analítica ni rastreadores de marketing. Si más adelante se añaden servicios que requieren consentimiento, habrá que actualizar la gestión de consentimiento y esta política.", rights: "Tus derechos", rightsText: "La versión final debe incluir los derechos aplicables, la autoridad de control y las vías de contacto correspondientes a la situación real del negocio. LinkedLab no ofrece asesoramiento jurídico." }
  }[lang];
  if (!privacy) return `<section class="legal-page">${sectionHead("LinkedLab", title, intro, 1)}<div class="legal-warning">${esc(copy.warning)}</div><h2>${esc(copy.details)}</h2><p><strong>${esc(legal.ownerName)}</strong><br>${esc(legal.address)}<br>${esc(legal.email)}<br>${esc(legal.phone)}</p><h2>${esc(copy.tax)}</h2><p>${esc(legal.taxId)}</p><h2>${esc(copy.liability)}</h2><p>${esc(copy.liabilityText)}</p></section>`;
  return `<section class="legal-page">${sectionHead("LinkedLab", title, intro, 1)}<div class="legal-warning">${esc(copy.warning)}</div><h2>${esc(copy.controller)}</h2><p>${esc(legal.ownerName)}<br>${esc(legal.address)}<br>${esc(legal.email)}</p><h2>${esc(copy.hosting)}</h2><p>${esc(copy.hostingText)}</p><h2>${esc(copy.contact)}</h2><p>${esc(copy.contactText)}</p><h2>${esc(copy.analytics)}</h2><p>${esc(copy.analyticsText)}</p><h2>${esc(copy.rights)}</h2><p>${esc(copy.rightsText)}</p></section>`;
}

function renderBody(lang, key) {
  return ({ home: renderHome, websites: renderWebsites, systems: renderSystems, pricing: renderPricing, process: renderProcess, projects: renderProjects, contact: renderContact, legal: (l) => renderLegal(l, false), privacy: (l) => renderLegal(l, true) })[key](lang);
}

function pageMeta(lang, key) {
  const t = content[lang];
  if (key === "legal") return { title: `${t.legal.title} | LinkedLab`, description: t.legal.intro };
  if (key === "privacy") return { title: `${t.legal.privacyTitle} | LinkedLab`, description: t.legal.privacyIntro };
  return { title: t[key].seoTitle, description: t[key].seoDescription };
}

function header(lang, key) {
  const t = content[lang], p = paths[lang];
  const navItems = [["websites", t.nav.websites], ["systems", t.nav.systems], ["pricing", t.nav.pricing], ["projects", t.nav.projects]];
  const langLinks = site.languages.map((code) => `<a href="${paths[code][key]}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="true"' : ""}>${code.toUpperCase()}</a>`).join("");
  return `<header class="site-header"><a class="brand" href="${p.home}" aria-label="LinkedLab">${brand()}</a><nav class="desktop-nav" aria-label="${esc(t.ui.navLabel)}">${navItems.map(([id, label]) => `<a href="${p[id]}"${key === id ? ' aria-current="page"' : ""}>${esc(label)}</a>`).join("")}</nav><div class="header-actions"><div class="language-switcher" aria-label="${esc(t.ui.languageLabel)}">${langLinks}</div>${button(t.nav.contact, p.contact, "header")}<button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${esc(t.ui.openMenu)}" data-open-label="${esc(t.ui.openMenu)}" data-close-label="${esc(t.ui.closeMenu)}">${icon("menu")}<span class="sr-only">${esc(t.ui.openMenu)}</span></button></div><nav id="mobile-menu" class="mobile-nav" aria-label="${esc(t.ui.mobileNav)}" hidden>${navItems.map(([id, label]) => `<a href="${p[id]}"${key === id ? ' aria-current="page"' : ""}>${esc(label)}</a>`).join("")}<a href="${p.process}">${esc(t.nav.process)}</a><a href="${p.contact}">${esc(t.nav.contact)}</a><div class="mobile-language">${langLinks}</div></nav></header>`;
}

function footer(lang) {
  const t = content[lang], p = paths[lang];
  return `<footer class="site-footer"><div class="footer-main"><a class="brand brand--footer" href="${p.home}">${brand()}</a><p>${esc(t.footer.line)}</p><p>${esc(t.footer.area)}</p></div><div class="footer-links"><div><strong>${esc(t.common.eyebrow)}</strong><a href="${p.websites}">${esc(t.nav.websites)}</a><a href="${p.systems}">${esc(t.nav.systems)}</a><a href="${p.pricing}">${esc(t.nav.pricing)}</a></div><div><strong>LinkedLab</strong><a href="${p.process}">${esc(t.nav.process)}</a><a href="${p.projects}">${esc(t.nav.projects)}</a><a href="${p.contact}">${esc(t.nav.contact)}</a></div><div><strong>${esc(t.ui.connect)}</strong><a href="${site.instagram}" target="_blank" rel="noreferrer">${esc(site.instagramHandle)} ${icon("external")}</a><a href="${p.legal}">${esc(t.footer.legal)}</a><a href="${p.privacy}">${esc(t.footer.privacy)}</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} LinkedLab. ${esc(t.footer.rights)}</span><span>${esc(t.footer.line)}</span></div></footer>`;
}

function schema(lang, key) {
  const meta = pageMeta(lang, key);
  const graph = [{
    "@type": "ProfessionalService", "@id": `${baseUrl}/#business`, name: site.name,
    url: `${baseUrl}${paths[lang].home}`, description: meta.description,
    areaServed: site.serviceAreas.filter((area) => area !== "Remote").map((name) => ({ "@type": "City", name })),
    sameAs: [site.instagram], priceRange: "€€"
  }, { "@type": "WebSite", "@id": `${baseUrl}/#website`, url: baseUrl, name: site.name, inLanguage: site.languages }];
  if (["websites", "systems"].includes(key)) graph.push({ "@type": "Service", name: key === "websites" ? "Website design and development" : "Business systems", provider: { "@id": `${baseUrl}/#business` }, areaServed: site.serviceAreas });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c");
}

function html(lang, key) {
  const t = content[lang], meta = pageMeta(lang, key), canonical = `${baseUrl}${paths[lang][key]}`;
  const alternates = site.languages.map((code) => `<link rel="alternate" hreflang="${code}" href="${baseUrl}${paths[code][key]}">`).join("");
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}">${alternates}<link rel="alternate" hreflang="x-default" href="${baseUrl}${paths.de[key]}"><meta property="og:type" content="website"><meta property="og:site_name" content="LinkedLab"><meta property="og:locale" content="${t.locale}"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(meta.title)}"><meta name="twitter:description" content="${esc(meta.description)}"><meta name="theme-color" content="#071426"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/styles.css"><script type="application/ld+json">${schema(lang, key)}</script><script type="module" src="/assets/client.js"></script></head><body><a class="skip-link" href="#main">${esc(t.skip)}</a>${header(lang, key)}<main id="main">${renderBody(lang, key)}</main>${footer(lang)}</body></html>`;
}

async function write(relative, data) {
  const target = join(dist, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, data);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const lang of site.languages) {
  for (const key of pageKeys) {
    await write(join(paths[lang][key].slice(1), "index.html"), html(lang, key));
  }
}

const sitemapUrls = site.languages.flatMap((lang) => pageKeys.map((key) => `${baseUrl}${paths[lang][key]}`));
await write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`);
await write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
await write("index.html", '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="LinkedLab — Websites & Digital Systems"><meta http-equiv="refresh" content="0;url=/de/"><link rel="canonical" href="/de/"><title>LinkedLab</title></head><body><a href="/de/">LinkedLab</a></body></html>');
await write("404.html", await readFile(join(root, "src", "404.html"), "utf8"));
await write("_redirects", "/ /de/ 302\n");
await write("_headers", "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: SAMEORIGIN\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n");
await mkdir(join(dist, "assets"), { recursive: true });
await cp(join(root, "src", "styles.css"), join(dist, "assets", "styles.css"));
await cp(join(root, "src", "client.js"), join(dist, "assets", "client.js"));
await cp(join(root, "public", "favicon.svg"), join(dist, "favicon.svg"));
await cp(join(root, "public", "assets", "linkedlab-hero.webp"), join(dist, "assets", "linkedlab-hero.webp"));

console.log(`Built ${site.languages.length * pageKeys.length + 2} HTML pages for ${baseUrl}`);
