/**
 * Renders the AHV logo mark to a PNG so the artwork can be reviewed visually.
 *
 *   node scripts/preview-logo.mjs [outfile]
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const { AFRICA_PATH, AFRICA_VIEWBOX } = await import(
  resolve(root, "lib/africa-path.ts")
);
const { BIRD_PATH, FLOCK, BRAND_GRADIENT } = await import(
  resolve(root, "lib/brand.ts")
);
const { Resvg } = await import("@resvg/resvg-js");

const out = process.argv[2] ?? "/tmp/ahv-logo.png";

function birdSvg({ x, y, scale, rotate, tone }) {
  const fill = tone === "light" ? "#FBF8F3" : BRAND_GRADIENT.via;
  return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})"><path d="${BIRD_PATH}" fill="${fill}"/></g>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 440" width="420" height="440">
  <defs>
    <linearGradient id="ahv" x1="0" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="${BRAND_GRADIENT.from}"/>
      <stop offset="55%" stop-color="${BRAND_GRADIENT.via}"/>
      <stop offset="100%" stop-color="${BRAND_GRADIENT.to}"/>
    </linearGradient>
  </defs>
  <rect width="420" height="440" fill="#FBF8F3"/>
  <g transform="translate(10 14) scale(0.94)">
    <path d="${AFRICA_PATH}" fill="url(#ahv)" fill-rule="evenodd"/>
    ${FLOCK.filter((b) => b.tone === "light").map(birdSvg).join("\n    ")}
  </g>
  ${FLOCK.filter((b) => b.tone === "dark").map(birdSvg).join("\n  ")}
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 520 },
  background: "#FBF8F3",
});
writeFileSync(out, resvg.render().asPng());
console.log(`Rendered ${out}`);
