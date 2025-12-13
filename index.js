const puppeteer = require("puppeteer");
const fs = require("fs");

async function Parser() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.npmjs.com/search?q=parser", {
    waitUntil: "networkidle2",
  });

  let allItems = [];
  let pageNum = 1;

  while (true) {
    const items = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('a[href^="/package/"]'),
        (el) => ({
          name: el.querySelector("h3")?.textContent.trim(),
          link: el.href,
        })
      );
    });

    if (items.length === 0) break;

    allItems.push(...items);
    console.log(`Зібрано: ${allItems.length}`);

    const nextBtn = await page.$('nav[role="navigation"][aria-label="Pagination Navigation"]');
    if (!nextBtn) break;

    if (pageNum > 3){
        await nextBtn.click();
       await new Promise(r => setTimeout(r, 3000))
    }

    const nextLink = await page.$('a[aria-label="Next page"]');
    if (!nextLink) break;

    
    await Promise.all([
      nextBtn.click(),
      page.waitForNavigation({ waitUntil: "networkidle2", timeout: 3000 }).catch(() => {})
    ]);


    pageNum++;
  }

  fs.writeFileSync("items.txt", JSON.stringify(allItems, null, 2), "utf-8");

  await browser.close();
}

Parser();
