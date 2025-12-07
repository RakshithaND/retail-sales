const express = require("express");
const router = express.Router();
const { salesData } = require("../services/dataService");

// ---------- Gender Distribution ----------
function getGenderStats() {
  let male = 0, female = 0;

  salesData.forEach((r) => {
    if (r.gender === "Male") male++;
    else if (r.gender === "Female") female++;
  });

  return [
    { name: "Male", value: male },
    { name: "Female", value: female }
  ];
}

// ---------- Category Analysis ----------
function getCategoryStats() {
  const map = {};

  salesData.forEach((r) => {
    const cat = r.product_category;
    const amount = Number(r.total_amount) || 0;
    if (!map[cat]) map[cat] = 0;
    map[cat] += amount;
  });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value
  }));
}

// ---------- API Route ----------
router.get("/", (req, res) => {
  try {
    res.json({
      gender: getGenderStats(),
      category: getCategoryStats()
    });
  } catch (err) {
    console.error("Nexus error:", err);
    res.status(500).json({ error: "Nexus analytics failed." });
  }
});

module.exports = router;
