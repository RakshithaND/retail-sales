// frontend/src/components/TransactionsTable.jsx
import React from 'react';

export default function TransactionsTable({ rows = [], loading }){
  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr className="text-left text-gray-600">
            <th className="py-2">Transaction ID</th>
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
          {rows.map((r, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              <td className="py-2">{r.transaction_id ?? '—'}</td>
              <td>{r.date ?? '—'}</td>
              <td>{r.customer_id ?? '—'}</td>
              <td>{r.customer_name ?? '—'}</td>
              <td>{r.phone_number ?? '—'}</td>
              <td>{r.gender ?? '—'}</td>
              <td>{r.age ?? '—'}</td>
              <td>{r.product_category ?? '—'}</td>
              <td>{r.quantity ?? 0}</td>
              <td>₹{Number(r.final_amount || 0).toLocaleString()}</td>
              <td>{r.payment_method ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
