import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const port = 4176;
const root = resolve(fileURLToPath(new URL("../out", import.meta.url)));
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
};

function safePath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = normalize(decoded).replace(/^([/\\])+/, "");
  const filePath = resolve(join(root, relative));
  return filePath === root || filePath.startsWith(`${root}${sep}`)
    ? filePath
    : null;
}

async function findFile(pathname) {
  const candidate = safePath(pathname);
  if (!candidate) return null;

  try {
    const details = await stat(candidate);
    if (details.isFile()) return candidate;
    if (details.isDirectory()) {
      const index = join(candidate, "index.html");
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    if (!extname(candidate)) {
      try {
        const index = join(candidate, "index.html");
        if ((await stat(index)).isFile()) return index;
      } catch {
        return null;
      }
    }
  }

  return null;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const filePath = await findFile(url.pathname);

  if (!filePath) {
    const notFound = join(root, "404.html");
    response.writeHead(404, { "Content-Type": mimeTypes[".html"] });
    createReadStream(notFound).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Static export available at http://${host}:${port}`);
});
