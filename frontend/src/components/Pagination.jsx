// frontend/src/components/Pagination.jsx
import React from 'react';
export default function Pagination({ meta = {}, page=1, onPageChange = ()=>{} }){
  const totalPages = meta.totalPages || 1;
  return (
    <div className="flex items-center justify-between p-4 text-sm">
      <div>Showing page {meta.page || page} of {totalPages} — {meta.total || 0} results</div>
      <div className="flex gap-2">
        <button onClick={()=> onPageChange(Math.max(1, (meta.page||page)-1))}>Previous</button>
        <button onClick={()=> onPageChange(Math.min(totalPages, (meta.page||page)+1))}>Next</button>
      </div>
    </div>
  );
}
