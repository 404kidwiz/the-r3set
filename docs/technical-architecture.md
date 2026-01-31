# technical-architecture.md
# THE R3SET — Technical Architecture (Frontend-First, Motion-Controlled)

## 1) Stack
Frontend:
- Next.js (App Router) + TypeScript
- Tailwind CSS + CSS variables (tokens)
Motion:
- GSAP + ScrollTrigger (lazy-load)
- Optional Lenis smooth scrolling (must respect reduced motion and not break accessibility)
Media:
- 6 interstitial MP4 clips (scroll-scrub)
- Full trailer in modal (HLS recommended via video host; MP4 fallback)

Commerce:
- Shopify Headless (recommended) OR Stripe Checkout (simpler)
Content:
- Phase 1: local /content JSON
- Phase 2: headless CMS (Sanity/Contentful)

Hosting:
- Vercel + CDN
Analytics:
- GA4/PostHog + Sentry

## 2) Core UX Architecture: Clip Chapters + Editorial Sections
The page is a sequence of:
[ClipChapter] -> [EditorialSection] -> [ClipChapter] -> ...

Hard rule:
- The editorial sections must feel calm and readable.
- The chapter clips are the only full-bleed “cinematic interruptions”.

## 3) Implementation Details

### 3.1 Minimal Auto-hide Nav
Behavior:
- On scroll down: nav translates up out of view
- On scroll up: nav slides back in
- On top of page: nav visible
Implementation:
- Track scrollY and delta
- Debounce thresholds to avoid jitter
- Use CSS transform for performance

Accessibility:
- Nav must remain keyboard reachable
- Provide “Skip to content” link

### 3.2 One Accent Color Enforcement
Implementation:
- Define --accent token in globals.css
- Provide Tailwind utilities mapped to accent usage
- Enforce by convention:
  - Only allow accent classes in CTA components + Tag component
Optional enforcement:
- lint rule / codemod check for accent class usage outside components

### 3.3 Scroll-Scrub ClipChapter Component
Structure:
- Wrapper: ~220vh
- Sticky video container: 100vh
- video: muted, playsInline, preload="metadata"
- Use requestAnimationFrame to set currentTime based on scroll progress
- Pause rAF when offscreen using IntersectionObserver
- Use poster for initial paint and fallback

Reduced motion:
- If prefers-reduced-motion:
  - do NOT scrub
  - render poster image
  - fade between sections (CSS)

iOS considerations:
- Keep clips short (6–8s)
- Optimize bitrate and size
- Avoid frequent currentTime updates; clamp to small deltas

### 3.4 Album Cover “Burst Open” Reveal
Use CSS 3D transforms + ScrollTrigger timeline.
Max layers: 3.
Sequence:
1) Cover centered small
2) Scale + subtle rotate
3) Tracklist card slides/peels out
4) Credits card appears
5) End state stabilizes for readability

Avoid:
- Over-rotation
- Overlapping text in motion
- Long dwell time

### 3.5 Editorial Sections
Discography:
- Filter chips, grid, optional modal
Media:
- Photos editorial grid + contact sheet toggle
- Video library with cinema modal
Merch:
- Drop-mode styling
- Product grid, cart drawer, checkout redirect
Bio:
- Editorial layout + milestone chips

### 3.6 Vault
Route: /vault
Phase 1: passcode gate
- POST /api/vault/unlock
- On success: set HttpOnly cookie
- Middleware protects /vault content
- /vault should be noindex
Important:
- If content must stay secret:
  - do not ship exclusive assets publicly
  - use signed URLs or authenticated asset delivery

## 4) Data & Content
Phase 1 local JSON:
- /content/discography.json
- /content/photos.json
- /content/videos.json
- /content/merch.json

Phase 2 CMS:
- replace JSON with fetch layer in /lib/cms.ts

## 5) Performance Plan
- Lazy-load below fold sections
- Load posters immediately; load MP4 on approach
- Code-split motion (dynamic import GSAP/ScrollTrigger)
- Next/Image responsive images for galleries
- Avoid heavy shaders/Three.js unless absolutely needed

## 6) Testing Plan
- iOS Safari (latest + 1)
- Android Chrome
- Desktop Chrome/Firefox/Safari
E2E:
- Scroll chapters render smoothly
- Trailer modal opens/closes
- Merch add-to-cart works
- Vault gate works

## 7) Repo Structure
/app
  /(site)/page.tsx
  /vault/page.tsx
  /api/vault/unlock/route.ts
  /legal/privacy/page.tsx
  /legal/terms/page.tsx
/components
  NavAutoHide.tsx
  ClipChapter.tsx
  TrailerModal.tsx
  AlbumReveal.tsx
  DiscographyGrid.tsx
  MediaGallery.tsx
  MerchGrid.tsx
  CartDrawer.tsx
  BioSection.tsx
/lib
  motion.ts
  analytics.ts
  vault.ts
/styles
  globals.css
/content
  discography.json
  photos.json
  videos.json
  merch.json

## 8) Build Plan (Execution Order)
1) App scaffold + tokens + base components
2) ClipChapter scroll engine + reduced motion
3) Nav auto-hide
4) Hero + TrailerModal
5) AlbumReveal timeline
6) Discography + Media + Bio
7) Merch + Cart
8) Vault gate + middleware
9) Polish: motion restraint + accent discipline checks + performance
