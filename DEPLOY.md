# 🚀 Quick Deploy Guide - Cloudflare Pages

## Fastest Way to Deploy (5 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy via Cloudflare Dashboard

1. **Go to**: https://dash.cloudflare.com/ → **Pages** → **Create a project**
2. **Connect Git**: Choose GitHub → Select `Vinkand-v2` repository
3. **Build Settings**:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Build output: `dist`
4. **Environment Variables**:
   - Add `GEMINI_API_KEY` with your API key value
5. **Deploy**: Click "Save and Deploy"

### 3. Your Site is Live! 🎉
- Default URL: `https://vinkand-technologies.pages.dev`
- Add custom domain in Cloudflare Pages settings

---

## Build Settings Summary

| Setting | Value |
|---------|-------|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (empty) |
| Node version | 20 (default) |

---

## Environment Variables Required

Add these in Cloudflare Pages → Settings → Environment variables:

- **Name**: `GEMINI_API_KEY`
- **Value**: Your Gemini API key
- **Apply to**: All environments

---

## Custom Domain Setup

1. In Cloudflare Pages → Your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `vinkand.com`)
4. Update your DNS records as instructed
5. Wait for SSL certificate (usually 1-5 minutes)

---

## Troubleshooting

**Build fails?**
- Check build logs in Cloudflare dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**Environment variables not working?**
- Make sure variable name is exactly `GEMINI_API_KEY`
- Restart the build after adding variables
- Check that variables are applied to the correct environment

**404 errors on routes?**
- The `_redirects` file handles SPA routing
- Ensure it's in the `dist` folder after build

---

## Need Help?

Check the detailed guide: `cloudflare-pages-deploy.md`


