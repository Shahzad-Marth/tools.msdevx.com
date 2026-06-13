const sharp = require("sharp");
const path = require("path");

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#eff6ff"/>
      <stop offset="30%" style="stop-color:#dbeafe"/>
      <stop offset="70%" style="stop-color:#bfdbfe"/>
      <stop offset="100%" style="stop-color:#93c5fd"/>
    </linearGradient>
    <linearGradient id="glow1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:0.08"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.03"/>
    </linearGradient>
    <linearGradient id="glow2" x1="100%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:0.06"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.02"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative glow circles -->
  <circle cx="150" cy="150" r="200" fill="url(#glow1)"/>
  <circle cx="1050" cy="480" r="250" fill="url(#glow2)"/>
  <circle cx="600" cy="315" r="300" fill="url(#glow1)" opacity="0.5"/>

  <!-- Decorative small hearts scattered -->
  <text x="100" y="80" font-size="24" opacity="0.15" fill="#1e40af">💕</text>
  <text x="950" y="100" font-size="20" opacity="0.12" fill="#3b82f6">💕</text>
  <text x="80" y="550" font-size="18" opacity="0.1" fill="#1e40af">💕</text>
  <text x="1080" y="580" font-size="22" opacity="0.13" fill="#3b82f6">💕</text>

  <!-- Main heart -->
  <text x="600" y="160" text-anchor="middle" font-size="80">💕</text>

  <!-- Title -->
  <text x="600" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#1a1a2e">
    Name Compatibility
  </text>
  <text x="600" y="310" text-anchor="middle" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#1a1a2e">
    Calculator
  </text>

  <!-- Divider line -->
  <line x1="450" y1="345" x2="750" y2="345" stroke="#1e40af" stroke-width="3" stroke-linecap="round" opacity="0.4"/>

  <!-- Subtitle -->
  <text x="600" y="395" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="500" fill="#5a5a7a">
    Find your love compatibility using numerology
  </text>

  <!-- CTA badge -->
  <rect x="440" y="430" width="320" height="48" rx="24" fill="#1e40af" opacity="0.15"/>
  <text x="600" y="461" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#1e40af">
    ✨ Try it free at tools.marth.systems
  </text>

  <!-- Bottom branding -->
  <text x="600" y="560" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#9a9ab0" opacity="0.6">
    MS Tools
  </text>
</svg>`;

const outputPath = path.join(__dirname, "..", "public", "og-name-compatibility.webp");

sharp(Buffer.from(svg))
  .resize(1200, 630)
  .webp({ quality: 90 })
  .toFile(outputPath)
  .then(() => console.log("✅ Generated:", outputPath))
  .catch((err) => console.error("❌ Error:", err));
