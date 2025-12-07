// backend/src/services/dataService.js
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvPath = path.join(__dirname, '..', 'data', 'sales.csv');

function toNum(v) {
  if (v === undefined || v === null || v === '') return 0;
  const n = Number(String(v).replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function safeDate(v) {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d.toISOString().substring(0, 10);
}

let salesData = [];
try {
  const text = fs.readFileSync(csvPath, 'utf8');
  const records = parse(text, { columns: true, skip_empty_lines: true });
  salesData = records.map((r) => {
    // normalize field names you expect; adapt keys if your CSV headers differ
    return {
      transaction_id: r["Transaction ID"] || r["transaction_id"] || r["TransactionId"] || null,
      date: safeDate(r.Date || r.date),
      customer_id: r["Customer ID"] || r["CustomerId"] || r.customer_id || null,
      customer_name: r["Customer Name"] || r["Customer Name"] || r.customer_name || '',
      phone_number: r["Phone"] || r.phone || '',
      gender: r["Gender"] || r.gender || '',
      age: toNum(r.Age || r.age),
      product_category: r["Product Category"] || r.product_category || '',
      quantity: toNum(r.Quantity || r.quantity),
      total_amount: toNum(r["Total Amount"] || r.total_amount),
      discount_percentage: toNum(r["Discount"] || r.discount || 0),
      final_amount: toNum(r["Final Amount"] || r.final_amount),
      payment_method: r["Payment Method"] || r.payment_method || '',
      customer_region: r["Customer Region"] || r.customer_region || '',
      order_status: r["Order Status"] || r.order_status || ''
    };
  });
  console.log(`CSV data loaded: ${salesData.length} rows`);
} catch (err) {
  console.error('Failed to read CSV', err);
}

module.exports = { salesData };
