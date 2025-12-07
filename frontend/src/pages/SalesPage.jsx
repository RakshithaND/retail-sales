import React, { useState } from "react";
import useSalesData from "../hooks/useSalesData";
import SearchBar from "../components/SearchBar";

export default function SalesPage() {
  const [filters, setFilters] = useState({
    q: "",
    gender: "",
    productCategory: "",
    ageRange: "",
    sort: "date:desc",
    page: 1,
    pageSize: 10,
  });

  const { data, stats, meta, loading } = useSalesData(filters);

  const update = (patch) =>
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));

  const resetFilters = () =>
    setFilters({
      q: "",
      gender: "",
      productCategory: "",
      ageRange: "",
      sort: "date:desc",
      page: 1,
      pageSize: 10,
    });

  return (
    <div className="p-6 space-y-4">

      {/* HEADER WITH SEARCH */}
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
  Smart Sales Monitor
</h1> */}

<h1 className="text-2xl font-semibold font-bold animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text">
  Smart Sales Monitor
</h1>
{/* <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
  Smart Sales Monitor
</h1> */}

        <SearchBar
          value={filters.q}
          onChange={(text) => update({ q: text })}
        />
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 bg-white p-4 rounded-xl shadow items-center">

        <select
          value={filters.productCategory}
          onChange={(e) => update({ productCategory: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Category</option>
          <option>Clothing</option>
          <option>Electronics</option>
          <option>Grocery</option>
        </select>

        <select
          value={filters.gender}
          onChange={(e) => update({ gender: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          value={filters.ageRange}
          onChange={(e) => update({ ageRange: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Age Range</option>
          <option value="0-18">0–18</option>
          <option value="19-30">19–30</option>
          <option value="31-50">31–50</option>
          <option value="51-100">51–100</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value })}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="date:desc">Date (Newest)</option>
          <option value="date:asc">Date (Oldest)</option>
        </select>

        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Units Sold</p>
          <h2 className="text-2xl font-bold">{stats.total_units || 0}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Amount</p>
          <h2 className="text-2xl font-bold">₹{stats.total_amount || 0}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p>Total Discount</p>
          <h2 className="text-2xl font-bold">₹{stats.total_discount || 0}</h2>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded-lg text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Final</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>
          {(data?.data || []).map((r, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{r.transaction_id}</td>
              <td>{r.date}</td>
              <td>{r.customer_id}</td>
              <td>{r.customer_name}</td>
              <td>{r.phone_number}</td>
              <td>{r.gender}</td>
              <td>{r.age}</td>
              <td>{r.product_category}</td>
              <td>{r.quantity}</td>
              <td>₹{r.final_amount}</td>
              <td>{r.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
