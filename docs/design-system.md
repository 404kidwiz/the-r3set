# design-system.md
# THE R3SET — Design System (Premium Editorial + Drop-Mode Merch)

## 1) Brand Feel
- Editorial calm + cinematic energy
- Minimal UI, maximal atmosphere
- “Chapter breaks” via trailer interstitials
- One accent color used only for:
  - Primary CTAs
  - DROP / VAULT / LIMITED labels

## 2) Themes
### Default: Black Studio
- Background: near-black
- Text: near-white
- Surfaces: slightly lifted charcoal
- Borders: subtle, low-contrast strokes
- Accent: single bold color (CTA + labels only)

Optional alt:
- Gallery White (future): white canvas, black type, same accent discipline

## 3) Tokens (CSS variables)
### Core
- --bg
- --fg
- --muted
- --surface
- --surface-2
- --stroke
- --shadow
- --accent (ONLY for CTA + tags)
- --danger / --success (commerce states)

### Accent discipline rules (hard)
- --accent must not be used for:
  - paragraph text
  - borders on layout containers
  - random highlights
- Allowed uses:
  - primary buttons
  - CTA underline micro-accent
  - label tags (DROP / VAULT / LIMITED)

## 4) Typography
### Font roles
- Primary Sans: modern, neutral, high legibility (variable)
- Display Condensed: big headlines + section titles
- Mono: tiny utility labels and timestamps (optional)

### Scale
- Display XL: 72–96
- Display L: 48–64
- H1: 40–48
- H2: 28–32
- H3: 20–24
- Body: 16–18
- Small: 13–14
- Micro: 11–12

Rules:
- Headlines: tight tracking, confident
- Body: airy line-height (1.6+)
- Labels: uppercase, condensed, tight padding

## 5) Layout
- Max width: 1200–1320px
- Grid: 12 columns desktop, 4 columns mobile
- Section rhythm: 96–160px vertical spacing
- Interstitial clip sections: full-bleed, sticky 100vh

## 6) Components

### 6.1 Nav (Minimal + Auto-hide)
- Sticky top nav
- Auto-hide on scroll down, reveal on scroll up
- Links:
  - Album, Discography, Media, Merch, Bio
- Vault entry:
  - subtle icon/label, not loud

### 6.2 Buttons
- Primary (accent fill) — CTA only
- Secondary (outline)
- Ghost (text)
- Icon button (video modal controls)

States:
- Hover: micro-lift + glow edge
- Active: compress
- Focus: visible ring

### 6.3 Tags / Labels (Streetwear cue)
- Rectangular badge
- Tight padding
- Uppercase
- Uses accent or inverted palette
Examples:
- DROP
- LIMITED
- VAULT

### 6.4 Cards
- Discography card: artwork + year + role + quick links
- Media tile: thumb + category tag
- Merch card: product image + label + price + quick add

### 6.5 Modals
- Cinema modal for trailer/videos (focus trap)
- Photo modal viewer (keyboard nav)
- Optional discography detail modal

### 6.6 Galleries
Photos:
- Editorial grid default
- Contact sheet toggle
Videos:
- Category chips + grid

### 6.7 Commerce UI (Merch “Drop Mode”)
Merch section uses:
- tighter rhythm
- bolder labels
- punchier product grid
But still premium (no clutter).

## 7) Motion System (Restrained “Resolve”)
Principles:
- Motion is purposeful, not constant
- Transitions “resolve” into place
- No bouncy overshoot; keep it controlled
- Peak moments only:
  - Album cover reveal
  - Chapter-break clip transitions

Timing guidance:
- Micro: 120–180ms
- Standard: 220–360ms
- Cinematic: 600–1200ms (hero/reveal only)

Reduced motion:
- Disable scrubbing
- Replace parallax with fades
- Remove hover tilts

## 8) Interstitial Chapter Clips
- Full-bleed
- Sticky 100vh
- Minimal overlays:
  - optional chapter label (micro)
  - optional album title watermark (very subtle)
- Use vignette/overlay only for legibility

## 9) Texture
- subtle grain overlay across the site
- optional light scanline/glitch only during “reset” themed moments (very sparing)

## 10) Accessibility
- contrast AA minimum
- focus states always visible
- keyboard support for all modals and toggles
- prefers-reduced-motion supported everywhere
