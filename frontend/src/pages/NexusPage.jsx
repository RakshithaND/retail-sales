import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { fetchNexus } from "../services/api";

const COLORS = ["#6366f1", "#ec4899", "#34d399", "#f59e0b"];

export default function NexusPage() {
  const [genderData, setGenderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetchNexus();
      setGenderData(res.gender || []);
      setCategoryData(res.category || []);
      setLoading(false);
    } catch (err) {
      console.error("Nexus fetch failed:", err);
    }
  }

  if (loading) return <p className="p-6">Loading analytics...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-semibold mb-4">Nexus Analytics</h1>

      {/* ------------------ Gender Pie Chart ------------------ */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------ Category Bar Chart ------------------ */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Category Analysis</h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
