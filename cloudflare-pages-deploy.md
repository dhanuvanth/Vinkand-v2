# Deploying VinKand Website to Cloudflare Pages

## Prerequisites
- A Cloudflare account (free tier works)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 20+ installed locally (for testing builds)

## Method 1: Deploy via Cloudflare Dashboard (Recommended)

### Step 1: Prepare Your Repository
1. Make sure your code is pushed to GitHub/GitLab/Bitbucket
2. Ensure you have a `.env` file with your `GEMINI_API_KEY` (we'll add this as a secret in Cloudflare)

### Step 2: Connect to Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Click **Connect to Git**
5. Select your Git provider (GitHub/GitLab/Bitbucket)
6. Authorize Cloudflare to access your repositories
7. Select the `Vinkand-v2` repository

### Step 3: Configure Build Settings
Use these settings:
- **Project name**: `vinkand-technologies` (or your preferred name)
- **Production branch**: `main` (or `master`)
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty if repo root)

### Step 4: Add Environment Variables
1. In the build settings, scroll to **Environment variables**
2. Click **Add variable**
3. Add the following:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
   - **Environment**: Select all (Production, Preview, Branch deploys)

### Step 5: Deploy
1. Click **Save and Deploy**
2. Cloudflare will build and deploy your site
3. Your site will be available at: `https://vinkand-technologies.pages.dev` (or your custom domain)

### Step 6: Custom Domain (Optional)
1. After deployment, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `vinkand.com`)
4. Follow the DNS configuration instructions

---

## Method 2: Deploy via Wrangler CLI

### Step 1: Install Wrangler
```bash
npm install -g wrangler
# or
npm install --save-dev wrangler
```

### Step 2: Login to Cloudflare
```bash
wrangler login
```

### Step 3: Create `wrangler.toml` (Optional)
Create a `wrangler.toml` file in your project root:
```toml
name = "vinkand-technologies"
compatibility_date = "2024-01-01"

[env.production]
name = "vinkand-technologies"
```

### Step 4: Build and Deploy
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=vinkand-technologies
```

### Step 5: Set Environment Variables
```bash
wrangler pages secret put GEMINI_API_KEY
# Enter your API key when prompted
```

---

## Important Notes

### Environment Variables
- Cloudflare Pages uses `VITE_` prefix for client-side variables
- For the Gemini API key, use `VITE_GEMINI_API_KEY` in your `.env` file
- Or set it as `GEMINI_API_KEY` in Cloudflare dashboard (it will be available as `process.env.GEMINI_API_KEY`)

### Build Configuration
- The `_redirects` file ensures all routes redirect to `index.html` for SPA routing
- Your HashRouter (`#/`) will work correctly with this setup

### Testing Locally
Before deploying, test the production build:
```bash
npm run build
npm run preview
```

### Continuous Deployment
- Cloudflare Pages automatically deploys on every push to your main branch
- Preview deployments are created for pull requests

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 20+ (Cloudflare uses Node 20 by default)
- Check build logs in Cloudflare dashboard

### Environment Variables Not Working
- Make sure variables are set in Cloudflare dashboard
- Use `VITE_` prefix for client-side variables
- Restart the build after adding new variables

### Routing Issues
- The `_redirects` file should handle SPA routing
- If using HashRouter, ensure all links use `#/` prefix

---

## Quick Deploy Checklist
- [ ] Code pushed to Git repository
- [ ] `.env` file has `GEMINI_API_KEY` (for reference)
- [ ] Connected repository to Cloudflare Pages
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Added `GEMINI_API_KEY` as environment variable in Cloudflare
- [ ] Deployed successfully
- [ ] Tested the live site
- [ ] Configured custom domain (optional)


