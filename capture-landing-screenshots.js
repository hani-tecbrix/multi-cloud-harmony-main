import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = './public/landing-screenshots';
const BASE_URL = 'http://localhost:5173';

// Create directory if it doesn't exist
mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function captureScreenshots() {
  console.log('🚀 Starting landing page screenshot capture...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // Step 1: Login
    console.log('📸 Step 1: Logging in...');
    await page.goto(BASE_URL);
    await page.waitForTimeout(2000);
    
    await page.fill('input[type="email"]', 'user@mindverse.com');
    await page.fill('input[type="password"]', 'user123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Step 2: Capture Dashboard Screenshot
    console.log('📸 Step 2: Capturing Dashboard screenshot...');
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(3000);
    
    // Wait for charts to load
    await page.waitForSelector('canvas, svg', { timeout: 10000 }).catch(() => {
      console.log('⚠️ Charts may not be loaded, proceeding...');
    });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: join(SCREENSHOT_DIR, 'dashboard.png'), 
      fullPage: true 
    });
    console.log('✅ Dashboard screenshot saved');

    // Step 3: Capture Spend Over Time Chart Screenshot
    console.log('📸 Step 3: Capturing Spend Over Time chart...');
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(3000);
    
    // Wait for the chart card
    await page.waitForSelector('text=Spend Over Time', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Find the chart card and capture it
    const chartCard = page.locator('text=Spend Over Time').locator('..').locator('..').first();
    const cardCount = await chartCard.count();
    
    if (cardCount > 0) {
      await chartCard.screenshot({ 
        path: join(SCREENSHOT_DIR, 'spend-over-time-chart.png')
      });
      console.log('✅ Spend Over Time chart screenshot saved');
    } else {
      // Fallback: capture area around chart
      await page.screenshot({ 
        path: join(SCREENSHOT_DIR, 'spend-over-time-chart.png'),
        clip: { x: 0, y: 400, width: 900, height: 500 }
      });
      console.log('✅ Spend Over Time chart screenshot saved (fallback)');
    }

    // Step 4: Capture Marketplace Screenshot
    console.log('📸 Step 4: Capturing Marketplace screenshot...');
    await page.goto(`${BASE_URL}/marketplace`);
    await page.waitForTimeout(3000);
    
    // Wait for marketplace content to load
    await page.waitForSelector('text=Marketplace, text=Vendor, text=Product', { timeout: 10000 }).catch(() => {
      console.log('⚠️ Marketplace content may not be loaded, proceeding...');
    });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: join(SCREENSHOT_DIR, 'marketplace.png'), 
      fullPage: true 
    });
    console.log('✅ Marketplace screenshot saved');

    console.log('✅ All landing page screenshots captured successfully!');
    console.log(`📁 Screenshots saved to: ${SCREENSHOT_DIR}`);

  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

captureScreenshots();

