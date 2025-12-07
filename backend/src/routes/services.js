// backend/src/routes/services.js
const express = require('express');
const { salesData } = require('../services/dataService');
const router = express.Router();

function toNum(v){ return Number(v)||0; }

// Active - customers who have order_status === 'Active' OR have recent transactions.
// Here we pick customers with total final_amount > 0 grouped by customer_name
router.get('/active', (req, res) => {
  try {
    const byCustomer = {};
    salesData.forEach(s => {
      const name = s.customer_name || 'Unknown';
      if (!byCustomer[name]) byCustomer[name] = { customerName: name, transactions: 0, total: 0, region: s.customer_region || '' };
      byCustomer[name].transactions += 1;
      byCustomer[name].total += toNum(s.final_amount);
    });
    const arr = Object.values(byCustomer)
      .filter(c => c.total > 0) // active = >0 revenue
      .sort((a,b)=> b.total - a.total)
      .slice(0, 200);
    res.json({ activeCustomers: arr, summary: { totalCustomers: arr.length, totalTransactions: salesData.length } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Blocked - simple heuristic: order_status === 'Blocked' or negative final amount
router.get('/blocked', (req,res) => {
  try {
    const blocked = salesData.filter(s => (s.order_status||'').toLowerCase() === 'blocked' || toNum(s.final_amount) <= 0)
      .map(s => ({ customerName: s.customer_name, region: s.customer_region, reason: s.order_status, final: toNum(s.final_amount) }));
    res.json({ blockedCustomers: blocked.slice(0, 500) });
  } catch (err){
    res.status(500).json({ error: err.message });
  }
});

// Closed - example: order_status === 'Closed'
router.get('/closed', (req,res) => {
  try {
    const closed = salesData.filter(s => (s.order_status||'').toLowerCase() === 'closed')
      .map(s => ({ customerName: s.customer_name, final: toNum(s.final_amount), date: s.date }));
    res.json({ closedCustomers: closed });
  } catch (err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
