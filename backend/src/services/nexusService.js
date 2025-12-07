const { salesData } = require("./dataService");

// Count totals grouped by a field
function aggregateBy(field) {
  const map = {};

  salesData.forEach((row) => {
    const key = row[field] || "Unknown";
    const value = row.FinalAmount || 0;

    if (!map[key]) map[key] = 0;
    map[key] += value;
  });

  return Object.entries(map)
    .map(([name, totalAmount]) => ({ name, totalAmount }))
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);
}

exports.getTopProducts = () => aggregateBy("Product Name");

exports.getTopRegions = () => aggregateBy("Customer Region");

exports.getTopCustomers = () => aggregateBy("Customer Name");
