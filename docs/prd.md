# prd.md
# THE R3SET — Premium Artist Album Site (Trailer-Chapter Scroll Experience) PRD

## 1) Product Summary
A high-end interactive artist site for the album "THE R3SET" by Mike Will Made It.
The site is a vertical, single-page scroll experience where 6 trailer clips (6–8s each) act as full-bleed “chapter breaks” between content sections: Album Reveal, Discography, Photos/Videos, Merch, Bio, Footer.

This is a premium multimedia rollout site with restrained motion, minimal UI, and a clear conversion path to watch, stream, and buy merch. A hidden Vault exists for exclusive content.

## 2) Goals
### Primary
1) Tell the album story through “chapters” using scroll-scrub trailer clips as transitions.
2) Drive conversions:
   - Watch full trailer
   - Stream / pre-save / buy
   - Purchase merch
   - Join email/SMS list
3) Showcase brand credibility:
   - Discography (artist/producer work)
   - Media library (music videos + trailer)
   - Editorial photos
4) Launch-ready performance on mobile (especially iOS Safari).

### Secondary
- Scalable to future drops (new merch, videos, press, tour).
- Vault supports exclusive releases without leaking content.

## 3) Premium Feel Requirements (Non-Negotiables)
### 3.1 Minimal nav + auto-hide
- Sticky nav that auto-hides on scroll down and reveals on scroll up.
- Nav stays minimal: 5–7 links max + subtle Vault entry.
- Nav must never fight the story.

### 3.2 Chapter-break interstitials
- Each interstitial clip is a “chapter break”:
  - Full-bleed, 100vh sticky video
  - Minimal overlays (optional: small chapter label)
  - A distinct pause/shift in mood before the next section
- The content section following each clip must feel like the “next chapter” with a clean editorial layout.

### 3.3 One accent color discipline
- Exactly one accent color is allowed for:
  - Primary CTA (e.g., “Watch Trailer”, “Shop Drop”, “Stream”)
  - Label tags: DROP / VAULT / LIMITED
- Accent must not leak into body text, borders, or random highlights.

### 3.4 Restrained motion (“resolve” transitions)
- Motion should “resolve into place” (clean, intentional).
- Avoid gimmicks, bouncy easing, or constant motion.
- Motion peaks only at:
  - Album cover reveal (“burst open” product moment)
  - Trailer chapter transitions
- Must fully respect prefers-reduced-motion.

### 3.5 Merch is streetwear energy; everything else is editorial
- Merch section gets bolder labels, tighter spacing, “drop” cues.
- The rest of the site stays premium editorial: breathing room, clean type, calm UI.

## 4) Target Users
- Fans (mobile-first)
- Press/industry (desktop)
- Buyers (merch)
- Superfans (Vault)

## 5) Site Structure (Exact Order)
1) HERO (Scene Clip 1)
2) Album Cover Reveal (product-style burst open)
3) Scene Clip 2
4) Discography
5) Scene Clip 3
6) Photos + Videos (combined media library)
7) Scene Clip 4
8) Merch
9) Scene Clip 5
10) Bio
11) Scene Clip 6
12) Footer

## 6) Key Features
### 6.1 Scroll-scrub trailer chapters (Core)
- 6 clips, each 6–8 seconds
- Each clip section:
  - wrapper height ~220vh
  - sticky video at 100vh
  - scroll progress maps to video currentTime
  - offscreen pause via IntersectionObserver
- Reduced motion:
  - poster only (no scrubbing)
  - fade transitions between sections

### 6.2 Full Trailer Playback
- “Watch Full Trailer” opens a cinema modal (fullscreen feel).
- Audio only after user interaction (standard browser policy).
- Captions/transcript supported (if available).

### 6.3 Album Cover Reveal (“Burst Open”)
- Scroll-driven “product reveal” moment:
  - Cover scales + subtle 3D rotate
  - Reveals up to 3 layers: cover, tracklist card, credits card
  - Ends with stable layout for reading

### 6.4 Discography
- Filterable grid (All / Albums / Mixtapes / Singles / Production)
- Cards: artwork, year, role, quick links
- Optional detail modal.

### 6.5 Photos + Videos
- Photos:
  - Editorial grid
  - Contact sheet toggle
  - Modal viewer with keyboard nav
- Videos:
  - Categories: Trailer / Music Videos / BTS (future)
  - Cinema modal playback

### 6.6 Merch
- Drop-style product grid with tags:
  - DROP / LIMITED / VAULT
- Cart drawer, variant selectors, size guide
- Checkout:
  - Shopify Headless (recommended) or Stripe Checkout

### 6.7 Bio
- Editorial layout: portrait + story
- Milestone chips timeline
- CTA: newsletter / socials

### 6.8 Vault (Hidden / Subtle)
- Route: /vault (noindex)
- Gate:
  - Phase 1 passcode with HttpOnly cookie session
  - Phase 2 email OTP (future)
- Exclusive content must not be publicly accessible if truly secret.

## 7) Accessibility Requirements
- Keyboard accessible nav and modals
- Visible focus states
- Captions/transcript where possible
- Prefers-reduced-motion support
- Contrast AA minimum

## 8) Performance Requirements
- Lazy-load below fold
- Poster-first for clips
- Avoid heavy JS on initial load
- Core Web Vitals targets:
  - LCP < 2.5s (modern devices)
  - INP < 200ms
  - CLS < 0.1

## 9) Analytics Events (Minimal but Valuable)
- CTA clicks: Watch Trailer / Stream / Shop
- Scroll depth: reached Merch, reached Bio
- Video modal: open, play, completion
- Commerce: view item, add to cart, begin checkout
- Vault: unlock attempts, unlock success

## 10) Delivery Plan
Phase 0: Setup + content lock
Phase 1: Scroll engine prototype (iOS validation)
Phase 2: Album reveal build
Phase 3: Media + discography
Phase 4: Merch + cart
Phase 5: Vault gating
Phase 6: Polish, accessibility, performance, launch
