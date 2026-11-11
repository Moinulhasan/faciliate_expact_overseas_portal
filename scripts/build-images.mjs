// Responsive image pipeline (CLAUDE.md §9: AVIF/WebP, srcset, explicit width/height).
//   in : resources/images/<group>/<name>.(jpg|jpeg|png|webp)
//   out: public/img/<group>/<name>-<w>.(avif|webp) + public/img/manifest.json
// The manifest is read by App\Support\Img (PHP) so pages only reference images that exist.
// Usage: npm run images        (incremental — only re-encodes changed sources)
//        npm run images -- --force
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, parse, relative, sep } from "node:path";
import sharp from "sharp";

const SRC = "resources/images";
const OUT = "public/img";
const WIDTHS = [480, 800, 1200, 1600];
const force = process.argv.includes("--force");

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) yield p;
  }
}

const mtime = async (p) => (await stat(p).catch(() => null))?.mtimeMs ?? 0;
const manifestPath = join(OUT, "manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8").catch(() => "{}"));
const seen = new Set();
let built = 0;

for await (const file of walk(SRC)) {
  const { dir, name } = parse(relative(SRC, file));
  const key = [...dir.split(sep).filter(Boolean), name].join("/");
  seen.add(key);
  const outDir = join(OUT, dir);
  const meta = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);
  const largest = join(outDir, `${name}-${widths.at(-1)}.avif`);

  if (!force && manifest[key] && (await mtime(largest)) > (await mtime(file))) continue;

  await mkdir(outDir, { recursive: true });
  for (const w of widths) {
    const img = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(join(outDir, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 74 }).toFile(join(outDir, `${name}-${w}.webp`));
  }
  const blur = await sharp(file).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  const height = Math.round((meta.height / meta.width) * widths.at(-1));
  const url = (w, ext) => `/img/${key}-${w}.${ext}`;

  manifest[key] = {
    width: widths.at(-1),
    height,
    src: url(widths.find((w) => w >= 800) ?? widths.at(-1), "webp"),
    avif: widths.map((w) => `${url(w, "avif")} ${w}w`).join(", "),
    webp: widths.map((w) => `${url(w, "webp")} ${w}w`).join(", "),
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  built++;
  console.log(`✓ ${key} (${meta.width}×${meta.height} → ${widths.join("/")})`);
}

for (const key of Object.keys(manifest)) if (!seen.has(key)) delete manifest[key]; // source removed
await mkdir(OUT, { recursive: true });
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`${built} built, ${Object.keys(manifest).length} in manifest`);
