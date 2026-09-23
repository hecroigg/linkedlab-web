import { site } from "./site.config.mjs";

const euro = (value) => new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: site.pricing.currency,
  maximumFractionDigits: 0
}).format(value);

const range = (price) => price.to
  ? `${euro(price.from)}–${euro(price.to)}`
  : `${euro(price.from)}${price.plus ? "+" : ""}`;

const priceTokens = {
  foundingOne: range(site.pricing.founding.onePage),
  foundingBusiness: range(site.pricing.founding.business),
  foundingComplex: range(site.pricing.founding.complex),
  launch: euro(site.pricing.standard.launch.from),
  business: euro(site.pricing.standard.business.from),
  growth: `${euro(site.pricing.standard.growth.from)}+`,
  care: `${euro(site.pricing.care.monthly)}/mo`
};

export const paths = {
  de: {
    home: "/de/", websites: "/de/websites/", systems: "/de/business-systeme/",
    pricing: "/de/preise/", process: "/de/ablauf/", projects: "/de/projekte/",
    contact: "/de/kontakt/", legal: "/de/impressum/", privacy: "/de/datenschutz/", cookies: "/de/cookies/"
  },
  en: {
    home: "/en/", websites: "/en/websites/", systems: "/en/business-systems/",
    pricing: "/en/pricing/", process: "/en/how-it-works/", projects: "/en/work/",
    contact: "/en/contact/", legal: "/en/legal-notice/", privacy: "/en/privacy/", cookies: "/en/cookies/"
  },
  es: {
    home: "/es/", websites: "/es/paginas-web/", systems: "/es/sistemas-digitales/",
    pricing: "/es/precios/", process: "/es/proceso/", projects: "/es/proyectos/",
    contact: "/es/contacto/", legal: "/es/aviso-legal/", privacy: "/es/privacidad/", cookies: "/es/politica-de-cookies/"
  }
};

export const content = {
  de: {
    locale: "de_DE",
    languageName: "Deutsch",
    skip: "Zum Inhalt springen",
    nav: { websites: "Websites", systems: "Business Systeme", pricing: "Preise", projects: "Projekte", process: "Ablauf", contact: "Projekt starten" },
    footer: { line: "Digital. Einfach. In Ihrer Hand.", area: "Für lokale Unternehmen in Mannheim, Ludwigshafen und Rhein-Neckar – und remote.", legal: "Impressum", privacy: "Datenschutz", cookies: "Cookie-Richtlinie", cookieSettings: "Cookies verwalten", rights: "Alle Rechte vorbehalten." },
    common: {
      eyebrow: "Websites & Digital Systems",
      primaryCta: "Website anfragen",
      secondaryCta: "Preise ansehen",
      talk: "Kostenloses Erstgespräch",
      from: "ab",
      founding: "Founding Client Preis",
      optional: "Optional",
      learnMore: "Mehr erfahren",
      ownership: "Ihre Website. Ihre Daten. Ihre Kontrolle."
    },
    ui: { noLockIn: "Kein Lock-in", yours: "In Ihrer Hand", fast: "Schnell", local: "Lokal", system: ["Kunden", "Termine", "Business System", "Aufgaben", "Umsatz"], orbitExtras: ["SEO", "Daten", "Automatisierung", "Analytics"], skipIntro: "Intro überspringen", mostChosen: "Beliebteste Wahl", selectedProjects: "Ausgewählte Projekte", remote: "Remote", ownershipAssets: ["Domain", "Website", "Daten", "Zugänge"], projectTypes: ["Marke · Web · SEO", "Web · Lokales SEO"], connect: "Kontakt", navLabel: "Hauptnavigation", languageLabel: "Sprache", openMenu: "Menü öffnen", closeMenu: "Menü schließen", mobileNav: "Mobile Navigation" },
    home: {
      seoTitle: "Webdesign Mannheim für kleine Unternehmen | LinkedLab",
      seoDescription: "Schnelle, individuelle Websites und einfache digitale Systeme für kleine Unternehmen in Mannheim, Ludwigshafen und Rhein-Neckar. Klare Preise, kein Lock-in.",
      heroKicker: "Webdesign für lokale Unternehmen",
      heroTitle: "Eine professionelle Website. Ohne digitales Durcheinander.",
      heroText: "LinkedLab baut schnelle Websites für lokale Unternehmen in Mannheim, Ludwigshafen und Rhein-Neckar – klar kalkuliert, individuell gestaltet und vollständig unter Ihrer Kontrolle.",
      heroNote: "Unverbindlich · klare Antwort · kein Verkaufsdruck",
      journeyKicker: "Ihr digitales Ökosystem",
      journeyTitle: "Alles verbunden. Nichts kompliziert.",
      journeyText: "Entdecken Sie, wie Website, Kunden, Abläufe und Daten zu einem einzigen klaren System werden.",
      journeyScroll: "Scrollen zum Erkunden",
      journeyTicker: ["Webdesign", "Lokales SEO", "Kunden", "Termine", "Automatisierung", "Analytics"],
      journeySteps: [["01", "Sichtbar werden", "Eine schnelle Website macht Ihr Angebot klar und bringt die richtigen Menschen zu Ihnen."], ["02", "Anfragen strukturieren", "Kontakte, Termine und nächste Schritte fließen in ein System, das Ihr Team versteht."], ["03", "Einfacher wachsen", "Automatisierungen und klare Daten sparen Zeit, ohne neue digitale Unordnung zu schaffen."]],
      trust: [
        ["Festes Angebot", "Sie wissen vorher, was Sie zahlen."],
        ["Kein Lock-in", "Domain und Website bleiben unter Ihrer Kontrolle."],
        ["30 Tage Support", "Nach dem Launch sind wir weiter für Sie da."]
      ],
      problemKicker: "Die digitale Seite – einfach gelöst",
      problemTitle: "Sie führen Ihr Geschäft. Wir kümmern uns um den digitalen Teil.",
      problemText: "Keine Tool-Flut, keine unklaren Monatskosten und keine Technik, die nur wir verstehen. Sie erhalten eine klare Lösung, die zu Ihrem Betrieb passt.",
      servicesTitle: "Zwei Lösungen. Ein klares Ziel.",
      websiteCard: {
        label: "Hauptleistung",
        title: "Professionelle Websites",
        text: "Eine schnelle, mobil optimierte Website, die erklärt, Vertrauen schafft und Anfragen bringt.",
        bullets: ["Individuelles Design", "Lokales SEO", "Google Maps & Kontakt", "Domain in Ihrer Hand"]
      },
      systemsCard: {
        label: "Wenn Ihr Betrieb mehr Struktur braucht",
        title: "Business Systeme",
        text: "Einfache interne Systeme für Kunden, Termine, Aufgaben, Umsätze und wiederkehrende Abläufe.",
        bullets: ["CRM & Kundendaten", "Termine & Formulare", "Dashboards", "Automatisierte Abläufe"]
      },
      differenceTitle: "Einfach. Transparent. Ihres.",
      differences: [
        ["SIMPLE", "Die Technik bleibt im Hintergrund. Sie bekommen eine Lösung, die verständlich und leicht zu bedienen ist."],
        ["TRANSPARENT", "Klarer Umfang, klares Angebot und keine versteckten Kosten."],
        ["TAILORED", "Auf Ihr Geschäft zugeschnitten – nicht dieselbe Vorlage für jeden."],
        ["YOURS", "Ihre Domain, Ihre Website und Ihre wichtigen Daten bleiben unter Ihrer Kontrolle."]
      ],
      priceTitle: "Klare Preise von Anfang an.",
      priceText: `Founding Clients starten aktuell bei ${priceTokens.foundingOne}. Sie erhalten vor Projektbeginn ein festes Angebot.`,
      processTitle: "Von der ersten Idee bis zum Launch.",
      process: [
        ["01", "Kennenlernen", "Wir klären Ziel, Zielgruppe und was die Website leisten soll."],
        ["02", "Fester Umfang", "Sie erhalten einen klaren Vorschlag mit Festpreis."],
        ["03", "Design & Aufbau", "Wir sammeln Inhalte, gestalten und bauen die Website."],
        ["04", "Feedback", `Sie prüfen die Vorschau. ${site.includedRevisionRounds} Feedbackrunden sind inklusive.`],
        ["05", "Launch", `Nach Freigabe geht die Website online – inklusive ${site.launchSupportDays} Tagen Support.`]
      ],
      workTitle: "Arbeit, die das Geschäft verständlich macht.",
      workText: "Unsere ersten Projekte zeigen die Richtung: klare Kommunikation, lokale Auffindbarkeit und digitale Werkzeuge ohne unnötige Komplexität.",
      finalTitle: "Bereit für eine Website, die zu Ihrem Geschäft passt?",
      finalText: "Erzählen Sie kurz, was Sie anbieten und was Ihre Website erreichen soll. Sie erhalten eine ehrliche Einschätzung und einen klaren nächsten Schritt."
    },
    websites: {
      seoTitle: "Website erstellen lassen in Mannheim | LinkedLab",
      seoDescription: "Individuelle, schnelle und SEO-optimierte Websites für kleine Unternehmen in Mannheim. Klare Preise, kein Lock-in und vollständige Kontrolle.",
      kicker: "Websites",
      title: "Eine Website, die erklärt, Vertrauen schafft und Anfragen bringt.",
      intro: "Für lokale Unternehmen, die professionell auftreten möchten – ohne sich selbst mit Technik, Hosting und unklaren Agenturpaketen beschäftigen zu müssen.",
      outcomesTitle: "Was Ihre Website für Sie übernimmt",
      outcomes: [
        ["Sofort verständlich", "Besucher erkennen in wenigen Sekunden, was Sie anbieten und warum sie bei Ihnen richtig sind."],
        ["Auf jedem Gerät überzeugend", "Mobile-first entwickelt, damit die Seite auch unterwegs schnell und angenehm funktioniert."],
        ["Lokal auffindbar", "Technische SEO-Basis, passende Seitenstruktur und lokale Signale für Mannheim und Ihre Region."],
        ["Einfach erreichbar", "Klare Kontaktwege über Telefon, WhatsApp, E-Mail oder Google Maps – passend zu Ihrem Betrieb."],
        ["Schnell geladen", "Schlanker Aufbau ohne unnötige Skripte oder schwere Technik."],
        ["Unter Ihrer Kontrolle", "Domain und zentrale Zugänge gehören Ihnen. Sie bleiben nicht von LinkedLab abhängig."]
      ],
      includedTitle: "Typischerweise enthalten",
      included: ["Individuelles visuelles Konzept", "Startseite und benötigte Unterseiten", "Leistungen und transparente Inhalte", "Lokale SEO-Grundlage", "Kontakt und Standort", "Rechtliche Seiten vorbereitet", "Zwei Feedbackrunden", "Launch und 30 Tage Support"],
      idealTitle: "Geeignet für Betriebe, die online besser wirken möchten.",
      idealText: "Zum Beispiel Friseursalons, Studios, Handwerksbetriebe, Praxen, Restaurants, Coaches, Massage- und Wellnessangebote oder lokale Dienstleister.",
      finalTitle: "Ihre Website soll Ihnen Arbeit abnehmen – nicht neue machen."
    },
    systems: {
      seoTitle: "Digitale Systeme für kleine Unternehmen | LinkedLab",
      seoDescription: "Einfache CRM-, Termin-, Aufgaben- und Reporting-Systeme für kleine Unternehmen. Individuell aufgebaut, verständlich dokumentiert und unter Ihrer Kontrolle.",
      kicker: "Business Systems",
      title: "Weniger Zettel, weniger doppelte Arbeit, mehr Überblick.",
      intro: "LinkedLab baut einfache interne Systeme rund um Ihre tatsächlichen Abläufe. Nur das, was Ihr Team wirklich braucht.",
      distinction: "Websites schaffen digitale Präsenz. Business Systeme schaffen interne Ordnung.",
      useCasesTitle: "Was wir strukturieren können",
      useCases: [
        ["Kunden & CRM", "Kontakte, Historie, Status und nächste Schritte an einem Ort."],
        ["Termine & Anfragen", "Saubere Erfassung, Zuständigkeiten und weniger manuelles Nachfassen."],
        ["Aufgaben & Abläufe", "Wiederkehrende Prozesse, Checklisten und klare Verantwortlichkeiten."],
        ["Umsätze & Überblick", "Einfache Dashboards für Einnahmen, Auslastung und wichtige Kennzahlen."],
        ["Formulare", "Informationen strukturiert erfassen statt über Nachrichten zusammensuchen."],
        ["Automatisierungen", "Sinnvolle Übergaben und Benachrichtigungen, wenn sie wirklich Zeit sparen."]
      ],
      principleTitle: "Das System folgt Ihrem Betrieb.",
      principleText: "Wir starten nicht mit einem Tool. Wir starten mit Ihrem Ablauf: Was passiert heute, wo geht Zeit verloren und welche Informationen brauchen Sie wirklich? Erst dann entsteht die passende Lösung.",
      pricingNote: "Business Systeme werden nach einem kurzen Prozess-Check als Festpreis angeboten. Kleine Setups können kompakt starten und später wachsen.",
      finalTitle: "Wo verliert Ihr Betrieb heute unnötig Zeit?"
    },
    pricing: {
      seoTitle: "Webdesign Preise Mannheim | LinkedLab",
      seoDescription: "Transparente Website-Preise für kleine Unternehmen: Founding Client Angebote ab 349 €, klare Leistungen und optionaler Support ohne Pflichtabo.",
      kicker: "Preise",
      title: "Klar kalkuliert. Ohne versteckte Kosten.",
      intro: "Jedes Unternehmen ist anders. Trotzdem sollten Sie früh wissen, in welcher Größenordnung sich Ihr Projekt bewegt.",
      foundingTitle: "Founding Client Preise",
      foundingText: "Vergünstigte Konditionen für die ersten LinkedLab-Projekte in der Region. Dafür wünschen wir uns ehrliches Feedback und – wenn Sie zufrieden sind – die Erlaubnis, das Projekt zu zeigen.",
      plans: [
        ["One-page", priceTokens.foundingOne, "Eine fokussierte Website für ein klares Angebot.", ["Eine starke Seite", "Mobile-first", "Kontakt & Standort", "SEO-Basis"]],
        ["Business website", priceTokens.foundingBusiness, "Mehr Raum für Leistungen, Vertrauen und lokale Auffindbarkeit.", ["Mehrere Seiten", "Individuelle Struktur", "Lokales SEO", "Zwei Feedbackrunden"]],
        ["Individuell", priceTokens.foundingComplex, "Für größere Inhalte, besondere Funktionen oder komplexere Strukturen.", ["Individueller Umfang", "Klare Leistungsdefinition", "Festes Angebot", "Launch-Support"]]
      ],
      futureTitle: "Reguläre Preise",
      futurePlans: [["Launch", priceTokens.launch], ["Business", priceTokens.business], ["Growth", priceTokens.growth]],
      careTitle: `LinkedLab Care · ${euro(site.pricing.care.monthly)}/Monat`,
      careText: "Optional nach dem Launch: technische Betreuung, kleine Korrekturen, Support und eine kleine Änderung pro Monat. Keine Pflicht und nicht rückwirkend ansammelbar.",
      withoutCare: "Ohne Care-Paket bleibt Ihre Website online und unter Ihrer Kontrolle. Spätere Änderungen können bei Bedarf einzeln beauftragt werden.",
      paymentTitle: "Faire Projektzahlung",
      paymentText: "50 % zum Projektstart, 50 % nach Freigabe und vor dem Launch. Der genaue Umfang steht vorab schriftlich fest.",
      faqTitle: "Häufige Fragen",
      faqs: [
        ["Gibt es eine monatliche Pflichtgebühr?", "Nein. LinkedLab Care ist optional. Externe Basiskosten wie Domain oder Hosting werden transparent ausgewiesen und laufen möglichst direkt über Sie."],
        ["Wem gehört die Domain?", "Ihnen. Domain und zentrale Zugänge sollen unter Ihrer Kontrolle bleiben."],
        ["Sind Änderungen inklusive?", "Zwei strukturierte Feedbackrunden sind im Website-Projekt enthalten. Danach können zusätzliche Änderungen klar bepreist werden."],
        ["Wie lange dauert eine Website?", "Das hängt vom Umfang und davon ab, wie schnell Inhalte vorliegen. Ein kompakter Auftritt ist meist deutlich schneller als ein umfangreiches Projekt. Sie erhalten vorab einen realistischen Zeitplan."],
        ["Schreiben Sie auch die Texte?", "Ja. Wir strukturieren und formulieren verständliche Webtexte auf Basis Ihrer Informationen. Fachliche Aussagen prüfen Sie vor dem Launch."],
        ["Kann ich später erweitern?", "Ja. Die Struktur wird so angelegt, dass zusätzliche Seiten, Sprachen oder Funktionen später möglich sind."]
      ],
      finalTitle: "Sie möchten wissen, welches Paket passt?"
    },
    process: {
      seoTitle: "So entsteht Ihre Website | LinkedLab",
      seoDescription: "Ein klarer Website-Prozess: Erstgespräch, Festpreis, Inhalte, Design, zwei Feedbackrunden, Launch und 30 Tage Support.",
      kicker: "Ablauf",
      title: "Ein klarer Prozess. Keine Überraschungen.",
      intro: "Sie wissen jederzeit, was als Nächstes passiert, was wir von Ihnen brauchen und wann eine Entscheidung ansteht.",
      steps: [
        ["01", "Kurzes Erstgespräch", "Wir verstehen Ihr Angebot, Ihre Kunden und das Ziel der Website."],
        ["02", "Umfang & Festpreis", "Sie erhalten einen klaren Vorschlag. Erst wenn alles passt, starten wir."],
        ["03", "50 % Projektstart", "Die erste Zahlung reserviert den Start und macht den vereinbarten Umfang verbindlich."],
        ["04", "Inhalte sammeln", "Wir führen Sie durch Texte, Bilder, Leistungen, Preise und Kontaktdaten."],
        ["05", "Design & Entwicklung", "LinkedLab erstellt Struktur, Gestaltung und technische Umsetzung."],
        ["06", "Vorschau & Feedback", "Sie sehen eine geschützte Vorschau. Zwei strukturierte Feedbackrunden sind enthalten."],
        ["07", "Freigabe & Restzahlung", "Nach Ihrer Freigabe wird die zweite Hälfte fällig."],
        ["08", "Launch", "Domain und Infrastruktur werden sauber verbunden – mit Zugängen unter Ihrer Kontrolle."],
        ["09", "30 Tage Support", "Wir beheben Startprobleme und helfen bei den ersten Schritten."],
        ["10", "Optional: Care", "Wenn Sie möchten, übernehmen wir danach kleine Änderungen und technische Betreuung."]
      ],
      prepTitle: "Was Sie vorbereiten müssen",
      prepText: "So wenig wie möglich. Hilfreich sind Ihr Logo, vorhandene Bilder, Leistungsübersicht, Preise und Kontaktdaten. Wenn etwas fehlt, sagen wir Ihnen konkret, was wirklich benötigt wird.",
      finalTitle: "Der erste Schritt dauert nur wenige Minuten."
    },
    projects: {
      seoTitle: "Webdesign Projekte | LinkedLab",
      seoDescription: "Ausgewählte LinkedLab Projekte: klare Websites und digitale Systeme für lokale Unternehmen.",
      kicker: "Projekte",
      title: "Wenige Projekte. Sauber erklärt.",
      intro: "Wir zeigen nur, was tatsächlich entstanden ist – ohne erfundene Kennzahlen oder leere Erfolgsgeschichten.",
      items: [
        ["LinkedLab", "Marke & Website", "Die eigene Website als Beispiel für klare Positionierung, trilinguale Inhalte, transparente Preise und eine schnelle statische Architektur.", "Aktuelles Projekt"],
        ["Lluna Blanca", "Website · Local SEO", "Digitaler Auftritt für ein Zentrum für Massagen, Naturtherapien und Ästhetik in Blanes. Fokus: klare Leistungen, lokales Vertrauen und direkter Kontakt.", "Live-Projekt", "https://llunablancablanes.com", "Projekt ansehen"],
        ["Rheinwerk Renovierung", "Website · Interaktive Demo", "Eine moderne, visuelle Website-Demo für einen Renovierungsbetrieb. Sie verbindet klare Leistungen, starke Übergänge und direkte Kontaktwege.", "Demo-Projekt", "https://rheinwerk-renovierung.vercel.app", "Demo ansehen"]
      ],
      note: "Weitere ausgewählte Kundenprojekte werden ergänzt, sobald sie veröffentlicht werden dürfen.",
      finalTitle: "Ihr Unternehmen könnte das nächste passende Projekt sein."
    },
    contact: {
      seoTitle: "Website-Projekt anfragen | LinkedLab Mannheim",
      seoDescription: "Sprechen Sie mit LinkedLab über Ihre neue Website oder ein digitales System. Unverbindliche erste Einschätzung für lokale Unternehmen.",
      kicker: "Kontakt",
      title: "Erzählen Sie kurz von Ihrem Projekt.",
      intro: "Eine kurze Nachricht reicht. Was macht Ihr Unternehmen, was soll besser werden und wann möchten Sie starten? Sie erhalten eine ehrliche Einschätzung – ohne Verkaufsdruck.",
      instagramTitle: "Direkt über Instagram",
      instagramText: "Für den schnellsten Start senden Sie LinkedLab eine Direktnachricht.",
      whatsappTitle: "Direkt über WhatsApp",
      whatsappText: "Schreiben Sie uns kurz, worum es bei Ihrem Projekt geht. Wir antworten persönlich und unverbindlich.",
      messageGuideTitle: "Das können Sie direkt mitschicken",
      messageGuide: ["Name und Art des Unternehmens", "Standort oder Zielregion", "Besteht bereits eine Website?", "Was soll die neue Lösung erreichen?", "Gewünschter Zeitraum"],
      response: "Wir antworten in weniger als 24 Stunden.",
      button: "Nachricht auf Instagram senden",
      whatsappButton: "Auf WhatsApp schreiben",
      finalNote: "Ein unverbindliches Erstgespräch ist kostenlos."
    },
    legal: { title: "Impressum", intro: "Anbieterkennzeichnung und rechtliche Informationen zu LinkedLab.", privacyTitle: "Datenschutzerklärung", privacyIntro: "Informationen darüber, wie LinkedLab personenbezogene Daten verarbeitet.", cookiesTitle: "Cookie-Richtlinie", cookiesIntro: "Informationen über Cookies und Ihre Auswahlmöglichkeiten auf dieser Website." },
    cookieConsent: { title: "Ihre Privatsphäre, klar geregelt.", text: "Wir speichern Ihre Cookie-Auswahl. Vercel Web Analytics arbeitet ohne Cookies; optionale Analyse- und Marketing-Cookies sind nicht aktiv.", accept: "Alle akzeptieren", reject: "Ablehnen", manage: "Verwalten", save: "Auswahl speichern", close: "Schließen", necessary: "Notwendig", necessaryText: "Speichert Ihre Cookie-Auswahl und kann nicht deaktiviert werden.", analytics: "Optionale Analyse-Cookies", analyticsText: "Derzeit ist kein Dienst mit dieser optionalen Kategorie verbunden.", marketing: "Marketing", marketingText: "Derzeit sind keine Marketing-Tracker verbunden.", always: "Immer aktiv", preferencesTitle: "Cookie-Einstellungen", preferencesText: "Sie können Ihre Auswahl jederzeit im Footer ändern." }
  },
  en: {
    locale: "en_GB", languageName: "English", skip: "Skip to content",
    nav: { websites: "Websites", systems: "Business Systems", pricing: "Pricing", projects: "Work", process: "How it works", contact: "Start a project" },
    footer: { line: "Digital, made simple.", area: "For local businesses in Mannheim, Ludwigshafen and Rhein-Neckar – and remotely.", legal: "Legal notice", privacy: "Privacy", cookies: "Cookie policy", cookieSettings: "Manage cookies", rights: "All rights reserved." },
    common: { eyebrow: "Websites & Digital Systems", primaryCta: "Get your website", secondaryCta: "See pricing", talk: "Free first conversation", from: "from", founding: "Founding client price", optional: "Optional", learnMore: "Learn more", ownership: "Your website. Your data. Your control." },
    ui: { noLockIn: "No lock-in", yours: "100% yours", fast: "Fast", local: "Local", system: ["Customers", "Appointments", "Business System", "Tasks", "Revenue"], orbitExtras: ["SEO", "Data", "Automation", "Analytics"], skipIntro: "Skip intro", mostChosen: "Most chosen", selectedProjects: "Selected projects", remote: "Remote", ownershipAssets: ["Domain", "Website", "Data", "Access"], projectTypes: ["Brand · Web · SEO", "Web · Local SEO"], connect: "Connect", navLabel: "Main navigation", languageLabel: "Language", openMenu: "Open menu", closeMenu: "Close menu", mobileNav: "Mobile navigation" },
    home: {
      seoTitle: "Websites for small businesses in Mannheim | LinkedLab", seoDescription: "Fast, tailored websites and simple digital systems for small businesses in Mannheim and Rhein-Neckar. Clear pricing, no lock-in.",
      heroKicker: "Websites for local businesses", heroTitle: "A professional website. Without the digital mess.", heroText: "LinkedLab builds fast websites for local businesses in Mannheim, Ludwigshafen and Rhein-Neckar – clearly priced, tailored to your business and fully under your control.", heroNote: "No obligation · clear answer · no sales pressure",
      journeyKicker: "Your digital ecosystem", journeyTitle: "Everything connected. Nothing complicated.", journeyText: "Explore how your website, customers, processes and data become one clear system.", journeyScroll: "Scroll to explore", journeyTicker: ["Web design", "Local SEO", "Customers", "Bookings", "Automation", "Analytics"], journeySteps: [["01", "Get discovered", "A fast website makes your offer clear and brings the right people to your business."], ["02", "Organise enquiries", "Contacts, bookings and next steps flow into a system your team can understand."], ["03", "Grow with clarity", "Automation and useful data save time without creating another digital mess."]],
      trust: [["Fixed proposal", "Know what you will pay before work starts."], ["No lock-in", "Your domain and website stay under your control."], ["30 days support", "We stay available after launch."]],
      problemKicker: "The digital side, made simple", problemTitle: "You focus on the business. We take care of the digital side.", problemText: "No tool overload, unclear subscriptions or technology that only the agency understands. You get a clear solution built around the way your business works.",
      servicesTitle: "Two solutions. One clear purpose.",
      websiteCard: { label: "Core service", title: "Professional websites", text: "A fast, mobile-first website that explains your value, builds trust and brings in enquiries.", bullets: ["Tailored design", "Local SEO", "Maps & contact", "Domain in your control"] },
      systemsCard: { label: "When your operations need structure", title: "Business Systems", text: "Simple internal systems for customers, appointments, tasks, revenue and repeatable processes.", bullets: ["CRM & customer data", "Bookings & forms", "Dashboards", "Useful automation"] },
      differenceTitle: "Simple. Transparent. Yours.", differences: [["SIMPLE", "Technology stays in the background. The result is understandable and easy to use."], ["TRANSPARENT", "Clear scope, clear proposal and no hidden costs."], ["TAILORED", "Built around your business, not the same template for everyone."], ["YOURS", "Your domain, website and important data stay under your control."]],
      priceTitle: "Clear pricing from day one.", priceText: `Founding client projects currently start at ${priceTokens.foundingOne}. You receive a fixed proposal before work begins.`,
      processTitle: "From first conversation to launch.", process: [["01", "Understand", "We clarify your goal, audience and what the website needs to do."], ["02", "Fixed scope", "You receive a clear proposal with a fixed price."], ["03", "Design & build", "We gather the content, design and build the website."], ["04", "Feedback", `You review the staging site. ${site.includedRevisionRounds} revision rounds are included.`], ["05", "Launch", `Once approved, the site goes live with ${site.launchSupportDays} days of support.`]],
      workTitle: "Work that makes the business easy to understand.", workText: "Our first projects set the direction: clear communication, local discoverability and digital tools without needless complexity.",
      finalTitle: "Ready for a website that fits your business?", finalText: "Tell us what you offer and what the website needs to achieve. You will get an honest assessment and a clear next step."
    },
    websites: {
      seoTitle: "Small business websites in Mannheim | LinkedLab", seoDescription: "Tailored, fast and SEO-ready websites for small businesses. Clear prices, no lock-in and full control of your digital assets.", kicker: "Websites", title: "A website that explains, builds trust and brings in enquiries.", intro: "For local businesses that want to look professional without wrestling with technology, hosting or vague agency packages.",
      outcomesTitle: "What your website does for you", outcomes: [["Clear in seconds", "Visitors quickly understand what you offer and why you are the right choice."], ["Strong on every device", "Built mobile-first for a quick, comfortable experience on the go."], ["Ready for local search", "A sound technical base, clear structure and local signals for your city and service area."], ["Easy to contact", "Phone, WhatsApp, email or Maps – whichever route fits your business."], ["Fast by design", "A lean build without unnecessary scripts or heavy technology."], ["Under your control", "Your domain and key accounts belong to you. You are not dependent on LinkedLab."]],
      includedTitle: "Typically included", included: ["Tailored visual direction", "Homepage and essential subpages", "Services and clear content", "Local SEO foundation", "Contact and location", "Legal pages prepared", "Two revision rounds", "Launch and 30 days support"], idealTitle: "Made for businesses that need to show up better online.", idealText: "Hairdressers, studios, trades, clinics, restaurants, coaches, massage and wellness businesses, and other local services.", finalTitle: "Your website should reduce work, not create more."
    },
    systems: {
      seoTitle: "Business systems for small companies | LinkedLab", seoDescription: "Simple CRM, appointment, task and reporting systems for small businesses. Tailored, documented and under your control.", kicker: "Business Systems", title: "Fewer loose notes. Less double work. A clearer view.", intro: "LinkedLab builds simple internal systems around the way your business actually operates – only what your team genuinely needs.", distinction: "Websites create digital presence. Business Systems create internal organisation.",
      useCasesTitle: "What we can organise", useCases: [["Customers & CRM", "Keep contacts, history, status and next steps in one place."], ["Bookings & enquiries", "Capture requests cleanly, assign ownership and reduce manual follow-up."], ["Tasks & processes", "Repeatable workflows, checklists and clear responsibilities."], ["Revenue & visibility", "Simple dashboards for income, capacity and the numbers that matter."], ["Forms", "Collect structured information instead of hunting through messages."], ["Automation", "Useful hand-offs and alerts where they genuinely save time."]], principleTitle: "The system follows the business.", principleText: "We do not begin with a tool. We begin with your process: what happens today, where time is lost and what information you actually need. Then we build the right solution.", pricingNote: "Business Systems are quoted at a fixed price after a short process review. Small setups can start lean and grow later.", finalTitle: "Where is your business losing time today?"
    },
    pricing: {
      seoTitle: "Website pricing for small businesses | LinkedLab", seoDescription: "Transparent website pricing with founding client offers from €349, clearly defined scope and optional care with no mandatory subscription.", kicker: "Pricing", title: "Clearly priced. No hidden costs.", intro: "Every business is different. You should still know the likely investment early on.", foundingTitle: "Founding client pricing", foundingText: "Reduced pricing for LinkedLab's first regional projects. In return, we ask for honest feedback and, if you are happy, permission to feature the work.",
      plans: [["One-page", priceTokens.foundingOne, "A focused website for one clear offer.", ["One strong page", "Mobile-first", "Contact & location", "SEO foundation"]], ["Business website", priceTokens.foundingBusiness, "More room for services, trust and local search.", ["Multiple pages", "Tailored structure", "Local SEO", "Two revision rounds"]], ["Custom", priceTokens.foundingComplex, "For larger content sets, specific features or a more complex structure.", ["Custom scope", "Clear deliverables", "Fixed proposal", "Launch support"]]],
      futureTitle: "Standard pricing", futurePlans: [["Launch", priceTokens.launch], ["Business", priceTokens.business], ["Growth", priceTokens.growth]], careTitle: `LinkedLab Care · ${euro(site.pricing.care.monthly)}/month`, careText: "Optional after launch: technical care, small fixes, support and one small change per month. No obligation and unused changes do not roll over.", withoutCare: "Without Care, your website stays live and under your control. Future changes can be requested and priced individually.", paymentTitle: "Fair project payments", paymentText: "50% to begin, 50% after approval and before launch. The full scope is agreed in writing first.",
      faqTitle: "Frequently asked questions", faqs: [["Is there a mandatory monthly fee?", "No. LinkedLab Care is optional. Basic external costs such as the domain or hosting are shown clearly and, where possible, billed directly to you."], ["Who owns the domain?", "You do. The domain and key accounts should remain under your control."], ["Are changes included?", "Two structured revision rounds are included. Additional changes can be scoped and priced clearly."], ["How long does a website take?", "It depends on scope and how quickly content is available. A focused site is usually much faster than a large one. You receive a realistic schedule up front."], ["Do you write the copy?", "Yes. We structure and write clear website copy from your information. You approve any technical or professional claims before launch."], ["Can the website grow later?", "Yes. The structure allows additional pages, languages or features when they become useful."]], finalTitle: "Not sure which option fits?"
    },
    process: { seoTitle: "How LinkedLab builds your website", seoDescription: "A clear website process: first conversation, fixed proposal, content, design, two revision rounds, launch and 30 days of support.", kicker: "How it works", title: "A clear process. No surprises.", intro: "You always know what happens next, what we need from you and when a decision is due.", steps: [["01", "Short first conversation", "We understand your offer, customers and the job the website needs to do."], ["02", "Scope & fixed price", "You receive a clear proposal. Work only starts when it feels right."], ["03", "50% project start", "The first payment reserves the project and confirms the agreed scope."], ["04", "Gather the content", "We guide you through copy, images, services, pricing and contact details."], ["05", "Design & development", "LinkedLab creates the structure, visual design and technical build."], ["06", "Staging & feedback", "You review a private preview. Two structured revision rounds are included."], ["07", "Approval & final payment", "The remaining 50% is due once you approve the website."], ["08", "Launch", "Domain and infrastructure are connected with the key accounts in your control."], ["09", "30 days support", "We resolve launch issues and help with the first steps."], ["10", "Optional Care", "If useful, we can continue with small changes and technical care."]], prepTitle: "What you need to prepare", prepText: "As little as possible. A logo, existing photos, service list, prices and contact details are helpful. If something is missing, we tell you exactly what is genuinely needed.", finalTitle: "The first step only takes a few minutes." },
    projects: { seoTitle: "Website projects | LinkedLab", seoDescription: "Selected LinkedLab projects: clear websites and digital systems for local businesses.", kicker: "Work", title: "A small portfolio, explained properly.", intro: "We only show work that exists – no invented metrics or vague success stories.", items: [["LinkedLab", "Brand & Website", "LinkedLab's own website demonstrates clear positioning, trilingual content, transparent pricing and a fast static architecture.", "Current project"], ["Lluna Blanca", "Website · Local SEO", "A digital presence for a massage, natural therapy and aesthetics centre in Blanes. Focused on clear services, local trust and direct contact.", "Live project", "https://llunablancablanes.com", "View project"], ["Rheinwerk Renovierung", "Website · Interactive demo", "A modern, visual website demo for a renovation business, combining clear services, strong transitions and direct contact paths.", "Demo project", "https://rheinwerk-renovierung.vercel.app", "View demo"]], note: "More selected client work will be added when it is ready and approved for publication.", finalTitle: "Your business could be the next right-fit project." },
    contact: { seoTitle: "Start a website project | LinkedLab Mannheim", seoDescription: "Talk to LinkedLab about a new website or digital system. A no-obligation first assessment for local businesses.", kicker: "Contact", title: "Tell us a little about your project.", intro: "A short message is enough. What does your business do, what needs to improve and when would you like to start? You will get an honest answer, without sales pressure.", instagramTitle: "Message us on Instagram", instagramText: "For the quickest start, send LinkedLab a direct message.", whatsappTitle: "Message us on WhatsApp", whatsappText: "Tell us briefly what your project is about. We will reply personally, with no obligation.", messageGuideTitle: "Useful details to include", messageGuide: ["Business name and type", "Location or target area", "Do you already have a website?", "What should the new solution achieve?", "Preferred timing"], response: "We reply in less than 24 hours.", button: "Send an Instagram message", whatsappButton: "Message on WhatsApp", finalNote: "The first conversation is free and carries no obligation." },
    legal: { title: "Legal notice", intro: "Provider identification and legal information about LinkedLab.", privacyTitle: "Privacy policy", privacyIntro: "Information about how LinkedLab processes personal data.", cookiesTitle: "Cookie policy", cookiesIntro: "Information about cookies and your choices on this website." },
    cookieConsent: { title: "Your privacy, made clear.", text: "We store your cookie choice. Vercel Web Analytics runs without cookies; optional analytics and marketing cookies are not active.", accept: "Accept all", reject: "Reject", manage: "Manage", save: "Save selection", close: "Close", necessary: "Necessary", necessaryText: "Stores your cookie choice and cannot be disabled.", analytics: "Optional analytics cookies", analyticsText: "No service is currently connected to this optional category.", marketing: "Marketing", marketingText: "No marketing trackers are currently connected.", always: "Always active", preferencesTitle: "Cookie settings", preferencesText: "You can change your choice at any time from the footer." }
  },
  es: {
    locale: "es_ES", languageName: "Español", skip: "Saltar al contenido",
    nav: { websites: "Páginas web", systems: "Sistemas", pricing: "Precios", projects: "Proyectos", process: "Proceso", contact: "Empezar proyecto" },
    footer: { line: "Digital, sin complicaciones.", area: "Para negocios locales en Mannheim, Ludwigshafen y Rhein-Neckar, y también en remoto.", legal: "Aviso legal", privacy: "Privacidad", cookies: "Política de cookies", cookieSettings: "Gestionar cookies", rights: "Todos los derechos reservados." },
    common: { eyebrow: "Websites & Digital Systems", primaryCta: "Quiero mi web", secondaryCta: "Ver precios", talk: "Primera conversación gratuita", from: "desde", founding: "Precio founding client", optional: "Opcional", learnMore: "Saber más", ownership: "Tu web. Tus datos. Tu control." },
    ui: { noLockIn: "Sin permanencia", yours: "Bajo tu control", fast: "Rápida", local: "Local", system: ["Clientes", "Citas", "Sistema", "Tareas", "Ingresos"], orbitExtras: ["SEO", "Datos", "Automatización", "Analítica"], skipIntro: "Saltar introducción", mostChosen: "Opción más elegida", selectedProjects: "Proyectos seleccionados", remote: "En remoto", ownershipAssets: ["Dominio", "Web", "Datos", "Accesos"], projectTypes: ["Marca · Web · SEO", "Web · SEO local"], connect: "Contacto", navLabel: "Navegación principal", languageLabel: "Idioma", openMenu: "Abrir menú", closeMenu: "Cerrar menú", mobileNav: "Navegación móvil" },
    home: {
      seoTitle: "Páginas web para pequeños negocios | LinkedLab", seoDescription: "Webs rápidas y a medida, y sistemas digitales sencillos para pequeños negocios. Precios claros, sin permanencias y con control real.", heroKicker: "Páginas web para negocios locales", heroTitle: "Una web profesional. Sin líos digitales.", heroText: "LinkedLab crea páginas web rápidas para negocios locales en Mannheim, Ludwigshafen y Rhein-Neckar, con un precio claro, diseño a medida y todo bajo tu control.", heroNote: "Sin compromiso · respuesta clara · sin presión comercial",
      journeyKicker: "Tu ecosistema digital", journeyTitle: "Todo conectado. Nada complicado.", journeyText: "Explora cómo tu web, clientes, procesos y datos se convierten en un único sistema claro.", journeyScroll: "Desliza para explorar", journeyTicker: ["Diseño web", "SEO local", "Clientes", "Citas", "Automatización", "Analítica"], journeySteps: [["01", "Hazte visible", "Una web rápida explica bien tu oferta y atrae a las personas adecuadas."], ["02", "Ordena las solicitudes", "Contactos, citas y próximos pasos fluyen por un sistema fácil de entender."], ["03", "Crece con claridad", "Las automatizaciones y los datos útiles ahorran tiempo sin crear más lío digital."]],
      trust: [["Presupuesto cerrado", "Sabes cuánto pagarás antes de empezar."], ["Sin ataduras", "El dominio y la web permanecen bajo tu control."], ["30 días de soporte", "Seguimos disponibles después del lanzamiento."]], problemKicker: "La parte digital, resuelta de forma sencilla", problemTitle: "Tú te centras en el negocio. Nosotros, en la parte digital.", problemText: "Sin una montaña de herramientas, cuotas poco claras ni tecnología que solo entiende la agencia. Recibes una solución clara y adaptada a tu forma de trabajar.",
      servicesTitle: "Dos soluciones. Un objetivo claro.", websiteCard: { label: "Servicio principal", title: "Páginas web profesionales", text: "Una web rápida y pensada para móvil que explica, genera confianza y consigue contactos.", bullets: ["Diseño a medida", "SEO local", "Maps y contacto", "Dominio bajo tu control"] }, systemsCard: { label: "Cuando el negocio necesita orden", title: "Sistemas de negocio", text: "Sistemas internos sencillos para clientes, citas, tareas, ingresos y procesos repetitivos.", bullets: ["CRM y clientes", "Citas y formularios", "Dashboards", "Automatizaciones útiles"] },
      differenceTitle: "Simple. Transparente. Tuyo.", differences: [["SIMPLE", "La tecnología queda en segundo plano. Tú recibes una solución fácil de entender y usar."], ["TRANSPARENT", "Alcance claro, presupuesto claro y sin costes ocultos."], ["TAILORED", "Hecho alrededor de tu negocio, no la misma plantilla para todos."], ["YOURS", "Tu dominio, tu web y tus datos importantes siguen bajo tu control."]], priceTitle: "Precios claros desde el principio.", priceText: `Los proyectos founding client empiezan actualmente en ${priceTokens.foundingOne}. Antes de empezar recibes un presupuesto cerrado.`, processTitle: "De la primera conversación al lanzamiento.", process: [["01", "Entender", "Aclaramos el objetivo, el cliente ideal y lo que debe conseguir la web."], ["02", "Alcance cerrado", "Recibes una propuesta clara con precio fijo."], ["03", "Diseño y desarrollo", "Recopilamos el contenido, diseñamos y construimos la web."], ["04", "Revisión", `Revisas la versión previa. Se incluyen ${site.includedRevisionRounds} rondas de cambios.`], ["05", "Lanzamiento", `Con tu aprobación, la web se publica con ${site.launchSupportDays} días de soporte.`]], workTitle: "Proyectos que explican bien el negocio.", workText: "Nuestros primeros proyectos marcan la dirección: comunicación clara, visibilidad local y herramientas digitales sin complejidad innecesaria.", finalTitle: "¿Preparado para una web que encaje con tu negocio?", finalText: "Cuéntanos qué ofreces y qué debería conseguir la web. Recibirás una valoración honesta y un siguiente paso claro."
    },
    websites: { seoTitle: "Diseño web para pequeños negocios | LinkedLab", seoDescription: "Webs a medida, rápidas y preparadas para SEO local. Precios claros, sin permanencias y con control completo de tus activos digitales.", kicker: "Páginas web", title: "Una web que explica, genera confianza y trae contactos.", intro: "Para negocios locales que quieren verse profesionales sin pelearse con la tecnología, el hosting o paquetes de agencia poco claros.", outcomesTitle: "Lo que tu web hace por ti", outcomes: [["Se entiende al instante", "En pocos segundos queda claro qué ofreces y por qué elegirte."], ["Funciona en cualquier dispositivo", "Diseñada primero para móvil, rápida y cómoda también fuera de casa."], ["Preparada para búsquedas locales", "Buena base técnica, estructura clara y señales locales para tu ciudad y zona."], ["Contacto sencillo", "Teléfono, WhatsApp, email o Maps, según lo que encaje con tu negocio."], ["Rápida por diseño", "Una construcción ligera, sin scripts innecesarios ni tecnología pesada."], ["Bajo tu control", "El dominio y los accesos clave son tuyos. No dependes de LinkedLab."]], includedTitle: "Normalmente incluye", included: ["Dirección visual a medida", "Inicio y páginas necesarias", "Servicios y contenido claro", "Base de SEO local", "Contacto y ubicación", "Páginas legales preparadas", "Dos rondas de cambios", "Lanzamiento y 30 días de soporte"], idealTitle: "Para negocios que necesitan mejorar su presencia online.", idealText: "Peluquerías, centros de estética, talleres, clínicas, restaurantes, entrenadores, masajistas, profesionales del bienestar y otros servicios locales.", finalTitle: "Tu web debería quitarte trabajo, no darte más." },
    systems: { seoTitle: "Sistemas digitales para pequeños negocios | LinkedLab", seoDescription: "CRM, citas, tareas y paneles sencillos para pequeños negocios. A medida, documentados y bajo tu control.", kicker: "Business Systems", title: "Menos notas sueltas. Menos trabajo duplicado. Más control.", intro: "LinkedLab construye sistemas internos sencillos alrededor de cómo funciona realmente tu negocio. Solo lo que tu equipo necesita.", distinction: "La web crea presencia digital. Los sistemas crean orden interno.", useCasesTitle: "Qué podemos organizar", useCases: [["Clientes y CRM", "Contactos, historial, estado y próximos pasos en un único lugar."], ["Citas y solicitudes", "Información bien recogida, responsables claros y menos seguimiento manual."], ["Tareas y procesos", "Procesos repetitivos, checklists y responsabilidades claras."], ["Ingresos y visión", "Paneles sencillos para ingresos, ocupación e indicadores importantes."], ["Formularios", "Información estructurada en vez de buscarla entre mensajes."], ["Automatizaciones", "Avisos y conexiones útiles cuando de verdad ahorran tiempo."]], principleTitle: "El sistema se adapta al negocio.", principleText: "No empezamos por una herramienta. Empezamos por tu proceso: qué ocurre hoy, dónde se pierde tiempo y qué información necesitas de verdad. Después construimos la solución adecuada.", pricingNote: "Los sistemas se presupuestan a precio cerrado después de una breve revisión del proceso. Se puede empezar con algo pequeño y ampliarlo más adelante.", finalTitle: "¿Dónde pierde tiempo tu negocio hoy?" },
    pricing: { seoTitle: "Precios de diseño web | LinkedLab", seoDescription: "Precios transparentes con ofertas founding client desde 349 €, alcance claro y mantenimiento opcional sin suscripción obligatoria.", kicker: "Precios", title: "Precios claros. Sin costes ocultos.", intro: "Cada negocio es distinto. Aun así, deberías saber pronto qué inversión aproximada requiere el proyecto.", foundingTitle: "Precios founding client", foundingText: "Condiciones reducidas para los primeros proyectos de LinkedLab. A cambio pedimos feedback honesto y, si quedas satisfecho, permiso para mostrar el trabajo.", plans: [["One-page", priceTokens.foundingOne, "Una web enfocada para una oferta clara.", ["Una página potente", "Mobile-first", "Contacto y ubicación", "Base SEO"]], ["Web de negocio", priceTokens.foundingBusiness, "Más espacio para servicios, confianza y posicionamiento local.", ["Varias páginas", "Estructura a medida", "SEO local", "Dos rondas de cambios"]], ["A medida", priceTokens.foundingComplex, "Para más contenido, funciones especiales o estructuras complejas.", ["Alcance a medida", "Entregables claros", "Presupuesto cerrado", "Soporte de lanzamiento"]]], futureTitle: "Precios habituales", futurePlans: [["Launch", priceTokens.launch], ["Business", priceTokens.business], ["Growth", priceTokens.growth]], careTitle: `LinkedLab Care · ${euro(site.pricing.care.monthly)}/mes`, careText: "Opcional después del lanzamiento: gestión técnica, pequeñas correcciones, soporte y un cambio pequeño al mes. Sin permanencia y los cambios no se acumulan.", withoutCare: "Sin Care, tu web sigue online y bajo tu control. Los cambios futuros pueden contratarse y presupuestarse de forma individual.", paymentTitle: "Pago justo por proyecto", paymentText: "50 % al empezar y 50 % después de aprobar la web, antes del lanzamiento. Todo el alcance queda acordado por escrito.", faqTitle: "Preguntas frecuentes", faqs: [["¿Hay una cuota mensual obligatoria?", "No. LinkedLab Care es opcional. Los costes externos básicos, como dominio o alojamiento, se muestran con claridad y siempre que sea posible se pagan directamente desde tu cuenta."], ["¿De quién es el dominio?", "Tuyo. El dominio y los accesos principales deben seguir bajo tu control."], ["¿Se incluyen cambios?", "El proyecto incluye dos rondas estructuradas de revisión. Los cambios adicionales se pueden delimitar y presupuestar con claridad."], ["¿Cuánto tarda una web?", "Depende del alcance y de la rapidez con la que estén disponibles los contenidos. Una web compacta suele ser mucho más rápida que un proyecto grande. Antes de empezar tendrás un calendario realista."], ["¿También escribís los textos?", "Sí. Estructuramos y redactamos textos claros a partir de tu información. Antes de publicar, tú validas cualquier afirmación profesional o técnica."], ["¿Se puede ampliar más adelante?", "Sí. La estructura permite añadir páginas, idiomas o funciones cuando tenga sentido."]], finalTitle: "¿No sabes qué opción encaja?" },
    process: { seoTitle: "Así creamos tu página web | LinkedLab", seoDescription: "Un proceso claro: primera conversación, presupuesto cerrado, contenidos, diseño, dos rondas de cambios, lanzamiento y 30 días de soporte.", kicker: "Proceso", title: "Un proceso claro. Sin sorpresas.", intro: "Sabes en todo momento qué viene después, qué necesitamos de ti y cuándo hay que tomar una decisión.", steps: [["01", "Primera conversación", "Entendemos tu oferta, tus clientes y el objetivo de la web."], ["02", "Alcance y precio cerrado", "Recibes una propuesta clara. Solo empezamos cuando todo encaja."], ["03", "50 % al inicio", "El primer pago reserva el proyecto y confirma el alcance acordado."], ["04", "Recopilar contenido", "Te guiamos con textos, imágenes, servicios, precios y datos de contacto."], ["05", "Diseño y desarrollo", "LinkedLab crea la estructura, el diseño y la parte técnica."], ["06", "Versión previa y feedback", "Revisas una versión privada. Se incluyen dos rondas estructuradas de cambios."], ["07", "Aprobación y segundo pago", "Después de aprobar la web se abona el 50 % restante."], ["08", "Lanzamiento", "Conectamos dominio e infraestructura con los accesos clave bajo tu control."], ["09", "30 días de soporte", "Resolvemos problemas iniciales y te ayudamos con los primeros pasos."], ["10", "Care opcional", "Si te conviene, seguimos con pequeños cambios y cuidado técnico."]], prepTitle: "Qué tienes que preparar", prepText: "Lo mínimo posible. Ayudan el logo, fotos existentes, lista de servicios, precios y datos de contacto. Si falta algo, te diremos de forma concreta qué es realmente necesario.", finalTitle: "El primer paso solo requiere unos minutos." },
    projects: { seoTitle: "Proyectos de diseño web | LinkedLab", seoDescription: "Proyectos seleccionados de LinkedLab: webs claras y sistemas digitales para negocios locales.", kicker: "Proyectos", title: "Pocos proyectos. Bien explicados.", intro: "Solo mostramos trabajos reales, sin métricas inventadas ni historias de éxito vacías.", items: [["LinkedLab", "Marca y web", "La propia web de LinkedLab muestra un posicionamiento claro, contenido en tres idiomas, precios transparentes y una arquitectura estática rápida.", "Proyecto actual"], ["Lluna Blanca", "Web · SEO local", "Presencia digital para un centro de masajes, terapias naturales y estética en Blanes. Con servicios claros, confianza local y contacto directo.", "Proyecto publicado", "https://llunablancablanes.com", "Ver proyecto"], ["Rheinwerk Renovierung", "Web · Demo interactiva", "Una demo web moderna y visual para una empresa de reformas, con servicios claros, transiciones cuidadas y vías de contacto directas.", "Proyecto demo", "https://rheinwerk-renovierung.vercel.app", "Ver demo"]], note: "Se añadirán más proyectos seleccionados cuando estén terminados y tengamos permiso para publicarlos.", finalTitle: "Tu negocio podría ser el próximo proyecto adecuado." },
    contact: { seoTitle: "Solicitar proyecto web | LinkedLab", seoDescription: "Habla con LinkedLab sobre una nueva web o un sistema digital. Primera valoración sin compromiso para pequeños negocios.", kicker: "Contacto", title: "Cuéntanos un poco sobre tu proyecto.", intro: "Basta con un mensaje corto. ¿A qué se dedica tu negocio, qué quieres mejorar y cuándo te gustaría empezar? Recibirás una respuesta honesta, sin presión comercial.", instagramTitle: "Escríbenos por Instagram", instagramText: "Para empezar de la forma más rápida, envía un mensaje directo a LinkedLab.", whatsappTitle: "Escríbenos por WhatsApp", whatsappText: "Cuéntanos brevemente de qué trata tu proyecto. Te responderemos personalmente y sin compromiso.", messageGuideTitle: "Información útil para incluir", messageGuide: ["Nombre y tipo de negocio", "Ubicación o zona objetivo", "¿Ya existe una web?", "¿Qué debería conseguir la nueva solución?", "Fecha aproximada"], response: "Respondemos en menos de 24 horas.", button: "Enviar mensaje por Instagram", whatsappButton: "Escribir por WhatsApp", finalNote: "La primera conversación es gratuita y sin compromiso." },
    legal: { title: "Aviso legal", intro: "Identificación del responsable e información legal de LinkedLab.", privacyTitle: "Política de privacidad", privacyIntro: "Información sobre cómo LinkedLab trata los datos personales.", cookiesTitle: "Política de cookies", cookiesIntro: "Información sobre las cookies y tus opciones en esta web." },
    cookieConsent: { title: "Tu privacidad, sin letra pequeña.", text: "Guardamos tu elección. Vercel Web Analytics funciona sin cookies; las cookies opcionales de analítica y marketing no están activas.", accept: "Aceptar todas", reject: "Rechazar", manage: "Gestionar", save: "Guardar selección", close: "Cerrar", necessary: "Necesarias", necessaryText: "Guarda tu elección de cookies y no se puede desactivar.", analytics: "Cookies analíticas opcionales", analyticsText: "Actualmente no hay ningún servicio conectado a esta categoría opcional.", marketing: "Marketing", marketingText: "Actualmente no hay rastreadores de marketing conectados.", always: "Siempre activa", preferencesTitle: "Preferencias de cookies", preferencesText: "Puedes cambiar tu elección en cualquier momento desde el pie de página." }
  }
};
