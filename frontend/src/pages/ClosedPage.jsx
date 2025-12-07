import React, { useEffect, useState } from "react";

export default function ClosedPage() {
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services/closed")
      .then(res => res.json())
      .then(data => setClosed(data.closedUsers || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Closed Customers</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        {closed.map((u, i) => (
          <div key={i} className="py-2 border-b">
            <p className="font-semibold">{u.customer}</p>
            <p className="text-sm text-gray-600">Last Purchase: {String(u.lastPurchase).slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
