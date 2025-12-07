const express = require("express");
const router = express.Router();
const { salesData } = require("../services/dataService");

const toNum = (v) => Number(v) || 0;

function asArray(q) {
  if (!q) return null;
  if (Array.isArray(q)) return q;
  return [q];
}

router.get("/", (req, res) => {
  try {
    const {
      q,
      page = 1,
      pageSize = 10,
      sort = "date:desc",
      gender,
      productCategory,
      ageMin,
      ageMax,
    } = req.query;

    let filtered = salesData.slice();

    // 🔍 SEARCH
    if (q && q.trim()) {
      const s = q.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.customer_name.toLowerCase().includes(s) ||
          r.phone_number.toLowerCase().includes(s) ||
          r.transaction_id.toString().includes(s)
      );
    }

    // 👩 Gender
    if (gender && gender !== "") {
      filtered = filtered.filter((r) => r.gender === gender);
    }

    // 🏷 Category
    if (productCategory && productCategory !== "") {
      filtered = filtered.filter((r) => r.product_category === productCategory);
    }

    // 🎯 Age Range
    const minA = Number(ageMin) || null;
    const maxA = Number(ageMax) || null;

    if (minA !== null) filtered = filtered.filter((r) => r.age >= minA);
    if (maxA !== null) filtered = filtered.filter((r) => r.age <= maxA);

    // 🔢 SORTING
    const [sf, so] = sort.split(":");
    filtered.sort((a, b) => {
      const v1 = a[sf];
      const v2 = b[sf];
      return so === "asc" ? v1 - v2 : v2 - v1;
    });

    // 📄 PAGINATION
    const total = filtered.length;
    const pageInt = Number(page);
    const take = Number(pageSize);
    const start = (pageInt - 1) * take;
    const pageRows = filtered.slice(start, start + take);

    // 📊 STATS
    const total_units = filtered.reduce((s, r) => s + toNum(r.quantity), 0);
    const total_amount = filtered.reduce((s, r) => s + toNum(r.total_amount), 0);

    // 💸 correct discount calculation
    const total_discount = filtered.reduce(
      (s, r) =>
        s + (r.price_per_unit * r.quantity * r.discount_percentage) / 100,
      0
    );

    res.json({
      data: pageRows,
      stats: { total_units, total_amount, total_discount },
      meta: {
        total,
        page: pageInt,
        pageSize: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
