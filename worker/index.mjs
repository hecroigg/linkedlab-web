const CANONICAL_ORIGIN = "https://linkedlab.eu";
const INTRO_COOKIE = "linkedlab_intro_seen=1";

const routeGroups = [
  ["/de/", "/en/", "/es/"],
  ["/de/websites/", "/en/websites/", "/es/paginas-web/"],
  ["/de/business-systeme/", "/en/business-systems/", "/es/sistemas-digitales/"],
  ["/de/preise/", "/en/pricing/", "/es/precios/"],
  ["/de/ablauf/", "/en/how-it-works/", "/es/proceso/"],
  ["/de/projekte/", "/en/work/", "/es/proyectos/"],
  ["/de/kontakt/", "/en/contact/", "/es/contacto/"],
  ["/de/impressum/", "/en/legal-notice/", "/es/aviso-legal/"],
  ["/de/datenschutz/", "/en/privacy/", "/es/privacidad/"],
  ["/de/cookies/", "/en/cookies/", "/es/politica-de-cookies/"]
];

const legacyOrigins = [
  "https://linkedlab-web.vercel.app",
  "https://linkedlab.pages.dev",
  "https://linkedlab-web.pages.dev",
  "https://linkedlab-web.linkedlab-web.workers.dev",
  "https://linkedlab-web.workers.dev"
];

function englishPathFor(pathname) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const group = routeGroups.find((routes) => routes.includes(normalized));
  return group?.[1] || "/en/";
}

function cleanGeneratedText(text, pathname, contentType) {
  let cleaned = text;

  for (const origin of legacyOrigins) cleaned = cleaned.replaceAll(origin, CANONICAL_ORIGIN);

  if (contentType.includes("text/html")) {
    const englishPath = englishPathFor(pathname);
    cleaned = cleaned.replace(
      /<link rel="alternate" hreflang="x-default" href="[^"]*">/,
      `<link rel="alternate" hreflang="x-default" href="${CANONICAL_ORIGIN}${englishPath}">`
    );

    cleaned = cleaned
      .replace(/<script>window\.va=window\.va\|\|function\(\)\{\(window\.vaq=window\.vaq\|\|\[\]\)\.push\(arguments\)\};<\/script>/g, "")
      .replace(/<script[^>]*src="\/_vercel\/insights\/script\.js"[^>]*><\/script>/g, "");
  }

  return cleaned;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.linkedlab.eu" || url.pathname === "/") {
      url.hostname = "linkedlab.eu";
      if (url.pathname === "/") url.pathname = "/en/";
      return Response.redirect(url.toString(), 301);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const contentType = assetResponse.headers.get("content-type") || "";
    const isText = contentType.includes("text/html")
      || contentType.includes("application/xml")
      || contentType.includes("text/xml")
      || contentType.includes("text/plain");

    if (!isText) return assetResponse;

    const headers = new Headers(assetResponse.headers);
    headers.delete("content-length");

    const alreadySawIntro = (request.headers.get("cookie") || "")
      .split(";")
      .some((cookie) => cookie.trim() === INTRO_COOKIE);

    if (!alreadySawIntro && contentType.includes("text/html")) {
      headers.append("Set-Cookie", `${INTRO_COOKIE}; Path=/; SameSite=Lax; Secure; HttpOnly`);
    }

    const originalText = await assetResponse.text();
    const cleanedText = cleanGeneratedText(originalText, url.pathname, contentType);
    let response = new Response(cleanedText, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers
    });

    if (alreadySawIntro && contentType.includes("text/html")) {
      response = new HTMLRewriter()
        .on("[data-site-intro]", {
          element(element) {
            element.remove();
          }
        })
        .transform(response);
    }

    return response;
  }
};
