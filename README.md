# THE R3SET - Premium Multimedia Album Site

A premium, scroll-driven multimedia experience for Mike Will Made-It's album "THE R3SET" featuring scroll-scrub video chapters, 3D album reveal animation, and exclusive Vault content.

## 🎯 Features

- **Scroll-Scrub Video Chapters**: 6 full-bleed interstitial clips controlled by scroll position
- **3D Album Reveal**: "Burst open" product reveal using GSAP + ScrollTrigger
- **Auto-Hide Navigation**: Minimal nav that hides on scroll down, reveals on scroll up
- **Vault System**: Password-protected exclusive content with HttpOnly cookie session
- **Accessibility First**: Full keyboard navigation, reduced motion support, WCAG AA compliance
- **Performance Optimized**: Lazy-loading, IntersectionObserver, dynamic imports

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
the-r3set/
├── app/
│   ├── (site)/
│   │   └── page.tsx          # Main homepage with scroll chapters
│   ├── vault/
│   │   └── page.tsx          # Vault protected page
│   ├── api/vault/
│   │   ├── unlock/route.ts   # Passcode validation endpoint
│   │   └── logout/route.ts   # Session logout
│   ├── layout.tsx
│   └── globals.css           # Design system tokens + utilities
├── components/
│   ├── ClipChapter.tsx       # Scroll-scrub video component
│   ├── AlbumReveal.tsx       # 3D album reveal animation
│   ├── NavAutoHide.tsx       # Auto-hide navigation
│   └── TrailerModal.tsx      # Cinema modal player
├── content/
│   ├── discography.json
│   ├── photos.json
│   ├── videos.json
│   └── merch.json
├── public/
│   ├── clips/                # Place 6 MP4 clips here
│   │   ├── clip01.mp4
│   │   └── ... (clip02 - clip06)
│   └── posters/              # Place 6 poster JPGs here
│       ├── clip01.jpg
│       └── ... (clip02 - clip06)
└── docs/
    ├── prd.md
    ├── design-system.md
    └── technical-architecture.md
```

## 🎥 Video Asset Placement

**IMPORTANT**: The site expects 6 video clips and their corresponding posters.

### Required Files

Place your video files in `/public/clips/`:
- `clip01.mp4` (6-8 seconds) - Hero chapter
- `clip02.mp4` (6-8 seconds)
- `clip03.mp4` (6-8 seconds)
- `clip04.mp4` (6-8 seconds)
- `clip05.mp4` (6-8 seconds)
- `clip06.mp4` (6-8 seconds)

Place poster images in `/public/posters/`:
- `clip01.jpg` - First frame of clip01
- ...clip02-clip06.jpg

### Video Optimization Tips

For best iOS Safari performance:
- **Duration**: 6-8 seconds max
- **Resolution**: 1920x1080 (1080p)
- **Bitrate**: 5-8 Mbps
- **Codec**: H.264
- **Format**: MP4

```bash
# Example FFmpeg optimization
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -vf scale=1920:1080 -movflags +faststart clip01.mp4
```

### Fallback Behavior

If clip assets are missing, the site will:
- Show poster image only (no scroll-scrub)
- Display gracefully with no errors
- Work in reduced-motion mode automatically

## 🎨 Design System

The site uses a **Black Studio** theme with strict accent discipline:

### CSS Variables (Tokens)

```css
--bg: #0a0a0a          /* Background */
--fg: #f5f5f5          /* Foreground text */
--muted: #a0a0a0       /* Muted text */
--surface: #1a1a1a     /* Elevated surfaces */
--stroke: #2a2a2a      /* Borders */
--accent: #e63946      /* Accent (CTA + tags ONLY) */
```

### Accent Discipline Rules

**Only use `--accent` for**:
- Primary CTAs (`btn-primary`)
- Tags: `DROP`, `LIMITED`, `VAULT`

**Never use `--accent` for**:
- Body text
- Layout borders
- Random highlights

## 🔐 Vault Configuration

### Environment Variables

Create `.env.local`:

```bash
VAULT_PASSCODE=your_secure_passcode_here
```

Default passcode (development only): `R3SET2026`

### Security Notes

- Passcode is validated server-side
- Session stored in HttpOnly cookie (7-day expiry)
- Vault page has `noindex` meta tag
- For true content protection, use signed URLs or authenticated asset delivery

## 📝 Content Management

### Phase 1: Local JSON (Current)

Edit files in `/content/`:
- `discography.json`
- `photos.json`
- `videos.json`
- `merch.json`

### Phase 2: CMS Migration (Future)

To migrate to a headless CMS:

1. Create `/lib/cms.ts`:
```typescript
export async function getDiscography() {
  const res = await fetch('https://your-cms.com/api/discography');
  return res.json();
}
```

2. Update Server Components to fetch from CMS:
```typescript
// In app/page.tsx
const discography = await getDiscography();
```

Recommended CMS options:
- **Sanity**: Best for media-heavy sites
- **Contentful**: Great API, good free tier
- **Strapi**: Self-hosted option

## 🎬 GSAP + ScrollTrigger

Animations use GSAP with dynamic imports for performance:

```typescript
// Dynamic import in useEffect
const gsap = (await import('gsap')).default;
const { ScrollTrigger } = await import('gsap/ScrollTrigger');
```

### Key Patterns Used

1. **Scroll-scrub chapters** (`ClipChapter.tsx`)
   - RequestAnimationFrame for smooth updates
   - IntersectionObserver pauses offscreen
   - Reduced motion shows poster only

2. **Album reveal** (`AlbumReveal.tsx`)
   - Timeline with pin + scrub
   - 3D transforms (preserves-3d)
   - 3-layer exploded view

3. **Auto-hide nav** (`NavAutoHide.tsx`)
   - Debounced scroll listener
   - CSS transforms for performance
   - Skip-to-content link

## ♿ Accessibility

- **Keyboard Navigation**: Full tab support, visible focus states
- **Reduced Motion**: Respects `prefers-reduced-motion` everywhere
- **ARIA Labels**: All interactive elements properly labeled
- **Contrast**: WCAG AA minimum (4.5:1)
- **Focus Trap**: Modal components trap focus correctly

## ⚡ Performance

- **Code Splitting**: GSAP loaded dynamically only when needed
- **Lazy Loading**: Below-fold sections load on approach
- **Intersection Observer**: Pauses video scrub when offscreen
- **Next/Image**: Optimized images with blur placeholders
- **Server Components**: Default for all non-interactive content

### Performance Targets

- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

## 🏗️ Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animation**: GSAP + ScrollTrigger
- **Deployment**: Vercel (recommended)

## 📦 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VAULT_PASSCODE=your_passcode`
4. Deploy!

### Environment Variables

```bash
VAULT_PASSCODE=your_secure_passcode
NODE_ENV=production
```

## 📖 Documentation

Full documentation in `/docs/`:
- `prd.md` - Product requirements
- `design-system.md` - Visual design tokens
- `technical-architecture.md` - Implementation details

## 🎯 Next Steps

### Phase 1 Complete
- ✅ Scroll engine with clip chapters
- ✅ Album reveal animation
- ✅ Vault gating system
- ✅ Design system + tokens

### Phase 2 (TODO)
- [ ] Complete Discography component with filters
- [ ] Media gallery with modals
- [ ] Merch grid with cart drawer
- [ ] Bio section with timeline
- [ ] Mobile menu implementation
- [ ] Analytics integration

### Phase 3 (Future)
- [ ] CMS migration
- [ ] Shopify Headless integration
- [ ] Email/SMS capture
- [ ] Social sharing
- [ ] Real trailer + clips

## 📄 License

© 2026 Mike Will Made-It. All rights reserved.

---

**Built with UltraThink** using parallel agent orchestration and skill-driven architecture.
