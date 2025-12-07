import React, { useEffect, useState } from "react";
import { fetchIntake } from "../services/api";

export default function IntakePage() {
  const [filters, setFilters] = useState({
    q: "",
    gender: "",
    region: "",
  });

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchIntake(filters);

    setRows(Array.isArray(data.rows) ? data.rows : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [filters]);

  const update = (patch) => setFilters((p) => ({ ...p, ...patch }));

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Customer Intake</h1>

      {/* Filters */}
      <div className="flex gap-4 bg-white p-4 rounded-xl shadow">

        <input
          placeholder="Search by name or phone"
          className="border px-3 py-2 rounded-md w-64"
          value={filters.q}
          onChange={(e) => update({ q: e.target.value })}
        />

        <select
          className="border px-3 py-2 rounded-md"
          value={filters.gender}
          onChange={(e) => update({ gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select
          className="border px-3 py-2 rounded-md"
          value={filters.region}
          onChange={(e) => update({ region: e.target.value })}
        >
          <option value="">Region</option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Customer ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Region</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No results found
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{r.customer_id}</td>
                  <td>{r.name}</td>
                  <td>{r.phone}</td>
                  <td>{r.gender}</td>
                  <td>{r.age}</td>
                  <td>{r.region}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
