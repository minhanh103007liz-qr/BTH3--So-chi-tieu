import { useRef, useState } from "react";
import { CATEGORIES } from "../constants/categories";

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const titleInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);

    if (!title.trim()) {
      setError("Vui lòng nhập nội dung chi tiêu.");
      return;
    }
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError("Số tiền phải là số lớn hơn 0.");
      return;
    }
    if (!date) {
      setError("Vui lòng chọn ngày chi.");
      return;
    }

    setError("");
    setSubmitting(true);
    const ok = await onAddExpense({
      title: title.trim(),
      amount: numericAmount,
      category,
      date,
    });
    setSubmitting(false);

    if (ok) {
      setTitle("");
      setAmount("");
      setCategory(CATEGORIES[0]);
      setDate(new Date().toISOString().slice(0, 10));
      titleInputRef.current?.focus();
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Thêm khoản chi</h2>
      {error && <p className="error-msg">{error}</p>}

      <div className="form-grid">
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Nội dung chi tiêu..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Số tiền (VNĐ)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Đang lưu..." : "Thêm khoản chi"}
      </button>
    </form>
  );
}
