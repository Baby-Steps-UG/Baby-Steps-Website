import assert from "node:assert/strict";

const base = new URL(process.env.SITE_URL || "http://localhost:3000");
const routes = ["/", "/about", "/pricing", "/for-parents", "/for-schools", "/languages", "/waitlist", "/waitlist/pilot", "/privacy", "/terms"];
const pages = new Map();

for (const route of routes) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, `${route} must return 200`);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route} must have one h1`);
  assert.equal((html.match(/<main(?:\s|>)/g) || []).length, 1, `${route} must have one main landmark`);
  pages.set(route, html);
  console.log(`PASS ${route}`);
}

const assets = new Set();
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (!match[1].startsWith("/") && !match[1].startsWith("#")) continue;
    const url = new URL(match[1], new URL(route, base));
    assert.ok(pages.has(url.pathname), `Unknown internal route: ${match[1]}`);
    if (url.hash) assert.ok(pages.get(url.pathname).includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${match[1]}`);
  }
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    if (match[1].startsWith("/")) assets.add(match[1].replaceAll("&amp;", "&"));
  }
}
for (const asset of assets) {
  const response = await fetch(new URL(asset, base), { signal: AbortSignal.timeout(10000) });
  assert.equal(response.status, 200, `Image unavailable: ${asset}`);
  await response.arrayBuffer();
}
assert.ok(pages.get("/privacy").includes('id="website-cookies"'));
assert.ok(pages.get("/languages").includes('href="/waitlist/pilot"'));
assert.ok(!pages.get("/waitlist/pilot").includes("<form"), "Pilot must use the existing waitlist, not a new signup form");
assert.ok(pages.get("/waitlist/pilot").includes('href="/waitlist"'));
const missing = await fetch(new URL("/route-check-missing-page", base));
assert.equal(missing.status, 404);
console.log(`PASS internal links, anchors, ${assets.size} images, pilot flow, and 404 response`);
