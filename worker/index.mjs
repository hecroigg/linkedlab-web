const supportedLanguages = new Set(["de", "en", "es"]);

const languageFromPath = (pathname) => {
  const language = pathname.split("/").filter(Boolean)[0];
  return supportedLanguages.has(language) ? language : null;
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.linkedlab.eu") {
      url.hostname = "linkedlab.eu";
      if (url.pathname === "/") url.pathname = "/en/";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/") {
      url.pathname = "/en/";
      return Response.redirect(url.toString(), 302);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    const targetLanguage = languageFromPath(url.pathname);
    const referer = request.headers.get("referer");
    if (!targetLanguage || !referer) return response;

    let sourceLanguage = null;
    try {
      const refererUrl = new URL(referer);
      if (refererUrl.hostname === "linkedlab.eu" || refererUrl.hostname === "www.linkedlab.eu") {
        sourceLanguage = languageFromPath(refererUrl.pathname);
      }
    } catch {
      sourceLanguage = null;
    }

    if (!sourceLanguage || sourceLanguage === targetLanguage) return response;

    return new HTMLRewriter()
      .on("[data-site-intro]", {
        element(element) {
          element.remove();
        },
      })
      .transform(response);
  },
};
