export const site = {
  name: "LinkedLab",
  descriptor: "Websites & Digital Systems",
  instagram: "https://www.instagram.com/linked.lab/",
  instagramHandle: "@linked.lab",
  defaultLanguage: "de",
  languages: ["de", "en", "es"],
  serviceAreas: ["Mannheim", "Ludwigshafen", "Rhein-Neckar", "Remote"],
  launchSupportDays: 30,
  includedRevisionRounds: 2,
  pricing: {
    currency: "EUR",
    founding: {
      onePage: { from: 349, to: 399 },
      business: { from: 549, to: 599 },
      complex: { from: 799 }
    },
    standard: {
      launch: { from: 499 },
      business: { from: 749 },
      growth: { from: 1090 }
    },
    care: { monthly: 29 }
  },
  legal: {
    ownerName: "[LEGAL_OWNER_NAME]",
    address: "[LEGAL_ADDRESS]",
    email: "[BUSINESS_EMAIL]",
    phone: "[PUBLIC_PHONE_IF_USED]",
    taxId: "[TAX_DATA_IF_REQUIRED]"
  }
};

export const editable = {
  // All commercial values are centralized here so future price changes require one edit.
  pricing: site.pricing,
  serviceAreas: site.serviceAreas,
  social: { instagram: site.instagram, instagramHandle: site.instagramHandle },
  legal: site.legal
};
