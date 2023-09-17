const fs = require("fs");
const puppeteer = require("puppeteer");

const data = {
  list: [],
};

async function main(skill) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

    try {
      //www.naukri.com/sde-jobs?k=sde
      https: await page.goto(`https://www.naukri.com/${skill}-jobs`, {
        timeout: 0,
        waitUntil: "networkidle0",
      });

    const jobData = await page.evaluate(async (data) => {
      const items = document.querySelectorAll(".jobTupleHeader");

      items.forEach((item, index) => {
        console.log(`Scraping data of job: ${index}`);
        const title = item.querySelector(".title")?.innerText;
        const company = item.querySelector(".subTitle")?.innerText;
        const location = item.querySelector(".locWdth")?.innerText;
        const link = item.querySelector("a.title")?.href;

        data.list.push({
          title,
          company,
          location,
          link,
        });
      });

      return data;
    }, data);

    console.log(`Successfully collected ${jobData.list.length} job listings`);

    const json = JSON.stringify(jobData, null, 2);
    await fs.promises.writeFile("naukri_jobs.json", json, "utf8");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }

  return data;
}

module.exports = main;
