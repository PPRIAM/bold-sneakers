const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Desktop
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'C:/Users/Lenovo/.gemini/antigravity-cli/brain/216732fa-e818-4058-aee1-4e7694c411d5/desktop_review.png', fullPage: true });
  
  // Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'C:/Users/Lenovo/.gemini/antigravity-cli/brain/216732fa-e818-4058-aee1-4e7694c411d5/mobile_review.png', fullPage: false });
  
  await browser.close();
  console.log('Screenshots saved.');
})();
