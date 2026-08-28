# Portfolio Redesign Verification

Verified locally on 28 August 2026 from `feature/portfolio-redesign` using the static HTTP server at `http://127.0.0.1:4173/`.

## Automated checks

- `npm run check`: PASS, 34 Node tests and 3 validated HTML pages.
- Relative pages and local assets: PASS.
- NDA and résumé privacy assertions: PASS.
- Search metadata, canonicals, sitemap, robots, social image, and JSON-LD parsing: PASS.
- Theme logic: PASS for system fallback, stored preference, invalid preference, and unavailable storage.
- Contact enhancement: PASS for successful and failed Formspree responses. No real form submission was made.
- Reduced-motion CSS and partial-JavaScript reveal failsafe: PASS.

## Browser and responsive checks

- 1440×1000 desktop: PASS.
- 1024×768 tablet landscape: PASS.
- 768×1024 tablet portrait: PASS.
- 390×844 narrow mobile: PASS.
- 320×568 minimum mobile: PASS.
- No horizontal overflow was observed at any required viewport.
- Primary navigation remains visible at every viewport. Final mobile navigation and theme controls measure 44 CSS pixels high.
- Light/dark toggle: PASS. The explicit light choice persisted after reload, and the control label and `aria-pressed` state stayed accurate in both themes.
- Browser console warnings and errors: none observed.
- Semantic landmarks, heading order, labels, skip link, native `details`, direct contact links, and focus-visible CSS: PASS. The browser runtime did not advance focus when injecting Tab, so keyboard order was also checked from DOM order and Lighthouse rather than claimed as a manual hardware-keyboard run.
- JavaScript fallback: primary content and links remain in the source HTML; `.reveal` is visible without the pre-paint `.js` class; the Formspree form retains native POST behavior.
- Reduced motion: verified by automated CSS assertions. The browser runtime used for viewport testing did not expose motion-preference emulation.

Representative local screenshots:

- `/tmp/portfolio-qa/home-desktop-light.png`
- `/tmp/portfolio-qa/home-desktop-dark.png`
- `/tmp/portfolio-qa/home-mobile-final.png`
- `/tmp/portfolio-qa/contact-mobile.png`
- `/tmp/portfolio-qa/hobbies-mobile.png`

## Lighthouse

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 |
| Contact | 100 | 100 | 100 | 100 |
| Hobbies | 100 | 100 | 100 | 100 |

Homepage lab metrics from the final run:

- LCP: 1,210 ms
- CLS: 0
- TBT: 0 ms

The first homepage audit exposed a 0.324 CLS caused by web-font swaps. Preloading the two critical faces and using `font-display: optional` reduced the observed CLS to zero.

## Structured data and destinations

- Homepage `ProfilePage` and nested `Person` JSON-LD: parsed successfully in the local automated test and matched visible name, description, image, location, GitHub, and LinkedIn data.
- External rich-result validation: not run against the current public URL because the redesign has not been deployed yet.
- GitHub profile and the three selected repositories: HTTP 200.
- LinkedIn profile: automated request returned LinkedIn's bot-blocking 999 response; the canonical profile URL remains present in visible HTML and JSON-LD.
- Formspree endpoint: GET returned 405, the expected response for a POST-only form endpoint. No message was submitted.
- Email fallback: the visible `mailto:christiantroyandrada@gmail.com` link is present and validated in source.

## Technical audit

| Dimension | Score | Finding |
| --- | ---: | --- |
| Accessibility | 4/4 | Lighthouse 100, semantic HTML, labelled form, strong focus treatment, reduced-motion path |
| Performance | 4/4 | Static assets, local fonts, transform/opacity motion, zero TBT and CLS |
| Responsive design | 4/4 | Five required viewports pass without overflow; 44px navigation targets |
| Theming | 4/4 | Token-driven light/dark modes, pre-paint selection, persisted explicit choice |
| Anti-patterns | 4/4 | No gradient text, glass layer, accent side stripes, nested card grid, or hidden mobile navigation |
| **Total** | **20/20** | **Excellent** |

The audit initially found one P1 issue and three lower-severity issues: web-font CLS, undersized navigation targets, hidden content after a partial JavaScript failure, and an unnecessary glass-like header treatment. All four were fixed and rechecked. No P0-P3 release issue remains open.

Lighthouse lab TBT does not prove field INP; field Core Web Vitals require real-user traffic.
