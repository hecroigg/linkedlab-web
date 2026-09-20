import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { spawn } from "node:child_process";

const port = Number(process.env.PORT || 4173);
const root = new URL("../dist/", import.meta.url).pathname;
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };

const build = spawn(process.execPath, ["scripts/build.mjs"], { stdio: "inherit" });
await new Promise((resolve, reject) => build.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`Build failed: ${code}`))));

createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    if (pathname === "/") { res.writeHead(302, { Location: "/de/" }); res.end(); return; }
    let file = normalize(join(root, pathname));
    if (!file.startsWith(root)) throw new Error("Invalid path");
    const info = await stat(file).catch(() => null);
    if (info?.isDirectory()) file = join(file, "index.html");
    const found = await stat(file).then((value) => value.isFile()).catch(() => false);
    const body = found ? await readFile(file) : await readFile(join(root, "404.html"));
    res.writeHead(found ? 200 : 404, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500); res.end("Server error");
  }
}).listen(port, () => console.log(`LinkedLab preview: http://localhost:${port}`));
