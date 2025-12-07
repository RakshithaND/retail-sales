const express = require("express");
const router = express.Router();
const { salesData } = require("../../services/dataService");  // ✅ FIXED PATH

const toNum = (v) => Number(v) || 0;

router.get("/", (req, res) => {
  try {
    const customers = {};

    salesData.forEach((item) => {
      const name = item["Customer Name"];
      const amount = toNum(item["FinalAmount"]);
      const status = item.Status || "Active"; // fallback

      if (status !== "Active") return;

      if (!customers[name]) {
        customers[name] = {
          customerName: name,
          region: item["Customer Region"],
          totalSpent: 0
        };
      }

      customers[name].totalSpent += amount;
    });

    res.json({ activeCustomers: Object.values(customers) });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
