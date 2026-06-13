const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const CATEGORY_COLORS = {
  "date-time": {
    bg1: "#e8f0fe", bg2: "#d4e4f7",
    text: "#1a237e", muted: "#5c6bc0", accent: "#1a73e8",
    glow: "rgba(26,115,232,0.07)",
    glow2: "rgba(26,115,232,0.04)",
  },
  "finance": {
    bg1: "#e6f4ea", bg2: "#d4edda",
    text: "#1b4332", muted: "#40916c", accent: "#137333",
    glow: "rgba(19,115,51,0.07)",
    glow2: "rgba(19,115,51,0.04)",
  },
  "health": {
    bg1: "#fce4ec", bg2: "#f8bbd0",
    text: "#880e4f", muted: "#c2185b", accent: "#c5221f",
    glow: "rgba(197,34,31,0.07)",
    glow2: "rgba(197,34,31,0.04)",
  },
  "math": {
    bg1: "#f3e5f5", bg2: "#e1bee7",
    text: "#4a148c", muted: "#7b1fa2", accent: "#7b1fa2",
    glow: "rgba(123,31,162,0.07)",
    glow2: "rgba(123,31,162,0.04)",
  },
  "text": {
    bg1: "#e0f7fa", bg2: "#b2ebf2",
    text: "#004d40", muted: "#00838f", accent: "#00695c",
    glow: "rgba(0,105,92,0.07)",
    glow2: "rgba(0,105,92,0.04)",
  },
  "security": {
    bg1: "#fff3e0", bg2: "#ffe0b2",
    text: "#3e2723", muted: "#795548", accent: "#e65100",
    glow: "rgba(230,81,0,0.07)",
    glow2: "rgba(230,81,0,0.04)",
  },
  "converter": {
    bg1: "#f1f8e9", bg2: "#dcedc8",
    text: "#1b5e20", muted: "#43a047", accent: "#2e7d32",
    glow: "rgba(46,125,50,0.07)",
    glow2: "rgba(46,125,50,0.04)",
  },
  "academic": {
    bg1: "#ede7f6", bg2: "#d1c4e9",
    text: "#1a237e", muted: "#5c6bc0", accent: "#283593",
    glow: "rgba(40,53,147,0.07)",
    glow2: "rgba(40,53,147,0.04)",
  },
  "utilities": {
    bg1: "#eceff1", bg2: "#cfd8dc",
    text: "#263238", muted: "#546e7a", accent: "#37474f",
    glow: "rgba(55,71,79,0.07)",
    glow2: "rgba(55,71,79,0.04)",
  },
  "guide": {
    bg1: "#fafafa", bg2: "#f0f0f0",
    text: "#212121", muted: "#757575", accent: "#616161",
    glow: "rgba(97,97,97,0.07)",
    glow2: "rgba(97,97,97,0.04)",
  },
};

const BLOG_CATEGORY_TO_KEY = {
  "Date & Time": "date-time",
  "Finance": "finance",
  "Text Tools": "text",
  "Health": "health",
  "Math": "math",
  "Security": "security",
  "Guide": "guide",
};

function getToolColors(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.utilities;
}

function getBlogColors(category) {
  const key = BLOG_CATEGORY_TO_KEY[category] || "guide";
  return CATEGORY_COLORS[key] || CATEGORY_COLORS.guide;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function wrapText(str, maxChars) {
  const words = str.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = (current ? current + " " : "") + word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function buildToolSvg({ icon, name, description, colors }) {
  const safeName = escapeXml(name);
  const safeDesc = escapeXml(description);
  const nameLines = wrapText(safeName, 28);
  const nameFontSize = nameLines.length <= 1 ? 52 : 42;
  const nameStartY = nameLines.length <= 1 ? 300 : 280;
  const lineHeight = nameFontSize + 8;

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bg1}"/>
      <stop offset="100%" style="stop-color:${colors.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="150" cy="150" r="220" fill="${colors.glow}"/>
  <circle cx="1050" cy="480" r="250" fill="${colors.glow2}"/>
  <circle cx="600" cy="315" r="320" fill="${colors.glow}" opacity="0.4"/>
  <text x="600" y="160" text-anchor="middle" font-size="72" font-family="system-ui, -apple-system, sans-serif">${escapeXml(icon)}</text>
  <rect x="530" y="210" width="140" height="32" rx="16" fill="${colors.accent}" opacity="0.12"/>
  <text x="600" y="232" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="${colors.accent}" letter-spacing="2">TOOL</text>
  ${nameLines.map((line, i) =>
    `<text x="600" y="${nameStartY + i * lineHeight}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${nameFontSize}" font-weight="800" fill="${colors.text}">${line}</text>`
  ).join("\n  ")}
  <text x="600" y="${nameStartY + nameLines.length * lineHeight + 50}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" fill="${colors.muted}">${safeDesc.length > 80 ? safeDesc.slice(0, 77) + "..." : safeDesc}</text>
  <line x1="500" y1="530" x2="700" y2="530" stroke="${colors.accent}" stroke-width="2" stroke-linecap="round" opacity="0.25"/>
  <text x="600" y="575" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="${colors.muted}" opacity="0.5">MS Tools</text>
</svg>`;
}

function buildBlogSvg({ title, category, colors }) {
  const safeTitle = escapeXml(title);
  const titleLines = wrapText(safeTitle, 34);
  const titleFontSize = titleLines.length <= 1 ? 44 : titleLines.length <= 2 ? 38 : 32;
  const titleStartY = titleLines.length <= 1 ? 260 : 240;
  const lineHeight = titleFontSize + 10;

  const categoryColors = colors;

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${categoryColors.bg1}"/>
      <stop offset="100%" style="stop-color:${categoryColors.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="180" cy="120" r="200" fill="${categoryColors.glow}"/>
  <circle cx="1020" cy="510" r="230" fill="${categoryColors.glow2}"/>
  <circle cx="600" cy="315" r="300" fill="${categoryColors.glow}" opacity="0.3"/>
  <rect x="525" y="140" width="150" height="32" rx="16" fill="${categoryColors.accent}" opacity="0.12"/>
  <text x="600" y="162" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="${categoryColors.accent}" letter-spacing="2">ARTICLE</text>
  ${titleLines.map((line, i) =>
    `<text x="600" y="${titleStartY + i * lineHeight}" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${titleFontSize}" font-weight="800" fill="${categoryColors.text}">${line}</text>`
  ).join("\n  ")}
  <line x1="500" y1="530" x2="700" y2="530" stroke="${categoryColors.accent}" stroke-width="2" stroke-linecap="round" opacity="0.25"/>
  <text x="600" y="575" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="${categoryColors.muted}" opacity="0.5">MS Tools</text>
</svg>`;
}

async function ensureDir(dir) {
  try { await fs.promises.mkdir(dir, { recursive: true }); } catch {}
}

async function generateSvgToWebp(svg, outputPath) {
  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .webp({ quality: 88 })
    .toFile(outputPath);
}

async function main() {
  const { toolsData } = await import("../src/data/registry/tools-data.js");
  const { blogPosts } = await import("../src/data/registry/blog-data.js");

  const toolsDir = path.join(__dirname, "..", "public", "og", "tools");
  const blogsDir = path.join(__dirname, "..", "public", "og", "blogs");
  await ensureDir(toolsDir);
  await ensureDir(blogsDir);

  let count = 0;

  for (const tool of toolsData) {
    const colors = getToolColors(tool.category);
    const svg = buildToolSvg({
      icon: tool.icon,
      name: tool.name,
      description: tool.description,
      colors,
    });
    await generateSvgToWebp(svg, path.join(toolsDir, `${tool.slug}.webp`));
    count++;
    if (count % 20 === 0) console.log(`  ${count}/${toolsData.length + blogPosts.length}`);
  }

  for (const post of blogPosts) {
    const colors = getBlogColors(post.category);
    const svg = buildBlogSvg({
      title: post.title,
      category: post.category,
      colors,
    });
    await generateSvgToWebp(svg, path.join(blogsDir, `${post.slug}.webp`));
    count++;
    if (count % 20 === 0) console.log(`  ${count}/${toolsData.length + blogPosts.length}`);
  }

  console.log(`\nDone! Generated ${count} OG images (${toolsData.length} tools, ${blogPosts.length} blogs) in public/og/`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
