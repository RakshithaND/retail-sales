import React, { useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";

const AGE_RANGES = [
  { label: "0-10", min: 0, max: 10 },
  { label: "11-20", min: 11, max: 20 },
  { label: "21-30", min: 21, max: 30 },
  { label: "31-40", min: 31, max: 40 },
  { label: "41-50", min: 41, max: 50 },
  { label: "51-60", min: 51, max: 60 },
  { label: "60+", min: 61, max: 120 }
];

export default function ShortFilterBar({ filters, onChange, onSortChange }) {
  const [openAge, setOpenAge] = useState(false);

  const applyAge = (range) => {
    onChange({
      ageMin: range.min,
      ageMax: range.max,
    });
    setOpenAge(false);
  };

  const resetFilters = () => {
    onChange({
      search: "",
      gender: "",
      productCategory: "",
      ageMin: "",
      ageMax: "",
      sort: "date:desc",
      page: 1
    });
  };

  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow">

      {/* RESET BUTTON */}
      <button
        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        onClick={resetFilters}
      >
        <RotateCcw size={18} />
      </button>

      {/* CATEGORY */}
      <select
        className="p-2 bg-gray-100 rounded-lg"
        value={filters.productCategory || ""}
        onChange={(e) => onChange({ productCategory: e.target.value })}
      >
        <option value="">Category</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Grocery">Grocery</option>
      </select>

      {/* GENDER */}
      <select
        className="p-2 bg-gray-100 rounded-lg"
        value={filters.gender || ""}
        onChange={(e) => onChange({ gender: e.target.value })}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* AGE DROPDOWN */}
      <div className="relative">
        <button
          className="p-2 bg-gray-100 rounded-lg flex items-center gap-1"
          onClick={() => setOpenAge(!openAge)}
        >
          Age Range <ChevronDown size={16} />
        </button>

        {openAge && (
          <div className="absolute mt-2 bg-white shadow-md p-2 rounded-lg w-32 z-20">
            {AGE_RANGES.map((r) => (
              <div
                key={r.label}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={() => applyAge(r)}
              >
                {r.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SORT */}
      <select
        className="p-2 bg-gray-100 rounded-lg"
        value={filters.sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="date:desc">Date (Newest)</option>
        <option value="date:asc">Date (Oldest)</option>
        <option value="final_amount:desc">Amount (High → Low)</option>
        <option value="final_amount:asc">Amount (Low → High)</option>
      </select>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by Name or Phone..."
        className="p-2 bg-gray-100 rounded-lg w-64"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
      />
    </div>
  );
}
