# P4P Website - Ultimate Restart Prompt

**Copy and paste everything below the line into a new Claude Code conversation:**

---

## 🔄 P4P WEBSITE - ULTIMATE RESTART PROMPT

I'm continuing work on the **Murray Partners 4 Prevention (P4P) Coalition Website**.

### 📍 FIRST: Read Project Context

Please read: `/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website/CLAUDE.md`

This file contains complete project documentation, tech stack, design system, and full session history.

---

### 🔗 Quick Links

| Resource | URL |
|----------|-----|
| **Live Site** | https://p4p-website.vercel.app (stable URL) |
| **GitHub Repo** | https://github.com/BrettLechtenbrerg/P4P-Website |
| **Vercel Dashboard** | https://vercel.com/bretts-projects-3e254e58/p4p-website |
| **Local Project** | `/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website/` |
| **Current P4P Site** | https://murrayp4p.com/ (GoHighLevel - being replaced) |

---

### 📊 Current Status (v1.2.0 - February 11, 2026)

**✅ PRODUCTION READY - FULLY MOBILE OPTIMIZED**

**Complete Features:**
- ✅ **9 Pages:** Home, About, Team, Members, Events, Contact, Get Involved, Terms, Privacy
- ✅ **Hero Images:** Background images on ALL pages (Home + 6 content pages)
- ✅ **Stable URL:** p4p-website.vercel.app (auto-updates on deploy)
- ✅ **Mobile Optimized:** 320px to 1920px+, 44px touch targets, responsive layouts
- ✅ **Member Directory:** Search, filter by category/tier, grid/list view, P4P logo placeholders
- ✅ **Design System:** Glassmorphic black/orange theme, Framer Motion animations
- ✅ **Navigation:** Responsive mobile menu (85vw max-width)
- ✅ **Forms:** Contact form with validation (mock backend)
- ✅ **Legal Pages:** Terms & Privacy (Jan 1, 2026)
- ✅ **Git/Vercel:** 10 commits pushed, deployed, aliased

---

### 🎨 Design Reference

This site matches the visual style of the **Murray Chamber of Commerce** website:
- **MACC Production:** https://macc-website-2.vercel.app/
- **MACC Reference:** https://web-seven-beta-31.vercel.app/
- **Design:** Glassmorphic, dark theme with orange accents

**Color Scheme:**
```
Black:       #1C1C1C (primary background)
Deep Black:  #0F0F0F (aurora bg)
Orange:      #F27A21 (accent, CTAs)
Orange Lt:   #F9A45A (hover states)
White:       #FFFFFF (text)
Charcoal:    #2A2A2A (secondary bg)
```

---

### 💻 Tech Stack

```
Next.js         16.1.6    App Router, SSR
React           19.2.4    UI Framework
Tailwind CSS    3.4.19    Styling
Framer Motion   12.34.0   Animations
Lucide React    0.563.0   Icons
TypeScript      5.9.3     Type Safety
```

---

### 📁 Project Structure

```
P4P-Website/
├── app/
│   ├── page.tsx              # Home (with p4p-hero.jpg)
│   ├── layout.tsx            # Root layout + Navigation
│   ├── globals.css           # Design system
│   ├── about/page.tsx        # About (with bg image)
│   ├── team/page.tsx         # Team (with bg image)
│   ├── members/page.tsx      # Member Directory (with bg image)
│   ├── events/page.tsx       # Events (with bg image)
│   ├── contact/page.tsx      # Contact Form (with bg image)
│   ├── get-involved/page.tsx # Get Involved (with bg image)
│   ├── terms/page.tsx        # Terms & Conditions
│   └── privacy/page.tsx      # Privacy Policy
├── components/
│   ├── Navigation.tsx        # Main nav + mobile menu
│   ├── Footer.tsx            # Footer with links
│   ├── Hero.tsx              # Home hero (with bg image)
│   ├── PageHeader.tsx        # Page header (supports bg images)
│   ├── Partners.tsx          # Partner grid
│   ├── ContactCTA.tsx        # CTA banner
│   └── animations/           # FadeIn, ScaleIn, Stagger
├── public/images/
│   ├── p4p-logo.png          # Main logo
│   └── hero/
│       └── p4p-hero.jpg      # Hero background
├── CLAUDE.md                 # Complete documentation
├── RESTART-PROMPT.md         # This file
└── README.md                 # Project readme
```

---

### ⏳ What Still Needs Real Content

**All pages are built with PLACEHOLDER data:**

| Item | Current State | What's Needed |
|------|---------------|---------------|
| **Team Page** | 6 placeholder officers/members | Real P4P team names, titles, bios, photos |
| **Members Page** | 9 placeholder organizations with P4P logo | Real member org names, descriptions, actual logos |
| **About Page** | Generic mission statement | Verify/update with real P4P mission, vision, focus areas |
| **Events Page** | 3 sample events | Real P4P event names, dates, locations, descriptions |
| **Member/Org Logos** | All use p4p-logo.png placeholder | Upload actual logos to `/public/images/members/` |
| **Contact Form** | Mock success message | Connect to backend (GHL integration?) |
| **Social Links** | Placeholder URLs (#) | Update with real P4P social media profiles |
| **Stats on Home** | Estimated numbers | Update with real metrics (events, members, reach, years) |

---

### 🚀 Future Enhancements (Not Yet Built)

1. **News/Blog Section** - Add blog page with article cards
2. **Event Calendar Integration** - Connect to Google Calendar or event system
3. **Donation Payment System** - Integrate Stripe/PayPal for donations
4. **Newsletter Signup** - Connect to email service (GHL integration)
5. **Team Member Photos** - Add headshots to team page
6. **Resource Library** - Downloadable PDFs, guides, materials
7. **Success Stories** - Testimonials/impact stories section
8. **Photo Gallery** - Community event photos

---

### 🛠️ Common Commands

```bash
# Navigate to project
cd "/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website"

# Development
npm run dev               # Start dev server (usually :3000)

# Build & Deploy
npm run build             # Test production build
vercel --prod --yes       # Deploy to Vercel (ALWAYS use CLI!)

# Git
git status                # Check status
git add -A                # Stage all changes
git commit -m "message"   # Commit
git push origin main      # Push to GitHub
git log --oneline -10     # View recent commits
```

---

### ⚠️ Critical Notes

1. **ALWAYS deploy via Vercel CLI** (`vercel --prod --yes`) - standard uploads have issues
2. **Color scheme is Black/Orange/White** - adapted from MACC's purple/orange
3. **All content pages have background images** - using Unsplash URLs
4. **Member logos are P4P logo placeholders** - ready to replace with real logos
5. **Mobile optimized** - 44px touch targets, responsive layouts, tested 320px-1920px+
6. **Stable URL:** p4p-website.vercel.app (auto-updates, no need to track deployment URLs)

---

### 🗂️ Session History Summary

**Session 1:** Initial build - 9 pages, design system, components
**Session 2:** Members directory - search, filters, tier system
**Session 3:** Legal pages - Terms & Privacy
**Session 4:** Home hero image - p4p-hero.jpg with overlays
**Session 5:** Page images, stable URL, mobile optimization

**Total:** 10 commits, 9 pages, fully mobile-optimized, production-ready

---

### 📝 Git Status

```
Branch: main
Remote: origin/main (up to date)
Commits: 10 (all pushed)
Status: Clean - nothing to commit
Latest: "Improve mobile optimization across site"
```

---

### 🎯 What to Work On Next

Choose based on priority:

**HIGH PRIORITY - Content Updates:**
1. Get real team member data (names, titles, bios, photos)
2. Get real member organization data (names, descriptions, logos)
3. Get real event data (names, dates, locations)
4. Update About page with verified mission/vision
5. Get actual organization logos for member cards

**MEDIUM PRIORITY - Functionality:**
6. Connect contact form to backend (GHL or email service)
7. Update social media links to real P4P profiles
8. Update home page stats with real numbers

**LOW PRIORITY - Enhancements:**
9. Add news/blog section
10. Integrate event calendar
11. Add donation payment system
12. Add newsletter signup

---

### 💡 How to Replace Placeholder Content

**Example: Updating Team Members**

1. Open `/app/team/page.tsx`
2. Find the `officers` and `boardMembers` arrays
3. Replace placeholder data:
```typescript
{
  id: 1,
  name: "Real Person Name",
  title: "Real Title",
  bio: "Real bio text...",
  image: "/images/team/person-name.jpg" // Upload photo first
}
```
4. Upload photos to `/public/images/team/`
5. Commit and deploy

**Example: Updating Member Organization Logos**

1. Upload logo to `/public/images/members/org-name-logo.png`
2. Open `/app/members/page.tsx`
3. Update the `image` property:
```typescript
image: '/images/members/org-name-logo.png'
```
4. Commit and deploy

---

### 🔗 Additional Resources

- **Unsplash (images):** https://unsplash.com/
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Next.js Docs:** https://nextjs.org/docs

---

**Last Updated:** February 11, 2026 - Session 5 (v1.2.0)
**Status:** Production Ready, Fully Mobile Optimized
**Next Steps:** Add real content (team, members, events) or build new features

---

### What would you like to work on?

[Tell me what you want to do next!]
