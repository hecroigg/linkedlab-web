import { access, readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
const htmlFiles = [];
async function walk(dir) { for (const name of await readdir(dir)) { const path = join(dir, name); const s = await stat(path); s.isDirectory() ? await walk(path) : name.endsWith(".html") && htmlFiles.push(path); } }
await walk(root);
const errors = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const required of ["<title>", 'name="description"', 'rel="canonical"', 'name="viewport"']) if (!html.includes(required)) errors.push(`${file}: missing ${required}`);
  if (!file.endsWith("/index.html") || file !== join(root, "index.html")) {
    const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
    if (h1Count !== 1) errors.push(`${file}: expected one h1, found ${h1Count}`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${file}: duplicate id`);
  if (/href="undefined|src="undefined/.test(html)) errors.push(`${file}: undefined link`);
  const localTargets = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((match) => match[1].split(/[?#]/)[0]);
  for (const target of localTargets) {
    // Skip Vercel-provided paths that only exist in production
    if (target.startsWith("/_vercel/")) continue;
    const relative = target === "/" ? "index.html" : target.endsWith("/") ? `${target.slice(1)}index.html` : target.slice(1);
    try { await access(join(root, relative)); }
    catch { errors.push(`${file}: broken local reference ${target}`); }
  }
}
if (htmlFiles.length !== 32) errors.push(`Expected 32 HTML files, found ${htmlFiles.length}`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Checked ${htmlFiles.length} HTML files: OK`);
