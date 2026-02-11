# Murray Partners 4 Prevention Website - Ultimate Restart Prompt

**Copy and paste everything below this line into a new Claude Code conversation:**

---

## P4P WEBSITE RESTART PROMPT

I'm continuing work on the **Murray Partners 4 Prevention (P4P) Coalition Website**.

### FIRST: Read the Project Context

```
/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website/CLAUDE.md
```

### Quick Links

| Resource | URL |
|----------|-----|
| **Live Site** | https://p4p-website-27god55vc-bretts-projects-3e254e58.vercel.app |
| **GitHub Repo** | https://github.com/BrettLechtenbrerg/P4P-Website |
| **Vercel Dashboard** | https://vercel.com/bretts-projects-3e254e58/p4p-website |
| **Local Project** | `/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website/` |
| **Current P4P Site** | https://murrayp4p.com/ (GoHighLevel - being replaced) |

### Design Reference

This site matches the visual style of the Murray Chamber of Commerce website:
- **MACC Site:** https://macc-website-2.vercel.app/
- **MACC Reference:** https://web-seven-beta-31.vercel.app/
- **MACC Repo:** https://github.com/BrettLechtenbrerg/MACC-Website

### Current Status (v1.1.0 - February 11, 2026)

**COMPLETE - 9 PAGES BUILT:**

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero with background image, Partners, Contact CTA |
| About | `/about` | Mission, vision, focus areas |
| Team | `/team` | Coalition officers & members (PLACEHOLDER) |
| Members | `/members` | Coalition member directory with search/filter |
| Events | `/events` | Community events (PLACEHOLDER) |
| Contact | `/contact` | Contact form |
| Get Involved | `/get-involved` | Volunteer, Donate, Partner |
| Terms | `/terms` | Terms & Conditions (Jan 1, 2026) |
| Privacy | `/privacy` | Privacy Policy (Jan 1, 2026) |

**Also Complete:**
- Next.js 16 / React 19 / Tailwind CSS 3.4 / Framer Motion
- Glassmorphic design with Black/Orange/White color scheme
- Hero section with background image (p4p-hero.jpg)
- Mobile-responsive navigation and footer
- Partner organizations section (9 partners)
- Members directory with search, category filter, tier filter, grid/list view
- GitHub repo connected and all commits pushed
- Vercel production deployment working

**NEEDS REAL CONTENT (Currently Placeholders):**

| Item | Status | Notes |
|------|--------|-------|
| Members page | Placeholder | Add real coalition member orgs |
| Team page | Placeholder | Replace with real P4P officers and members |
| Events page | Placeholder | Replace sample events with real P4P events |
| About page | Needs verification | Check mission/vision accuracy |
| Partner logos | Placeholder images | Add actual organization logos |
| Contact form | Mock success | Connect to backend (GHL integration?) |
| Social links | Placeholder URLs | Update to real P4P profiles |

### Tech Stack

```
Next.js         16.1.6    App Router, SSR
React           19.2.4    UI Framework
Tailwind CSS    3.4.19    Styling
Framer Motion   12.34.0   Animations
Lucide React    0.563.0   Icons
TypeScript      5.9.3     Type Safety
```

### Color Scheme

```
Black       #1C1C1C   Primary background
Deep Black  #0F0F0F   Aurora background
Orange      #F27A21   Accent, CTAs, gradients
Orange Lt   #F9A45A   Hover states, highlights
White       #FFFFFF   Text, highlights
Charcoal    #2A2A2A   Secondary background
```

### Project Structure

```
app/
├── page.tsx              # Home (with hero image)
├── about/page.tsx        # About Us
├── team/page.tsx         # Coalition Team
├── members/page.tsx      # Member Directory (MACC-style)
├── events/page.tsx       # Events
├── contact/page.tsx      # Contact Form
├── get-involved/page.tsx # Volunteer/Donate/Partner
├── terms/page.tsx        # Terms & Conditions
├── privacy/page.tsx      # Privacy Policy
└── globals.css           # Design system

components/
├── Navigation.tsx        # Main nav + mobile menu
├── Footer.tsx            # Footer with links
├── Hero.tsx              # Home hero section (with bg image)
├── Partners.tsx          # Partner grid
├── PageHeader.tsx        # Reusable header
└── animations/           # FadeIn, ScaleIn, Stagger

public/images/
├── p4p-logo.png          # Logo
└── hero/
    └── p4p-hero.jpg      # Hero background image
```

### Common Commands

```bash
# Navigate to project
cd "/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website"

# Development
npm run dev               # Start dev server (usually :3000)

# Build & Deploy
npm run build             # Test production build
vercel --prod --yes       # Deploy to Vercel (ALWAYS use CLI!)

# Git
git status
git add -A && git commit -m "message" && git push
```

### Critical Notes

1. **ALWAYS deploy via Vercel CLI** - standard uploads have issues
2. **Color scheme is Black/Orange/White** - adapted from MACC's purple/orange
3. **Team/Events content are PLACEHOLDERS** - couldn't scrape from GoHighLevel (403)
4. **Members directory** - Ready for real data, has 9 placeholder orgs with tier system
5. **Legal pages** - Full Terms & Privacy dated January 1, 2026
6. **Hero image** - p4p-hero.jpg with gradient overlays

### Git Status

```
Branch: main
Remote: origin/main (up to date)
Commits: 6 (all pushed)
Status: Clean - nothing to commit
```

---

### What would you like to work on?

**Content Tasks:**
1. Add real coalition member organizations (need screenshots/data)
2. Add real team member content (need names/titles/bios)
3. Add real events data

**Enhancement Tasks:**
4. Connect contact form to backend (GHL?)
5. Add actual partner/member logos
6. Update social media links to real profiles

**New Features:**
7. News/blog section
8. Event calendar integration
9. Donation payment integration
10. Newsletter signup

---

*Last Updated: February 11, 2026 - Session 4 (v1.1.0)*
*Pages: 9 | Commits: 6 | Status: Production Ready (with placeholder content)*
