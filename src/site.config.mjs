export const site = {
  name: "LinkedLab",
  descriptor: "Websites & Digital Systems",
  instagram: "https://www.instagram.com/linked.lab/",
  instagramHandle: "@linked.lab",
  whatsapp: "https://wa.me/34693505546",
  whatsappDisplay: "+34 693 505 546",
  defaultLanguage: "en",
  languages: ["de", "en", "es"],
  serviceAreas: ["Mannheim", "Ludwigshafen", "Rhein-Neckar", "Remote"],
  launchSupportDays: 30,
  includedRevisionRounds: 2,
  pricing: {
    currency: "EUR",
    founding: {
      onePage: { from: 349 },
      business: { from: 549 },
      complex: { from: 799, plus: true }
    },
    standard: {
      launch: { from: 499 },
      business: { from: 749 },
      growth: { from: 1090 }
    },
    care: { monthly: 29 }
  },
  legal: {
    ownerName: "Héctor Fàbrega Roig",
    tradingName: "LinkedLab",
    addressLines: ["B 7, 17", "68159 Mannheim", "Deutschland"],
    email: "linkedlab.info@gmail.com",
    phone: "+34 693 505 546",
    legalForm: "Nicht im Handelsregister eingetragener Einzelanbieter",
    taxId: "Keine Umsatzsteuer-Identifikationsnummer erteilt",
    register: "Kein Handelsregistereintrag"
  }
};

export const editable = {
  // All commercial values are centralized here so future price changes require one edit.
  pricing: site.pricing,
  serviceAreas: site.serviceAreas,
  social: { instagram: site.instagram, instagramHandle: site.instagramHandle },
  legal: site.legal
};
