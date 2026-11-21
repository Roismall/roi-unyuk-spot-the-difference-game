// main.ts — Double Take: Spot the Difference (make.fun game bounty).
// Node 22 entry point: copies the static game in game/ into out/ so the
// bounty runtime can serve it, and prints a short build report.
// Usage: node main.ts            -> writes out/
//        node main.ts <outdir>   -> writes <outdir>/
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, "game");
const outDir = path.resolve(process.argv[2] ?? path.join(root, "out"));

function copyDir(from: string, to: string): string[] {
  const written: string[] = [];
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const f = path.join(from, entry.name);
    const t = path.join(to, entry.name);
    if (entry.isDirectory()) written.push(...copyDir(f, t));
    else {
      fs.copyFileSync(f, t);
      written.push(t);
    }
  }
  return written;
}

function main(): void {
  if (!fs.existsSync(srcDir) || !fs.existsSync(path.join(srcDir, "index.html"))) {
    console.error("game/index.html not found under " + srcDir);
    process.exit(1);
  }
  const written = copyDir(srcDir, outDir);
  const index = path.join(outDir, "index.html");
  const bytes = fs.statSync(index).size;
  console.log(`Double Take — wrote ${written.length} file(s) to ${outDir}`);
  console.log(`  index.html (${bytes} bytes) — open it in a desktop browser, no server needed`);
  console.log("  6 scenes x 7 differences = 42 differences; magnifier, keyboard play, hints, timer, score");
}

main();
