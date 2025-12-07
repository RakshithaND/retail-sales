import { useEffect, useState } from "react";

export default function useSalesData(filters) {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filters]);

  async function fetchData() {
    try {
      setLoading(true);

      const qs = new URLSearchParams(filters).toString();

      const res = await fetch(`http://localhost:5000/sales?${qs}`);
      const json = await res.json();

      setData(json);
      setStats(json.stats || {});
      setMeta(json.meta || {});
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  return { data, stats, meta, loading };
}
