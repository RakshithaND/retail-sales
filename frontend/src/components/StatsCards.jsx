// frontend/src/components/StatsCards.jsx
import React from 'react';
export default function StatsCards({ stats={} }){
  const totalUnits = stats.total_units || 0;
  const totalAmount = stats.final_amount_sum || stats.total_amount || 0;
  const totalDiscount = stats.total_discount || 0;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white border shadow-sm rounded-xl p-5">
        <div className="text-sm text-gray-500">Total Units Sold</div>
        <div className="text-2xl font-bold mt-2">{totalUnits}</div>
      </div>
      <div className="bg-white border shadow-sm rounded-xl p-5">
        <div className="text-sm text-gray-500">Total Amount</div>
        <div className="text-2xl font-bold mt-2">₹{Number(totalAmount).toLocaleString()}</div>
      </div>
      <div className="bg-white border shadow-sm rounded-xl p-5">
        <div className="text-sm text-gray-500">Total Discount</div>
        <div className="text-2xl font-bold mt-2">₹{Number(totalDiscount).toLocaleString()}</div>
      </div>
    </div>
  );
}
