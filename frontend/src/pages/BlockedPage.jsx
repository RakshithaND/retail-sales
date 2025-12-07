import React, { useEffect, useState } from "react";

export default function BlockedPage() {
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    loadBlocked();
  }, []);

  async function loadBlocked() {
    try {
      const res = await fetch("http://localhost:5000/services/blocked");
      const data = await res.json();
      setBlocked(data.blockedCustomers || []);
    } catch (err) {
      console.error("Blocked fetch error:", err);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blocked Customers</h1>

      {blocked.length === 0 ? (
        <p className="text-gray-500">No blocked customers found</p>
      ) : (
        <div className="bg-white rounded-xl shadow p-4 divide-y">
          {blocked.map((c, i) => (
            <div key={i} className="py-3 flex justify-between">
              <div>
                <div className="font-semibold">{c.customerName}</div>
                <div className="text-gray-500 text-sm">{c.region}</div>
              </div>
              <div className="font-bold text-red-600">
                ₹{c.totalLoss.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
