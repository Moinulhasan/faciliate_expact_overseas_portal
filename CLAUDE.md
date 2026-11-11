# CLAUDE.md — Facilitate Expat Overseas (Working Visa / Manpower) Redesign

> Read this whole file before writing code. It is the source of truth for design, motion, 3D, content and architecture of the **overseas.facilitatexpat.com** rebuild. When something here conflicts with a habit or a library default, this file wins. When something is missing, follow the *spirit* of §1 and ask before inventing new patterns.

---

## 0. TL;DR for Claude Code

- **What:** Rebuild `overseas.facilitatexpat.com` (working visa, job placement & manpower supply arm of Facilitate Expat) as a premium, fast, bilingual (EN / বাংলা) site with an online **Work-Abroad Application** and **Employer Manpower Request** flow.
- **Stack:** Laravel 12 + Inertia.js 2 + React 19 + TypeScript + Vite + Tailwind CSS v4. Port the existing React (Vite SPA) components into `resources/js`.
- **Motion stack — one owner per job:**
  - **Lenis** → smooth scroll (the only scroll engine).
  - **GSAP + ScrollTrigger (+ SplitText)** → scroll-driven timelines, pinning, scrubbing, text reveals.
  - **Motion (Framer Motion, `motion/react`)** → component state: hover, tap, layout, modals, tabs, form steps, page transitions.
  - **Three.js via React Three Fiber + drei** → one hero globe and one ambient shader background. Custom **GLSL** for both.
  - **Locomotive Scroll: do NOT install.** Locomotive v5 is itself built on Lenis; running both means two scroll engines fighting. Lenis + ScrollTrigger gives everything Locomotive did (smooth scroll, parallax via `data-speed`, in-view classes).
- **Brand:** Must look like a sibling of the main site `facilitatexpat.com` (Geist, deep forest green + sage, pill navigation) — **not** the current blue/purple template.
- **Non-negotiables:** LCP < 2.5 s on a mid-range Android over 4G, 3D is progressive enhancement only, `prefers-reduced-motion` fully respected, every page server-rendered (Inertia SSR) with its own `<title>` and meta.

---

## 1. Design principles (the "why")

1. **Trust before wow.** Our users are (a) Bangladeshi workers and their families deciding whether to hand over a passport and money, and (b) GCC/Asian/European employers deciding whether we can deliver 50 welders in 60 days. Every animation must make information *clearer* or the brand *more credible*. Decorative motion that delays reading is a bug.
2. **One idea per screen.** Large type, one message, one primary action. Long lists become filters, tabs or bento grids.
3. **Two audiences, two doors.** From the hero onward the site forks: **"I want to work abroad"** (candidate) and **"I need workers"** (employer). Each has its own CTA, copy tone and form.
4. **Honest numbers.** No "100% success rate". Use verifiable figures (licence number, years, workers deployed, countries) — see §6.3.
5. **Calm luxury.** Premium = whitespace, restraint, precise typography, slow eases, rich dark sections. Not gradients-everywhere, not glow-everything.
6. **Mobile-first, low-end-aware.** Most candidates browse on budget Android phones on mobile data. Desktop gets the cinematic version; phones get a fast, still-beautiful version.

---

## 2. Audit of the current site (what we are fixing)

Analysed live on 11 Nov 2026: `facilitatexpat.com` (main brand) and `overseas.facilitatexpat.com` (Home, Services, Industries, Countries ×21, About, Contact).

### 2.1 Brand & visual
| Issue | Evidence | Fix |
|---|---|---|
| Overseas site doesn't match parent brand | Main site: Geist, forest green `#0b1a12`-ish dark sections, sage `#f6f8f5` surfaces, green CTA pills, floating pill nav. Overseas: blue→purple gradient, system font, stock "travel desk" hero photo, rainbow icon circles | Adopt main-site tokens (§4) and extend them |
| Generic template look | Same card pattern (icon circle + 4 bullets + "Learn More") on every page | Bento grids, editorial layouts, real photography, varied rhythm |
| Country hero is a purple blob | `/country/japan` shows a large purple circle, no flag/imagery | Real flag (SVG), country skyline/industry photo, globe zoom-to-country |
| Iconography mixed colours | Blue/green/purple/orange icon bubbles | Single-weight line icons (lucide), one accent colour |

### 2.2 Content & credibility
| Issue | Fix |
|---|---|
| "100% Success Rate" in hero and "98% Visa Success Rate" elsewhere; main site FAQ answers "Can you guarantee approval?" honestly — contradiction | Remove guarantee language. Use "Workers deployed", "Employer partners", "Years licensed", "Avg. days to deployment" |
| Wrong positioning: overseas site leads with "Flight Booking / Travel Planning / Hotel" | Overseas site is about **work visas, recruitment & manpower supply**. Travel lives on main site; link to it |
| Only one testimonial ("Ahmed Rahman", business visa) | Worker stories (video/photo, trade, country, employer type) + employer logos/quotes (with permission) |
| No government licence / compliance info visible | Show recruiting licence (RL) number, BMET registration, BAIRA membership, office address, **in hero trust bar and footer** (owner to supply real numbers) |
| Country pages are templated filler ("Professional visa and travel services tailored for Japan" repeated in every card) | Structured country data (§6.2): in-demand trades, salary range, contract length, processing steps, documents, costs policy |
| Industries page: 16 industries but only tabs of 6 categories with long text | Filterable bento of 16 industries with roles, certifications, deployable headcount |
| Contact hours say "Mon–Fri 9–6" and "24/7 support" and "Saturday 10–4" | Single source of truth for hours (Bangladesh week: Sat–Thu) + WhatsApp as 7-day channel |
| No Bangla | Full EN/বাংলা toggle; candidate-side copy written for Bangla first |

### 2.3 UX & flows
- No real application flow — only "Get Started", "Get Visa Quote", "Contact Us Now" all going to generic contact.
- No way to see **current job openings / demand**.
- Mega "Countries" dropdown with 21 flat items — no grouping.
- Contact form: name/email/phone/message only — useless for qualifying a candidate or an employer request.
- No WhatsApp entry point (main site has one; overseas does not).

### 2.4 Technical / SEO
- Client-only Vite SPA (`/assets/index-*.js`, `#root`) — **every route has the same `<title>`** ("Facilitate Expat Overseas Limited - Visa Services & Job Placement | Bangladesh"). Country pages are invisible to search as distinct pages.
- Large background JPGs with blue overlays; no `srcset`/AVIF.
- Fix: Inertia SSR, per-page `<Head>`, JSON-LD (Organization, EmploymentAgency, JobPosting, FAQPage, BreadcrumbList), sitemap, hreflang for `en`/`bn`.

---

## 3. Information architecture

```
/                         Home (both audiences)
/work-abroad              Candidate hub: how it works, costs policy, documents, FAQ
/jobs                     Job openings board (filter: country, trade, salary, gender, deadline)
/jobs/{slug}              Job detail + Apply
/apply                    Work-Abroad Application wizard (multi-step)
/apply/track              Track application (ref no. + phone OTP)
/employers                Employer hub: why us, process, SLAs, compliance
/employers/request        Manpower Request wizard
/industries               16 industries bento + filter
/industries/{slug}        Industry detail: roles, certifications, deployable headcount
/countries                Destinations by region (GCC · East Asia · SE Asia · Europe)
/countries/{slug}         Country detail
/about                    Story, licence & compliance, team, office
/contact                  Contact, map, hours, WhatsApp
/bn/...                   Bangla mirror of every route
```

Primary nav (floating pill, mirrors main site): **Jobs · Work abroad · Employers · Industries · Countries · About** · [WhatsApp icon] · **[Apply now]** (primary) · language toggle `EN | বাং`.

Old URLs must 301: `/services → /work-abroad`, `/industries` stays, `/country/{slug} → /countries/{slug}`, `/about-us → /about`.

---

## 4. Design system

> **Override (11 Nov 2026, owner direction):** fonts and everything visual must match `facilitatexpat.com` exactly. The live tokens measured from its `:root` are in `resources/css/tokens.css` and win over §4.1–4.3 below: **Geist only** (400/500/600 — no Instrument Serif, no Geist Mono); h1 62px/600/-0.035em, h2 40px/600/-0.025em, h3 17px/600; headline highlight = green gradient text (`#73BF44 → #A6DB80`), not serif italic; brand `#1C7949`, night `#06120D`, line `#DCE6DA`, alt section `#EDF3EC`; `.card` = white, 1px line, 24px radius, pointer-following glow, brand border + shadow on hover; CTA = 135° `#1F8550 → #155C37` gradient pill with green shadow.

### 4.1 Colour tokens (extend the main site)

```css
/* resources/css/tokens.css — Tailwind v4 @theme */
@theme {
  /* Forest (dark surfaces) */
  --color-forest-950: #04100a;
  --color-forest-900: #071a10;   /* main dark section bg */
  --color-forest-800: #0c2619;
  --color-forest-700: #12392a;

  /* Brand green (CTA) — matches main site pill buttons */
  --color-brand-600: #1f7a4c;
  --color-brand-500: #26925b;
  --color-brand-400: #3fb174;

  /* Lime accent — from the logo; use sparingly (≤ 5% of any screen) */
  --color-lime-400: #a6e35c;
  --color-lime-300: #c3f08a;

  /* Sage (light surfaces) */
  --color-sage-50:  #f6f8f5;     /* measured main-site body bg */
  --color-sage-100: #eef5f0;
  --color-sage-200: #dfe9e2;

  /* Ink */
  --color-ink-900: #0f1a14;
  --color-ink-600: #4a5a51;
  --color-ink-400: #7d8b83;

  /* Warm premium neutral for editorial blocks */
  --color-sand-100: #f2eee6;

  --color-danger: #c2410c;
  --color-warning: #b45309;
}
```

Rules: dark sections = `forest-900` with a subtle radial `brand-600/15` glow top-right (like main site's air-ticket section). Light sections alternate `sage-50` / white. Text on dark: `#eef5f0` and `#eef5f0/65`. Accent lime only for: active dot, the Dhaka node on the globe, a highlighted word in headlines, progress bars.

### 4.2 Typography
- **Geist** (UI, body, headings) — same as main site. `font-feature-settings: "ss01", "cv11"`.
- **Instrument Serif Italic** — *only* for 1–2 emphasis words in display headlines ("Work abroad, *with people you can trust*."). This is the premium/unique signature.
- **Geist Mono** — numbers, reference IDs, route codes (DAC → RUH), timestamps.
- **Hind Siliguri** (or Noto Sans Bengali) for `lang="bn"`; line-height +0.15 vs English.

Scale (fluid, `clamp`):
| Token | Size | Use |
|---|---|---|
| display | clamp(2.75rem, 6vw, 5.5rem) / 0.95 / -0.035em | hero |
| h1 | clamp(2.25rem, 4.5vw, 4rem) / 1.0 / -0.03em | page titles |
| h2 | clamp(1.75rem, 3vw, 2.75rem) / 1.05 / -0.02em | sections |
| h3 | 1.25rem / 1.3 / -0.01em | cards |
| body-lg | 1.125rem / 1.6 | lead |
| body | 1rem / 1.6 | |
| small | 0.875rem / 1.5 | meta |
| mono-xs | 0.75rem / 1.4 / 0.04em uppercase | eyebrows |

Max reading width: 62ch. Never centre-align more than 3 lines.

### 4.3 Space, radius, elevation
- 4-pt grid; section padding `py-24 md:py-32 lg:py-40`.
- Container: `max-w-[1240px] px-5 md:px-8`.
- Radius: cards `24px`, inputs `14px`, pills `999px`.
- Shadows are soft and green-tinted: `0 1px 0 rgba(255,255,255,.6) inset, 0 20px 40px -24px rgba(7,26,16,.25)`.
- Dark cards: `bg-white/[0.03] border border-white/[0.08] backdrop-blur-md`.

### 4.4 Components (build in `resources/js/Components/ui`)
`Button` (primary/secondary/ghost/whatsapp, sizes), `Pill`, `Badge` (status: Open / Closing soon / Filled), `Card`, `BentoCard`, `StatCounter`, `FlagIcon` (`flag-icons` SVG), `CountryChip`, `RouteCode` (DAC → DOH), `Tabs` (Motion `layoutId` underline), `Accordion`, `Stepper`, `FileDrop`, `PhoneInput` (+880 default), `Select`/`Combobox` (Radix/shadcn), `Toast`, `Sheet` (mobile nav), `Marquee`, `MagneticButton`, `SplitHeading`, `Section`, `Eyebrow`.

Use **shadcn/ui (Radix)** primitives restyled to tokens for accessibility. Icons: **lucide-react**, stroke 1.5.

---

## 5. Motion & 3D system

### 5.1 Ownership matrix (read twice)

| Concern | Owner | Never use for it |
|---|---|---|
| Page scrolling, inertia, anchor scroll | **Lenis** | native `scroll-behavior: smooth`, Locomotive |
| Anything tied to scroll position (pin, scrub, parallax, progress, reveal-on-enter timelines) | **GSAP ScrollTrigger** | Motion `useScroll` (except tiny local progress bars) |
| Headline character/line reveals | **GSAP SplitText** | manual span splitting |
| Hover, press, focus, toggles, tabs, accordions, modals, drawers, form step transitions, list re-ordering, route transitions | **Motion** (`motion/react`) | GSAP |
| 3D scene, globe, shader backgrounds | **R3F + drei + custom GLSL** | CSS 3D hacks |
| Counters | GSAP (triggered by ScrollTrigger) | |

### 5.2 Global motion tokens
```ts
// resources/js/lib/motion.ts
export const ease = {
  out: [0.22, 1, 0.36, 1],        // "expo-ish" — default
  inOut: [0.65, 0, 0.35, 1],
  spring: { type: "spring", stiffness: 260, damping: 28, mass: 0.9 },
} as const;
export const dur = { xs: 0.15, sm: 0.25, md: 0.45, lg: 0.8, xl: 1.2 };
export const gsapEase = { out: "expo.out", inOut: "power3.inOut", soft: "power2.out" };
```
Durations: micro 150–250 ms, UI 300–450 ms, scroll reveals 0.8–1.2 s, never > 1.4 s. Stagger 0.04–0.08 s.

### 5.3 Lenis + GSAP wiring (single RAF)
```tsx
// resources/js/providers/SmoothScroll.tsx
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) return;                       // native scroll for reduced motion
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as any).__lenis = lenis;           // for anchor links & Inertia nav
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, [reduced]);
  return <>{children}</>;
}
```
- On Inertia `navigate` event: `lenis.scrollTo(0, { immediate: true })` then `ScrollTrigger.refresh()`.
- Modals/drawers: `lenis.stop()` on open, `lenis.start()` on close; add `data-lenis-prevent` to scrollable inner panels (job filters, select menus).
- `syncTouch: false` → phones keep native momentum (better feel + battery).
- Always use `useGSAP()` from `@gsap/react` for scoped cleanup; never raw `useEffect` with GSAP.

### 5.4 Reduced motion & capability tiers
```ts
// resources/js/lib/capability.ts
export type Tier = "full" | "lite" | "static";
export function getTier(): Tier {
  if (typeof window === "undefined") return "static";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = (navigator as any).connection?.saveData;
  const mem = (navigator as any).deviceMemory;          // Chromium-only: undefined ≠ low-end
  const cores = navigator.hardwareConcurrency ?? 8;
  const webgl = !!document.createElement("canvas").getContext("webgl2");
  if (reduced || saveData || !webgl) return "static";
  if ((mem !== undefined && mem < 4) || cores <= 4 || innerWidth < 768) return "lite";
  return "full";
}
```
- Server and first client render are always `"static"`; upgrade in an effect (`useTier`) to avoid hydration mismatch.
- **full:** Lenis, all ScrollTrigger scenes, 3D globe (DPR ≤ 2), shader bg.
- **lite:** Lenis off on touch, simpler reveals (opacity/translate only, no pin-heavy scenes), globe replaced by a pre-rendered looping **WebM/AVIF poster** or a 2D SVG route map, shader bg off.
- **static:** no smooth scroll, no scrub/pin, content visible immediately, static images.

### 5.5 Signature moments (where the budget goes)

**M1 — Hero "Dhaka to the world" globe (R3F + GLSL)**
- Dotted Earth: instanced points sampled from a land-mask texture (`/textures/earth-landmask.png`, 2048×1024). Custom shader: points fade at the limb (fresnel), subtle breathing.
- **Dhaka node** (23.81°N, 90.41°E) in `lime-400` with pulse ring.
- **Arcs** to every active destination (Saudi Arabia, UAE, Qatar, Kuwait, Japan, Singapore, South Korea, Malaysia, Italy, Poland, Czech Republic, Hungary, Slovakia, Croatia, Bulgaria, Romania, Moldova, Serbia, North Macedonia, Belarus, Albania). Quadratic bezier tubes; a dash travelling along each arc via `uProgress` in the fragment shader.
- Interaction: slow auto-rotation; pointer parallax ±6°; hovering a country chip under the hero highlights its arc and rotates the globe to it (GSAP tween on `rotation.y`).
- Scroll: as the hero leaves, ScrollTrigger scrubs globe scale 1 → 0.6 and moves it right, handing off to the "Destinations" section.
- Lazy: `const Globe = lazy(() => import("@/three/Globe"))` mounted only on client and only for tier `full`; hero text and CTAs render instantly as HTML (they are the LCP, not the canvas).
- `frameloop="demand"` when off-screen (IntersectionObserver), `dpr={[1, 1.75]}`, `<AdaptiveDpr pixelated />`, `<PerformanceMonitor>` to drop to lite on FPS < 45.

Fragment shader for the travelling arc:
```glsl
// resources/js/three/shaders/arc.frag
uniform float uTime;
uniform float uSpeed;
uniform vec3  uColor;
uniform float uHighlight;   // 0..1 when hovered
varying float vU;           // 0..1 along the arc (from vertex shader)

void main() {
  float head = fract(uTime * uSpeed);
  float d = vU - head;
  float trail = smoothstep(-0.25, 0.0, d) * (1.0 - smoothstep(0.0, 0.02, d));
  float base = 0.12 + 0.35 * uHighlight;
  float a = max(base, trail);
  gl_FragColor = vec4(uColor, a);
}
```

Globe points vertex/fragment (sketch):
```glsl
// points.vert
uniform float uTime; uniform float uSize;
attribute float aRand;
varying float vFresnel;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec3 n = normalize(normalMatrix * normalize(position));
  vFresnel = pow(1.0 - abs(dot(n, vec3(0.0, 0.0, 1.0))), 2.0);
  float breathe = 0.85 + 0.15 * sin(uTime * 1.2 + aRand * 6.2831);
  gl_PointSize = uSize * breathe * (300.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
// points.frag
uniform vec3 uColor; varying float vFresnel;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  if (dot(c, c) > 0.25) discard;
  float alpha = mix(0.9, 0.15, vFresnel);
  gl_FragColor = vec4(uColor, alpha);
}
```

**M2 — Ambient "aurora grain" shader background** (dark sections only, full tier)
Full-screen plane, simplex-noise flow field in `forest-900 → brand-600 → forest-950`, film grain, very low contrast. Reacts weakly to scroll velocity (Lenis `velocity` → `uVelocity`). One shared canvas behind dark sections, toggled visible by ScrollTrigger (`onToggle`) — never one canvas per section.
```glsl
// aurora.frag (sketch)
uniform float uTime, uVelocity; uniform vec2 uRes;
uniform vec3 uA, uB, uC; varying vec2 vUv;
float snoise(vec3 v); // include ashima simplex
float grain(vec2 uv){ return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453); }
void main(){
  vec2 uv = vUv; uv.x *= uRes.x / uRes.y;
  float n = snoise(vec3(uv * 1.4, uTime * 0.04 + uVelocity * 0.02));
  float m = smoothstep(-0.4, 0.8, n);
  vec3 col = mix(uA, uB, m * 0.35);
  col = mix(col, uC, smoothstep(0.6, 1.0, uv.y) * 0.5);
  col += (grain(vUv * uRes + uTime) - 0.5) * 0.035;
  gl_FragColor = vec4(col, 1.0);
}
```

**M3 — "Your journey" pinned horizontal process (GSAP)**
7 steps, the real recruitment pipeline: **1 Apply & screening → 2 Trade test / interview → 3 Medical (GAMCA where applicable) → 4 Visa & work permit → 5 BMET clearance & smart card → 6 Pre-departure briefing & ticket → 7 Arrival & aftercare.**
Desktop: section pins, cards translate horizontally with `scrub: 0.6`, a lime progress line draws (`scaleX`), each step's icon morphs on activation. Mobile/lite: vertical timeline with simple reveals (no pin).

**M4 — Split-text headlines (GSAP SplitText)**
`SplitHeading` component: split to lines + words, masked lines, `yPercent: 110 → 0`, stagger 0.06, `expo.out`, 1.0 s, trigger `top 85%`. The serif-italic word gets an extra subtle `skewX` settle. Runs once. Respect reduced motion (render final state).

**M5 — Bento hover & magnetic CTAs (Motion)**
Industry bento cards: `whileHover={{ y: -4 }}`, inner image `scale 1.04`, role list reveals with `AnimatePresence`. Primary CTAs use `MagneticButton` (pointer-follow ±6px, spring). Disabled on touch.

**M6 — Counters & marquee**
Stat counters tween with GSAP on enter (`snap: 1`, Geist Mono, tabular-nums). Employer/airline/partner logo marquee — CSS transform loop, pauses on hover and for reduced motion.

**M7 — Page transitions (Motion + Inertia)**
`AnimatePresence mode="wait"` around the Inertia page: outgoing fades/translates 8px, incoming rises 12px, 350 ms. A thin lime top progress bar during Inertia visits (`router.on('start'|'finish')`).

### 5.6 Things we will NOT do
- No cursor-replacement custom cursor (hurts usability for our audience). A subtle hover-state dot on desktop CTAs is fine.
- No scroll-jacking on forms, job board or legal text.
- No auto-playing sound. No parallax on body text.
- No more than **one** WebGL context visible at a time.

---

## 6. Content model

### 6.1 Home page — section by section
1. **Hero (dark, globe)** — Eyebrow: `Licensed overseas employment · RL-XXXX` (real number from owner). Display: "Work abroad, *with people you can trust.*" Lead: "Verified jobs in 20+ countries. Clear costs, documents checked twice, and one advisor from application to arrival." Two doors: **[Find a job abroad]** (primary) · **[Hire workers from Bangladesh]** (secondary). Under it: destination chips (flags) that drive the globe.
2. **Trust bar** — licence, BMET, BAIRA, years licensed, workers deployed, employer partners (owner supplies real figures). Mono numbers, counters.
3. **Audience fork** — two large split cards (Motion layout): Candidate vs Employer, each with 3 bullets and CTA.
4. **Live openings** — 6 latest jobs from DB: country flag, trade, salary range (in local currency + ≈ BDT), contract, gender, deadline badge. "See all jobs →".
5. **Journey** — M3 pinned process.
6. **Industries** — bento of 16 (top 8 shown) with deployable headcount.
7. **Destinations** — region tabs (GCC / East & SE Asia / Europe) + mini map; country cards with processing time and top trades.
8. **Costs & honesty block** (sand bg, editorial) — "What you pay, and what you never pay" (owner/legal to confirm policy), warning about brokers (*dalal*), how to verify a job/visa.
9. **Stories** — worker video testimonials (consented), employer quotes.
10. **FAQ** — accordion, `FAQPage` JSON-LD.
11. **Final CTA (dark, aurora shader)** — Apply / Request workers / WhatsApp.
12. **Footer** — address (18/3 Naya Paltan, Level-04/B, Mashjid Goli, Dhaka-1000), hours (one source), licence numbers, links, language toggle, link back to main site for visit visas & air tickets.

### 6.2 Country data (DB-driven, no filler copy)
```
countries: id, slug, name_en, name_bn, iso2, region (gcc|east_asia|se_asia|europe),
  lat, lng, hero_image, processing_days_min, processing_days_max,
  contract_months_typical, currency, intro_en, intro_bn,
  requirements (json: [{label_en,label_bn}]), steps (json),
  top_trades (json), is_active, sort
```
Country page layout: hero with flag + photo + globe zoom; key facts strip (processing time, typical contract, currency, visa type); "In-demand trades" chips with salary bands; "Open jobs in {country}" list; process steps specific to that country; document checklist (interactive tick list like main site's "Find your document list in 10 seconds"); FAQ; CTA.

### 6.3 Stats — allowed vs banned
- ✅ Years licensed, workers deployed (cumulative), active employer partners, countries, average days to deployment, rating from verified reviews.
- ❌ "100% success", "guaranteed visa", "24/7" unless staffed.
- Every stat lives in `config/site.php` (or a `settings` table) — single source.

### 6.4 Bilingual
- `lang/en/*.php`, `lang/bn/*.php`; DB fields `_en`/`_bn`. Inertia shares `locale` + translations for the page.
- Candidate copy: plain, short sentences, Bangla-first review. Employer copy: English-first, formal.
- Numbers: use Bangla digits in `bn` locale for prose, keep Latin digits in forms/IDs.

---

## 7. Key flows

### 7.1 Work-Abroad Application (`/apply`) — candidate
Multi-step wizard, Motion `AnimatePresence` slide between steps, progress `Stepper`, autosave draft (server-side, keyed by phone after OTP).
1. **Phone + OTP** (BD number, +880) — low friction, no password.
2. **About you** — full name (as passport), DOB, gender, district (searchable), passport number + expiry (inline warning if validity is under the destination's minimum, typically 6 months), photo.
3. **Work** — trade (combobox from industries/roles), years of experience, previous abroad experience (country, years), languages, certifications (upload).
4. **Preferences** — preferred countries (multi, flags), minimum salary, available from.
5. **Documents** — `FileDrop` for passport scan, CV, certificates; client-side compression for images; max sizes shown.
6. **Review & consent** — summary cards with edit links; consent checkbox (data use, no fee for application); submit.
7. **Success** — reference number (mono, copyable), WhatsApp "Save this number", what happens next (3 steps), track link.

UX rules: one column, 56 px touch targets, numeric keyboards (`inputMode`), inline validation on blur, errors in plain language (EN/BN), never lose input on back.

### 7.2 Manpower Request (`/employers/request`) — employer
Company, country, contact person, email/WhatsApp; positions (repeatable rows: trade, qty, salary, contract, gender, start date); accommodation/food/transport provided; attach demand letter (optional); submit → confirmation + PDF summary emailed.

### 7.3 Job board (`/jobs`)
Filters in a left rail (desktop) / bottom sheet (mobile): country, industry, salary range, gender, deadline. URL-synced query params (Inertia partial reloads `only: ['jobs']`). Motion `layout` on result list for smooth filtering. `JobPosting` JSON-LD on detail pages.

### 7.4 Track application (`/apply/track`)
Ref no. + phone OTP → status timeline (the same 7 journey steps) with dates. Read-only.

---

## 8. Architecture (Laravel + Inertia + React)

### 8.1 Packages
```bash
composer require inertiajs/inertia-laravel tightenco/ziggy spatie/laravel-sitemap spatie/laravel-medialibrary spatie/laravel-translatable
npm i react react-dom @inertiajs/react typescript
npm i -D @vitejs/plugin-react tailwindcss @tailwindcss/vite
npm i gsap @gsap/react lenis motion
npm i three @react-three/fiber @react-three/drei @types/three
npm i lucide-react flag-icons clsx tailwind-merge class-variance-authority
npm i react-hook-form zod @hookform/resolvers
npm i -D vite-plugin-glsl
```
Pin exact versions in `package.json` after install. GSAP (incl. SplitText, ScrollTrigger) is free for commercial use — import plugins from `gsap/*`. React 19 ⇒ `@react-three/fiber@9` + `@react-three/drei@10`.

### 8.2 Folder structure
```
app/
  Http/Controllers/{HomeController,JobController,ApplicationController,EmployerRequestController,CountryController,IndustryController,PageController}.php
  Http/Requests/{StoreApplicationRequest,StoreManpowerRequest}.php
  Models/{Country,Industry,Role,JobOpening,Application,ApplicationDocument,ManpowerRequest,Testimonial,Faq,Setting}.php
  Services/{OtpService,ApplicationReferenceGenerator}.php
resources/
  css/{app.css,tokens.css}
  js/
    app.tsx  ssr.tsx
    Layouts/{SiteLayout.tsx, WizardLayout.tsx}
    Pages/{Home,WorkAbroad,Employers,About,Contact}.tsx
    Pages/Jobs/{Index,Show}.tsx
    Pages/Apply/{Wizard,Success,Track}.tsx
    Pages/Employers/Request.tsx
    Pages/Countries/{Index,Show}.tsx
    Pages/Industries/{Index,Show}.tsx
    Components/ui/*            (design-system primitives)
    Components/sections/*      (Hero, TrustBar, AudienceFork, Journey, IndustryBento, Destinations, Stories, Faq, FinalCta, Footer, Nav)
    Components/motion/*        (SplitHeading, Reveal, MagneticButton, Counter, Marquee, PageTransition)
    three/
      Globe.tsx  Arcs.tsx  DhakaNode.tsx  AuroraBackground.tsx  geo.ts
      shaders/{points.vert,points.frag,arc.vert,arc.frag,aurora.frag,noise.glsl}
    providers/{SmoothScroll.tsx, CapabilityProvider.tsx}
    hooks/{usePrefersReducedMotion.ts,useTier.ts,useLocale.ts}
    lib/{motion.ts,capability.ts,cn.ts,format.ts}
    types/*.d.ts
public/textures/earth-landmask.png
lang/{en,bn}/*.php
```

### 8.3 Migration from the existing React SPA
1. Copy existing components into `resources/js/Components/legacy/` — do **not** mix them into the new design system; port each section by rewriting against new tokens.
2. Replace `react-router` `<Link>`/`useNavigate` with Inertia `<Link>` / `router.visit`; route names via Ziggy `route()`.
3. Move hard-coded data (countries, industries, services, testimonials) into seeders → DB → passed as Inertia props.
4. Replace client fetches with controller props / partial reloads.
5. Add `<Head>` per page; remove the global static `<title>`.
6. Enable Inertia SSR (`php artisan inertia:start-ssr`, supervisor in prod). Three.js / Lenis / GSAP must be client-only: guard with `typeof window !== 'undefined'` and lazy imports inside `useEffect`/`lazy()`.

### 8.4 Backend essentials
- `ApplicationController@store`: validate (FormRequest), store docs on private disk (S3 or local `storage/app/private`), generate ref `FEO-2026-000123`, queue notifications (SMS/WhatsApp/email to candidate, email to ops).
- OTP via SMS gateway (BD provider) — rate limit `throttle:5,1` per phone + IP.
- Admin: Filament 3 panel for jobs, countries, industries, applications (status pipeline matching the 7 journey steps), manpower requests, testimonials, FAQs, settings.
- Privacy: passport & documents never publicly accessible; signed temporary URLs for admin viewing; delete drafts after 30 days.

### 8.5 SEO
- Per-page title pattern: `{Page} — Facilitate Expat Overseas`.
- JSON-LD: `EmploymentAgency` (with address, licence as `identifier`), `JobPosting`, `FAQPage`, `BreadcrumbList`.
- `hreflang` en/bn, sitemap (spatie), OG images per country (generated).

---

## 9. Performance budget (CI-enforced with Lighthouse CI)

| Metric | Mobile target |
|---|---|
| LCP | < 2.5 s (hero text is LCP; canvas never blocks it) |
| INP | < 200 ms |
| CLS | < 0.05 |
| Initial JS (gzip) | < 170 KB before 3D; three/R3F chunk < 250 KB loaded only on tier `full` after `requestIdleCallback` |
| Images | AVIF/WebP, `srcset`, `loading="lazy"` below fold, explicit width/height |
| Fonts | self-host Geist + subset Bangla, `font-display: swap`, preload Geist 400/600 only |

Other rules: `ScrollTrigger.config({ ignoreMobileResize: true })`; kill/revert all GSAP contexts on unmount; animate only `transform`/`opacity`; `will-change` only during the animation; dispose geometries/materials/textures in R3F cleanup.

---

## 10. Accessibility
- WCAG 2.2 AA. Contrast check every token pair (lime on forest for text only at ≥ 18 px bold).
- All interactive pieces keyboard reachable; visible focus ring `2px lime-400 offset-2`.
- `prefers-reduced-motion`: Lenis off, SplitText off, no pin/scrub, globe replaced by static image, Motion `MotionConfig reducedMotion="user"`.
- Canvas is `aria-hidden`; any info shown in 3D (destination list) is also in HTML.
- Forms: labels always visible, `aria-describedby` for errors, error summary on submit.
- `lang` attribute switches with locale (Bangla screen readers).

---

## 11. Build plan (do in order, one PR per phase)

1. **Foundation** — Laravel 12 + Inertia + React TS + Tailwind v4, tokens, fonts, `SiteLayout`, Nav, Footer, `SmoothScroll`, capability tiers, SSR running.
2. **Design system** — `Components/ui` + Storybook-lite page `/dev/ui` (local only).
3. **Data** — migrations, models, seeders from current site content (21 countries, 16 industries), Filament admin.
4. **Home (static tier first)** — all sections working with no animation, real content, responsive.
5. **Motion layer** — SplitHeading, reveals, counters, Journey pin, bento hovers, page transitions.
6. **3D layer** — Globe + arcs + Dhaka node, then Aurora background; tier gating + PerformanceMonitor.
7. **Countries & Industries** pages.
8. **Jobs board + Job detail.**
9. **Application wizard + OTP + tracking.**
10. **Employer request.**
11. **Bangla localisation pass.**
12. **SEO, redirects, sitemap, JSON-LD, Lighthouse CI, a11y audit (axe), cross-device QA** (low-end Android Chrome, iOS Safari, desktop Chrome/Firefox/Safari).

Definition of done per page: works with JS disabled for content (SSR), passes axe, meets §9 on mobile, reduced-motion verified, EN + BN copy present.

---

## 12. Coding conventions
- TypeScript strict. Function components, named exports. Props typed; no `any` except the documented navigator shims.
- Tailwind classes via `cn()`; variants via `cva`. No inline styles except CSS variables for animation.
- One GSAP `useGSAP` scope per section component, selectors scoped to a `ref`.
- Shaders in `.glsl/.vert/.frag` files via `vite-plugin-glsl`, uniforms typed.
- Content strings never hard-coded in components — use `t('key')` or DB props.
- Commits: conventional (`feat(home): journey pinned scene`).

---

## 13. Open questions for the owner (do not guess — leave TODOs)
- Recruiting licence (RL) number, BMET/BAIRA registration details, years licensed.
- Real stats: workers deployed, employer partners, average days to deployment.
- Fee/cost policy wording (legal review).
- Real testimonials (with written consent) and employer logos allowed for display.
- SMS/OTP provider and WhatsApp Business number.
- Office hours (one final version) and whether Saturday is open.
- Photography: own office/team/deployed-worker photos preferred over stock.
