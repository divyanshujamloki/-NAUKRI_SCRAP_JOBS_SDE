const express = require("express");
const router = express.Router();

const main = require("../ScrapeFn/Scrape");

const path = require("path");


router.get("/", async (req, res) => {
  const htmlPath = path.join(__dirname, "public", "index.html");
  res.sendFile(htmlPath);
});

//scarping starts
router.post("/naukri", async (req, res) => {
  try {
    let skill = req.body.skill;
    let scrape = await main(skill);
    return res.status(200).json({
      status: "ok",
      list: scrape.list,
    });
  } catch (error) {
    console.log(error);
  }
});

//router to getData
router.get("/getData", async (req, res) => {
  try {
    const jobs = path.join(__dirname, "..", "jobs.json");
    res.sendFile(jobs);
  } catch (error) {}
});

module.exports = router;
