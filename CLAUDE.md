# Murray Partners 4 Prevention Website - Project Instructions

## Project Overview

**Project Name:** Murray Partners 4 Prevention (P4P) Coalition Website
**Version:** 1.2.0
**Created:** February 11, 2026
**Last Updated:** February 11, 2026 (Session 5)
**Status:** Production Ready - Fully Mobile Optimized

### Quick Links
- **Production URL:** https://p4p-website.vercel.app (stable URL)
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
│   ├── page.tsx           # Home page (with hero image)
│   ├── layout.tsx         # Root layout with Navigation
│   ├── globals.css        # Global styles + design system
│   ├── about/page.tsx     # About Us page
│   ├── team/page.tsx      # Coalition Team (Chamber-style)
│   ├── members/page.tsx   # Coalition Members Directory (like MACC)
│   ├── events/page.tsx    # Community Events
│   ├── contact/page.tsx   # Contact form
│   ├── get-involved/page.tsx  # Volunteer/Donate/Partner
│   ├── terms/page.tsx     # Terms & Conditions (Jan 1, 2026)
│   └── privacy/page.tsx   # Privacy Policy (Jan 1, 2026)
├── components/
│   ├── Navigation.tsx     # Main nav with mobile menu
│   ├── Footer.tsx         # Footer with links + social
│   ├── Hero.tsx           # Home page hero section (with background image)
│   ├── Partners.tsx       # Partner organizations grid
│   ├── ContactCTA.tsx     # Contact call-to-action banner
│   ├── PageHeader.tsx     # Reusable page header
│   └── animations/        # Framer Motion wrappers
│       ├── FadeIn.tsx
│       ├── ScaleIn.tsx
│       └── StaggerChildren.tsx
├── public/
│   └── images/
│       ├── p4p-logo.png   # Downloaded from current site
│       └── hero/
│           └── p4p-hero.jpg  # Hero background image
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
- **Hero Background:** Full-screen image with gradient overlays
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

### ✅ Complete (v1.2.0)
- [x] All 9 pages with structure and styling
- [x] Hero background images on ALL pages (Home, About, Team, Members, Events, Contact, Get Involved)
- [x] Stable Vercel production URL (p4p-website.vercel.app)
- [x] P4P logo placeholders in all member organization cards
- [x] Navigation with mobile responsive menu (optimized 85vw width)
- [x] Footer with social links
- [x] Partner organizations section
- [x] Members directory page with search/filter
- [x] Glassmorphic design system
- [x] Framer Motion animations
- [x] Terms & Conditions page
- [x] Privacy Policy page
- [x] **Comprehensive mobile optimization** (320px - 1920px+)
- [x] Minimum 44px touch targets on all interactive elements
- [x] GitHub repo connected (10 commits)
- [x] Vercel deployment working

### ⏳ Needs Real Content (Placeholders Currently)
- [ ] Members page: Add real coalition member organizations
- [ ] Team page: Replace placeholder officers/members with real P4P team
- [ ] About page: Verify/update mission statement and focus areas
- [ ] Events page: Replace sample events with real P4P events
- [ ] Partner/Member logos: Add actual organization logos
- [ ] Contact form: Connect to backend (currently shows success message)
- [ ] Social media links: Update to real P4P social profiles

### 🚀 Future Enhancements
- [ ] News/blog section
- [ ] Event calendar integration
- [ ] Donation payment integration
- [ ] Newsletter signup (GHL integration)
- [ ] Team member photos

---

## Reference Site

This site was built to match the visual style of the **Murray Chamber of Commerce** website:

- **MACC Production:** https://macc-website-2.vercel.app/
- **MACC Reference:** https://web-seven-beta-31.vercel.app/
- **MACC GitHub:** https://github.com/BrettLechtenbrerg/MACC-Website
- **MACC Project:** `/Users/brettlechtenberg/Desktop/Claude Projects/MACC-Website/`

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

## Session History

### February 11, 2026 - Session 1: Initial Build
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
- 9 placeholder member organizations

### February 11, 2026 - Session 3: Legal Pages
- Added Terms & Conditions page (`/terms`)
- Added Privacy Policy page (`/privacy`)
- Both pages effective January 1, 2026
- **Total Pages: 9**

### February 11, 2026 - Session 4: Hero Image
- Added hero background image (p4p-hero.jpg)
- Updated Hero component with image and gradient overlays
- Matches Murray Chamber website hero style
- Deployed to Vercel production
- Created restart prompt and documentation
- **Version: 1.1.0**

### February 11, 2026 - Session 5: Page Images, Stable URL & Mobile Optimization
- **Stable Vercel URL:** Created permanent alias `p4p-website.vercel.app`
- **Page Background Images:** Added hero images to all 6 content pages:
  - About: Community diversity image
  - Team: Business collaboration image
  - Members: Partnership image
  - Events: Community gathering image
  - Contact: Communication image
  - Get Involved: Volunteering image
- **Member Logo Placeholders:** All 9 member org cards now show P4P logo until real logos provided
- **Comprehensive Mobile Optimization:**
  - Contact page social links: flex-wrap, responsive padding/text
  - Members page filters: Better stacking, grouped controls, responsive widths
  - Navigation mobile menu: Responsive 85vw width (max 384px)
  - All interactive elements: Minimum 44x44px touch targets
  - Added aria-labels for accessibility
- **Git:** 10 total commits, all pushed
- **Vercel:** Deployed and aliased to stable URL
- **Documentation:** Updated CLAUDE.md and RESTART-PROMPT.md
- **Version: 1.2.0** - Production Ready!
