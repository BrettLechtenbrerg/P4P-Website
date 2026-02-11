# Murray Partners 4 Prevention Website - Project Instructions

## Project Overview

**Project Name:** Murray Partners 4 Prevention (P4P) Coalition Website
**Version:** 1.0.0
**Created:** February 11, 2026
**Status:** Initial Build Complete - Content Placeholders Need Real Data

### Quick Links
- **Production URL:** https://p4p-website-6az6uzr9b-bretts-projects-3e254e58.vercel.app
- **GitHub Repo:** https://github.com/BrettLechtenbrerg/P4P-Website
- **Vercel Project:** https://vercel.com/bretts-projects-3e254e58/p4p-website
- **Current P4P Site (GoHighLevel):** https://murrayp4p.com/

### Project Location
```
/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website/
```

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | App Router, SSR |
| React | 19.2.4 | UI Framework |
| Tailwind CSS | 3.4.19 | Styling |
| Framer Motion | 12.34.0 | Animations |
| Lucide React | 0.563.0 | Icons |
| TypeScript | 5.9.3 | Type Safety |

---

## Color Scheme

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Black | `#1C1C1C` | `--p4p-black` | Primary background |
| Deep Black | `#0F0F0F` | `--p4p-black-deep` | Aurora background |
| Orange | `#F27A21` | `--p4p-orange` | Accent, CTAs, gradients |
| Orange Light | `#F9A45A` | `--p4p-orange-light` | Hover states, highlights |
| White | `#FFFFFF` | `--p4p-white` | Text, highlights |
| Charcoal | `#2A2A2A` | `--p4p-charcoal` | Secondary background |

---

## Site Structure

```
📁 P4P-Website
├── app/
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with Navigation
│   ├── globals.css        # Global styles + design system
│   ├── about/page.tsx     # About Us page
│   ├── team/page.tsx      # Coalition Team (Chamber-style)
│   ├── members/page.tsx   # Coalition Members Directory (like MACC)
│   ├── events/page.tsx    # Community Events
│   ├── contact/page.tsx   # Contact form
│   └── get-involved/page.tsx  # Volunteer/Donate/Partner
├── components/
│   ├── Navigation.tsx     # Main nav with mobile menu
│   ├── Footer.tsx         # Footer with links + social
│   ├── Hero.tsx           # Home page hero section
│   ├── Partners.tsx       # Partner organizations grid
│   ├── ContactCTA.tsx     # Contact call-to-action banner
│   ├── PageHeader.tsx     # Reusable page header
│   └── animations/        # Framer Motion wrappers
│       ├── FadeIn.tsx
│       ├── ScaleIn.tsx
│       └── StaggerChildren.tsx
├── public/
│   └── images/
│       └── p4p-logo.png   # Downloaded from current site
└── config files (tailwind, tsconfig, next.config, etc.)
```

---

## Common Commands

```bash
# Navigate to project
cd "/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website"

# Development
npm run dev          # Start dev server (usually localhost:3000)

# Build & Deploy
npm run build        # Build for production
vercel --prod --yes  # Deploy to Vercel (ALWAYS use CLI)

# Git operations
git add -A && git commit -m "message" && git push
```

---

## Design System

### Visual Features
- **Aurora Background:** Animated orange glow effects
- **Glassmorphism:** Backdrop blur cards with subtle borders
- **Animations:** Framer Motion fade-in, scale, stagger effects
- **Responsive:** Mobile-first with breakpoints at sm/md/lg/xl

### CSS Classes
```css
.glass          /* Basic glass effect */
.glass-strong   /* Stronger glass effect */
.glass-card     /* Glass card with hover effects */
.btn-primary    /* Orange gradient button */
.btn-secondary  /* Transparent outline button */
.btn-glow       /* Orange button with glow shadow */
.input-glass    /* Glass-style form inputs */
.text-gradient  /* Orange gradient text */
.aurora-bg      /* Animated background */
```

---

## What's Built vs What's Needed

### ✅ Complete
- [x] All 7 pages with structure and styling
- [x] Navigation with mobile responsive menu
- [x] Footer with social links
- [x] Partner organizations section
- [x] Members directory page (like MACC) with search/filter
- [x] Glassmorphic design system
- [x] Framer Motion animations
- [x] GitHub repo connected
- [x] Vercel deployment working

### ⏳ Needs Real Content (Placeholders Currently)
- [ ] Members page: Add real coalition member organizations from screenshots
- [ ] Team page: Replace placeholder officers/members with real P4P team
- [ ] About page: Verify/update mission statement and focus areas
- [ ] Events page: Replace sample events with real P4P events
- [ ] Hero section: Could add background image
- [ ] Partner/Member logos: Add actual organization logos
- [ ] Contact form: Connect to backend (currently shows success message)
- [ ] Social media links: Update to real P4P social profiles

### 🚀 Future Enhancements
- [ ] Add hero background image/video
- [ ] News/blog section
- [ ] Event calendar integration
- [ ] Donation payment integration
- [ ] Newsletter signup (GHL integration)
- [ ] Team member photos

---

## Reference Site

This site was built to match the visual style of the **Murray Chamber of Commerce** website:

- **MACC Production:** https://macc-website-2.vercel.app/
- **MACC GitHub:** https://github.com/BrettLechtenbrerg/MACC-Website
- **MACC Project:** `/Users/brettlechtenberg/Desktop/Claude Projects/MACC-Website/` (if exists)

---

## Deployment Notes

**IMPORTANT:** Always deploy using Vercel CLI, not the dashboard upload:
```bash
vercel --prod --yes
```

This avoids issues with standard uploads and ensures proper builds.

---

## Contact Info

- **P4P Email:** director@murrayp4p.com
- **Current Site:** https://murrayp4p.com/

---

## Session Notes

### February 11, 2026 - Initial Build
- Created complete website from scratch
- Matched MACC website tech stack and visual design
- Adapted color scheme from purple/orange to black/orange
- Downloaded logo from current GoHighLevel site
- Could not scrape Team/About pages (403 blocked) - used placeholders
- Deployed to Vercel successfully

### February 11, 2026 - Session 2: Members Directory
- Added Coalition Members directory page (`/members`)
- Modeled after MACC directory with search, filters, grid/list view
- Member cards: image, name, category, description, address, phone, website
- Tier system: Founding Partner, Partner, Supporter
- 9 placeholder member organizations (ready for real data from screenshots)
- Updated Navigation and Footer to include Members link
