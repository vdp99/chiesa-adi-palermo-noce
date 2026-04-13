const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const baseDir = 'C:/Users/vince/Desktop/Chiesa ADI Palermo Noce';
const screenshotsDir = path.join(baseDir, 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

const pages = [
  { file: 'index.html',     name: 'index' },
  { file: 'chi-siamo.html', name: 'chi-siamo' },
  { file: 'attivita.html',  name: 'attivita' },
  { file: 'culti.html',     name: 'culti' },
  { file: 'blog.html',      name: 'blog' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const filePath = path.join(baseDir, p.file).replace(/\\/g, '/');
    const url = 'file:///' + filePath;
    console.log('Shot:', p.file);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotsDir, p.name + '.png'), fullPage: true });
    console.log('  -> saved', p.name + '.png');
    await page.close();
  }
  await browser.close();
  console.log('Done!');
})();
