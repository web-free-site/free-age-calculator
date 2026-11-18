#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const ads = JSON.parse(fs.readFileSync(path.join(publicDir, 'ads.json'), 'utf8'));

const SITE = 'https://free-age-calculator.web-free.site';

function adIframe(unitKey) {
  const u = ads.units[unitKey];
  const key = u.key;
  const w = u.width;
  const h = u.height;
  const src = `${ads.bannerScriptBase}/${key}`;
  const at = `atOptions = {'key':'${key}','format':'iframe','height':${h},'width':${w},'params':{}};`;
  const inner = `<!DOCTYPE html><html><head><meta charset=&quot;utf-8&quot;><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body><script>${at}<\\/script><script src=&quot;${src}&quot;><\\/script></body></html>`;
  return `<div class="ad-slot ad-iframe" aria-hidden="true">
  <iframe title="Advertisement" class="ad-frame" width="${w}" height="${h}" scrolling="no" frameborder="0" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" srcdoc="${inner}"></iframe>
</div>`;
}

const adTop = `<div class="ad-row ad-top">${adIframe('banner728x90')}</div>`;
const adRail = `<aside class="ad-rail" aria-label="Advertisement">
${adIframe('banner160x600')}
${adIframe('banner160x300')}
</aside>`;
const adMidBlock = `
<div class="ad-row ad-mid">${adIframe('banner728x90')}</div>
<div class="ad-row ad-mid ad-mid-sm">${adIframe('banner468x60')}</div>
<div class="ad-native">
  <script async="async" data-cfasync="false" src="${ads.units.native.script}"></script>
  <div id="${ads.units.native.container}"></div>
</div>
<div class="ad-row ad-inline">${adIframe('banner300x250')}</div>`;
const adSticky = `<div class="ad-sticky-mobile">${adIframe('banner320x50')}</div>`;

const headAds = `
<script data-cfasync="false" src="${ads.units.popunder.script}"></script>`;

const nav = `
<header class="site-header no-print">
  <div class="site-header-inner">
    <a href="/" class="site-wordmark">Free Age Calculator</a>
    <nav class="site-nav" aria-label="Main">
      <a href="/">Calculator</a>
      <a href="/how-to-calculate-exact-age-in-years-months-and-days/">Exact age guide</a>
      <a href="/how-to-calculate-age-for-school-enrollment/">School enrollment</a>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
    </nav>
  </div>
</header>`;

const footer = `
<footer class="site-footer no-print">
  <div class="site-footer-inner">
    <span><strong>Free Age Calculator</strong> — client-side only, no sign-up.</span>
    <span>Part of <a href="https://web-free.site/">web-free.site</a></span>
    <span>Based on <a href="https://github.com/RajkumarKamarthi/Age-Calculator" rel="noopener">Age-Calculator</a> by Rajkumar Kamarthi (MIT)</span>
    <a class="smartlink" href="${ads.units.smartlink.url}" rel="nofollow sponsored">${ads.units.smartlink.label}</a>
    <span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/about/">About</a> · <a href="/contact/">Contact</a></span>
  </div>
</footer>
<script data-cfasync="false" src="${ads.units.socialBar.script}"></script>`;

const moreTools = `
<aside id="wf-more-tools" class="wf-more-tools no-print" aria-labelledby="wf-mt-title">
  <style>
    .wf-more-tools{box-sizing:border-box;width:100%;margin:2.5rem 0 0;padding:1.5rem 1rem 5rem;border-top:1px solid rgba(255,255,255,.12);background:rgba(15,23,42,.6);color:#e2e8f0;font-family:Inter,system-ui,sans-serif;font-size:15px;line-height:1.5}
    .wf-more-tools *{box-sizing:border-box}
    .wf-more-tools h2{margin:0 0 .35rem;font-size:1.15rem;font-weight:700;color:#f8fafc}
    .wf-more-tools .wf-mt-lead{margin:0 0 1rem;color:#94a3b8}
    .wf-more-tools .wf-mt-lead a{color:#818cf8}
    .wf-more-tools .wf-mt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem 1.25rem}
    .wf-more-tools h3{margin:0 0 .4rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:#94a3b8}
    .wf-more-tools ul{margin:0;padding:0;list-style:none}
    .wf-more-tools li{margin:0 0 .25rem}
    .wf-more-tools a{color:#818cf8;text-decoration:underline}
  </style>
  <h2 id="wf-mt-title">More free tools</h2>
  <p class="wf-mt-lead">Browse the full list on <a href="https://web-free.site/">web-free.site</a>.</p>
  <div class="wf-mt-grid">
    <div class="wf-mt-cat"><h3>Guides on this site</h3><ul>
      <li><a href="/how-to-calculate-exact-age-in-years-months-and-days/">Exact age in years, months, days</a></li>
      <li><a href="/how-to-calculate-age-for-school-enrollment/">Age for school enrollment</a></li>
    </ul></div>
    <div class="wf-mt-cat"><h3>Documents &amp; writing</h3><ul><li><a href="https://free-word-counter.web-free.site/">Free Word Counter</a></li><li><a href="https://free-pdf-converter.web-free.site/">Free PDF Converter</a></li><li><a href="https://free-cv-maker.web-free.site/">Free CV Maker</a></li><li><a href="https://free-invoice-generator.web-free.site/">Free Invoice Generator</a></li><li><a href="https://free-typing-test.web-free.site/">Free Typing Test</a></li><li><a href="https://free-signature-generator.web-free.site/">Free Signature Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Images &amp; codes</h3><ul><li><a href="https://free-qr-code-creator.web-free.site/">Free QR Code Creator</a></li><li><a href="https://free-image-resizer.web-free.site/">Free Image Resizer</a></li><li><a href="https://free-image-to-text.web-free.site/">Free Image to Text</a></li><li><a href="https://free-background-remover.web-free.site/">Free Background Remover</a></li><li><a href="https://free-image-compressor.web-free.site/">Free Image Compressor</a></li></ul></div><div class="wf-mt-cat"><h3>Calculators &amp; currency</h3><ul><li><a href="https://free-online-calculator.web-free.site/">Free Online Calculator</a></li><li><a href="https://free-currency-converter.web-free.site/">Free Currency Converter</a></li><li><a href="https://free-unit-converter.web-free.site/">Free Unit Converter</a></li><li><a href="https://free-loan-calculator.web-free.site/">Free Loan Calculator</a></li><li><strong>Free Age Calculator</strong></li></ul></div><div class="wf-mt-cat"><h3>Text &amp; SEO</h3><ul><li><a href="https://free-ai-humanizer.web-free.site/">Free AI Humanizer</a></li><li><a href="https://free-seo-generator.web-free.site/">Free SEO Generator</a></li><li><a href="https://free-backlink-generator.web-free.site/">Free Backlink Generator</a></li><li><a href="https://free-json-formatter.web-free.site/">Free JSON Formatter</a></li><li><a href="https://free-text-to-speech.web-free.site/">Free Text to Speech</a></li><li><a href="https://free-speech-to-text.web-free.site/">Free Speech to Text</a></li></ul></div><div class="wf-mt-cat"><h3>Audio &amp; video</h3><ul><li><a href="https://free-video-to-mp3.web-free.site/">Free Video to MP3 Converter</a></li></ul></div><div class="wf-mt-cat"><h3>Test data</h3><ul><li><a href="https://free-fake-address-generator.web-free.site/">Free Fake Address Generator</a></li><li><a href="https://free-fake-name-generator.web-free.site/">Free Fake Name Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Security &amp; passwords</h3><ul><li><a href="https://free-password-generator.web-free.site/">Free Password Generator</a></li></ul></div>
  </div>
</aside>`;

function pageShell({ title, description, canonical, jsonLd, bodyClass, mainContent, includeCalculatorScripts = false }) {
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const scripts = includeCalculatorScripts
    ? `<script src="/assets/age-core.js"></script>\n<script src="/assets/age-calculator.js"></script>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
${ld}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
${headAds}
</head>
<body class="has-site-shell ${bodyClass || ''}">
${nav}
${adTop}
<div class="page-layout">
${adRail}
<div class="page-main">
${mainContent}
</div>
</div>
${adSticky}
${footer}
${moreTools}
<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->
${scripts}
</body>
</html>`;
}

const faqEntities = [
  {
    '@type': 'Question',
    name: 'Is Free Age Calculator free to use?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. All calculations run in your browser with no account and no paid API.',
    },
  },
  {
    '@type': 'Question',
    name: 'How is exact age calculated?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'The tool counts full years, then months, then days between birth date and a target date, borrowing days from the previous month when needed (including leap years).',
    },
  },
  {
    '@type': 'Question',
    name: 'Can I compare age between two dates?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Use “Compare with another date” to see exact age on any past or future day.',
    },
  },
  {
    '@type': 'Question',
    name: 'Does school enrollment mode use official government rules?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'No. You enter your own cutoff date and the tool shows exact age on that day. Admission rules vary by school and region—always confirm with the institution.',
    },
  },
  {
    '@type': 'Question',
    name: 'Is my date of birth sent to a server?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'No. Dates are processed locally. Optional browser localStorage may remember your birth date on this device only.',
    },
  },
];

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Age Calculator',
  url: SITE + '/',
  description: 'Calculate exact age in years, months, and days, compare two dates, countdown to birthday, and school cutoff age—in your browser.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  inLanguage: 'en',
  browserRequirements: 'Requires JavaScript',
};

const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqEntities };

const calculatorMain = `
<main class="app-container">
  <header class="no-print">
    <div class="header-left">
      <h1>Free Age Calculator</h1>
    </div>
    <div class="header-actions">
      <div class="dropdown no-print">
        <button class="action-btn" id="export-btn" type="button">Export</button>
        <div class="dropdown-content">
          <a href="#" id="export-pdf">Print / Save as PDF</a>
          <a href="#" id="export-json">Download as JSON</a>
        </div>
      </div>
      <button class="action-btn outline no-print" id="share-btn" type="button">Share</button>
    </div>
  </header>
  <p class="seo-intro no-print">Enter your date of birth to see exact age today, optional comparison with another date, birthday countdown, and age on a school enrollment cutoff date—all in your browser.</p>
  <div id="toast-container" class="no-print"></div>

  <div class="dashboard-grid">
    <div class="main-column">
      <div class="glass-card input-card no-print">
        <div class="input-group">
          <label for="dob-dd">Date of Birth</label>
          <div class="custom-date-input" id="dob-container">
            <input type="text" id="dob-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric" autocomplete="bday-day" aria-label="Birth day">
            <span class="separator">/</span>
            <input type="text" id="dob-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric" autocomplete="bday-month" aria-label="Birth month">
            <span class="separator">/</span>
            <input type="text" id="dob-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric" autocomplete="bday-year" aria-label="Birth year">
          </div>
          <span class="error-msg" id="dob-error">Please enter a valid date in the past</span>
        </div>
        <div class="input-group comparison-group" id="comparison-group" style="display: none;">
          <label>Compare With (Optional)</label>
          <div class="custom-date-input" id="comp-container">
            <input type="text" id="comp-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric" aria-label="Compare day">
            <span class="separator">/</span>
            <input type="text" id="comp-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric" aria-label="Compare month">
            <span class="separator">/</span>
            <input type="text" id="comp-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric" aria-label="Compare year">
          </div>
        </div>
        <button class="text-btn" id="toggle-compare" type="button">Compare with another date</button>
      </div>

      <div class="glass-card primary-result-card" id="primary-result">
        <div class="age-display" id="age-display">
          <div class="age-item"><span class="age-value" id="age-years">0</span><span class="age-label">Years</span></div>
          <div class="age-item"><span class="age-value" id="age-months">0</span><span class="age-label">Months</span></div>
          <div class="age-item"><span class="age-value" id="age-days">0</span><span class="age-label">Days</span></div>
        </div>
      </div>

      <div class="glass-card school-card no-print" id="school-section">
        <h3>School enrollment cutoff</h3>
        <p class="school-disclaimer">Enter the cutoff date your school or district uses. This tool only shows exact age on that date—it does not apply any country-specific admission rules.</p>
        <div class="input-group">
          <label for="school-dd">Cutoff date</label>
          <div class="custom-date-input" id="school-container">
            <input type="text" id="school-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric" aria-label="Cutoff day">
            <span class="separator">/</span>
            <input type="text" id="school-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric" aria-label="Cutoff month">
            <span class="separator">/</span>
            <input type="text" id="school-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric" aria-label="Cutoff year">
          </div>
          <span class="error-msg" id="school-error">Please enter a valid cutoff date</span>
        </div>
        <div class="school-result">
          <div class="age-item"><span class="age-value" id="school-years">—</span><span class="age-label">Years</span></div>
          <div class="age-item"><span class="age-value" id="school-months">—</span><span class="age-label">Months</span></div>
          <div class="age-item"><span class="age-value" id="school-days">—</span><span class="age-label">Days</span></div>
        </div>
        <p class="school-cutoff-summary" id="school-cutoff-label">Enter a school cutoff date to see age on that day.</p>
      </div>

      ${adMidBlock}

      <div class="glass-card timeline-card">
        <h3>Life Stage</h3>
        <div class="timeline" id="timeline">
          <div class="timeline-step" data-stage="child">Childhood</div>
          <div class="timeline-step" data-stage="teen">Teen</div>
          <div class="timeline-step" data-stage="adult">Adult</div>
          <div class="timeline-step" data-stage="senior">Senior</div>
        </div>
      </div>

      <div class="glass-card fun-facts-card">
        <h3>Fun Facts</h3>
        <ul class="facts-list">
          <li>You have blinked approximately <span class="fact-value" id="fact-blinks">0</span> times.</li>
          <li>You have taken approximately <span class="fact-value" id="fact-breaths">0</span> breaths.</li>
          <li>Your heart has beaten approximately <span class="fact-value" id="fact-heartbeats">0</span> times.</li>
        </ul>
      </div>
    </div>

    <div class="side-column">
      <div class="glass-card next-birthday-card">
        <h3>Next Birthday In</h3>
        <div class="birthday-summary" id="birthday-summary">0 Months, 0 Days</div>
        <p class="birthday-date" id="birthday-date">Your next birthday is on: -</p>
        <div class="countdown-timer" id="countdown-timer">
          <div class="cd-item"><span id="cd-days">0</span> Days</div>
          <div class="cd-item"><span id="cd-hours">0</span> Hours</div>
          <div class="cd-item"><span id="cd-minutes">0</span> Mins</div>
          <div class="cd-item"><span id="cd-seconds">0</span> Secs</div>
        </div>
      </div>

      <div class="glass-card stats-card">
        <h3>Detailed Statistics</h3>
        <div class="stats-grid">
          <div class="stat-item"><div class="stat-label">Total Months</div><div class="stat-value" id="stat-months">0</div></div>
          <div class="stat-item"><div class="stat-label">Total Weeks</div><div class="stat-value" id="stat-weeks">0</div></div>
          <div class="stat-item"><div class="stat-label">Total Days</div><div class="stat-value" id="stat-days">0</div></div>
          <div class="stat-item"><div class="stat-label">Total Hours</div><div class="stat-value" id="stat-hours">0</div></div>
          <div class="stat-item"><div class="stat-label">Total Minutes</div><div class="stat-value" id="stat-minutes">0</div></div>
          <div class="stat-item"><div class="stat-label">Total Seconds</div><div class="stat-value" id="stat-seconds">0</div></div>
        </div>
      </div>

      <div class="glass-card milestones-card">
        <h3>Milestones</h3>
        <ul class="milestones-list" id="milestones-list"></ul>
        <div class="next-milestone" id="next-milestone"></div>
      </div>
    </div>
  </div>

  <section class="faq-block no-print" id="faq">
    <h2>Frequently asked questions</h2>
    ${faqEntities
      .map((q) => `<div class="faq-item"><strong>${q.name}</strong><p>${q.acceptedAnswer.text}</p></div>`)
      .join('')}
  </section>
</main>`;

const indexHtml = pageShell({
  title: 'Free Age Calculator — exact age, countdown & school cutoff',
  description:
    'Calculate exact age in years, months, and days. Compare two dates, birthday countdown, school enrollment cutoff age, JSON export & PDF—free in your browser.',
  canonical: SITE + '/',
  jsonLd: [webAppLd, faqLd],
  mainContent: calculatorMain,
  includeCalculatorScripts: true,
});

function articlePage({ slug, title, description, h1, articleHtml }) {
  const canonical = `${SITE}/${slug}/`;
  const main = `<main class="prose-static app-container">
  <article>
    <h1>${h1}</h1>
    ${articleHtml}
  </article>
  ${adMidBlock}
</main>`;
  return pageShell({
    title,
    description,
    canonical,
    jsonLd: [
      { ...webAppLd, url: canonical, name: title, description },
      faqLd,
    ],
    mainContent: main,
  });
}

const pages = [
  { file: 'index.html', html: indexHtml },
  {
    file: 'how-to-calculate-exact-age-in-years-months-and-days/index.html',
    html: articlePage({
      slug: 'how-to-calculate-exact-age-in-years-months-and-days',
      title: 'How to calculate exact age in years, months, and days',
      description:
        'Step-by-step guide to exact age: full years, borrowed months, leap-day birthdays, and comparing two calendar dates.',
      h1: 'How to calculate exact age in years, months, and days',
      articleHtml: `
      <p>Exact age is not simply “today’s year minus birth year.” You count <strong>complete years</strong>, then <strong>complete months</strong>, then <strong>remaining days</strong> between a birth date and a target date.</p>
      <h2>Step 1: Start with years</h2>
      <p>Subtract the birth year from the target year. If the target month/day is before the birthday month/day, subtract one year—you have not reached the next birthday yet.</p>
      <h2>Step 2: Count months</h2>
      <p>Subtract birth month from target month. If the target day is before the birth day, borrow one month and add the number of days in the previous calendar month (this handles February and leap years).</p>
      <h2>Step 3: Remaining days</h2>
      <p>After borrowing when needed, the day difference is the “days” part of the age.</p>
      <h2>Leap-day birthdays</h2>
      <p>Someone born on 29 February is still a valid calendar date. Compare against any target date the same way; only the month-length borrowing changes in leap years.</p>
      <h2>Try it instantly</h2>
      <p>Use the <a href="/">Free Age Calculator</a> on this site or open <a href="/">Compare with another date</a> to measure age between any two days.</p>`,
    }),
  },
  {
    file: 'how-to-calculate-age-for-school-enrollment/index.html',
    html: articlePage({
      slug: 'how-to-calculate-age-for-school-enrollment',
      title: 'How to calculate age for school enrollment',
      description:
        'Find a child’s exact age on a school cutoff date. General guidance only—rules vary by district; confirm with your school.',
      h1: 'How to calculate age for school enrollment',
      articleHtml: `
      <p>Schools often ask whether a child was a certain age on a <strong>cutoff date</strong> (for example, the first day of term or a fixed date in the autumn). This site does not encode any country’s legal rules—it only computes exact calendar age on the date you enter.</p>
      <h2>What you need</h2>
      <ol>
        <li>Child’s date of birth</li>
        <li>Cutoff date published by your school or district (enter it exactly as stated)</li>
      </ol>
      <h2>Use the calculator</h2>
      <p>On the <a href="/">home page</a>, enter the birth date, then fill in <strong>School enrollment cutoff</strong>. You will see years, months, and days on that cutoff.</p>
      <h2>Important disclaimer</h2>
      <p>Enrollment policies differ worldwide and can change yearly. Minimum ages, grade placement, and exceptions are set by local authorities—not by this calculator. Always verify requirements with the school before enrolling.</p>`,
    }),
  },
  {
    file: 'about/index.html',
    html: articlePage({
      slug: 'about',
      title: 'About Free Age Calculator',
      description:
        'About Free Age Calculator, open-source MIT base, credits, and the web-free.site tool hub.',
      h1: 'About Free Age Calculator',
      articleHtml: `
      <p><strong>Free Age Calculator</strong> is a browser-based utility for exact age, date comparison, birthday countdown, and optional school-cutoff age. Everything runs client-side: no account, no server-side date processing.</p>
      <p>It is built from the open-source project <a href="https://github.com/RajkumarKamarthi/Age-Calculator" rel="noopener">Age-Calculator</a> by <strong>Rajkumar Kamarthi</strong>, used under the <a href="https://github.com/RajkumarKamarthi/Age-Calculator/blob/main/LICENSE">MIT License</a>. A copy of the license is included in this repository.</p>
      <p>School enrollment mode and site packaging were added for <a href="https://web-free.site/">web-free.site</a>. Ads are served through Adsterra; see <a href="/privacy/">Privacy</a>.</p>`,
    }),
  },
  {
    file: 'privacy/index.html',
    html: articlePage({
      slug: 'privacy',
      title: 'Privacy Policy — Free Age Calculator',
      description: 'Privacy policy for Free Age Calculator: local processing, cookies, ads, and analytics.',
      h1: 'Privacy Policy',
      articleHtml: `
      <p><strong>Last updated:</strong> November 2025</p>
      <p>Dates you type are used only in your browser to compute results. We do not receive or store your birth date on our servers.</p>
      <p>The calculator may save your date of birth in <strong>localStorage</strong> on your device for convenience. You can clear it by clearing site data in your browser.</p>
      <p>Third-party advertisers (Adsterra) may set cookies or use similar technologies per their policies. This site does not use Google AdSense.</p>
      <p>Contact: see <a href="/contact/">Contact</a>.</p>`,
    }),
  },
  {
    file: 'terms/index.html',
    html: articlePage({
      slug: 'terms',
      title: 'Terms of Use — Free Age Calculator',
      description: 'Terms of use for Free Age Calculator.',
      h1: 'Terms of Use',
      articleHtml: `
      <p>This tool is provided “as is” without warranties. Age and school-cutoff results are for general information only and are not legal or medical advice.</p>
      <p>You are responsible for confirming enrollment or eligibility rules with the relevant institution. Do not rely on this site as an official government or school record.</p>
      <p>The underlying software is available under the MIT License; see the repository and <a href="/about/">About</a>.</p>`,
    }),
  },
  {
    file: 'contact/index.html',
    html: articlePage({
      slug: 'contact',
      title: 'Contact — Free Age Calculator',
      description: 'How to reach the maintainers of Free Age Calculator via web-free.site.',
      h1: 'Contact',
      articleHtml: `
      <p>Free Age Calculator is part of the <a href="https://web-free.site/">web-free.site</a> collection. For feedback about this tool, use the contact options listed on the hub site.</p>
      <p>Technical credits and license information are on the <a href="/about/">About</a> page.</p>`,
    }),
  },
];

for (const { file, html } of pages) {
  const out = path.join(publicDir, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE}/how-to-calculate-exact-age-in-years-months-and-days/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE}/how-to-calculate-age-for-school-enrollment/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${SITE}/about/</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>${SITE}/privacy/</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>${SITE}/terms/</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>${SITE}/contact/</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`
);

console.log('Generated', pages.length, 'HTML pages');