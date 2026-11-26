import { CATEGORIES } from "../constants/categories";

export default function ExpenseStats({ expenses }) {
  const totalsByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = 0;
    return acc;
  }, {});

  expenses.forEach((item) => {
    if (totalsByCategory[item.category] !== undefined) {
      totalsByCategory[item.category] += Number(item.amount) || 0;
    }
  });

  return (
    <section className="stats-grid">
      {CATEGORIES.map((cat) => (
        <div key={cat} className="stat-card">
          <span className="stat-label">{cat}</span>
          <strong>{totalsByCategory[cat].toLocaleString("vi-VN")} đ</strong>
        </div>
      ))}
    </section>
  );
}
