# Google Analytics Setup Guide

## Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or select an existing one
3. Go to **Admin** → **Data Streams**
4. Click on your web stream (or create a new one)
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Add to Your Website

### Option A: Direct Replacement (Quick)

1. Open `index.html`
2. Find line with: `const gaId = 'YOUR_GA_MEASUREMENT_ID';`
3. Replace `YOUR_GA_MEASUREMENT_ID` with your actual ID:
   ```javascript
   const gaId = 'G-XXXXXXXXXX'; // Your actual ID
   ```

### Option B: Environment Variable (Recommended for Production)

1. Create/update your `.env` file:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. Update `index.html` to use the environment variable:
   ```javascript
   const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'YOUR_GA_MEASUREMENT_ID';
   ```

3. For Cloudflare Pages:
   - Add `VITE_GA_MEASUREMENT_ID` as an environment variable in Cloudflare Pages settings
   - Value: Your GA4 Measurement ID

## Step 3: Verify It's Working

1. Deploy your site
2. Visit your website
3. Go to Google Analytics → **Reports** → **Realtime**
4. You should see your visit appear within a few seconds

## What's Tracked

✅ **Page Views** - Automatically tracked on every route change  
✅ **Page Titles** - Dynamic titles for each page  
✅ **User Navigation** - Hash router navigation is tracked  
✅ **SPA Routing** - Works correctly with React Router HashRouter

## Testing Locally

1. Set your GA ID in `index.html` or `.env` file
2. Run `npm run dev`
3. Visit your local site
4. Check Google Analytics Realtime reports

## Troubleshooting

**Not seeing data?**
- Make sure the GA ID starts with `G-`
- Check browser console for errors
- Verify the script is loading (check Network tab)
- Ensure ad blockers aren't blocking Google Analytics

**Page views not tracking?**
- The `useGoogleAnalytics` hook automatically tracks route changes
- Check that `window.gtag` is defined in browser console
- Verify the path is being sent correctly


