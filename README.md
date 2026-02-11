# Murray Partners 4 Prevention Coalition Website

A modern, world-class website for the Murray Partners 4 Prevention Coalition, built with Next.js 16, React 19, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript)

## 🌐 Live Site

**Production:** https://p4p-website-6az6uzr9b-bretts-projects-3e254e58.vercel.app

## 📋 About

Murray Partners 4 Prevention (P4P) is a community coalition dedicated to building a stronger, safer Murray. This website serves as the digital presence for the coalition, featuring:

- **Mission & Vision** - A connected and compassionate Murray where all residents are empowered to thrive
- **Coalition Team** - Leadership and members from partner organizations
- **Community Events** - Upcoming and past community activities
- **Partner Organizations** - 9+ community partners working together
- **Get Involved** - Volunteer, donate, and partnership opportunities

## 🎨 Design

The site features a **glassmorphic design system** with:
- Animated aurora background (orange glow)
- Glass cards with backdrop blur effects
- Smooth Framer Motion animations
- Mobile-first responsive design

**Color Scheme:**
- Primary: Black (#1C1C1C)
- Accent: Orange (#F27A21)
- Text: White (#FFFFFF)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Vercel

## 📁 Project Structure

```
├── app/
│   ├── page.tsx           # Home
│   ├── about/page.tsx     # About Us
│   ├── team/page.tsx      # Coalition Team
│   ├── events/page.tsx    # Events
│   ├── contact/page.tsx   # Contact
│   └── get-involved/page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Partners.tsx
│   └── animations/
└── public/images/
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod --yes
```

## 📝 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, partners, contact CTA |
| About | `/about` | Mission, vision, values |
| Team | `/team` | Coalition officers & members |
| Events | `/events` | Community calendar |
| Contact | `/contact` | Contact form |
| Get Involved | `/get-involved` | Volunteer, donate, partner |

## 🔗 Related

- **Current Site:** https://murrayp4p.com/ (GoHighLevel)
- **Reference Design:** [Murray Chamber of Commerce](https://macc-website-2.vercel.app/)

## 📄 License

Private - Murray Partners 4 Prevention Coalition

---

Built with ❤️ for the Murray community
