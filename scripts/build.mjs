import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { content, paths } from "../src/content.mjs";
import { legalContent } from "../src/legal-content.mjs";
import { site } from "../src/site.config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const baseUrl = (
  process.env.SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://linkedlab-web.vercel.app")
).replace(/\/$/, "");

const pageKeys = ["home", "websites", "systems", "pricing", "process", "projects", "contact", "legal", "privacy", "cookies"];

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

const brand = () => `<span class="brand-mark" aria-hidden="true"><img src="/assets/linkedlab-logo-mark.webp" width="256" height="256" alt=""></span><span><strong>LinkedLab</strong><small>${site.descriptor}</small></span>`;

const button = (label, href, variant = "primary", external = false) => `<a class="button button--${variant}" href="${href}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${esc(label)} ${icon(external ? "external" : "arrow")}</a>`;

const tags = (items) => `<ul class="tag-list">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;

const cards = (items, className = "feature-grid") => `<div class="${className}">${items.map(([title, text], index) => `<article class="feature-card"><span class="feature-index">${String(index + 1).padStart(2, "0")}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}</div>`;

const checklist = (items) => `<ul class="check-list">${items.map((item) => `<li>${icon("check")}<span>${esc(item)}</span></li>`).join("")}</ul>`;

const kineticTitle = (title) => title.split(" ").map((word, index) => `<span style="--word:${index}">${esc(word)}</span>`).join(" ");

const sectionHead = (kicker, title, text = "", level = 2) => `<div class="section-head"><p class="eyebrow">${esc(kicker)}</p><h${level}>${esc(title)}</h${level}>${text ? `<p>${esc(text)}</p>` : ""}</div>`;

const cta = (lang, title, text = "") => {
  const t = content[lang];
  return `<section class="cta-band"><div><p class="eyebrow">${esc(t.common.ownership)}</p><h2>${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ""}</div>${button(t.common.talk, paths[lang].contact, "light")}</section>`;
};

function renderHome(lang) {
  const t = content[lang];
  const p = t.home;
  return `
    <div class="cursor-aura" data-cursor-aura aria-hidden="true"><i></i></div>
    <section class="hero hero--home">
      <div class="hero__copy">
        <p class="eyebrow">${esc(p.heroKicker)}</p>
        <h1 class="kinetic-title">${kineticTitle(p.heroTitle)}</h1>
        <p class="hero__lead">${esc(p.heroText)}</p>
        <div class="button-row">${button(t.common.primaryCta, paths[lang].contact)}${button(t.common.secondaryCta, paths[lang].pricing, "ghost")}</div>
        <p class="hero__note">${esc(p.heroNote)}</p>
      </div>
      <div class="hero__visual digital-orbit" data-digital-orbit aria-hidden="true">
        <canvas class="digital-orbit__canvas"></canvas>
        <span class="orbit-ring orbit-ring--outer"></span><span class="orbit-ring orbit-ring--inner"></span>
        <div class="orbit-core"><span class="orbit-core__logo"><img src="/assets/linkedlab-logo-mark.webp" width="256" height="256" alt=""></span><strong>LinkedLab</strong><small>${esc(t.common.eyebrow)}</small></div>
        <span class="orbit-node orbit-node--web"><i>01</i><strong>${esc(t.nav.websites)}</strong></span>
        <span class="orbit-node orbit-node--clients"><i>02</i><strong>${esc(t.ui.system[0])}</strong></span>
        <span class="orbit-node orbit-node--bookings"><i>03</i><strong>${esc(t.ui.system[1])}</strong></span>
        <span class="orbit-node orbit-node--data"><i>04</i><strong>${esc(t.ui.system[4])}</strong></span>
        ${t.ui.orbitExtras.map((label, index) => `<span class="orbit-chip orbit-chip--${index + 1}"><i></i>${esc(label)}</span>`).join("")}
        <span class="orbit-object orbit-object--cube"></span><span class="orbit-object orbit-object--disc"></span><span class="orbit-object orbit-object--spark"></span>
        <span class="orbit-signal"><i></i>${esc(t.ui.noLockIn)}</span>
      </div>
    </section>
    <section class="capability-marquee" aria-hidden="true"><div>${[...p.journeyTicker, ...p.journeyTicker].map((item) => `<span>${esc(item)}<i></i></span>`).join("")}</div></section>
    <section class="digital-journey" data-digital-journey>
      <div class="journey-stage">
        <div class="journey-copy">
          <p class="eyebrow">${esc(p.journeyKicker)}</p>
          <h2>${esc(p.journeyTitle)}</h2>
          <p>${esc(p.journeyText)}</p>
          <span class="journey-scroll"><i></i>${esc(p.journeyScroll)}</span>
        </div>
        <div class="journey-world" data-journey-world aria-hidden="true">
          <span class="journey-gridplane"></span><span class="journey-halo"></span>
          <div class="journey-machine">
            <span class="journey-platform journey-platform--1"></span><span class="journey-platform journey-platform--2"></span>
            <div class="journey-cube">
              <span class="journey-face journey-face--front"><img src="/assets/linkedlab-logo-mark.webp" width="256" height="256" alt=""></span>
              <span class="journey-face journey-face--back">CRM</span><span class="journey-face journey-face--right">SEO</span>
              <span class="journey-face journey-face--left">WEB</span><span class="journey-face journey-face--top">DATA</span><span class="journey-face journey-face--bottom">AI</span>
            </div>
            <span class="journey-ring journey-ring--1"></span><span class="journey-ring journey-ring--2"></span><span class="journey-ring journey-ring--3"></span>
            <span class="journey-satellite journey-satellite--1"><i>01</i>${esc(t.nav.websites)}</span>
            <span class="journey-satellite journey-satellite--2"><i>02</i>${esc(t.ui.system[0])}</span>
            <span class="journey-satellite journey-satellite--3"><i>03</i>${esc(t.ui.orbitExtras[2])}</span>
            <span class="journey-satellite journey-satellite--4"><i>04</i>${esc(t.ui.system[4])}</span>
            <span class="journey-shard journey-shard--1"></span><span class="journey-shard journey-shard--2"></span><span class="journey-shard journey-shard--3"></span><span class="journey-shard journey-shard--4"></span>
          </div>
        </div>
        <ol class="journey-steps">${p.journeySteps.map(([n, title, text], index) => `<li data-journey-step="${index}"><span>${esc(n)}</span><div><strong>${esc(title)}</strong><p>${esc(text)}</p></div></li>`).join("")}</ol>
        <div class="journey-progress"><i></i></div>
      </div>
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
  const whatsappText = {
    de: "Hallo, ich möchte über eine Website oder ein digitales System für mein Unternehmen sprechen.",
    en: "Hi, I would like to talk about a website or digital system for my business.",
    es: "Hola, me gustaría hablar sobre una página web o un sistema digital para mi negocio."
  }[lang];
  const whatsappUrl = `${site.whatsapp}?text=${encodeURIComponent(whatsappText)}`;
  return `
    <section class="contact-hero"><div>${sectionHead(p.kicker, p.title, p.intro, 1)}<p class="response-time"><span></span>${esc(p.response)}</p></div><div class="contact-channel-grid"><article class="contact-card contact-card--whatsapp"><span class="contact-icon" aria-hidden="true">W</span><p class="eyebrow">${esc(p.whatsappTitle)}</p><h2>${esc(site.whatsappDisplay)}</h2><p>${esc(p.whatsappText)}</p>${button(p.whatsappButton, whatsappUrl, "whatsapp", true)}<small>${esc(p.finalNote)}</small></article><article class="contact-card contact-card--instagram"><span class="contact-icon">@</span><p class="eyebrow">${esc(p.instagramTitle)}</p><h2>${esc(site.instagramHandle)}</h2><p>${esc(p.instagramText)}</p>${button(p.button, site.instagram, "primary", true)}<small>${esc(p.finalNote)}</small></article></div></section>
    <section class="section message-guide">${sectionHead(t.common.eyebrow, p.messageGuideTitle)}${checklist(p.messageGuide)}</section>`;
}

function legalDetails(kind, lang) {
  const legal = site.legal;
  const countries = { de: "Deutschland", en: "Germany", es: "Alemania" };
  const address = [...legal.addressLines.slice(0, -1), countries[lang]].map(esc).join("<br>");
  if (kind === "contact" || kind === "controller") return `<address><strong>${esc(legal.ownerName)}</strong><br>${esc(legal.tradingName)}<br>${address}<br><a href="mailto:${esc(legal.email)}">${esc(legal.email)}</a><br><a href="tel:+34693505546">${esc(legal.phone)}</a></address>`;
  if (kind === "registration") {
    const registration = {
      de: ["Angebot durch eine natürliche Person; derzeit nicht im Handelsregister eingetragen.", "Keine Handelsregisternummer vorhanden.", "Keine Umsatzsteuer-Identifikationsnummer erteilt."],
      en: ["Service currently provided by an individual; not entered in the commercial register.", "No commercial register number.", "No VAT identification number has been issued."],
      es: ["Servicio ofrecido actualmente por una persona física; no inscrita en el registro mercantil.", "Sin número de registro mercantil.", "No se ha asignado un número de IVA intracomunitario."]
    }[lang];
    return `<p>${registration.map(esc).join("<br>")}</p>`;
  }
  if (kind === "responsible") return `<p>${esc(legal.ownerName)}<br>${address}</p>`;
  if (kind === "cookieTable") {
    const labels = {
      de: ["Cookie", "Anbieter", "Zweck", "Kategorie", "Dauer", "linkedlab_consent", "LinkedLab", "Speichert Ablehnung, Zustimmung und ausgewählte Kategorien", "Notwendig", "180 Tage"],
      en: ["Cookie", "Provider", "Purpose", "Category", "Duration", "linkedlab_consent", "LinkedLab", "Stores rejection, consent and selected categories", "Necessary", "180 days"],
      es: ["Cookie", "Proveedor", "Finalidad", "Categoría", "Duración", "linkedlab_consent", "LinkedLab", "Guarda el rechazo, consentimiento y categorías seleccionadas", "Necesaria", "180 días"]
    }[lang];
    return `<div class="legal-table-wrap"><table class="legal-table"><thead><tr>${labels.slice(0, 5).map((label) => `<th>${esc(label)}</th>`).join("")}</tr></thead><tbody><tr>${labels.slice(5).map((label) => `<td>${esc(label)}</td>`).join("")}</tr></tbody></table></div>`;
  }
  return "";
}

function renderLegal(lang, key) {
  const t = content[lang];
  const titles = { legal: t.legal.title, privacy: t.legal.privacyTitle, cookies: t.legal.cookiesTitle };
  const intros = { legal: t.legal.intro, privacy: t.legal.privacyIntro, cookies: t.legal.cookiesIntro };
  const document = legalContent[lang][key];
  const sections = document.sections.map((section) => `<section class="legal-section"><h2>${esc(section.title)}</h2>${section.kind ? legalDetails(section.kind, lang) : section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</section>`).join("");
  const resources = key === "privacy" ? `<aside class="legal-resources"><strong>${lang === "de" ? "Weiterführende Informationen" : lang === "es" ? "Información adicional" : "Further information"}</strong><a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel Privacy Notice ${icon("external")}</a><a href="https://vercel.com/legal/dpa" target="_blank" rel="noreferrer">Vercel Data Processing Addendum ${icon("external")}</a><a href="https://www.baden-wuerttemberg.datenschutz.de/" target="_blank" rel="noreferrer">LfDI Baden-Württemberg ${icon("external")}</a></aside>` : "";
  return `<article class="legal-page">${sectionHead("LinkedLab", titles[key], intros[key], 1)}<p class="legal-updated">${esc(legalContent[lang].updated)}</p>${sections}${resources}</article>`;
}

function renderBody(lang, key) {
  return ({ home: renderHome, websites: renderWebsites, systems: renderSystems, pricing: renderPricing, process: renderProcess, projects: renderProjects, contact: renderContact, legal: (l) => renderLegal(l, "legal"), privacy: (l) => renderLegal(l, "privacy"), cookies: (l) => renderLegal(l, "cookies") })[key](lang);
}

function pageMeta(lang, key) {
  const t = content[lang];
  if (key === "legal") return { title: `${t.legal.title} | LinkedLab`, description: t.legal.intro };
  if (key === "privacy") return { title: `${t.legal.privacyTitle} | LinkedLab`, description: t.legal.privacyIntro };
  if (key === "cookies") return { title: `${t.legal.cookiesTitle} | LinkedLab`, description: t.legal.cookiesIntro };
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
  return `<footer class="site-footer"><div class="footer-main"><a class="brand brand--footer" href="${p.home}">${brand()}</a><p>${esc(t.footer.line)}</p><p>${esc(t.footer.area)}</p></div><div class="footer-links"><div><strong>${esc(t.common.eyebrow)}</strong><a href="${p.websites}">${esc(t.nav.websites)}</a><a href="${p.systems}">${esc(t.nav.systems)}</a><a href="${p.pricing}">${esc(t.nav.pricing)}</a></div><div><strong>LinkedLab</strong><a href="${p.process}">${esc(t.nav.process)}</a><a href="${p.projects}">${esc(t.nav.projects)}</a><a href="${p.contact}">${esc(t.nav.contact)}</a></div><div><strong>${esc(t.ui.connect)}</strong><a href="${site.instagram}" target="_blank" rel="noreferrer">${esc(site.instagramHandle)} ${icon("external")}</a><a href="${p.legal}">${esc(t.footer.legal)}</a><a href="${p.privacy}">${esc(t.footer.privacy)}</a><a href="${p.cookies}">${esc(t.footer.cookies)}</a><button class="footer-cookie-button" type="button" data-cookie-settings>${esc(t.footer.cookieSettings)}</button></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} LinkedLab. ${esc(t.footer.rights)}</span><span>${esc(t.footer.line)}</span></div></footer>`;
}

function cookieConsent(lang) {
  const c = content[lang].cookieConsent;
  return `<div class="cookie-banner" data-cookie-banner hidden><div><span class="cookie-banner__mark" aria-hidden="true">◌</span><div><strong>${esc(c.title)}</strong><p>${esc(c.text)} <a href="${paths[lang].cookies}">${esc(content[lang].footer.cookies)}</a></p></div></div><div class="cookie-banner__actions"><button class="cookie-action cookie-action--secondary" type="button" data-cookie-reject>${esc(c.reject)}</button><button class="cookie-action cookie-action--secondary" type="button" data-cookie-manage>${esc(c.manage)}</button><button class="cookie-action cookie-action--primary" type="button" data-cookie-accept>${esc(c.accept)}</button></div></div><div class="cookie-modal" data-cookie-modal hidden><div class="cookie-modal__backdrop" data-cookie-close></div><section class="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><button class="cookie-dialog__close" type="button" data-cookie-close aria-label="${esc(c.close)}">×</button><p class="eyebrow">LinkedLab</p><h2 id="cookie-title">${esc(c.preferencesTitle)}</h2><p>${esc(c.preferencesText)}</p><div class="cookie-options"><div class="cookie-option"><div><strong>${esc(c.necessary)}</strong><p>${esc(c.necessaryText)}</p></div><span>${esc(c.always)}</span></div><label class="cookie-option"><div><strong>${esc(c.analytics)}</strong><p>${esc(c.analyticsText)}</p></div><input type="checkbox" data-cookie-category="analytics"><i aria-hidden="true"></i></label><label class="cookie-option"><div><strong>${esc(c.marketing)}</strong><p>${esc(c.marketingText)}</p></div><input type="checkbox" data-cookie-category="marketing"><i aria-hidden="true"></i></label></div><div class="cookie-dialog__actions"><button class="cookie-action cookie-action--secondary" type="button" data-cookie-reject>${esc(c.reject)}</button><button class="cookie-action cookie-action--primary" type="button" data-cookie-save>${esc(c.save)}</button></div></section></div>`;
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
  const intro = key === "home" ? `<div class="site-intro" data-site-intro aria-label="LinkedLab"><div class="site-intro__halo"></div><div class="site-intro__shapes"><i></i><i></i><i></i><i></i></div><div class="site-intro__brand"><span><img src="/assets/linkedlab-logo-mark.webp" width="256" height="256" alt=""></span><strong>LinkedLab</strong><small>${esc(t.common.eyebrow)}</small></div><div class="site-intro__line"></div><button type="button" data-skip-intro>${esc(t.ui.skipIntro)}</button></div>` : "";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}">${alternates}<link rel="alternate" hreflang="x-default" href="${baseUrl}${paths.de[key]}"><meta property="og:type" content="website"><meta property="og:site_name" content="LinkedLab"><meta property="og:locale" content="${t.locale}"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(meta.title)}"><meta name="twitter:description" content="${esc(meta.description)}"><meta name="theme-color" content="#071426"><link rel="icon" href="/assets/linkedlab-logo-mark.webp" type="image/webp"><link rel="stylesheet" href="/assets/styles.css"><script type="application/ld+json">${schema(lang, key)}</script><script type="module" src="/assets/client.js"></script><script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script><script defer src="/_vercel/insights/script.js"></script></head><body>${intro}<a class="skip-link" href="#main">${esc(t.skip)}</a>${header(lang, key)}<main id="main">${renderBody(lang, key)}</main>${footer(lang)}${cookieConsent(lang)}</body></html>`;
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
await cp(join(root, "public", "assets", "linkedlab-logo-mark.webp"), join(dist, "assets", "linkedlab-logo-mark.webp"));
await cp(join(root, "public", "assets", "linkedlab-logo-full.webp"), join(dist, "assets", "linkedlab-logo-full.webp"));

console.log(`Built ${site.languages.length * pageKeys.length + 2} HTML pages for ${baseUrl}`);
