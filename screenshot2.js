const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const baseDir = 'C:/Users/vince/Desktop/Chiesa ADI Palermo Noce';
const screenshotsDir = path.join(baseDir, 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

const pages = [
  { file: 'chi-siamo.html',           name: 'chi-siamo' },
  { file: 'blog.html',                name: 'blog-new' },
  { file: 'blog-niente-scalpello.html', name: 'articolo-scalpello' },
  { file: 'blog-rapporto-di-coppia.html', name: 'articolo-coppia' },
  { file: 'blog-depressione.html',    name: 'articolo-depressione' },
  { file: 'index.html',               name: 'homepage-new' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const url = 'file:///' + path.join(baseDir, p.file).replace(/\/g, '/');
    console.log('Shot:', p.file);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(()=>{});
    await page.evaluate(() => new Promise(r => {
      let pos = 0, total = document.body.scrollHeight;
      const tick = () => { pos += 500; window.scrollTo(0,pos); pos < total ? setTimeout(tick,40) : setTimeout(()=>{ window.scrollTo(0,0); setTimeout(r,300); },200); };
      tick();
    }));
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, p.name+'.png'), fullPage: true });
    console.log('  -> saved', p.name+'.png');
    await page.close();
  }
  await browser.close();
  console.log('Done!');
})();
