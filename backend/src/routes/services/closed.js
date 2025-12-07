const express = require("express");
const router = express.Router();
const { getClosedCustomers } = require("../../services/dataService");

router.get("/", (req, res) => {
  try {
    const data = getClosedCustomers();
    res.json({ closedCustomers: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
