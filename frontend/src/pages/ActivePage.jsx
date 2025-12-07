import React, { useEffect, useState } from "react";

export default function ActivePage() {
  const [list, setList] = useState(null);

  useEffect(() => {
    fetchActive();
  }, []);

  async function fetchActive() {
    try {
      const res = await fetch("http://localhost:5000/services/active");
      const data = await res.json();

      console.log("ACTIVE API:", data);

      setList(data.activeCustomers);
    } catch (err) {
      console.error("Active fetch error:", err);
    }
  }

  if (!list) return <p>Loading...</p>;

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Active Customers</h1>

      {list.map((c, i) => (
        <div key={i} className="bg-white p-4 shadow rounded-lg flex justify-between">
          <span>{c.customer}</span>
          <span className="font-semibold">₹{c.totalAmount.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
