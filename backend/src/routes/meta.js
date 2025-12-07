const express = require('express');
const router = express.Router();

const { salesData } = require('../services/dataService');

// unique helper
const unique = arr => [...new Set(arr.filter(Boolean))];

router.get('/', (req, res) => {
  try {
    res.json({
      regions: unique(salesData.map(r => r["Customer Region"])),
      genders: unique(salesData.map(r => r["Gender"])),
      categories: unique(salesData.map(r => r["Product Category"])),
      paymentMethods: unique(salesData.map(r => r["Payment Method"])),
      tags: unique(
        salesData.flatMap(r =>
          (r["Tags"] || "").split(",").map(t => t.trim())
        )
      )
    });
  } catch (err) {
    console.error("Error in /meta:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
