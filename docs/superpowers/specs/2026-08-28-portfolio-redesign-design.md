# Portfolio Redesign Design

## Purpose

Redesign `ctaprojects.xyz` to present Christian Troy Andrada as a software engineer who builds and operates production systems. The site must establish seniority through evidence, show credible full-stack and DevOps range, and remain honest about areas that are still active learning.

The interface will use the approved **Measured Workbench** direction: a restrained technical dossier with squared geometry, precise rules, weathered material colours, direct writing, and minimal instrument-like motion.

## Goals

- Help engineering leaders understand Christian's judgment, ownership, and production experience.
- Let recruiters identify fit for full-stack software engineering and DevOps-adjacent roles quickly.
- Give potential clients confidence that Christian can own delivery beyond interface implementation.
- Replace generic skill lists with production outcomes and inspectable project evidence.
- Demonstrate adaptability without presenting experiments as equivalent to production depth.
- Improve crawlability, page metadata, structured data, link quality, and social sharing previews.
- Preserve a fast static architecture and meet explicit accessibility and performance targets.
- Align the homepage, contact page, and hobbies page under one visual system.

## Non-goals

- Rebuild the site in a frontend framework.
- Add a CMS, backend, contact-form service, analytics provider, or user account system.
- Claim senior DevOps specialization, SRE ownership, or production expertise in React or .NET.
- Publish confidential client details or material covered by an NDA.
- Present every public GitHub repository as portfolio-quality work.
- Add decorative 3D, glass effects, complex scroll choreography, or animation libraries.
- Copy the supplied résumé PDFs into the public repository without a separate decision to publish those files and the personal details they contain.

## Audience and positioning

The site serves three audiences:

1. Engineering leaders assessing a senior remote contributor.
2. Recruiters screening for full-stack or DevOps-adjacent roles.
3. Clients looking for dependable software delivery.

The unified positioning is:

> Software engineer who builds and operates production systems.

Full-stack engineering and DevOps are presented as connected parts of delivery, not separate identities. The site should show three levels of experience clearly:

- **Production depth:** Vue, TypeScript, JavaScript, Laravel, testing, web architecture, releases, and team delivery.
- **Hands-on operating range:** Node.js, PostgreSQL, Docker, Linux/VPS, GCP, CI/CD, nginx, Grafana, Prometheus, Rancher, and Istio configuration or troubleshooting.
- **Active expansion:** React, React Native, .NET, C#, and deeper platform engineering.

The brand personality is pragmatic, resourceful, and adaptive. The voice is grounded and useful. It avoids genius framing, inflated specialist claims, and “10x engineer” language.

## Source hierarchy and claim discipline

Public claims must be supported by at least one of the following:

- The supplied Full-stack CV.
- The supplied Cloud and DevOps CV.
- Public repository code, documentation, CI history, or releases.
- Existing public portfolio copy that remains accurate.

Repository evidence was reviewed through the authenticated GitHub account. The strongest current evidence is:

### Secure Chat System

The main crossover case study. It demonstrates three Node.js services, TypeScript, PostgreSQL, RabbitMQ, Socket.IO, Docker, nginx, GitHub Actions, Prometheus, Grafana provisioning, runbooks, security automation, frontend encryption work, and broad automated test coverage. The latest main CI and recurring security audit runs are successful.

### Pitaka

The strongest adaptability and architecture case study. It is explicitly a mock wallet with no real money or credentials. It demonstrates React Native learning, typed bridge contracts, integer-centavo money, an append-only ledger, fail-closed feature flags, architecture decision records, strict TypeScript, CI, and 215 tests across 20 suites. Its unverified device-transport gaps must remain visible rather than being edited out.

### AstroPipeline

The strongest automation and open-source delivery case study. It is a cross-platform Python CLI published to PyPI with resumable stages, preflight checks, configuration validation, automated tests, and release automation. The portfolio may use the professional display name “AstroPipeline,” while the repository link must make the actual repository destination clear.

### .NET Empowerment

Supporting evidence only. It is a working ASP.NET Core learning project with Minimal APIs, EF Core, SQLite, migrations, validation, and conflict handling. It must remain labelled as a work in progress and must not be positioned as production .NET experience.

### Projects to demote

Older coding assessments, course exercises, small React demos, and early Vue examples should not appear in the main showcase. They remain available through GitHub but do not compete with the stronger systems above.

## Information architecture

### Global navigation

A compact dossier-style header contains:

- Name and role.
- In-page links to Proof, Systems, Experience, and Range.
- Contact link.
- Accessible light/dark theme toggle.
- Availability status when accurate.

Navigation becomes a compact wrapping row on small screens. Critical destinations are never hidden behind JavaScript-only controls.

### Homepage

#### 1. Hero

- Label: `Pragmatic / Resourceful / Adaptive`.
- Primary heading: direct unified positioning in Christian's voice.
- Short paragraph describing production range and team impact.
- Primary CTA to selected systems.
- Secondary CTA to contact.
- Four-part range rail: Production depth, Full-stack range, Operate, Exploring honestly.

The hero avoids a résumé-summary wall and avoids a portrait dominating the page. The existing avatar may appear as a small identification element, not the main visual anchor.

#### 2. Evidence ledger

Four compact outcomes:

- 46 merged PRs during the Orkestra contract.
- 64 teammate PRs reviewed.
- 19 internal-tools pages migrated from a deprecated API client.
- Automated test coverage raised from 0% to 95% on owned microfrontends.

Each number includes a short qualifier so it cannot be mistaken for a broader claim.

#### 3. Selected systems

Three horizontal project records:

1. Secure Chat System: Build + Operate.
2. Pitaka: Architecture + Adaptation.
3. AstroPipeline: Automation + Shipping.

Each record contains a category, title, outcome-led summary, a small technology set, repository link, and progressive disclosure for supporting evidence. Project imagery is optional and subordinate to the evidence. If used, it must be locally hosted, optimized, dimensioned, and meaningful.

#### 4. Production history

A compact chronological record replaces company-logo cards:

- Orkestra, Software Engineer, 2026.
- Ascendion / Collabera Digital Philippines, Vue Developer, 2022-2026.
- Pylon International Trading Corporation, Web Developer, 2020-2022.

Each role exposes two or three selected outcomes. Detailed résumé copy is not duplicated wholesale.

#### 5. Operating range

A capability matrix replaces paginated technology badges:

- **Build:** interfaces, APIs, data-backed products.
- **Operate:** deployments, CI/CD, Linux, cloud, and monitoring.
- **Quality:** automated tests, reviews, documentation, and migration planning.
- **Explore:** React, .NET, platform engineering, and AI-assisted workflows.

The matrix distinguishes production use from projects and current study.

#### 6. AI-assisted development

A short section explains AI as a working method, not a personality claim. It should say that Christian uses Codex and Claude Code to close knowledge gaps and move faster while keeping architecture, security, verification, and accountability human-owned. This section uses one concrete example, such as shared developer tooling or learning a new backend stack.

#### 7. Closing CTA

Direct routes to email/contact, GitHub, and LinkedIn. Résumé downloads are excluded until the source PDFs and their personal details are explicitly approved for public hosting.

### Contact page

The contact page uses the same header, typography, palette, theme behavior, and footer. It keeps direct contact methods and avoids adding a backend form. If an existing client-side form remains, it must provide a clear fallback and cannot imply successful delivery without a real service.

### Hobbies page

The hobbies page becomes a lighter personal appendix. It supports the portfolio's human character without interrupting the hiring narrative. Astrophotography may connect naturally to the AstroPipeline project, but personal interests should not be repackaged as professional credentials.

## Visual system

### Concept

Measured Workbench uses the information structure of a technical dossier without copying the loud neo-brutalist portfolio pattern. Character comes from utility: labels, numbering, rules, dense proof, and direct state changes.

### Typography

- **Display:** Barlow Semi Condensed. Its public-signage character supports direct headings and compact labels.
- **Body:** Atkinson Hyperlegible Next. Its distinctive letterforms support long-form readability and accessibility.

Only required weights and formats are self-hosted. Headings use a fluid modular scale. Body text remains within approximately 65-75 characters per line. Uppercase is reserved for short labels and compact headings.

### Colour

Colours use OKLCH tokens rather than hex or HSL in production CSS.

Light reference palette:

- Weathered stone canvas.
- Slightly deeper stone section surfaces.
- Dark mineral ink.
- Muted oxide for rare emphasis and numbering.
- Subdued moss for status and positive state.
- Neutral rules tinted toward the material hue.

Dark palette:

- Deep mineral canvas, not pure black.
- Raised surfaces with small lightness differences rather than glow.
- Warm stone text, not pure white.
- Oxide and moss adjusted for contrast at lower chroma.

Accent colour follows the 60-30-10 principle by visual weight. It is not applied to every link, tag, or heading.

### Geometry and spacing

- One-pixel rules define structure.
- Corners are square or minimally rounded.
- Avoid card nesting and repeated rounded containers.
- Use a 4px spacing scale with semantic tokens.
- Desktop layouts use intentional asymmetry.
- Mobile layouts change structure rather than simply shrinking.
- Container queries handle project and capability components where useful; viewport breakpoints handle page composition.

### Prohibited patterns

- Gradient text.
- Accent side-stripe borders.
- Thick black outlines and hard neo-brutalist offset shadows.
- Neon-on-dark palettes.
- Glass cards, blur fields, glow borders, and decorative charts.
- Monospace typography as a shorthand for engineering.
- Generic same-size card grids.
- Large icon tiles above headings.

## Component contract

### Dossier header

Semantic `header` and `nav`, crawlable anchor links, visible keyboard focus, wrapping mobile layout, and a stable theme-control slot.

### Range rail

Four factual categories with a label and a compact value. It becomes a two-column grid below the hero on narrow screens.

### Evidence metric

A number, bounded label, and qualifier. Metrics never animate as counters because that adds motion without improving comprehension.

### System record

An actual link or an article containing actual links, never a clickable `div`. Hover changes surface tint and moves the directional arrow by no more than four pixels. Keyboard focus produces equivalent feedback.

### Experience record

Year, company and role, domain, and selected outcomes. Details may use native `details` and `summary` for progressive disclosure when that improves mobile scanning.

### Capability group

Category, concise capability statement, and optional evidence link. It does not display confidence percentages or arbitrary skill ratings.

### Theme toggle

A stable button with a visible icon and accessible name. It exposes its current state with `aria-pressed` or equivalent accurate semantics. The control remains in the same location and dimensions across themes.

## Theme behavior

1. Before first paint, a small inline script checks a stored explicit preference.
2. If no explicit preference exists, it uses `prefers-color-scheme`.
3. The theme is applied as a `data-theme` attribute on the document root.
4. An explicit toggle stores the selected light or dark value in local storage.
5. System changes update the page only while no explicit choice exists.
6. Storage access is guarded so private browsing or disabled storage does not break rendering.
7. The document declares compatible `color-scheme` values for native controls.
8. Theme changes animate colour only for a short interval and do not animate layout.

## Motion system

Motion should behave like an instrument panel: brief, direct, and finished.

### Page entrance

- One opening sequence after first render.
- Four grouped reveals at roughly 40-60ms intervals.
- Opacity and vertical transform only.
- Total sequence completes in approximately 600-750ms.
- Exponential or quintic ease-out, with no bounce or elastic overshoot.

### Interaction motion

- Primary actions move vertically by at most two pixels.
- Project arrows move horizontally by at most four pixels.
- Disclosure indicators rotate or translate to communicate state.
- Focus styles appear immediately rather than fading slowly.
- No continuous animation and no scroll-linked parallax.

### Scroll behavior

Most content renders statically. If section reveal is used, it runs once through one shared `IntersectionObserver`, affects only opacity and transform, and never hides content when JavaScript fails.

### Reduced motion

`prefers-reduced-motion: reduce` disables entrances, smooth scrolling, and non-essential transforms. State remains understandable without movement.

## Technical architecture

The implementation remains static:

- Semantic HTML pages.
- One shared CSS file organized into tokens, base styles, layout, components, utilities, motion, and responsive rules.
- One small shared JavaScript file for theme state, optional progressive disclosure, and minimal reveal behavior.
- No runtime framework, animation package, icon library, or client-side content rendering.

Critical content and links are in the original HTML response. JavaScript enhances rather than creates the portfolio.

External image dependencies currently hosted on Notion, third-party CDNs, or company sites should be removed where licensing permits. Project screenshots and personal assets are stored locally. Company logos are omitted from the redesigned homepage, which removes the weakest remote dependencies.

## SEO and discoverability

Each indexable page includes:

- Unique descriptive `title`.
- Accurate meta description.
- Self-referential canonical URL in HTML.
- Open Graph and Twitter metadata.
- Stable absolute social-preview image.
- Semantic heading hierarchy.
- Descriptive internal and external link text.
- Useful image alt text and explicit image dimensions.

The homepage includes truthful JSON-LD using `ProfilePage` with a `Person` main entity where applicable. Properties include name, description, image, role description, location at an appropriate public granularity, and `sameAs` links to GitHub and LinkedIn. Structured data must match visible page content.

The root `sitemap.xml` contains only preferred canonical URLs with accurate modification dates. `robots.txt` permits required assets and points to the sitemap. Structured data is validated before release, but rich-result appearance is never promised.

## Performance budget

Field targets at the 75th percentile:

- LCP at or below 2.5 seconds.
- INP at or below 200 milliseconds.
- CLS at or below 0.1.

Lab targets on mobile:

- Lighthouse Performance at least 95.
- Accessibility at least 95.
- Best Practices at least 95.
- SEO 100.

Implementation constraints:

- Self-host WOFF2 fonts and load only required faces.
- Preload only genuinely critical font or hero assets.
- Set image width and height or aspect ratio.
- Use responsive image sources where project imagery is retained.
- Keep non-critical images lazy-loaded.
- Avoid large inline SVG collections.
- Keep JavaScript small enough that it does not create meaningful main-thread blocking.
- Do not load third-party analytics or trackers in this scope.

## Accessibility

- Preserve skip navigation.
- Meet WCAG AA contrast for text and controls in both themes.
- Maintain visible focus states with a non-colour-only signal.
- Use native links, buttons, headings, lists, `details`, and landmarks.
- Ensure targets remain usable on touch screens.
- Preserve complete functionality on mobile.
- Honor reduced motion and system theme preference.
- Announce disclosure state accurately where native semantics do not already do so.
- Avoid duplicate link labels that point to different destinations without context.
- Keep body copy readable under zoom and increased text spacing.

## Failure and fallback behavior

- Without JavaScript, all primary content, project links, contact links, and navigation remain visible.
- If local storage is unavailable, theme uses system preference for the session.
- If web fonts fail, a carefully chosen fallback stack preserves layout without clipping.
- If project imagery fails, the system record retains its title, summary, and link without a broken empty frame.
- External links open safely and never carry private repository or NDA information.
- Contact methods do not display a false success state.
- Invalid or missing structured data never blocks page rendering.

## Testing and verification

### Automated

- Keep and extend the existing NDA privacy test.
- Test required title, description, canonical, Open Graph, and JSON-LD fields on every page.
- Parse JSON-LD and verify visible-content consistency for key properties.
- Check internal links and referenced local assets.
- Verify sitemap canonical URLs and robots sitemap declaration.
- Test theme initialization for stored light, stored dark, system light, system dark, and unavailable storage.
- Test that reduced-motion CSS exists and disables non-essential animation.
- Validate HTML with an appropriate standards checker.

### Browser verification

- Desktop, tablet, and narrow-mobile layouts.
- Keyboard-only navigation and focus order.
- Light and dark themes, including first-paint behavior.
- Reduced-motion mode.
- JavaScript-disabled content.
- Missing-image fallback.
- Project disclosure and external links.
- Console free from runtime errors.

### Quality gates

- Lighthouse target scores on the local production build or static server.
- No unresolved high-impact accessibility findings.
- No layout shift caused by fonts, images, theme initialization, or disclosure.
- No confidential information or private repository details introduced.
- Public project claims remain bounded by repository evidence and the supplied résumés.

## Expected implementation surface

- `index.html`: new homepage structure, content, metadata, and JSON-LD.
- `contacts.html`: shared visual system, metadata, and simplified contact behavior.
- `hobbies.html`: shared visual system and lighter personal appendix.
- `css/app.css`: rebuilt token and component system.
- `js/index.js`: shared theme and progressive-enhancement behavior.
- `img/`: optimized local assets and social preview.
- `robots.txt` and `sitemap.xml`: verified crawl configuration.
- `tests/`: expanded privacy, metadata, link, structured-data, and theme tests.
- Optional font asset directory for self-hosted WOFF2 files.

The static hosting and custom domain remain unchanged unless repository inspection during implementation reveals a required hosting adjustment.

## Release strategy

1. Implement and verify locally without changing the live site.
2. Review the complete local result across themes and breakpoints.
3. Run automated, accessibility, SEO, and performance checks.
4. Present the diff and visual evidence for approval.
5. Push or deploy only after explicit authorization.
