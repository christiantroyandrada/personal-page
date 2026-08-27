# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `ctaprojects.xyz` as a fast, accessible Measured Workbench portfolio that positions Christian as a software engineer who builds and operates production systems.

**Architecture:** Keep the site as semantic static HTML with one shared CSS system and one small ES module for theme state and progressive enhancement. Put all hiring-critical content and links in the original HTML, self-host the selected fonts and social image, and use Node's built-in test runner plus HTML validation for repeatable checks.

**Tech Stack:** HTML5, CSS with OKLCH custom properties, vanilla JavaScript ES modules, Node.js test runner, html-validate 11.10.0, Lighthouse 13.4.1, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-28-portfolio-redesign-design.md`

## Global Constraints

- Do not add a runtime framework, CMS, animation library, icon library, analytics provider, or backend.
- Keep full-stack and DevOps as one identity: “software engineer who builds and operates production systems.”
- Distinguish production depth, hands-on operating range, and active learning in visible copy.
- Keep public-facing copy concise, plain, and human; avoid inflated claims, résumé jargon, and em dashes.
- Keep Secure Chat, Pitaka, and AstroPipeline as the three main systems; .NET stays clearly labelled as learning.
- Do not publish the supplied résumé PDFs, phone number, private repository details, or NDA material.
- Use Barlow Semi Condensed for display text and Atkinson Hyperlegible Next for body text; self-host only required WOFF2 faces.
- Use OKLCH colour tokens, one-pixel rules, squared or minimally rounded geometry, and no gradient text or accent side stripes.
- Theme defaults to the system preference, persists an explicit light/dark choice, applies before first paint, and never shifts layout.
- Motion uses opacity and transform only, finishes the opening sequence within 600-750ms, and disables non-essential movement for reduced-motion users.
- Core content and links must work without JavaScript.
- Field targets at the 75th percentile: LCP <=2.5s, INP <=200ms, CLS <=0.1.
- Mobile Lighthouse targets: Performance >=95, Accessibility >=95, Best Practices >=95, SEO 100.
- Do not push or deploy without explicit user authorization.

## File Structure

- `index.html`: homepage content, semantic sections, metadata, JSON-LD, pre-paint theme initializer.
- `contacts.html`: professional contact methods and progressively enhanced existing Formspree form.
- `hobbies.html`: personal appendix connected to music, gaming, outdoors, coffee, and astrophotography.
- `css/app.css`: tokens, font declarations, base rules, layouts, components, themes, motion, and responsive behavior.
- `js/site.mjs`: testable theme utilities, theme toggle, smooth-anchor enhancement, section reveal, and contact-form enhancement.
- `fonts/`: self-hosted WOFF2 files and upstream license texts.
- `scripts/fetch-fonts.mjs`: reproducible download of the exact Google Fonts Latin WOFF2 assets and licenses.
- `img/social-card-source.svg`: reproducible 1200x630 Measured Workbench social artwork.
- `img/social-card.png`: rendered Open Graph/Twitter image.
- `tests/helpers/site.mjs`: shared file and HTML metadata helpers for Node tests.
- `tests/theme.test.mjs`: pure theme utility behavior.
- `tests/design-system.test.mjs`: palette, font, motion, and banned-pattern checks.
- `tests/site-content.test.mjs`: positioning, evidence, project selection, NDA, and supporting-page copy.
- `tests/seo.test.mjs`: page metadata, JSON-LD, sitemap, robots, and social image checks.
- `tests/site-integrity.test.mjs`: internal links and local asset existence.
- `package.json` / `package-lock.json`: repeatable test, validation, and Lighthouse tooling.
- `robots.txt` / `sitemap.xml`: canonical crawl configuration.

---

### Task 1: Test Harness and Theme Contract

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tests/helpers/site.mjs`
- Create: `tests/theme.test.mjs`
- Create: `js/site.mjs`

**Interfaces:**
- Produces: `THEME_STORAGE_KEY`, `getInitialTheme(storedTheme, prefersDark)`, `safeReadTheme(storage)`, `safeWriteTheme(storage, theme)`, `applyTheme(root, theme)`, and `initializeTheme(options)` from `js/site.mjs`.
- Produces: `SITE_PAGES`, `readPage(page)`, `readCss()`, `getMeta(html, selectorName, value)`, and `getJsonLd(html)` from `tests/helpers/site.mjs`.
- Consumes: no earlier task interfaces.

- [ ] **Step 1: Create the package manifest and install pinned development tools**

Create `package.json`:

```json
{
  "name": "christian-troy-andrada-portfolio",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "validate:html": "html-validate index.html contacts.html hobbies.html",
    "check": "npm run test && npm run validate:html"
  },
  "devDependencies": {
    "html-validate": "11.10.0",
    "lighthouse": "13.4.1"
  }
}
```

Run: `npm install`

Expected: `package-lock.json` is created and `npm audit` reports no unresolved high-severity issue in direct tooling dependencies.

- [ ] **Step 2: Write the failing theme tests**

Create `tests/theme.test.mjs`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyTheme,
  getInitialTheme,
  safeReadTheme,
  safeWriteTheme,
} from '../js/site.mjs';

test('stored theme wins over the system preference', () => {
  assert.equal(getInitialTheme('light', true), 'light');
  assert.equal(getInitialTheme('dark', false), 'dark');
});

test('invalid or missing storage falls back to system preference', () => {
  assert.equal(getInitialTheme(null, true), 'dark');
  assert.equal(getInitialTheme('sepia', false), 'light');
});

test('storage failures do not break theme selection', () => {
  const storage = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
  };
  assert.equal(safeReadTheme(storage), null);
  assert.equal(safeWriteTheme(storage, 'dark'), false);
});

test('applyTheme updates theme and native colour scheme together', () => {
  const root = { dataset: {}, style: {} };
  applyTheme(root, 'dark');
  assert.equal(root.dataset.theme, 'dark');
  assert.equal(root.style.colorScheme, 'dark');
});
```

- [ ] **Step 3: Run the theme tests and confirm the missing-interface failure**

Run: `node --test tests/theme.test.mjs`

Expected: FAIL because `js/site.mjs` does not exist.

- [ ] **Step 4: Implement the minimal pure theme utilities**

Create `js/site.mjs` with this public surface:

```js
export const THEME_STORAGE_KEY = 'theme';

export function getInitialTheme(storedTheme, prefersDark) {
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  return prefersDark ? 'dark' : 'light';
}

export function safeReadTheme(storage) {
  try {
    const value = storage?.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function safeWriteTheme(storage, theme) {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function applyTheme(root, theme) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}
```

Do not initialize browser globals yet. Later tasks will add `initializeTheme`, reveal behavior, and the contact form after their markup exists.

- [ ] **Step 5: Add reusable HTML test helpers**

Create `tests/helpers/site.mjs`:

```js
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const SITE_PAGES = ['index.html', 'contacts.html', 'hobbies.html'];
export const ROOT = fileURLToPath(new URL('../../', import.meta.url));

export function readPage(page) {
  return readFile(new URL(`../../${page}`, import.meta.url), 'utf8');
}

export function readCss() {
  return readFile(new URL('../../css/app.css', import.meta.url), 'utf8');
}

export function getMeta(html, attribute, value) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${value}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i');
  return html.match(pattern)?.[1] ?? null;
}

export function getJsonLd(html) {
  const match = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  return match ? JSON.parse(match[1]) : null;
}
```

- [ ] **Step 6: Run the focused and existing tests**

Run: `npm test`

Expected: all theme tests and `tests/nda-privacy.test.mjs` pass.

- [ ] **Step 7: Commit the test and theme foundation**

```bash
git add package.json package-lock.json tests/helpers/site.mjs tests/theme.test.mjs js/site.mjs
git commit -m "Add portfolio test and theme foundation"
```

---

### Task 2: Measured Workbench Tokens, Fonts, and Base Components

**Files:**
- Create: `scripts/fetch-fonts.mjs`
- Create: `fonts/BarlowSemiCondensed-latin.woff2`
- Create: `fonts/AtkinsonHyperlegibleNext-latin.woff2`
- Create: `fonts/AtkinsonHyperlegibleNext-italic-latin.woff2`
- Create: `fonts/OFL-Barlow.txt`
- Create: `fonts/OFL-Atkinson-Hyperlegible-Next.txt`
- Create: `tests/design-system.test.mjs`
- Modify: `css/app.css`

**Interfaces:**
- Consumes: `readCss()` from `tests/helpers/site.mjs`.
- Produces CSS tokens `--color-canvas`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-rule`, `--color-oxide`, `--color-moss`, semantic spacing tokens, and component classes used by Tasks 3-6.

- [ ] **Step 1: Write design-system tests before adding the new CSS system**

Create `tests/design-system.test.mjs`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

import { readCss } from './helpers/site.mjs';

const css = await readCss();

test('uses local display and body fonts', () => {
  assert.match(css, /font-family:\s*['"]Barlow Semi Condensed/);
  assert.match(css, /font-family:\s*['"]Atkinson Hyperlegible Next/);
  assert.match(css, /url\(['"]?\.\.\/fonts\/BarlowSemiCondensed-latin\.woff2/);
  assert.doesNotMatch(css, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
});

test('defines light and dark OKLCH material tokens', () => {
  assert.match(css, /:root\s*{[\s\S]*--color-canvas:\s*oklch\(/);
  assert.match(css, /\[data-theme=['"]dark['"]\]\s*{[\s\S]*--color-canvas:\s*oklch\(/);
});

test('does not use banned generated-design patterns', () => {
  assert.doesNotMatch(css, /background-clip:\s*text|-webkit-background-clip:\s*text/);
  assert.doesNotMatch(css, /border-(left|right):\s*[2-9]/);
});

test('reduced motion disables entrances and smooth scrolling', () => {
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /scroll-behavior:\s*auto/);
  assert.match(css, /animation-duration:\s*0\.01ms/);
});
```

- [ ] **Step 2: Run the design-system tests and confirm failure against the old Notion CSS**

Run: `node --test tests/design-system.test.mjs`

Expected: FAIL because the current CSS uses Inter, hex tokens, and `.dark-theme`.

- [ ] **Step 3: Add a reproducible official-font fetcher**

Create `scripts/fetch-fonts.mjs` that:

```js
import { mkdir, writeFile } from 'node:fs/promises';

const cssUrl = new URL('https://fonts.googleapis.com/css2');
cssUrl.searchParams.append('family', 'Barlow Semi Condensed:wght@600..800');
cssUrl.searchParams.append('family', 'Atkinson Hyperlegible Next:ital,wght@0,400..700;1,400..700');
cssUrl.searchParams.set('display', 'swap');

const response = await fetch(cssUrl, {
  headers: { 'user-agent': 'Mozilla/5.0 Chrome/131 Safari/537.36' },
});
if (!response.ok) throw new Error(`Google Fonts CSS failed: ${response.status}`);
const css = await response.text();

const targets = [
  { family: 'Barlow Semi Condensed', style: 'normal', file: 'BarlowSemiCondensed-latin.woff2' },
  { family: 'Atkinson Hyperlegible Next', style: 'normal', file: 'AtkinsonHyperlegibleNext-latin.woff2' },
  { family: 'Atkinson Hyperlegible Next', style: 'italic', file: 'AtkinsonHyperlegibleNext-italic-latin.woff2' },
];

await mkdir(new URL('../fonts/', import.meta.url), { recursive: true });
for (const target of targets) {
  const blocks = [...css.matchAll(/\/\* latin \*\/\s*@font-face\s*{([\s\S]*?)}/g)].map((match) => match[1]);
  const block = blocks.find((value) => value.includes(`font-family: '${target.family}'`) && value.includes(`font-style: ${target.style}`));
  const url = block?.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`Latin WOFF2 not found for ${target.family} ${target.style}`);
  const font = await fetch(url);
  if (!font.ok) throw new Error(`Font download failed: ${font.status}`);
  await writeFile(new URL(`../fonts/${target.file}`, import.meta.url), Buffer.from(await font.arrayBuffer()));
}

const licenses = [
  ['https://raw.githubusercontent.com/jpt/barlow/main/OFL.txt', 'OFL-Barlow.txt'],
  ['https://raw.githubusercontent.com/googlefonts/atkinson-hyperlegible-next/main/OFL.txt', 'OFL-Atkinson-Hyperlegible-Next.txt'],
];
for (const [url, file] of licenses) {
  const license = await fetch(url);
  if (!license.ok) throw new Error(`License download failed: ${license.status}`);
  await writeFile(new URL(`../fonts/${file}`, import.meta.url), await license.text());
}
```

Run: `node scripts/fetch-fonts.mjs`

Expected: three non-empty WOFF2 files and two license texts under `fonts/`.

- [ ] **Step 4: Add the shared token and component system without breaking the legacy pages**

Prepend `css/app.css` with the following new system. Keep the old page-specific selectors temporarily because `contacts.html` and `hobbies.html` are not migrated until Task 4; Task 6 removes the obsolete selectors after every page uses the new markup.

```css
@font-face {
  font-family: 'Barlow Semi Condensed';
  src: url('../fonts/BarlowSemiCondensed-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 600 800;
  font-display: swap;
}

@font-face {
  font-family: 'Atkinson Hyperlegible Next';
  src: url('../fonts/AtkinsonHyperlegibleNext-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
}

@font-face {
  font-family: 'Atkinson Hyperlegible Next';
  src: url('../fonts/AtkinsonHyperlegibleNext-italic-latin.woff2') format('woff2');
  font-style: italic;
  font-weight: 400 700;
  font-display: swap;
}

:root {
  --color-canvas: oklch(0.87 0.018 78);
  --color-surface: oklch(0.82 0.018 78);
  --color-ink: oklch(0.27 0.018 155);
  --color-muted: oklch(0.46 0.012 120);
  --color-rule: oklch(0.57 0.018 72);
  --color-oxide: oklch(0.48 0.075 38);
  --color-moss: oklch(0.45 0.05 153);
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 0.75rem;
  --space-lg: 1rem;
  --space-xl: 1.5rem;
  --space-2xl: 2rem;
  --space-3xl: 3rem;
  --space-4xl: 4rem;
  --space-5xl: 6rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme='dark'] {
  --color-canvas: oklch(0.22 0.014 155);
  --color-surface: oklch(0.27 0.014 155);
  --color-ink: oklch(0.9 0.014 78);
  --color-muted: oklch(0.72 0.015 100);
  --color-rule: oklch(0.43 0.018 145);
  --color-oxide: oklch(0.68 0.07 42);
  --color-moss: oklch(0.7 0.055 150);
}
```

Then implement the spec's shared selectors: `.skip-link`, `.site-header`, `.site-nav`, `.theme-toggle`, `.workbench`, `.hero`, `.range-rail`, `.section-heading`, `.evidence-ledger`, `.system-list`, `.system-record`, `.experience-list`, `.capability-matrix`, `.contact-layout`, `.contact-form`, `.hobby-list`, `.site-footer`, `.reveal`, `.is-visible`, and the required focus-visible states.

Include:

```css
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--color-canvas); color: var(--color-ink); font-family: 'Atkinson Hyperlegible Next', sans-serif; }
h1, h2, h3, .display { font-family: 'Barlow Semi Condensed', sans-serif; }
.reveal { opacity: 0; transform: translateY(0.75rem); }
.reveal.is-visible { opacity: 1; transform: none; transition: opacity 480ms var(--ease-out), transform 480ms var(--ease-out); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  .reveal { opacity: 1; transform: none; }
}
```

- [ ] **Step 5: Run design-system and full tests**

Run: `npm test`

Expected: design-system, theme, and NDA tests pass.

- [ ] **Step 6: Commit the design foundation**

```bash
git add css/app.css scripts/fetch-fonts.mjs fonts tests/design-system.test.mjs
git commit -m "Add measured workbench design system"
```

---

### Task 3: Evidence-led Homepage

**Files:**
- Create: `tests/site-content.test.mjs`
- Replace: `index.html`
- Modify: `tests/nda-privacy.test.mjs`

**Interfaces:**
- Consumes CSS components from Task 2 and `readPage()` from `tests/helpers/site.mjs`.
- Produces stable section IDs `proof`, `systems`, `experience`, `range`, and `contact-cta` for navigation and later integrity checks.

- [ ] **Step 1: Write failing homepage content tests**

Create `tests/site-content.test.mjs` with:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

import { readPage } from './helpers/site.mjs';

const home = await readPage('index.html');

test('homepage uses the unified software engineering position', () => {
  assert.match(home, /builds? and operates? production systems/i);
  assert.match(home, /Pragmatic[\s\S]*Resourceful[\s\S]*Adaptive/i);
});

test('homepage leads with bounded production evidence', () => {
  for (const evidence of ['46', '64', '19', '95%']) assert.match(home, new RegExp(`>${evidence}<`));
  assert.match(home, /merged PRs/i);
  assert.match(home, /teammate PRs reviewed/i);
});

test('homepage features the three strongest public systems', () => {
  assert.match(home, /chat-microservices/);
  assert.match(home, /pitaka-app/);
  assert.match(home, /aporn-tool/);
  assert.doesNotMatch(home, /vue-news|filta-frontend-assessment|eturnity_vue_challenge/);
});

test('learning and operational experience remain honestly bounded', () => {
  assert.match(home, /React[\s\S]*\.NET[\s\S]*(learning|exploring)/i);
  assert.doesNotMatch(home, /senior devops|devops expert|sre expert/i);
});

test('critical navigation and project links are present in HTML', () => {
  for (const id of ['proof', 'systems', 'experience', 'range', 'contact-cta']) {
    assert.match(home, new RegExp(`id=["']${id}["']`));
  }
});
```

- [ ] **Step 2: Run the homepage tests and confirm the old portfolio fails**

Run: `node --test tests/site-content.test.mjs`

Expected: FAIL on unified positioning, evidence ledger, new project selection, and section IDs.

- [ ] **Step 3: Replace `index.html` with semantic dossier markup**

Implement this top-level structure with visible copy matching the approved mockup and spec:

```html
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header">
    <a class="site-identity" href="./index.html">Christian Troy Andrada / Software Engineer</a>
    <nav class="site-nav" aria-label="Primary navigation">
      <a href="#proof">Proof</a><a href="#systems">Systems</a><a href="#experience">Experience</a><a href="#range">Range</a><a href="./contacts.html">Contact</a>
    </nav>
    <button class="theme-toggle" type="button" data-theme-toggle aria-label="Use dark theme" aria-pressed="false"><span aria-hidden="true">◐</span><span data-theme-label>Dark</span></button>
  </header>
  <main id="main-content" class="workbench">
    <section class="hero reveal">...</section>
    <section id="proof" class="portfolio-section reveal">...</section>
    <section id="systems" class="portfolio-section reveal">...</section>
    <section id="experience" class="portfolio-section reveal">...</section>
    <section id="range" class="portfolio-section reveal">...</section>
    <section class="portfolio-section ai-practice reveal">...</section>
    <section id="contact-cta" class="contact-cta reveal">...</section>
  </main>
  <footer class="site-footer">...</footer>
  <script type="module" src="./js/site.mjs"></script>
</body>
```

Required visible content:

- Hero heading communicates “I build software and help it survive production.”
- Hero paragraph names six years of web product delivery and the application/platform boundary without claiming senior DevOps specialization.
- Evidence qualifiers tie 46, 64, and 19 to the five-month Orkestra contract and 95% to owned H5 microfrontends.
- Each system record is a semantic `article` with a real GitHub link and a native `details` block for evidence.
- Pitaka says mock wallet, no real money, and active React Native learning.
- AstroPipeline is the display name, while the link visibly identifies the `aporn-tool` repository destination.
- Experience records show two or three outcomes per role, not the full CV.
- Capability matrix uses Build, Operate, Quality, and Explore.
- AI section says tools help close knowledge gaps and speed delivery, while review, security, and accountability stay human-owned.

- [ ] **Step 4: Update the NDA privacy test for the new structure**

Keep the prohibited protected strings, then replace the old class-specific assertion with:

```js
assert.doesNotMatch(html, /Money tracker|D3\.js|Svelte \+ SSR as required by client/);
assert.match(html, /confidential|NDA/i);
assert.match(html, /without sharing protected details/i);
```

The confidential-work note must remain text-only and must not be a modal or fake project link.

- [ ] **Step 5: Run content and privacy tests**

Run: `node --test tests/site-content.test.mjs tests/nda-privacy.test.mjs`

Expected: PASS.

- [ ] **Step 6: Validate the homepage HTML**

Run: `npx html-validate index.html`

Expected: PASS with no structural, heading, duplicate-ID, or interactive-content errors.

- [ ] **Step 7: Commit the homepage**

```bash
git add index.html tests/site-content.test.mjs tests/nda-privacy.test.mjs
git commit -m "Rebuild homepage around production evidence"
```

---

### Task 4: Contact and Hobbies Supporting Pages

**Files:**
- Modify: `tests/site-content.test.mjs`
- Replace: `contacts.html`
- Replace: `hobbies.html`
- Modify: `js/site.mjs`

**Interfaces:**
- Consumes shared header, footer, contact, hobby, and theme components from Task 2.
- Consumes theme functions from Task 1.
- Produces `enhanceContactForm(form, options)` from `js/site.mjs` and stable supporting-page main IDs.

- [ ] **Step 1: Add failing supporting-page tests**

Append to `tests/site-content.test.mjs`:

```js
const contact = await readPage('contacts.html');
const hobbies = await readPage('hobbies.html');

test('contact page keeps direct professional fallbacks and the existing form endpoint', () => {
  assert.match(contact, /mailto:christiantroyandrada@gmail\.com/);
  assert.match(contact, /linkedin\.com\/in\/christiantroyandrada/);
  assert.match(contact, /github\.com\/christiantroyandrada/);
  assert.match(contact, /action=["']https:\/\/formspree\.io\/f\/xnnevgjg["']/);
  assert.match(contact, /method=["']POST["']/i);
  assert.doesNotMatch(contact, /Facebook|Instagram/);
});

test('hobbies page is a personal appendix with an honest AstroPipeline connection', () => {
  for (const interest of ['Astrophotography', 'Music', 'Gaming', 'Coffee', 'Outdoors']) {
    assert.match(hobbies, new RegExp(interest, 'i'));
  }
  assert.match(hobbies, /aporn-tool/);
  assert.doesNotMatch(hobbies, /wikipedia\.org|google\.com\/maps\/search/);
});

test('supporting pages share the primary navigation and theme control', () => {
  for (const html of [contact, hobbies]) {
    assert.match(html, /class=["'][^"']*site-header/);
    assert.match(html, /data-theme-toggle/);
    assert.match(html, /href=["']\.\/index\.html/);
  }
});
```

- [ ] **Step 2: Run the tests and confirm the old supporting pages fail**

Run: `node --test tests/site-content.test.mjs`

Expected: FAIL because the old contact page promotes Facebook/Instagram and the old hobbies page links generic external definitions.

- [ ] **Step 3: Rebuild `contacts.html` with professional hierarchy and native fallback**

Use the same pre-paint theme initializer, site header, and footer as the homepage. Keep LinkedIn, GitHub, and email as direct links. Keep the existing Formspree action and native POST behavior so submission still works without JavaScript.

Required form behavior and markup:

```html
<form action="https://formspree.io/f/xnnevgjg" method="POST" class="contact-form" data-contact-form>
  <input type="text" name="_gotcha" class="honeypot" tabindex="-1" autocomplete="off">
  <input type="hidden" name="_subject" value="New message from ctaprojects.xyz">
  <label for="name">Your name</label><input id="name" name="name" autocomplete="name" required>
  <label for="email">Your email</label><input id="email" name="email" type="email" autocomplete="email" required>
  <label for="message">What would you like to build?</label><textarea id="message" name="message" required></textarea>
  <button type="submit" data-submit-button><span data-submit-label>Send message</span></button>
  <p class="form-status" data-form-status role="status" aria-live="polite"></p>
</form>
```

Remove the inline contact script, emoji success marker, and hidden redirect field. Do not claim success unless Formspree returns an OK response.

- [ ] **Step 4: Add the small contact-form enhancement to `js/site.mjs`**

Add:

```js
export async function submitContactForm(form, fetchImpl = fetch) {
  const response = await fetchImpl(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('Message could not be sent');
}

export function enhanceContactForm(form, fetchImpl = fetch) {
  const button = form.querySelector('[data-submit-button]');
  const label = form.querySelector('[data-submit-label]');
  const status = form.querySelector('[data-form-status]');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true;
    label.textContent = 'Sending...';
    status.textContent = '';
    try {
      await submitContactForm(form, fetchImpl);
      form.reset();
      status.textContent = 'Message sent. I will get back to you soon.';
    } catch {
      status.textContent = 'Could not send the message. Email me directly instead.';
    } finally {
      button.disabled = false;
      label.textContent = 'Send message';
    }
  });
}
```

Initialize only when `[data-contact-form]` exists.

- [ ] **Step 5: Rebuild `hobbies.html` as a personal appendix**

Use static interest records instead of links to Wikipedia or Google searches. Include:

- Astrophotography, with a link to the AstroPipeline repository and a plain explanation of why the tool exists.
- Music and singing.
- Gaming.
- Coffee sessions.
- Hiking and the outdoors.

Keep the tone human and concise. Do not turn each interest into an identical icon card.

- [ ] **Step 6: Run supporting-page tests and validate all HTML**

Run: `npm run check`

Expected: all Node tests and html-validate checks pass.

- [ ] **Step 7: Commit the supporting pages**

```bash
git add contacts.html hobbies.html js/site.mjs tests/site-content.test.mjs
git commit -m "Align contact and hobbies pages"
```

---

### Task 5: Metadata, Structured Data, Sitemap, and Social Preview

**Files:**
- Create: `tests/seo.test.mjs`
- Create: `img/social-card-source.svg`
- Create: `img/social-card.png`
- Modify: `index.html`
- Modify: `contacts.html`
- Modify: `hobbies.html`
- Modify: `robots.txt`
- Modify: `sitemap.xml`

**Interfaces:**
- Consumes `SITE_PAGES`, `readPage()`, `getMeta()`, and `getJsonLd()` from `tests/helpers/site.mjs`.
- Produces canonical absolute URLs and `https://ctaprojects.xyz/img/social-card.png` for all social metadata.

- [ ] **Step 1: Write failing SEO tests**

Create `tests/seo.test.mjs`:

```js
import assert from 'node:assert/strict';
import { stat, readFile } from 'node:fs/promises';
import test from 'node:test';

import { SITE_PAGES, getJsonLd, readPage } from './helpers/site.mjs';

const expectedCanonicals = {
  'index.html': 'https://ctaprojects.xyz/',
  'contacts.html': 'https://ctaprojects.xyz/contacts.html',
  'hobbies.html': 'https://ctaprojects.xyz/hobbies.html',
};

for (const page of SITE_PAGES) {
  test(`${page} has complete unique search and social metadata`, async () => {
    const html = await readPage(page);
    assert.match(html, /<title>[^<]{20,65}<\/title>/);
    assert.match(html, /<meta name="description" content="[^\"]{70,170}">/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${expectedCanonicals[page].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`));
    assert.match(html, /<meta property="og:image" content="https:\/\/ctaprojects\.xyz\/img\/social-card\.png">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  });
}

test('homepage ProfilePage JSON-LD matches the visible person and links', async () => {
  const home = await readPage('index.html');
  const data = getJsonLd(home);
  assert.equal(data['@type'], 'ProfilePage');
  assert.equal(data.mainEntity['@type'], 'Person');
  assert.equal(data.mainEntity.name, 'Christian Troy Andrada');
  assert.match(data.mainEntity.description, /builds and operates production systems/i);
  assert.deepEqual(data.mainEntity.sameAs.sort(), [
    'https://github.com/christiantroyandrada',
    'https://www.linkedin.com/in/christiantroyandrada/',
  ].sort());
});

test('social card is a real 1200 by 630 PNG asset', async () => {
  const file = await stat(new URL('../img/social-card.png', import.meta.url));
  assert.ok(file.size > 20_000);
  const bytes = await readFile(new URL('../img/social-card.png', import.meta.url));
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
});

test('robots and sitemap expose only canonical public pages', async () => {
  const robots = await readFile(new URL('../robots.txt', import.meta.url), 'utf8');
  const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');
  assert.match(robots, /Sitemap: https:\/\/ctaprojects\.xyz\/sitemap\.xml/);
  for (const url of Object.values(expectedCanonicals)) assert.match(sitemap, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(sitemap, /\.superpowers|localhost|github\.com/);
});
```

- [ ] **Step 2: Run SEO tests and confirm metadata and social image failures**

Run: `node --test tests/seo.test.mjs`

Expected: FAIL because the new social image and ProfilePage JSON-LD do not exist yet.

- [ ] **Step 3: Add page-specific metadata and homepage JSON-LD**

Use these page title directions and write concise matching descriptions:

- Home: `Christian Troy Andrada | Full-Stack Software & DevOps Engineer`
- Contact: `Contact Christian Troy Andrada | Software Engineer`
- Hobbies: `Outside the Workbench | Christian Troy Andrada`

Add the canonical, Open Graph, Twitter, author, robots, theme-color, and favicon fields to each page. Remove the obsolete keywords meta tag. Add homepage JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "url": "https://ctaprojects.xyz/",
  "mainEntity": {
    "@type": "Person",
    "name": "Christian Troy Andrada",
    "description": "Software engineer who builds and operates production systems.",
    "image": "https://ctaprojects.xyz/img/avatar.jpeg",
    "homeLocation": { "@type": "Place", "name": "Cavite, Philippines" },
    "sameAs": [
      "https://github.com/christiantroyandrada",
      "https://www.linkedin.com/in/christiantroyandrada/"
    ]
  }
}
```

Keep the structured-data description visibly present in the hero.

- [ ] **Step 4: Create and render the social preview**

Create `img/social-card-source.svg` at exactly 1200x630. Use the light Measured Workbench palette, the name, `Software Engineer / Build + Operate`, and the line `Pragmatic. Resourceful. Adaptive.` Keep all text inside a 72px safe area and avoid raster project screenshots.

Render once on macOS:

Run: `sips -s format png img/social-card-source.svg --out img/social-card.png`

Run: `sips -g pixelWidth -g pixelHeight img/social-card.png`

Expected: width 1200 and height 630.

- [ ] **Step 5: Update robots and sitemap**

Set `robots.txt` to:

```text
User-agent: *
Allow: /

Sitemap: https://ctaprojects.xyz/sitemap.xml
```

Update `sitemap.xml` to include only the three canonical URLs, valid ISO `lastmod` values using the implementation date, and appropriate priorities without claiming unsupported alternate languages.

- [ ] **Step 6: Run SEO and complete checks**

Run: `npm run check`

Expected: all tests and HTML validation pass.

- [ ] **Step 7: Commit SEO and preview assets**

```bash
git add index.html contacts.html hobbies.html robots.txt sitemap.xml img/social-card-source.svg img/social-card.png tests/seo.test.mjs
git commit -m "Add portfolio search and sharing metadata"
```

---

### Task 6: Theme UI, Minimal Motion, and Responsive Adaptation

**Files:**
- Modify: `tests/theme.test.mjs`
- Create: `tests/site-integrity.test.mjs`
- Modify: `index.html`
- Modify: `contacts.html`
- Modify: `hobbies.html`
- Modify: `js/site.mjs`
- Modify: `css/app.css`
- Delete: `js/index.js`

**Interfaces:**
- Consumes theme utilities from Task 1 and stable markup from Tasks 3-5.
- Produces `initializeTheme(options)`, `initializeReveals(options)`, and `initializeSite(options)`.

- [ ] **Step 1: Add failing theme initialization tests**

Append to `tests/theme.test.mjs`:

```js
import { initializeTheme } from '../js/site.mjs';

test('theme toggle updates the document, label, pressed state, and storage', () => {
  let click;
  const root = { dataset: { theme: 'light' }, style: {} };
  const label = { textContent: '' };
  const toggle = {
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(type, handler) { if (type === 'click') click = handler; },
    querySelector() { return label; },
  };
  const writes = [];
  const storage = { getItem: () => null, setItem: (...args) => writes.push(args) };
  const media = { matches: false, addEventListener() {} };

  initializeTheme({ root, toggle, storage, media });
  click();

  assert.equal(root.dataset.theme, 'dark');
  assert.equal(toggle.attributes['aria-pressed'], 'true');
  assert.equal(label.textContent, 'Light');
  assert.deepEqual(writes, [['theme', 'dark']]);
});
```

- [ ] **Step 2: Run theme tests and confirm missing initializer failure**

Run: `node --test tests/theme.test.mjs`

Expected: FAIL because `initializeTheme` is not exported.

- [ ] **Step 3: Implement the browser initializers**

Add `initializeTheme` using the Task 1 utilities. It must:

- Read the initial stored theme.
- Keep `aria-pressed` true only for dark.
- Set the visible label to the theme the button will switch to.
- Persist click choices.
- Listen for system changes only while there is no valid stored choice.

Add `initializeReveals`:

```js
export function initializeReveals({ elements, reducedMotion, observerFactory }) {
  if (reducedMotion || !observerFactory) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  const observer = observerFactory((entries, instance) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    }
  });
  elements.forEach((element) => observer.observe(element));
}
```

Add `initializeSite()` to locate optional controls and run theme, reveal, anchor, and contact enhancements. Guard the bottom-level call with `if (typeof document !== 'undefined')` so Node imports remain side-effect free.

- [ ] **Step 4: Add the shared pre-paint initializer to all pages**

Immediately after `<meta charset>` on every page, add the same small inline script:

```html
<script>
  (() => {
    let theme = null;
    try { theme = localStorage.getItem('theme'); } catch {}
    if (theme !== 'light' && theme !== 'dark') {
      theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
</script>
```

Ensure `<html lang="en" data-theme="light">` is the valid no-script fallback and remove every `.dark-theme` reference.

After all pages load `js/site.mjs`, delete `js/index.js`. Remove the legacy CSS selectors retained in Task 2, then confirm all three pages still render correctly before continuing.

- [ ] **Step 5: Write internal-link and local-asset tests**

Create `tests/site-integrity.test.mjs`:

```js
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import test from 'node:test';

import { SITE_PAGES, readPage } from './helpers/site.mjs';

test('every relative page and asset reference exists', async () => {
  for (const page of SITE_PAGES) {
    const html = await readPage(page);
    const refs = [...html.matchAll(/(?:href|src)=["'](\.\/[^"'#?]+)["']/g)].map((match) => match[1]);
    for (const ref of refs) {
      const target = new URL(`../${ref.replace(/^\.\//, '')}`, import.meta.url);
      await assert.doesNotReject(access(target), `${page} references missing ${ref}`);
    }
  }
});

test('all pages load the shared module and contain no inline interaction handlers', async () => {
  for (const page of SITE_PAGES) {
    const html = await readPage(page);
    assert.match(html, /<script type="module" src="\.\/js\/site\.mjs"><\/script>/);
    assert.doesNotMatch(html, /\son(click|keydown|submit)=/i);
  }
});
```

- [ ] **Step 6: Finish mobile and container adaptation in CSS**

Add page breakpoints around 48rem and 70rem, plus component container queries. Verify:

- Header wraps without hiding navigation.
- Hero range rail changes from vertical desktop rail to two columns, then one column on very narrow screens.
- Evidence ledger changes from four columns to two, then one.
- System records change from four-column rows to a readable stacked structure.
- Experience and capability sections stack without overflow.
- Contact fields, status, and buttons remain full-width and touch friendly.
- No critical content uses `display: none` on mobile.

- [ ] **Step 7: Run all automated checks**

Run: `npm run check`

Expected: all tests and HTML validation pass.

- [ ] **Step 8: Commit theme, motion, and responsive behavior**

```bash
git add index.html contacts.html hobbies.html js/site.mjs css/app.css tests/theme.test.mjs tests/site-integrity.test.mjs
git commit -m "Add accessible themes and restrained motion"
```

---

### Task 7: Browser, Accessibility, SEO, and Performance Verification

**Files:**
- Modify only when verification finds a defect: `index.html`, `contacts.html`, `hobbies.html`, `css/app.css`, `js/site.mjs`, `tests/*.test.mjs`
- Create: `docs/verification/portfolio-redesign.md`

**Interfaces:**
- Consumes the complete static site from Tasks 1-6.
- Produces a concise verification record with commands, results, remaining limits, and local screenshot paths if retained.

- [ ] **Step 1: Run the full automated gate from a clean checkout state**

Run: `npm run check`

Expected: all Node tests pass and all three HTML documents validate.

- [ ] **Step 2: Start the site locally**

Run: `python3 -m http.server 4173 --bind 127.0.0.1`

Expected: the server remains available at `http://127.0.0.1:4173/`. Keep it in a dedicated terminal session for the remaining checks.

- [ ] **Step 3: Verify desktop and mobile layouts in the browser**

Inspect at these viewports:

- 1440x1000 desktop.
- 1024x768 tablet landscape.
- 768x1024 tablet portrait.
- 390x844 narrow mobile.
- 320x568 minimum supported mobile.

For each viewport, verify header wrapping, no horizontal overflow, readable line lengths, stable evidence rows, project disclosure, contact fields, and hobbies layout. Save representative homepage light, homepage dark, contact mobile, and hobbies mobile screenshots under a temporary QA directory, not the repository.

- [ ] **Step 4: Verify themes and first-paint behavior**

Test these cases with a fresh page load:

- No stored value + system light.
- No stored value + system dark.
- Stored light + system dark.
- Stored dark + system light.
- Local storage unavailable.

Expected: correct first paint, accurate button label and `aria-pressed`, no layout shift, and a persisted explicit click.

- [ ] **Step 5: Verify keyboard, reduced motion, and JavaScript fallback**

Keyboard through the whole site and verify skip link, navigation, theme toggle, project links, `details`, contact fields, and footer order. Emulate reduced motion and confirm entrances and smooth scrolling stop. Disable JavaScript and confirm all primary content, navigation, project links, direct contact links, and native Formspree submission remain available.

- [ ] **Step 6: Run Lighthouse for every page**

Run each command while the local server is running:

```bash
npx lighthouse http://127.0.0.1:4173/ --quiet --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/portfolio-home-lighthouse.json
npx lighthouse http://127.0.0.1:4173/contacts.html --quiet --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/portfolio-contact-lighthouse.json
npx lighthouse http://127.0.0.1:4173/hobbies.html --quiet --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/portfolio-hobbies-lighthouse.json
```

Read each report's category scores and homepage LCP/CLS/TBT. Expected: every page meets the global Lighthouse targets; homepage lab LCP <=2.5s and CLS <=0.1. Record that lab TBT is a proxy and does not prove field INP.

- [ ] **Step 7: Validate structured data and link destinations**

Use Google's Rich Results Test or Schema Markup Validator for the deployed-equivalent homepage HTML when available. Confirm ProfilePage parses without errors and matches visible content. Open each selected GitHub, LinkedIn, email, and Formspree destination once; do not submit the contact form during read-only verification.

- [ ] **Step 8: Fix any failed gate with a regression test first**

For every discovered defect:

1. Add or strengthen a focused Node test when the behavior is machine-checkable.
2. Run the focused test and see it fail.
3. Apply the smallest HTML, CSS, or JavaScript fix.
4. Run the focused test, `npm run check`, and the affected browser/Lighthouse check again.

Do not lower score thresholds or remove assertions to make a failure disappear.

- [ ] **Step 9: Write the verification record using only observed results**

Create `docs/verification/portfolio-redesign.md` after all checks finish. Include the exact `npm run check` test count; pass/fail results for the five named viewports, both themes, stored preference, unavailable storage, keyboard navigation, focus visibility, reduced motion, and the JavaScript fallback; the four Lighthouse category scores for each page; homepage LCP, CLS, and TBT; and the structured-data validator result. End with this exact limitation: “Lighthouse lab TBT does not prove field INP; field Core Web Vitals require real-user traffic.” Do not create or commit this record until every field can be populated from an observed result.

- [ ] **Step 10: Commit verified fixes and evidence**

```bash
git add index.html contacts.html hobbies.html css/app.css js/site.mjs tests docs/verification/portfolio-redesign.md
git commit -m "Verify portfolio accessibility and performance"
```

- [ ] **Step 11: Final clean-state check**

Run: `git status --short`

Expected: no uncommitted files other than intentionally untracked local QA artifacts outside the repository.
