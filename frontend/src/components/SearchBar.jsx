import React, { useState, useEffect } from "react";

/**
 * Simple styled search bar with debounce
 */
export default function SearchBar({ value = "", onChange, placeholder }) {
  const [v, setV] = useState(value);
  useEffect(() => setV(value), [value]);

  useEffect(() => {
    const t = setTimeout(() => onChange && onChange(v), 350);
    return () => clearTimeout(t);
  }, [v, onChange]);

  return (
    <div className="relative">
      <input
        className="w-full border rounded-full px-4 py-3 shadow-sm focus:outline-none focus:ring"
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder={placeholder || "Search..."}
      />
      <button
        onClick={() => onChange && onChange(v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full px-3 py-1"
      >
        Search
      </button>
    </div>
  );
}
