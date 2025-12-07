import React from "react";

export default function FilterBar({ filters, setFilters, metaOptions, openFilterPanel }) {
  return (
    <div className="w-full bg-white p-3 rounded-xl shadow-sm flex flex-col gap-3">
      
      {/* Search */}
      <div className="flex items-center gap-2 border rounded-full px-4 py-2 shadow-sm">
        <span className="text-gray-500 text-xl">🔍</span>
        <input
          type="text"
          placeholder="Search by Keyword or Product ID"
          value={filters.search || ""}
          onChange={(e) => setFilters(p => ({ ...p, search: e.target.value, page: 1 }))}
          className="flex-1 outline-none text-gray-700"
        />
      </div>

      {/* Filter Row */}
      <div className="flex items-center justify-between text-sm">
        
        {/* Sort */}
        <select
          className="px-2 py-1 border rounded-lg"
          value={filters.sort}
          onChange={(e) => setFilters(p => ({ ...p, sort: e.target.value, page: 1 }))}
        >
          <option value="date:desc">⬆ Sort - Date (Newest)</option>
          <option value="customerName:asc">Customer (A → Z)</option>
          <option value="quantity:desc">Quantity (High → Low)</option>
        </select>

        {/* Category */}
        <select
          className="px-2 py-1 border rounded-lg"
          value={filters.category || ""}
          onChange={(e) => setFilters(p => ({ ...p, category: e.target.value, page: 1 }))}
        >
          <option value="">Category</option>
          {metaOptions.categories?.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Gender */}
        <select
          className="px-2 py-1 border rounded-lg"
          value={filters.gender || ""}
          onChange={(e) => setFilters(p => ({ ...p, gender: e.target.value, page: 1 }))}
        >
          <option value="">Gender</option>
          {metaOptions.genders?.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* Filters Button */}
        <button
          onClick={openFilterPanel}
          className="flex items-center gap-1 px-3 py-1 border rounded-lg"
        >
          ☰ Filters
        </button>
      </div>
    </div>
  );
}
