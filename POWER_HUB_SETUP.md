# Power Hub CMS - Setup Guide

> A simple, production-ready CMS for client websites. No databases, no complex dependencies.
> Powered by GitHub API + Vercel auto-deploy.

---

## How It Works

```
Client Browser → Power Hub UI → GitHub API → Vercel Auto-Deploy → Live Site
```

1. Client logs into Power Hub at `/power-hub`
2. Edits content in a user-friendly JSON editor
3. Clicks "Save & Deploy"
4. Changes are committed directly to GitHub via API
5. Vercel detects the commit and auto-deploys
6. Live site updates in ~30 seconds

---

## Architecture

```
/app
  /power-hub
    /page.tsx                    # Login page
    /layout.tsx                  # Fixed positioning (escapes parent layout)
    /dashboard
      /layout.tsx                # Auth check + sidebar layout
      /page.tsx                  # Dashboard home
      /content
        /page.tsx                # List content files
        /[file]/page.tsx         # Edit content file
      /ai/page.tsx               # AI content assist (optional)
      /settings/page.tsx         # Settings page (optional)

  /api/power-hub
    /content/route.ts            # GitHub API for read/write content

/components/power-hub
  /Sidebar.tsx                   # Navigation sidebar
  /Header.tsx                    # Page headers

/content
  /home.json                     # Homepage content
  /about.json                    # About page content
  /[any].json                    # Any page content
```

---

## Required Environment Variables

Add these to your Vercel project settings:

| Variable | Description | How to Get |
|----------|-------------|------------|
| `GITHUB_TOKEN` | Personal Access Token | GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens → Create with `repo` scope |
| `GITHUB_OWNER` | Repository owner | Your GitHub username or org name |
| `GITHUB_REPO` | Repository name | The repo name (e.g., "P4P-Website") |
| `GITHUB_BRANCH` | Branch to commit to | Usually "main" |

### Creating a GitHub Token

1. Go to https://github.com/settings/tokens?type=beta
2. Click "Generate new token"
3. Name it: "[Project Name] Power Hub"
4. Select repository: Choose the specific repo
5. Permissions needed:
   - **Contents**: Read and write
6. Generate and copy the token
7. Add to Vercel: Project → Settings → Environment Variables

---

## Adding to a New Project

### Step 1: Copy Core Files

Copy these directories to your new project:
- `/app/power-hub/` (entire directory)
- `/app/api/power-hub/` (entire directory)
- `/components/power-hub/` (entire directory)

### Step 2: Create Content Directory

```bash
mkdir content
```

Create JSON files for each page:
```json
// content/home.json
{
  "hero": {
    "headline": "Your headline here",
    "subheadline": "Your subheadline here"
  }
}
```

### Step 3: Use Content in Your Pages

```tsx
// app/page.tsx
import homeContent from '@/content/home.json';

export default function Home() {
  const { hero } = homeContent;

  return (
    <h1>{hero.headline}</h1>
  );
}
```

### Step 4: Add TypeScript Path Alias

In `tsconfig.json`, ensure you have:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Step 5: Configure Environment Variables

Add to `.env.local` for local development:
```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=YourUsername
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main
```

Add the same variables to Vercel for production.

### Step 6: Update Branding

1. Change colors in Sidebar.tsx, Header.tsx, and page files
2. Update logo in login page
3. Update login credentials in `/app/power-hub/page.tsx`

---

## Customization

### Adding New Content Files

1. Create `/content/newpage.json` with your structure
2. It will automatically appear in Power Hub
3. Import it in your page: `import content from '@/content/newpage.json'`

### Changing Login Credentials

Edit `/app/power-hub/page.tsx`:
```tsx
if (username === 'youradmin' && password === 'yourpassword') {
  // ...
}
```

### Changing Brand Colors

Search and replace in `/components/power-hub/` and `/app/power-hub/`:
- `#F27A21` → Your primary color
- `#F9A45A` → Your secondary/hover color

---

## Security Notes

1. **Login**: Client-side only (localStorage). For higher security, implement server-side auth.
2. **GitHub Token**: Has write access to repo. Use fine-grained tokens with minimal permissions.
3. **Content Only**: API only allows writing to `/content` directory.

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

---

## File Reference

### /app/api/power-hub/content/route.ts
Core API for reading/writing content via GitHub API.
- `GET /api/power-hub/content` - List all JSON files
- `GET /api/power-hub/content?file=home.json` - Get specific file
- `PUT /api/power-hub/content` - Save and commit file

### /app/power-hub/dashboard/content/[file]/page.tsx
JSON editor with recursive component for nested objects/arrays.

### /components/power-hub/Sidebar.tsx
Navigation sidebar. Add/remove menu items here.

---

## Deployment Checklist

- [ ] GitHub token created with correct permissions
- [ ] Environment variables added to Vercel
- [ ] Content directory has at least one JSON file
- [ ] Pages import and use content from JSON files
- [ ] Login credentials updated
- [ ] Branding colors updated
- [ ] Test: Login → Edit content → Save & Deploy → Verify live site updates
