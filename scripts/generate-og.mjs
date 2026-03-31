import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Carbon background pattern -->
    <pattern id="carbon" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="#0a0a0a"/>
      <rect width="3" height="3" fill="#0f0f0f"/>
      <rect x="3" y="3" width="3" height="3" fill="#0f0f0f"/>
    </pattern>
    <!-- Red glow gradient -->
    <radialGradient id="redGlow" cx="15%" cy="30%" r="55%" fx="15%" fy="30%">
      <stop offset="0%" stop-color="#E10600" stop-opacity="0.12"/>
      <stop offset="60%" stop-color="#E10600" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#E10600" stop-opacity="0"/>
    </radialGradient>
    <!-- Bottom fade -->
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.8"/>
    </linearGradient>
    <!-- Top accent line gradient -->
    <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E10600"/>
      <stop offset="100%" stop-color="#E10600" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#carbon)"/>
  <rect width="${W}" height="${H}" fill="url(#redGlow)"/>

  <!-- Top red accent line -->
  <rect x="0" y="0" width="${W}" height="4" fill="#E10600"/>

  <!-- Vertical accent -->
  <rect x="80" y="60" width="2" height="100" fill="url(#accentLine)" opacity="0.6"/>

  <!-- Grid lines decoration -->
  <line x1="80" y1="540" x2="1120" y2="540" stroke="white" stroke-opacity="0.04" stroke-width="1"/>
  <line x1="80" y1="500" x2="1120" y2="500" stroke="white" stroke-opacity="0.03" stroke-width="1"/>

  <!-- Small dots decoration -->
  <circle cx="1100" cy="80" r="2" fill="white" opacity="0.08"/>
  <circle cx="1110" cy="80" r="2" fill="white" opacity="0.08"/>
  <circle cx="1120" cy="80" r="2" fill="white" opacity="0.08"/>
  <circle cx="1100" cy="90" r="2" fill="white" opacity="0.08"/>
  <circle cx="1110" cy="90" r="2" fill="white" opacity="0.08"/>
  <circle cx="1120" cy="90" r="2" fill="white" opacity="0.08"/>

  <!-- Main heading -->
  <text x="80" y="230" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="110" fill="white" letter-spacing="-4">TÚ SABES</text>
  <text x="80" y="345" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="110" fill="white" fill-opacity="0.12" letter-spacing="-4">QUIÉN</text>
  <text x="80" y="460" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="110" fill="#E10600" letter-spacing="-4">GANA.</text>

  <!-- Tagline -->
  <text x="80" y="510" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="22" fill="white" fill-opacity="0.4">Predice cada carrera de F1. Compite contra miles de fans.</text>

  <!-- Bottom bar -->
  <rect x="0" y="${H - 60}" width="${W}" height="60" fill="#0a0a0a" opacity="0.9"/>
  <rect x="0" y="${H - 60}" width="${W}" height="1" fill="white" opacity="0.06"/>

  <!-- Logo text -->
  <text x="80" y="${H - 24}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="24" fill="white" letter-spacing="2">
    <tspan fill="#E10600">POLE</tspan><tspan fill="white">GP</tspan>
  </text>

  <!-- URL -->
  <text x="1120" y="${H - 24}" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="16" fill="white" fill-opacity="0.3" text-anchor="end">polegp.app</text>

  <!-- Five starting lights -->
  <circle cx="920" cy="${H - 30}" r="8" fill="none" stroke="#E10600" stroke-width="1.5" opacity="0.6"/>
  <circle cx="920" cy="${H - 30}" r="4" fill="#E10600" opacity="0.8"/>
  <circle cx="945" cy="${H - 30}" r="8" fill="none" stroke="#E10600" stroke-width="1.5" opacity="0.6"/>
  <circle cx="945" cy="${H - 30}" r="4" fill="#E10600" opacity="0.8"/>
  <circle cx="970" cy="${H - 30}" r="8" fill="none" stroke="#E10600" stroke-width="1.5" opacity="0.6"/>
  <circle cx="970" cy="${H - 30}" r="4" fill="#E10600" opacity="0.8"/>
  <circle cx="995" cy="${H - 30}" r="8" fill="none" stroke="#E10600" stroke-width="1.5" opacity="0.6"/>
  <circle cx="995" cy="${H - 30}" r="4" fill="#E10600" opacity="0.8"/>
  <circle cx="1020" cy="${H - 30}" r="8" fill="none" stroke="#E10600" stroke-width="1.5" opacity="0.6"/>
  <circle cx="1020" cy="${H - 30}" r="4" fill="#E10600" opacity="0.8"/>
</svg>
`;

const out = resolve(__dirname, '..', 'public', 'og-image.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(out)
  .then(() => console.log(`✓ OG image generated: ${out}`))
  .catch(err => { console.error(err); process.exit(1); });
