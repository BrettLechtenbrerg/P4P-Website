# Power Hub CMS - Complete Setup Guide

> A production-ready CMS for client websites. No databases, no complex dependencies.
> Powered by GitHub API + Vercel Blob Storage + Optional AI Assist.

**Version:** 2.0 (February 2026)
**Last Updated:** February 15, 2026

---

## Table of Contents

1. [How It Works](#how-it-works)
2. [Complete File Structure](#complete-file-structure)
3. [Features](#features)
4. [Environment Variables](#environment-variables)
5. [Duplication Guide](#duplication-guide)
6. [Customization](#customization)
7. [API Reference](#api-reference)
8. [Troubleshooting](#troubleshooting)
9. [Deployment Checklist](#deployment-checklist)

---

## How It Works

```
Client Browser → Power Hub UI → GitHub API → Vercel Auto-Deploy → Live Site
                              ↘ Vercel Blob (images)
                              ↘ Claude/OpenAI API (AI Assist)
```

1. Client logs into Power Hub at `/power-hub`
2. Edits content in a user-friendly JSON editor
3. Uploads images via Media Library (stored in Vercel Blob)
4. Optionally uses AI Assist for content improvement (BYOK - Bring Your Own Key)
5. Clicks "Save & Deploy"
6. Changes are committed directly to GitHub via API
7. Vercel detects the commit and auto-deploys
8. **Live site updates in approximately 5 minutes**

---

## Complete File Structure

### Power Hub App Pages
```
/app/power-hub/
├── page.tsx                           # Login page
├── layout.tsx                         # Fixed positioning layout
└── dashboard/
    ├── layout.tsx                     # Auth check + sidebar layout
    ├── page.tsx                       # Dashboard home
    ├── content/
    │   ├── page.tsx                   # List all content files
    │   └── [file]/page.tsx            # Edit individual content file
    ├── media/page.tsx                 # Media Library (image uploads)
    ├── ai/page.tsx                    # AI Content Assist (BYOK)
    └── settings/page.tsx              # Settings page
```

### API Routes
```
/app/api/power-hub/
├── auth/route.ts                      # Authentication
├── content/route.ts                   # GitHub API read/write content
├── upload/route.ts                    # Upload images to Vercel Blob
├── media/route.ts                     # List images from Vercel Blob
├── deploy/route.ts                    # Deploy via git push
└── ai/route.ts                        # AI API (Claude & OpenAI)
```

### Components
```
/components/power-hub/
├── Sidebar.tsx                        # Navigation sidebar
└── Header.tsx                         # Page headers
```

### Content Files (example)
```
/content/
├── home.json                          # Homepage content
├── about.json                         # About page
├── contact.json                       # Contact page
├── events.json                        # Events page
├── team.json                          # Team page
├── members.json                       # Members page
├── get-involved.json                  # Get Involved page
├── privacy.json                       # Privacy Policy
└── terms.json                         # Terms of Service
```

---

## Features

### 1. Content Editor
- Visual JSON editor with nested object/array support
- Auto-saves to GitHub with SHA conflict prevention
- Syntax-aware editing for strings, numbers, booleans

### 2. Media Library
- Drag & drop image uploads
- Images stored in Vercel Blob (persistent, CDN-backed)
- Copy URL button for easy embedding in content
- Grid/List view toggle
- Search functionality

### 3. AI Content Assist (BYOK)
- **Bring Your Own Key** - users enter their own API key
- Supports both Claude (Anthropic) and ChatGPT (OpenAI)
- Quick Actions: Improve, Shorten, Expand, Headlines, CTA, Professional, Casual, Fix Grammar
- Custom prompts for any content task
- Keys stored in localStorage (client-side only)

### 4. Settings
- Site configuration
- Appearance settings
- Notification preferences

---

## Environment Variables

### Required Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| `GITHUB_TOKEN` | Personal Access Token | GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens |
| `GITHUB_OWNER` | Repository owner | Your GitHub username or org name |
| `GITHUB_REPO` | Repository name | The repo name (e.g., "My-Website") |
| `GITHUB_BRANCH` | Branch to commit to | Usually "main" |

### Optional Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| `BLOB_READ_WRITE_TOKEN` | For image uploads | Vercel → Project → Storage → Blob → Create Store → Connect |
| `VERCEL_DEPLOY_HOOK` | Manual deploy trigger | Vercel → Project → Settings → Git → Deploy Hooks |

### Creating a GitHub Token

1. Go to https://github.com/settings/tokens?type=beta
2. Click "Generate new token"
3. Name it: "[Project Name] Power Hub CMS"
4. Select repository: Choose the specific repo
5. Permissions needed:
   - **Contents**: Read and write
6. Generate and copy the token
7. Add to Vercel: Project → Settings → Environment Variables

### Setting Up Vercel Blob Storage

1. Go to Vercel Dashboard → Your Project → Storage
2. Click "Create Database" → "Blob"
3. Name it (e.g., "power-hub-media")
4. Click "Connect to Project"
5. The `BLOB_READ_WRITE_TOKEN` is automatically added to your project

---

## Duplication Guide

### Step 1: Copy Core Files

Copy these directories to your new project:

```bash
# From the source project, copy:
/app/power-hub/                 → /app/power-hub/
/app/api/power-hub/             → /app/api/power-hub/
/components/power-hub/          → /components/power-hub/
```

### Step 2: Install Dependencies

```bash
npm install @vercel/blob lucide-react
```

### Step 3: Create Content Directory

```bash
mkdir content
```

Create at least one JSON file:

```json
// content/home.json
{
  "hero": {
    "headline": "Your headline here",
    "subheadline": "Your subheadline here"
  },
  "features": [
    {
      "title": "Feature 1",
      "description": "Description here"
    }
  ]
}
```

### Step 4: Use Content in Pages

```tsx
// app/page.tsx
import homeContent from '@/content/home.json';

export default function Home() {
  const { hero, features } = homeContent;

  return (
    <main>
      <h1>{hero.headline}</h1>
      <p>{hero.subheadline}</p>
      {features.map((feature, i) => (
        <div key={i}>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </main>
  );
}
```

### Step 5: Configure TypeScript

Ensure `tsconfig.json` has the path alias:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Step 6: Set Environment Variables

**Local Development** (`.env.local`):
```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=YourUsername
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main
```

**Production**: Add the same variables in Vercel → Project → Settings → Environment Variables

### Step 7: Update Branding

1. **Colors**: Search and replace in `/components/power-hub/` and `/app/power-hub/`:
   - `#F27A21` → Your primary color
   - `#F9A45A` → Your secondary/hover color

2. **Logo**: Update in `/app/power-hub/page.tsx` (login page)

3. **Login Credentials**: Edit `/app/power-hub/page.tsx`:
   ```tsx
   if (username === 'admin' && password === 'yourpassword') {
     // ...
   }
   ```

### Step 8: Deploy & Test

1. Push to GitHub
2. Vercel auto-deploys
3. Add environment variables in Vercel
4. Redeploy to pick up variables
5. Test: Login → Edit content → Save → Verify site updates

---

## Customization

### Adding New Content Files

1. Create `/content/newpage.json` with your JSON structure
2. It automatically appears in Power Hub's content list
3. Import in your page: `import content from '@/content/newpage.json'`

### Modifying the Sidebar

Edit `/components/power-hub/Sidebar.tsx`:

```tsx
const menuItems = [
  { name: 'Dashboard', href: '/power-hub/dashboard', icon: LayoutDashboard },
  { name: 'Content', href: '/power-hub/dashboard/content', icon: FileText },
  { name: 'Media', href: '/power-hub/dashboard/media', icon: Image },
  { name: 'AI Assist', href: '/power-hub/dashboard/ai', icon: Sparkles },
  { name: 'Settings', href: '/power-hub/dashboard/settings', icon: Settings },
  // Add more items here
];
```

### Disabling Features

- **AI Assist**: Remove `/app/power-hub/dashboard/ai/` and the sidebar link
- **Media Library**: Remove `/app/power-hub/dashboard/media/` and related API routes
- **Settings**: Remove `/app/power-hub/dashboard/settings/`

---

## API Reference

### Content API (`/api/power-hub/content`)

**GET** - List all content files or get specific file:
```
GET /api/power-hub/content                    → Lists all .json files
GET /api/power-hub/content?file=home.json     → Returns file content + SHA
```

**PUT** - Update content file:
```json
{
  "file": "home.json",
  "content": { "hero": { "headline": "New" } },
  "sha": "abc123...",
  "commitMessage": "Update homepage"
}
```

### Upload API (`/api/power-hub/upload`)

**POST** - Upload image (multipart/form-data):
- Field: `file` (image file)
- Returns: `{ url: "https://...", filename: "image.png" }`

### Media API (`/api/power-hub/media`)

**GET** - List all uploaded images:
- Returns: `{ media: [{ id, name, url, size, uploaded }] }`

### AI API (`/api/power-hub/ai`)

**POST** - Generate AI content:
```json
{
  "content": "Original text...",
  "prompt": "Make this more engaging",
  "apiKey": "sk-...",
  "provider": "claude" | "openai"
}
```

---

## Troubleshooting

### "GITHUB_TOKEN environment variable is not set"
- Check Vercel environment variables are configured
- Redeploy after adding variables

### "Failed to read content"
- Check GitHub token has `Contents: Read and write` permission
- Verify repo name and owner are correct

### "SHA is required for updates"
- This prevents conflicts. Refresh the page to get the latest SHA.

### Images not persisting
- Ensure `BLOB_READ_WRITE_TOKEN` is set in Vercel
- Check Vercel Blob storage is connected to the project

### AI not working
- Users need to enter their own API key (BYOK)
- Keys are stored in browser localStorage
- Test with a valid Claude or OpenAI API key

---

## Security Notes

1. **Login**: Client-side authentication (localStorage). For higher security, implement server-side auth (NextAuth, Clerk, etc.)
2. **GitHub Token**: Has write access to repo. Use fine-grained tokens with minimal permissions.
3. **Content Only**: API only allows writing to `/content` directory.
4. **AI Keys**: Stored in browser localStorage - never sent to your server permanently.

---

## Deployment Checklist

### Initial Setup
- [ ] GitHub token created with `Contents: Read and write` permission
- [ ] Environment variables added to Vercel
- [ ] Vercel Blob storage created and connected (for images)
- [ ] Content directory has at least one JSON file
- [ ] Pages import and use content from JSON files

### Branding
- [ ] Primary color updated (`#F27A21` → your color)
- [ ] Secondary color updated (`#F9A45A` → your hover color)
- [ ] Logo updated on login page
- [ ] Login credentials changed from defaults

### Testing
- [ ] Login works
- [ ] Content editing works
- [ ] Save & Deploy commits to GitHub
- [ ] Images upload to Vercel Blob
- [ ] AI Assist works with API key (optional)
- [ ] Live site updates after deploy (~5 minutes)

---

## Support

For questions or issues, contact the development team.

Built with Next.js, Vercel, GitHub API, and Vercel Blob Storage.
