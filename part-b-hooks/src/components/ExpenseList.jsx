// src/components/ExpenseList.jsx
export default function ExpenseList({ expenses, onDeleteExpense }) {
  const total = expenses.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0,
  );

  return (
    <section className="expense-list-section">
      {expenses.length === 0 ? (
        <p className="empty-msg">Chưa có khoản chi nào phù hợp.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((item) => (
            <li key={item.id} className="expense-item">
              <div className="expense-info">
                <strong>{item.title}</strong>
                <span className="expense-meta">
                  {item.category} • {item.date}
                </span>
              </div>
              <div className="expense-actions">
                <span className="expense-amount">
                  {Number(item.amount).toLocaleString("vi-VN")} đ
                </span>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => onDeleteExpense(item.id, item.title)}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="total-row">
        <span>Tổng tiền (đang hiển thị):</span>
        <strong>{total.toLocaleString("vi-VN")} đ</strong>
      </div>
    </section>
  );
}
