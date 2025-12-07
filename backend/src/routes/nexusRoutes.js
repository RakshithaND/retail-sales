const express = require("express");
const router = express.Router();
const nexusController = require("../controllers/nexusController");

router.get("/top-products", nexusController.getTopProducts);
router.get("/top-regions", nexusController.getTopRegions);
router.get("/top-customers", nexusController.getTopCustomers);

module.exports = router;
