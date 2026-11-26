import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Lỗi tải dữ liệu (HTTP ${res.status})`);
        const json = await res.json();
        const normalized = json.map((item) => ({
          ...item,
          amount: Number(item.amount) || 0,
        }));
        setData(normalized.reverse());
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Không thể kết nối tới máy chủ.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url]);

  const addItem = async (newItem) => {
    setError("");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok)
        throw new Error(`Không thể thêm khoản chi (HTTP ${res.status})`);
      const created = await res.json();
      setData((prev) => [
        { ...created, amount: Number(created.amount) || 0 },
        ...prev,
      ]);
      return true;
    } catch (err) {
      setError(err.message || "Thêm dữ liệu thất bại.");
      return false;
    }
  };

  const deleteItem = async (id) => {
    setError("");
    try {
      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      if (!res.ok)
        throw new Error(`Không thể xóa khoản chi (HTTP ${res.status})`);
      setData((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (err) {
      setError(err.message || "Xóa dữ liệu thất bại.");
      return false;
    }
  };

  return { data, loading, error, addItem, deleteItem };
}
