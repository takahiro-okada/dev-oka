import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const base = resolve(root, `.${pathname}`);
    if (base !== root && !base.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    const candidates = [base, `${base}.html`, resolve(base, "index.html")];
    let file;
    for (const candidate of candidates) {
      if (
        await stat(candidate)
          .then((entry) => entry.isFile())
          .catch(() => false)
      ) {
        file = candidate;
        break;
      }
    }
    response.writeHead(file ? 200 : 404, {
      "Content-Type":
        types[extname(file || "404.html")] || "application/octet-stream",
    });
    response.end(
      request.method === "HEAD"
        ? undefined
        : await readFile(file || resolve(root, "404.html")),
    );
  } catch {
    response.writeHead(400).end();
  }
}).listen(port, () =>
  console.log(`Static site listening on http://localhost:${port}`),
);
