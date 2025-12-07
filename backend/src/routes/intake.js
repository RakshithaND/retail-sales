// backend/src/routes/intake.js
const express = require("express");
const router = express.Router();
const { salesData } = require("../services/dataService");

// Convert to lowercase check
function match(str, val) {
  return str?.toString().toLowerCase().includes(val.toLowerCase());
}

router.get("/", (req, res) => {
  try {
    const { q = "", gender = "", region = "" } = req.query;

    let out = salesData;

    if (q) {
      out = out.filter(
        r =>
          match(r.customer_name, q) ||
          match(r.phone_number, q) ||
          match(r.transaction_id, q)
      );
    }

    if (gender) {
      out = out.filter(r => r.gender?.toLowerCase() === gender.toLowerCase());
    }

    if (region) {
      out = out.filter(
        r => r.customer_region?.toLowerCase() === region.toLowerCase()
      );
    }

    res.json({ data: out });
  } catch (err) {
    console.error("INTAKE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
