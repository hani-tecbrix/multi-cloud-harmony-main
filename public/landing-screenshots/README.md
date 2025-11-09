# Landing Page Screenshots

This directory contains screenshots used on the landing page.

## Required Screenshots

1. **dashboard.png** - Full dashboard page screenshot
2. **marketplace.png** - Full marketplace page screenshot  
3. **spend-over-time-chart.png** - Screenshot of the "Spend Over Time" chart card from the dashboard

## How to Capture Screenshots

### Option 1: Automated Script (Recommended)

1. Make sure the dev server is running:
   ```bash
   npm run dev
   ```

2. Run the screenshot capture script:
   ```bash
   node capture-landing-screenshots.js
   ```

   The script will:
   - Log in automatically
   - Navigate to each page
   - Capture and save screenshots to this directory

### Option 2: Manual Capture

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open browser to `http://localhost:5173`

3. Login with:
   - Email: `user@mindverse.com`
   - Password: `user123`

4. Capture screenshots:

   **Dashboard Screenshot:**
   - Navigate to `/dashboard`
   - Wait for charts to load (2-3 seconds)
   - Take full page screenshot
   - Save as `dashboard.png`

   **Marketplace Screenshot:**
   - Navigate to `/marketplace`
   - Wait for content to load
   - Take full page screenshot
   - Save as `marketplace.png`

   **Spend Over Time Chart:**
   - Navigate to `/dashboard`
   - Find the "Spend Over Time" card (left side, top chart)
   - Take screenshot of just that card
   - Save as `spend-over-time-chart.png`

## Screenshot Requirements

- **Resolution**: Minimum 1920x1080 (full page screenshots)
- **Format**: PNG
- **Quality**: High quality, clear text
- **Content**: Should show the actual UI with data/charts visible

## Notes

- Screenshots should be taken in a clean browser window (no extensions visible)
- Make sure all charts and data are loaded before capturing
- Use browser's full page screenshot feature for best results
- The Spend Over Time chart screenshot should focus on the chart card specifically

