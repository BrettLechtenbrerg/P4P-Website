# Murray Partners 4 Prevention Website - Restart Prompt

**Copy and paste everything below this line into a new Claude Code conversation:**

---

## 🔄 P4P WEBSITE RESTART PROMPT

I'm continuing work on the **Murray Partners 4 Prevention (P4P) Coalition Website**.

### 📍 Project Context

Please read the project instructions file first:
```
/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website/CLAUDE.md
```

### 🔗 Quick Links
- **Production URL:** https://p4p-website-6az6uzr9b-bretts-projects-3e254e58.vercel.app
- **GitHub Repo:** https://github.com/BrettLechtenbrerg/P4P-Website
- **Vercel Project:** https://vercel.com/bretts-projects-3e254e58/p4p-website
- **Local Project:** `/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website/`

### 🎨 Design Reference
This site matches the visual style of the Murray Chamber of Commerce website:
- **MACC Site:** https://macc-website-2.vercel.app/
- **MACC Repo:** https://github.com/BrettLechtenbrerg/MACC-Website

### 📊 Current Status

**✅ COMPLETE:**
- Next.js 16 / React 19 / Tailwind CSS 3.4 / Framer Motion setup
- 6 pages: Home, About, Team, Events, Contact, Get Involved
- Glassmorphic design with Black/Orange/White color scheme
- Mobile-responsive navigation and footer
- Partner organizations section
- GitHub repo created and connected
- Vercel production deployment working

**⏳ NEEDS REAL CONTENT (Currently Placeholders):**
- Team page: Need actual coalition officers and members
- Events page: Need real upcoming events
- About page: Verify mission/vision accuracy
- Partner logos: Could add actual logos
- Hero section: Could add background image
- Contact form: Connect to backend (GHL or other)
- Social media: Update to real P4P profiles

### 💻 Tech Stack
- Next.js 16.1.6 with App Router
- React 19.2.4
- Tailwind CSS 3.4.19
- Framer Motion 12.34.0
- TypeScript 5.9.3

### 📁 Key Files
```
app/page.tsx           # Home page
app/team/page.tsx      # Team (Chamber-style)
app/about/page.tsx     # Mission, values
components/Hero.tsx    # Hero section
components/Partners.tsx # Partner orgs
app/globals.css        # Design system + colors
tailwind.config.ts     # Color definitions
```

### 🛠️ Common Commands
```bash
cd "/Users/brettlechtenberg/Desktop/Claude Projects/P4P-Website"
npm run dev                 # Start dev server
npm run build              # Test build
vercel --prod --yes        # Deploy (ALWAYS use CLI)
```

### ⚠️ Important Notes
1. **Always deploy via Vercel CLI** - standard uploads have issues
2. **Color scheme is Black/Orange/White** - not purple like MACC
3. **Team/About content are placeholders** - couldn't scrape from GoHighLevel (403)
4. **Current P4P site is at murrayp4p.com** - built in GoHighLevel

---

### What would you like to work on?

Options:
1. Add real team member content (need you to provide names/titles/bios)
2. Add hero background image
3. Connect contact form to backend
4. Add partner organization logos
5. Create additional pages
6. Other improvements

---

*Last Updated: February 11, 2026*
