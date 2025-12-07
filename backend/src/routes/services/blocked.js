const express = require("express");
const router = express.Router();
const { getBlockedCustomers } = require("../../services/dataService");

router.get("/", (req, res) => {
  try {
    const data = getBlockedCustomers();
    res.json({ blockedCustomers: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
