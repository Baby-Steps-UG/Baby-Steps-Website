import { cpSync, existsSync, mkdirSync, realpathSync, rmSync } from "node:fs";
import path from "node:path";

const projectRoot = realpathSync(process.cwd());
const exportDirectory = path.join(projectRoot, "out");
const distDirectory = path.join(projectRoot, "dist");
const clientDirectory = path.join(distDirectory, "client");
const serverDirectory = path.join(distDirectory, "server");

if (!existsSync(exportDirectory)) {
  throw new Error("Next.js static export was not created at ./out");
}

if (!distDirectory.startsWith(`${projectRoot}${path.sep}`)) {
  throw new Error("Refusing to prepare a build outside the project workspace");
}

rmSync(distDirectory, { recursive: true, force: true });
mkdirSync(serverDirectory, { recursive: true });
cpSync(exportDirectory, clientDirectory, { recursive: true });
cpSync(path.join(projectRoot, "worker", "static-site.js"), path.join(serverDirectory, "index.js"));

console.log("Prepared Sites build in dist/");
