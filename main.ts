// main.ts — Double Take: Spot the Difference (make.fun game bounty).
// Node 22 entry point: hands the game in — copies game/ and screenshots/
// beside this file into MAKEFUN_OUTPUT_DIR (default /output) and writes
// /output/dossier.json with buildDossier from vendor/makefun-game.ts.
// Usage: MAKEFUN_OUTPUT_DIR=out node main.ts   -> writes out/
//        node main.ts                          -> writes /output
import { cpSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-game.ts";

const root = dirname(fileURLToPath(import.meta.url));
const srcDir = join(root, "game");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function main(): void {
  if (!existsSync(srcDir) || !existsSync(join(srcDir, "index.html"))) {
    console.error("game/index.html not found under " + srcDir);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  cpSync(srcDir, join(outDir, "game"), { recursive: true });
  mkdirSync(join(outDir, "screenshots"), { recursive: true });
  if (existsSync(join(root, "screenshots"))) cpSync(join(root, "screenshots"), join(outDir, "screenshots"), { recursive: true });

  // Write the dossier the judge reads: byte for byte what buildDossier
  // produces from game/ and screenshots/ (scorer caps: at most 4 screenshots
  // of at most 256 KiB each; game/ at most 993 files / 48 MiB in all, no path
  // under game/ over 1000 bytes; dossier text capped at 160 KiB).
  writeFileSync(
    join(outDir, "dossier.json"),
    buildDossier(outDir, {
      text_max_bytes: 163840,
      screenshots: { max: 4, max_bytes: 262144 },
      game_max_files: 993,
      game_max_bytes: 50331648,
      game_path_max_bytes: 1000,
    }),
  );

  const index = join(outDir, "game", "index.html");
  const bytes = statSync(index).size;
  console.log(`Double Take — wrote game/ + screenshots/ + dossier.json to ${outDir}`);
  console.log(`  index.html (${bytes} bytes) — open it in a desktop browser, no server needed`);
  console.log("  6 scenes x 7 differences = 42 differences; magnifier, keyboard play, hints, timer, score");
}

main();
