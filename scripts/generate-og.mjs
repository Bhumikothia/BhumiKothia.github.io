// Generates public/og-default.png (1200×630), the image shown when the site
// is shared on LinkedIn, X, WhatsApp, etc. Re-run after changing name/headline:
//   npm run og-image
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const name = 'Bhumi Kabariya';
const alias = 'Published as Bhumi Kothia';
const line1 = 'Ph.D. Researcher · Environmental Microbiology';
const line2 = 'Bacterial bioflocculants for sustainable wastewater treatment';
// Illustrative micrograph (credited on the site's Image credits page).
const micrograph = new URL('../src/assets/images/science/bacillus-subtilis-gram-stain.jpg', import.meta.url);

const D = 360; // diameter of the microscope field
const cx = 990;
const cy = 315;

const circle = await sharp(micrograph.pathname.replace(/^\/([A-Za-z]:)/, '$1'))
  .resize(D, D, { fit: 'cover' })
  .composite([{ input: Buffer.from(`<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}"/></svg>`), blend: 'dest-in' }])
  .png()
  .toBuffer();

const ticks = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * Math.PI * 2;
  const r1 = D / 2 + 22;
  const r2 = r1 - (i % 5 === 0 ? 14 : 7);
  return `<line x1="${cx + r1 * Math.cos(a)}" y1="${cy + r1 * Math.sin(a)}" x2="${cx + r2 * Math.cos(a)}" y2="${cy + r2 * Math.sin(a)}" stroke="#0369a1" stroke-width="${i % 5 === 0 ? 2 : 1}" opacity=".7"/>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1.2" fill="#0369a1" opacity=".18"/></pattern></defs>
  <rect width="1200" height="630" fill="#f4f8f9"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <circle cx="${cx}" cy="${cy}" r="${D / 2 + 22}" fill="none" stroke="#0369a1" stroke-width="2" opacity=".6"/>
  ${ticks}
  <text x="70" y="150" font-family="Consolas, 'Courier New', monospace" font-size="20" letter-spacing="3" fill="#047857">ENVIRONMENTAL MICROBIOLOGY</text>
  <text x="68" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="700" fill="#0b2530">${name}</text>
  <text x="70" y="302" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#48626b">${alias}</text>
  <text x="70" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" fill="#0369a1">${line1}</text>
  <text x="70" y="452" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#0b2530">${line2}</text>
</svg>`;

const png = await sharp(Buffer.from(svg))
  .composite([{ input: circle, left: cx - D / 2, top: cy - D / 2 }])
  .png()
  .toBuffer();
await writeFile(new URL('../public/og-default.png', import.meta.url), png);
console.log('Wrote public/og-default.png');
