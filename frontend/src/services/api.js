// frontend/src/services/api.js
import axios from 'axios';
import qs from 'qs';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const client = axios.create({ baseURL: API_BASE, timeout: 30000 });

export async function fetchSales(params = {}){
  const q = qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true });
  const res = await client.get(`/sales?${q}`);
  return res.data;
}
// frontend/src/api.js
// src/services/api.js
export async function fetchNexus() {
  const res = await fetch("http://localhost:5000/nexus");
  return res.json();
}

export async function fetchIntake(filters) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`http://localhost:5000/intake?${params}`);

  if (!res.ok) return { rows: [] };

  return res.json();
}


export async function fetchActiveCustomers(){
  const res = await client.get('/services/active');
  return res.data;
}
export default client;
