import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.resolve(rootDir, "public");

// 1. Build the exact Assignment PDF Maker promotional infographic SVG matching the user's uploaded image
function createPromoBannerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1000" width="1500" height="1000">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,500;0,600;0,700;0,800;1,700;1,800&amp;display=swap');
      text {
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
    </style>
    
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="60%" stop-color="#F1F5F9" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>

    <radialGradient id="topGlow" cx="80%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#DBEAFE" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#F8FAFC" stop-opacity="0" />
    </radialGradient>

    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.08" />
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.04" />
    </filter>

    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0F172A" flood-opacity="0.08" />
    </filter>

    <linearGradient id="blueLogo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1D4ED8" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>

    <linearGradient id="greenBadge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22C55E" />
      <stop offset="100%" stop-color="#16A34A" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1500" height="1000" fill="url(#bgGrad)" />
  <rect width="1500" height="1000" fill="url(#topGlow)" />

  <!-- ================= TOP HEADER SECTION ================= -->
  <!-- Eyebrow -->
  <text x="50" y="52" fill="#334155" font-size="18" font-weight="800" letter-spacing="1.5">STUDENT TOOLKIT</text>

  <!-- Main Headline -->
  <text x="48" y="118" fill="#0F172A" font-size="52" font-weight="800" letter-spacing="-1">Assignment PDF Maker</text>

  <!-- Subtitle -->
  <text x="50" y="160" fill="#475569" font-size="20" font-weight="500">Upload assignment photos, auto-detect document</text>
  <text x="50" y="188" fill="#475569" font-size="20" font-weight="500">borders, perspective crop, and download a</text>
  <text x="50" y="216" fill="#475569" font-size="20" font-weight="500">submission-ready PDF.</text>

  <!-- Action Badges (Settings / Feedback / Save Profile) -->
  <g transform="translate(50, 252)">
    <!-- Settings + EN pill -->
    <rect x="0" y="0" width="130" height="38" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
    <!-- Gear icon -->
    <path d="M22 19a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" fill="none" stroke="#475569" stroke-width="1.5" />
    <!-- Sun icon -->
    <circle cx="36" cy="19" r="3" fill="none" stroke="#475569" stroke-width="1.5" />
    <path d="M36 12v2m0 10v2m-7-7h2m10 0h2" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
    <text x="52" y="25" fill="#334155" font-size="14" font-weight="700">EN</text>

    <!-- Feedback pill -->
    <g transform="translate(145, 0)">
      <rect x="0" y="0" width="145" height="38" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
      <!-- Message icon -->
      <rect x="14" y="11" width="16" height="13" rx="2" fill="#2563EB" />
      <text x="22" y="21" fill="#FFFFFF" font-size="8" font-weight="800" text-anchor="middle">??</text>
      <!-- Dots -->
      <circle cx="38" cy="19" r="1.5" fill="#64748B" />
      <circle cx="44" cy="19" r="1.5" fill="#64748B" />
      <circle cx="50" cy="19" r="1.5" fill="#64748B" />
      <text x="60" y="24" fill="#334155" font-size="14" font-weight="700">Feedback</text>
    </g>
  </g>

  <!-- Save Student Profile Button -->
  <g transform="translate(50, 312)">
    <rect x="0" y="0" width="220" height="42" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.5" />
    <!-- Graduation Cap icon -->
    <path d="M20 23l12-6 12 6-12 6-12-6z" fill="none" stroke="#2563EB" stroke-width="1.75" />
    <path d="M24 25v6c0 3 4 5 8 5s8-2 8-5v-6" fill="none" stroke="#2563EB" stroke-width="1.75" />
    <path d="M44 23v8" fill="none" stroke="#2563EB" stroke-width="1.75" />
    <text x="52" y="26" fill="#2563EB" font-size="15" font-weight="700">Save Student Profile</text>
  </g>

  <!-- Top Right Logo & FAST PDF -->
  <g transform="translate(930, 30)">
    <!-- Blue App Logo Squircle -->
    <rect x="0" y="0" width="84" height="84" rx="20" fill="url(#blueLogo)" filter="url(#softShadow)" />
    <!-- Document folded icon -->
    <path d="M26 22h22l12 12v26a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M48 22v12h12" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round" />
    <text x="42" y="55" fill="#FFFFFF" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="1">[PDF]</text>

    <!-- Header Text -->
    <text x="104" y="44" fill="#0F172A" font-size="44" font-weight="800" font-style="italic">FAST PDF</text>
    <text x="106" y="74" fill="#475569" font-size="18" font-weight="600">Smart. Simple. Student Friendly.</text>
  </g>

  <!-- Floating Sheet & Checkmark Illustration (Top Right) -->
  <g transform="translate(1080, 160)">
    <!-- Decorative dashed guide arcs -->
    <path d="M20 80 Q 80 0 180 20" fill="none" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6" />
    <path d="M-20 120 Q 40 180 120 190" fill="none" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6" />
    
    <!-- Sparkles -->
    <path d="M210 50 l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#93C5FD" />
    <path d="M-40 130 l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#93C5FD" />

    <!-- Document Card -->
    <g transform="rotate(6, 120, 110)">
      <rect x="20" y="0" width="180" height="230" rx="16" fill="#FFFFFF" stroke="#93C5FD" stroke-width="2" filter="url(#softShadow)" />
      <!-- Horizontal lines -->
      <line x1="50" y1="35" x2="170" y2="35" stroke="#3B82F6" stroke-width="4" stroke-linecap="round" />
      <line x1="50" y1="55" x2="150" y2="55" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
      <line x1="50" y1="72" x2="165" y2="72" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />

      <!-- Photo box with mountains/sun -->
      <rect x="50" y="90" width="120" height="60" rx="6" fill="#DBEAFE" />
      <polygon points="60,140 85,115 110,140" fill="#3B82F6" opacity="0.8" />
      <polygon points="100,140 125,120 150,140" fill="#2563EB" opacity="0.9" />
      <circle cx="75" cy="105" r="5" fill="#60A5FA" />

      <line x1="50" y1="168" x2="170" y2="168" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <line x1="50" y1="185" x2="140" y2="185" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <line x1="50" y1="202" x2="160" y2="202" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- Green Checkmark Badge -->
    <circle cx="230" cy="190" r="38" fill="url(#greenBadge)" filter="url(#softShadow)" />
    <path d="M216 190l10 10 18-20" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- ================= CENTER CARD ("THE MOST IMPORTANT") ================= -->
  <g transform="translate(48, 385)">
    <!-- White Card Background -->
    <rect x="0" y="0" width="1404" height="425" rx="20" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#cardShadow)" />

    <!-- "★ THE MOST IMPORTANT" Pill -->
    <rect x="35" y="24" width="235" height="34" rx="8" fill="#1D4ED8" />
    <text x="152" y="46" fill="#FFFFFF" font-size="14" font-weight="800" text-anchor="middle" letter-spacing="0.8">★ THE MOST IMPORTANT</text>

    <!-- Heading -->
    <text x="35" y="115" fill="#0F172A" font-size="52" font-weight="900" letter-spacing="-0.5">PDF NAME FORMAT</text>
    <text x="35" y="146" fill="#64748B" font-size="17" font-weight="600">Your PDF will be automatically saved in this format</text>

    <!-- Dotted Container Box -->
    <rect x="35" y="170" width="1334" height="230" rx="14" fill="#FFFFFF" stroke="#2563EB" stroke-width="2" stroke-dasharray="7 6" />

    <!-- Red PDF Document Icon -->
    <g transform="translate(75, 185)">
      <path d="M4 4h48l24 24v60a6 6 0 0 1-6 6H4a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6z" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" stroke-linejoin="round" />
      <path d="M52 4v24h24" fill="none" stroke="#DC2626" stroke-width="3" stroke-linejoin="round" />
      <!-- Red PDF Badge -->
      <rect x="10" y="48" width="56" height="26" rx="4" fill="#DC2626" />
      <text x="38" y="66" fill="#FFFFFF" font-size="14" font-weight="900" text-anchor="middle">PDF</text>
    </g>

    <!-- The Format String: CE _ 25002170110091 _ DS _ T1 . pdf -->
    <g transform="translate(225, 240)" font-size="44" font-weight="800" letter-spacing="1">
      <text x="40" y="0" fill="#2563EB">CE</text>
      <line x1="38" y1="12" x2="105" y2="12" stroke="#2563EB" stroke-width="3" />

      <text x="140" y="0" fill="#0F172A">_</text>

      <text x="175" y="0" fill="#1E3A8A">25002170110091</text>
      <line x1="175" y1="12" x2="520" y2="12" stroke="#1E3A8A" stroke-width="3" />

      <text x="555" y="0" fill="#0F172A">_</text>

      <text x="590" y="0" fill="#16A34A">DS</text>
      <line x1="590" y1="12" x2="660" y2="12" stroke="#16A34A" stroke-width="3" />

      <text x="695" y="0" fill="#0F172A">_</text>

      <text x="730" y="0" fill="#EA580C">T1</text>
      <line x1="730" y1="12" x2="785" y2="12" stroke="#EA580C" stroke-width="3" />

      <text x="815" y="0" fill="#0F172A">.</text>
      <text x="845" y="0" fill="#0F172A">pdf</text>
      <line x1="845" y1="12" x2="925" y2="12" stroke="#0F172A" stroke-width="3" />
    </g>

    <!-- Dashed Guide Lines pointing to label cards -->
    <path d="M295 260 L 250 295" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4 4" />
    <path d="M570 260 L 570 295" stroke="#1E3A8A" stroke-width="1.5" stroke-dasharray="4 4" />
    <path d="M850 260 L 850 295" stroke="#16A34A" stroke-width="1.5" stroke-dasharray="4 4" />
    <path d="M980 260 L 1020 295" stroke="#EA580C" stroke-width="1.5" stroke-dasharray="4 4" />
    <path d="M1110 260 L 1180 295" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />

    <!-- 5 Annotated Cards -->
    <!-- 1. Branch -->
    <g transform="translate(170, 295)">
      <rect x="0" y="0" width="160" height="58" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.5" />
      <path d="M16 28h18m-18 10h18M25 18l12 7H13l12-7z" fill="none" stroke="#2563EB" stroke-width="1.5" />
      <text x="42" y="27" fill="#0F172A" font-size="14" font-weight="700">Branch</text>
      <text x="42" y="47" fill="#64748B" font-size="13" font-weight="500">(e.g. CE)</text>
    </g>

    <!-- 2. Enrollment No. -->
    <g transform="translate(365, 295)">
      <rect x="0" y="0" width="245" height="58" rx="8" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1.5" />
      <text x="24" y="36" fill="#1E3A8A" font-size="22" font-weight="900">#</text>
      <text x="45" y="27" fill="#0F172A" font-size="14" font-weight="700">Enrollment No.</text>
      <text x="45" y="47" fill="#64748B" font-size="13" font-weight="500">(e.g. 25002170110091)</text>
    </g>

    <!-- 3. Subject -->
    <g transform="translate(645, 295)">
      <rect x="0" y="0" width="165" height="58" rx="8" fill="#FFFFFF" stroke="#86EFAC" stroke-width="1.5" />
      <!-- Book icon -->
      <path d="M16 22c4-2 8-2 11 0v16c-3-2-7-2-11 0V22zm22 0c-4-2-8-2-11 0v16c3-2 7-2 11 0V22z" fill="none" stroke="#16A34A" stroke-width="1.5" />
      <text x="44" y="27" fill="#0F172A" font-size="14" font-weight="700">Subject</text>
      <text x="44" y="47" fill="#64748B" font-size="13" font-weight="500">(e.g. DS)</text>
    </g>

    <!-- 4. Exam Phase -->
    <g transform="translate(845, 295)">
      <rect x="0" y="0" width="185" height="58" rx="8" fill="#FFFFFF" stroke="#FDBA74" stroke-width="1.5" />
      <!-- Calendar icon -->
      <rect x="16" y="20" width="18" height="18" rx="3" fill="none" stroke="#EA580C" stroke-width="1.5" />
      <line x1="16" y1="26" x2="34" y2="26" stroke="#EA580C" stroke-width="1.5" />
      <text x="44" y="27" fill="#0F172A" font-size="14" font-weight="700">Exam Phase</text>
      <text x="44" y="47" fill="#64748B" font-size="13" font-weight="500">(e.g. T1)</text>
    </g>

    <!-- 5. File (.pdf) -->
    <g transform="translate(1065, 295)">
      <rect x="0" y="0" width="160" height="58" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
      <!-- File icon -->
      <path d="M18 20h10l6 6v14a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V22a2 2 0 0 1 2-2z" fill="none" stroke="#334155" stroke-width="1.5" />
      <text x="44" y="27" fill="#0F172A" font-size="14" font-weight="700">File</text>
      <text x="44" y="47" fill="#64748B" font-size="13" font-weight="500">(.pdf)</text>
    </g>

    <!-- Capsule "Example: CE_25002170110091_DS_T1.pdf" at bottom border -->
    <g transform="translate(470, 382)">
      <rect x="0" y="0" width="460" height="36" rx="18" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.5" />
      <text x="25" y="23" fill="#0F172A" font-size="15" font-weight="700">Example:</text>
      <text x="96" y="23" fill="#2563EB" font-size="15" font-weight="800">CE</text>
      <text x="120" y="23" fill="#0F172A" font-size="15" font-weight="800">_</text>
      <text x="130" y="23" fill="#1E3A8A" font-size="15" font-weight="800">25002170110091</text>
      <text x="272" y="23" fill="#0F172A" font-size="15" font-weight="800">_</text>
      <text x="282" y="23" fill="#16A34A" font-size="15" font-weight="800">DS</text>
      <text x="306" y="23" fill="#0F172A" font-size="15" font-weight="800">_</text>
      <text x="316" y="23" fill="#EA580C" font-size="15" font-weight="800">T1</text>
      <text x="337" y="23" fill="#0F172A" font-size="15" font-weight="800">.pdf</text>
    </g>
  </g>

  <!-- ================= 4 BOTTOM FEATURE PILLARS ================= -->
  <g transform="translate(85, 835)">
    <!-- 1. Fast PDF -->
    <g transform="translate(0, 0)">
      <circle cx="32" cy="32" r="30" fill="#1D4ED8" filter="url(#softShadow)" />
      <!-- Lightning bolt -->
      <path d="M34 16 L22 34 L31 34 L28 48 L42 28 L33 28 Z" fill="#FFFFFF" />
      <text x="80" y="26" fill="#0F172A" font-size="20" font-weight="800">Fast PDF</text>
      <text x="80" y="48" fill="#64748B" font-size="15" font-weight="500">Instantly generate</text>
      <text x="80" y="68" fill="#64748B" font-size="15" font-weight="500">your PDF</text>
    </g>

    <!-- 2. Size Optimized -->
    <g transform="translate(340, 0)">
      <circle cx="32" cy="32" r="30" fill="#7C3AED" filter="url(#softShadow)" />
      <!-- 4-Way Expand Arrows -->
      <path d="M22 26 L22 22 L26 22 M42 26 L42 22 L38 22 M22 38 L22 42 L26 42 M42 38 L42 42 L38 42 M22 22 L27 27 M42 22 L37 27 M22 42 L27 37 M42 42 L37 37" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="80" y="26" fill="#0F172A" font-size="20" font-weight="800">Size Optimized</text>
      <text x="80" y="48" fill="#64748B" font-size="15" font-weight="500">Compress &amp; optimize</text>
      <text x="80" y="68" fill="#64748B" font-size="15" font-weight="500">file size</text>
    </g>

    <!-- 3. Submission Ready -->
    <g transform="translate(690, 0)">
      <circle cx="32" cy="32" r="30" fill="#16A34A" filter="url(#softShadow)" />
      <!-- Shield Checkmark -->
      <path d="M22 28 l7 7 14-14" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <text x="80" y="26" fill="#0F172A" font-size="20" font-weight="800">Submission Ready</text>
      <text x="80" y="48" fill="#64748B" font-size="15" font-weight="500">Perfect PDF for</text>
      <text x="80" y="68" fill="#64748B" font-size="15" font-weight="500">college submission</text>
    </g>

    <!-- 4. Clean & Clear -->
    <g transform="translate(1040, 0)">
      <circle cx="32" cy="32" r="30" fill="#D97706" filter="url(#softShadow)" />
      <!-- Document icon -->
      <path d="M22 20h14l6 6v16a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V22a2 2 0 0 1 2-2z" fill="#FFFFFF" />
      <line x1="25" y1="28" x2="33" y2="28" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
      <line x1="25" y1="34" x2="38" y2="34" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
      <line x1="25" y1="40" x2="35" y2="40" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
      <text x="80" y="26" fill="#0F172A" font-size="20" font-weight="800">Clean &amp; Clear</text>
      <text x="80" y="48" fill="#64748B" font-size="15" font-weight="500">High quality &amp;</text>
      <text x="80" y="68" fill="#64748B" font-size="15" font-weight="500">readable</text>
    </g>
  </g>

  <!-- ================= VERY BOTTOM DARK BLUE FOOTER ================= -->
  <g transform="translate(0, 928)">
    <rect width="1500" height="72" fill="#0B132B" />

    <!-- Left side icon + text -->
    <g transform="translate(48, 16)">
      <!-- Document download icon -->
      <path d="M4 4h20l10 10v20a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round" />
      <path d="M14 18v10m-4-4l4 4 4-4" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

      <text x="75" y="26" fill="#FFFFFF" font-size="22" font-weight="800" letter-spacing="1">FAST PDF  •  PERFECT SIZE  •  SUBMISSION READY</text>
    </g>

    <!-- Right side button: MAKE PDF NOW -->
    <g transform="translate(1120, 14)">
      <rect x="0" y="0" width="330" height="44" rx="8" fill="#FFFFFF" />
      <!-- Download Arrow icon -->
      <path d="M35 15v14m-5-5l5 5 5-5" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="26" y1="33" x2="44" y2="33" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" />
      <text x="60" y="29" fill="#1D4ED8" font-size="20" font-weight="800" letter-spacing="0.5">MAKE PDF NOW</text>
    </g>
  </g>
</svg>`;
}

async function run() {
  console.log("Generating promotional social media image matching user's graphic...");
  const svg = createPromoBannerSvg();

  // Render SVG to 1200x800 high-res PNG using @resvg/resvg-js
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: "sans-serif",
    },
  });

  const pngBuffer = resvg.render().asPng();

  const ogPngPath = path.join(publicDir, "og-image.png");
  const ogJpgPath = path.join(publicDir, "og-image.jpg");

  fs.writeFileSync(ogPngPath, pngBuffer);
  console.log(`Saved ${ogPngPath} (${pngBuffer.length} bytes)`);

  // Convert to high-quality JPEG for WhatsApp (<300KB limit)
  execSync(`convert "${ogPngPath}" -quality 92 "${ogJpgPath}"`);
  const jpgSize = fs.statSync(ogJpgPath).size;
  console.log(`Saved ${ogJpgPath} (${jpgSize} bytes)`);

  // 2. Generate PDFly favicon.ico (multi-resolution 16, 32, 48, 64, 128, 256)
  // Ensure NO LOVABLE heart icon remains!
  const logoPngPath = path.join(publicDir, "logo.png");
  const faviconIcoPath = path.join(publicDir, "favicon.ico");
  const faviconPngPath = path.join(publicDir, "favicon.png");
  const appleTouchPath = path.join(publicDir, "apple-touch-icon.png");

  // Create favicon.png 64x64
  execSync(`convert "${logoPngPath}" -resize 64x64 "${faviconPngPath}"`);
  console.log(`Updated ${faviconPngPath}`);

  // Create apple-touch-icon.png 180x180
  execSync(`convert "${logoPngPath}" -resize 180x180 "${appleTouchPath}"`);
  console.log(`Updated ${appleTouchPath}`);

  // Create pwa-192x192.png and pwa-512x512.png
  const pwa192Path = path.join(publicDir, "pwa-192x192.png");
  const pwa512Path = path.join(publicDir, "pwa-512x512.png");
  execSync(`convert "${logoPngPath}" -resize 192x192 "${pwa192Path}"`);
  execSync(`convert "${logoPngPath}" -resize 512x512 "${pwa512Path}"`);
  console.log(`Created PWA icons: 192x192 and 512x512`);

  // Generate multi-resolution ICO file from PDFly logo
  execSync(
    `convert "${logoPngPath}" -define icon:auto-resize=256,128,64,48,32,16 "${faviconIcoPath}"`,
  );
  console.log(`Generated pure PDFly ${faviconIcoPath}`);

  // 3. Create site.webmanifest
  const manifest = {
    name: "Assignment PDF Maker",
    short_name: "PDFly",
    description:
      "Upload assignment photos, auto-detect document borders, perspective crop, and download a submission-ready PDF.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#2563EB",
    icons: [
      {
        src: "/favicon.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };

  const manifestPath = path.join(publicDir, "site.webmanifest");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Saved ${manifestPath}`);
}

run().catch((err) => {
  console.error("Asset generation failed:", err);
  process.exit(1);
});
