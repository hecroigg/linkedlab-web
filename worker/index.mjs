export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.linkedlab.eu") {
      url.hostname = "linkedlab.eu";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
