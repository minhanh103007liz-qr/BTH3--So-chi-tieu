import React, { Component } from "react";
import { CATEGORIES } from "../data/sampleExpenses";

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: "",
      category: CATEGORIES[0],
      date: new Date().toISOString().slice(0, 10),
      error: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = this.state;
    const numericAmount = Number(amount);

    if (!title.trim()) {
      this.setState({ error: "Vui lòng nhập nội dung chi tiêu." });
      return;
    }
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      this.setState({ error: "Số tiền phải là số lớn hơn 0." });
      return;
    }
    if (!date) {
      this.setState({ error: "Vui lòng chọn ngày chi." });
      return;
    }

    this.props.onAddExpense({
      id: Date.now(),
      title: title.trim(),
      amount: numericAmount,
      category,
      date,
    });

    this.setState({
      title: "",
      amount: "",
      category: CATEGORIES[0],
      date: new Date().toISOString().slice(0, 10),
      error: "",
    });
  };

  render() {
    const { title, amount, category, date, error } = this.state;

    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <h2>Thêm khoản chi</h2>
        {error && <p className="error-msg">{error}</p>}

        <div className="form-grid">
          <input
            type="text"
            name="title"
            placeholder="Nội dung chi tiêu..."
            value={title}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Số tiền (VNĐ)"
            value={amount}
            onChange={this.handleChange}
          />
          <select name="category" value={category} onChange={this.handleChange}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit" className="btn-primary">
          Thêm khoản chi
        </button>
      </form>
    );
  }
}

export default ExpenseForm;
