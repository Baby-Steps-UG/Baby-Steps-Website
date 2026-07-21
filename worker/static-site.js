const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || url.pathname.includes(".")) {
      return response;
    }

    const cleanPath = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    const htmlUrl = new URL(`${cleanPath || "/index"}.html${url.search}`, url.origin);
    response = await env.ASSETS.fetch(new Request(htmlUrl, request));

    if (response.status !== 404) {
      return response;
    }

    return env.ASSETS.fetch(new Request(new URL("/404.html", url.origin), request));
  },
};

export default worker;
