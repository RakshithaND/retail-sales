const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// GET /sales → with search, filters, sorting, pagination
router.get('/', salesController.getSales);

module.exports = router;
