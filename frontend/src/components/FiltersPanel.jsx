import React from 'react';
import { format, parseISO } from 'date-fns';

export default function FiltersPanel({ filters, onChange, metaOptions }) {
  const { regions = [], genders = [], categories = [], paymentMethods = [], tags = [] } = metaOptions || {};

  const toggleArrayValue = (field, value) => {
    const arr = filters[field] || [];
    const has = arr.includes(value);
    const next = has ? arr.filter(x => x !== value) : [...arr, value];
    onChange({ [field]: next });
  };

  return (
    <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Filters</h3>

      <div style={{ marginBottom: 8 }}>
        <label>Customer Region</label>
        <div>
          {regions.map(r => (
            <label key={r} style={{ marginRight: 8 }}>
              <input type="checkbox" checked={(filters.customerRegion || []).includes(r)} onChange={() => toggleArrayValue('customerRegion', r)} /> {r}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Gender</label>
        <div>
          {genders.map(g => (
            <label key={g} style={{ marginRight: 8 }}>
              <input type="checkbox" checked={(filters.gender || []).includes(g)} onChange={() => toggleArrayValue('gender', g)} /> {g}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Age Range</label>
        <div>
          <input type="number" placeholder="Min" style={{ width: 80 }} value={filters.ageMin || ''} onChange={(e) => onChange({ ageMin: e.target.value })} /> {' - '}
          <input type="number" placeholder="Max" style={{ width: 80 }} value={filters.ageMax || ''} onChange={(e) => onChange({ ageMax: e.target.value })} />
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Product Category</label>
        <div>
          {categories.map(c => (
            <label key={c} style={{ marginRight: 8 }}>
              <input type="checkbox" checked={(filters.productCategory || []).includes(c)} onChange={() => toggleArrayValue('productCategory', c)} /> {c}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Tags</label>
        <div style={{ maxHeight: 80, overflow: 'auto', border: '1px solid #f1f1f1', padding: 6 }}>
          {tags.map(t => (
            <label key={t} style={{ marginRight: 8 }}>
              <input type="checkbox" checked={(filters.tags || []).includes(t)} onChange={() => toggleArrayValue('tags', t)} /> {t}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Payment Method</label>
        <div>
          {paymentMethods.map(p => (
            <label key={p} style={{ marginRight: 8 }}>
              <input type="checkbox" checked={(filters.paymentMethod || []).includes(p)} onChange={() => toggleArrayValue('paymentMethod', p)} /> {p}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Date Range</label>
        <div>
          <input type="date" value={filters.dateFrom || ''} onChange={(e) => onChange({ dateFrom: e.target.value })} />
          {' - '}
          <input type="date" value={filters.dateTo || ''} onChange={(e) => onChange({ dateTo: e.target.value })} />
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <button onClick={() => {
          // reset filters
          onChange({
            customerRegion: [], gender: [], ageMin: '', ageMax: '',
            productCategory: [], tags: [], paymentMethod: [], dateFrom: '', dateTo: '', search: ''
          });
        }}>Clear</button>
      </div>
    </div>
  );
}
