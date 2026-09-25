#!/usr/bin/env node
/**
 * Prerender vinkand.com.
 *
 * WHY: the app renders entirely client-side, so every URL returned the same
 * 9,162-byte shell with zero <h1>. The app also used HashRouter, so its routes
 * were /#/about and friends — Google discards URL fragments, collapsing the
 * whole site into one indexable page. Search Console showed submitted=3,
 * indexed=0 for a year.
 *
 * The router is now BrowserRouter. This script takes the built dist/index.html,
 * and for every route writes a document carrying that page's real title,
 * description, canonical and body content. The app bundle stays attached, so the
 * SPA mounts on top of the markup as usual.
 *
 * Runs as part of `npm run build`, so Cloudflare Pages picks it up automatically.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SHELL_PATH = path.join(DIST, "index.html");
const SITE = "https://vinkand.com";

if (!existsSync(SHELL_PATH)) {
  console.error("dist/index.html missing — run `vite build` first.");
  process.exit(1);
}

/* ------------------------------------------------------------------ parse
 * Pull services and blog posts out of constants.tsx so the prerendered pages
 * carry the same content the SPA renders. Reading the source keeps this in sync:
 * add a post to constants.tsx and it gets a page on the next build, with no
 * second list to maintain by hand.
 */
const src = readFileSync(path.join(ROOT, "constants.tsx"), "utf8");

function grabArray(name) {
  const m = src.match(new RegExp(`export const ${name}[^=]*=\\s*\\[([\\s\\S]*?)\\n\\];`));
  return m ? m[1] : "";
}

/** Split a data array into its top-level {...} object literals. */
function objects(body) {
  const out = [];
  let depth = 0, start = -1, quote = null;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (quote) {
      if (c === "\\") { i++; continue; }
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'" || c === "`") {
      quote = c;
    } else if (c === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0 && start >= 0) { out.push(body.slice(start, i + 1)); start = -1; }
    }
  }
  return out;
}

const unescape = (s) => s.replace(/\\'/g, "'").replace(/\\"/g, '"');
const str = (o, k) => {
  const m = o.match(new RegExp(`${k}:\\s*'((?:[^'\\\\]|\\\\.)*)'`)) || o.match(new RegExp(`${k}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return m ? unescape(m[1]) : "";
};
const strList = (o, k) => {
  const m = o.match(new RegExp(`${k}:\\s*\\[([\\s\\S]*?)\\]`));
  if (!m) return [];
  return [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => unescape(x[1]));
};
/** content: ["para", "para"] — long prose, usually double-quoted. */
const paraList = (o, k) => {
  const m = o.match(new RegExp(`${k}:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`));
  if (!m) return [];
  return [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => unescape(x[1]));
};

const services = objects(grabArray("SERVICES")).map((o) => ({
  id: str(o, "id"), title: str(o, "title"), description: str(o, "description"),
  longDescription: str(o, "longDescription"),
  features: strList(o, "features"), benefits: strList(o, "benefits"),
})).filter((s) => s.id && s.title);

const blogs = objects(grabArray("BLOGS")).map((o) => ({
  id: str(o, "id"), title: str(o, "title"), excerpt: str(o, "excerpt"),
  date: str(o, "date"), author: str(o, "author"), readTime: str(o, "readTime"),
  content: paraList(o, "content"),
})).filter((b) => b.id && b.title);

// Refuse to write a partial site: an empty parse would strip real pages.
if (services.length < 4 || blogs.length < 1) {
  console.error(`Refusing to prerender: parsed only ${services.length} services / ${blogs.length} posts. Expected 4+ / 1+.`);
  process.exit(1);
}
console.log(`  parsed ${services.length} services, ${blogs.length} blog posts`);

/* --------------------------------------------------------------------- html */
const shell = readFileSync(SHELL_PATH, "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clamp = (s, n = 155) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n) > 0 ? s.lastIndexOf(" ", n) : n));

const HEAD = shell.slice(0, shell.indexOf("</head>"));
const TAIL = shell.slice(shell.indexOf("</head>") + 7);
const BODY_OPEN = '<div id="root"></div>';

function page({ title, description, canonical, inner, ld }) {
  // Rebuild the head with this page's metadata.
  let h = HEAD;
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  h = h.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`);
  h = h.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  h = h.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  h = h.replace(/(<meta property="twitter:url" content=")[^"]*(")/, `$1${canonical}$2`);
  h = h.replace(/(<meta property="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  h = h.replace(/(<meta property="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  if (ld) h += `<script type="application/ld+json">${JSON.stringify(ld)}</script>`;

  // The SPA's own <div id="root"></div> becomes the crawler-visible content.
  // React's createRoot().render() replaces it on mount, so browsers are unaffected.
  const tail = TAIL.includes(BODY_OPEN)
    ? TAIL.replace(BODY_OPEN, `<div id="root">${inner}</div>`)
    : TAIL;
  if (!TAIL.includes(BODY_OPEN)) {
    console.error("Could not find <div id=\"root\"></div> in the built shell — aborting.");
    process.exit(1);
  }
  return `${h}</head>${tail}`;
}

const written = [];
function write(route, html) {
  if (route === "/") {
    writeFileSync(path.join(DIST, "index.html"), html);
    written.push(route);
    return;
  }
  const rel = route.replace(/^\//, "");
  // Write both forms. /services/1 is served from services/1/index.html, and
  // services/1.html is the sibling that lets the exact extensionless URL resolve
  // directly. Which one the host prefers varies, so provide both and let it pick.
  const dir = path.join(DIST, rel);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
  writeFileSync(path.join(DIST, `${rel}.html`), html);
  written.push(route);
}

/* ------------------------------------------------------------------- pages */
write("/", page({
  title: "VinKand Technologies | AI, AR & Web Development Company",
  description: "VinKand builds AI systems, AR experiences and high-scale web platforms for growing businesses. Based in Tamil Nadu, India.",
  canonical: `${SITE}/`,
  inner: `
    <h1>AI, AR and Web Development for Growing Businesses</h1>
    <p>VinKand Technologies is a software studio based in Tamil Nadu, India. We build AI systems, augmented reality experiences, mobile apps and web platforms for companies that need working software.</p>
    <h2>Services</h2>
    <ul>${services.map((s) => `<li><a href="/services/${s.id}">${esc(s.title)}</a> — ${esc(s.description)}</li>`).join("")}</ul>
    <h2>Insights</h2>
    <ul>${blogs.map((b) => `<li><a href="/blog/${b.id}">${esc(b.title)}</a> — ${esc(b.excerpt)}</li>`).join("")}</ul>
    <p><a href="/contact">Contact VinKand</a></p>`,
}));

for (const s of services) {
  write(`/services/${s.id}`, page({
    title: `${s.title} | VinKand Technologies`,
    description: clamp(s.description),
    canonical: `${SITE}/services/${s.id}`,
    ld: {
      "@context": "https://schema.org", "@type": "Service", name: s.title,
      description: s.description, serviceType: s.title,
      provider: { "@type": "Organization", name: "VinKand Technologies", url: SITE },
      areaServed: "Worldwide", url: `${SITE}/services/${s.id}`,
    },
    inner: `
    <h1>${esc(s.title)}</h1>
    <p>${esc(s.longDescription || s.description)}</p>
    ${s.features.length ? `<h2>What's included</h2><ul>${s.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
    ${s.benefits.length ? `<h2>Outcomes</h2><ul>${s.benefits.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
    <p><a href="/contact">Discuss this service</a> · <a href="/">Back to home</a></p>`,
  }));
}

write("/blog", page({
  title: "Insights | VinKand Technologies",
  description: "Notes from our team on enterprise AI, spatial computing, edge AI and building software that holds up in production.",
  canonical: `${SITE}/blog`,
  inner: `
    <h1>Insights</h1>
    <p>Working notes from the VinKand team on AI, AR and software engineering.</p>
    <ul>${blogs.map((b) => `<li><a href="/blog/${b.id}">${esc(b.title)}</a> — ${esc(b.excerpt)}</li>`).join("")}</ul>`,
}));

for (const b of blogs) {
  write(`/blog/${b.id}`, page({
    title: `${b.title} | VinKand Technologies`,
    description: clamp(b.excerpt),
    canonical: `${SITE}/blog/${b.id}`,
    ld: {
      "@context": "https://schema.org", "@type": "Article", headline: b.title,
      description: b.excerpt, author: { "@type": "Person", name: b.author },
      publisher: { "@type": "Organization", name: "VinKand Technologies", url: SITE },
      mainEntityOfPage: `${SITE}/blog/${b.id}`,
    },
    inner: `
    <article>
      <h1>${esc(b.title)}</h1>
      <p>${esc(b.author)}${b.date ? ` · ${esc(b.date)}` : ""}${b.readTime ? ` · ${esc(b.readTime)}` : ""}</p>
      ${b.content.map((p) => `<p>${esc(p)}</p>`).join("")}
      <p><a href="/blog">More insights</a></p>
    </article>`,
  }));
}

const STATIC = [
  { route: "/about", title: "About VinKand Technologies", description: "Who we are and how we work with clients.", h1: "About VinKand Technologies", text: "VinKand Technologies is a software studio based in Tamil Nadu, India, building AI systems, AR experiences and web platforms." },
  { route: "/contact", title: "Contact VinKand Technologies", description: "Get in touch with VinKand Technologies about AI, AR or web development work.", h1: "Contact VinKand Technologies", text: "Tell us what you are building and we will get back to you." },
  { route: "/products", title: "Products | VinKand Technologies", description: "Software products built by VinKand Technologies.", h1: "Products", text: "Software products built and operated by VinKand Technologies." },
  { route: "/portfolio", title: "Portfolio | VinKand Technologies", description: "Selected work from VinKand Technologies.", h1: "Portfolio", text: "Selected projects across AI, AR and web." },
  { route: "/privacy", title: "Privacy Policy | VinKand Technologies", description: "How VinKand Technologies handles your data.", h1: "Privacy Policy", text: "How we handle data on this website." },
  { route: "/terms", title: "Terms of Service | VinKand Technologies", description: "Terms governing use of VinKand Technologies websites and services.", h1: "Terms of Service", text: "Terms governing use of this website." },
  { route: "/sla", title: "Service Level Agreement | VinKand Technologies", description: "Our service level commitments.", h1: "Service Level Agreement", text: "Our commitments on availability and support." },
];
for (const s of STATIC) {
  write(s.route, page({
    title: s.title, description: s.description, canonical: `${SITE}${s.route}`,
    inner: `<h1>${esc(s.h1)}</h1><p>${esc(s.text)}</p><p><a href="/contact">Contact us</a></p>`,
  }));
}

/* ----------------------------------------------------------------- sitemap */
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, pri: "1.0" },
  ...services.map((s) => ({ loc: `${SITE}/services/${s.id}`, pri: "0.8" })),
  { loc: `${SITE}/blog`, pri: "0.7" },
  ...blogs.map((b) => ({ loc: `${SITE}/blog/${b.id}`, pri: "0.6" })),
  ...STATIC.map((s) => ({ loc: `${SITE}${s.route}`, pri: "0.5" })),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.pri}</priority>\n  </url>`).join("\n")}
</urlset>
`;
// Vite copies public/ into dist/ BEFORE this runs, so write dist/ (what gets
// served) and public/ (the repo's source of truth) to keep both in step.
for (const p of [path.join(DIST, "sitemap.xml"), path.join(ROOT, "public", "sitemap.xml")]) {
  writeFileSync(p, xml);
}

/* ------------------------------------------------------------------- prune
 * Drop pages for routes that no longer exist. Runs only after the parse
 * succeeded, so a failed parse can never empty a good build.
 */
const valid = new Set(written.map((r) => (r === "/" ? "" : r.replace(/^\//, ""))));
for (const dir of ["services", "blog"]) {
  const base = path.join(DIST, dir);
  if (!existsSync(base)) continue;
  for (const e of readdirSync(base)) {
    const slug = e.replace(/\.html$/, "");   // strip extension before comparing
    // "index.html" here is the parent route's own page (/blog, written by the
    // route "/blog"), so it is never stale. Without this guard the blog index
    // was deleted on every build.
    if (slug === "index") continue;
    if (!valid.has(`${dir}/${slug}`)) {
      rmSync(path.join(base, e), { recursive: true, force: true });
      console.log(`  pruned stale /${dir}/${slug}`);
    }
  }
}

console.log(`  prerendered ${written.length} pages, 0 with a hash URL`);
console.log(`  sitemap: ${urls.length} URLs`);
