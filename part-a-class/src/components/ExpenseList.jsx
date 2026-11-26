import React, { Component } from "react";

class ExpenseList extends Component {
  render() {
    const { expenses, onDeleteExpense } = this.props;
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);

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
                    {item.amount.toLocaleString("vi-VN")} đ
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
          <span>Tổng tiền:</span>
          <strong>{total.toLocaleString("vi-VN")} đ</strong>
        </div>
      </section>
    );
  }
}

export default ExpenseList;
