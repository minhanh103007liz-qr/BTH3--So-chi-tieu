import React, { Component } from "react";
import { INITIAL_EXPENSES } from "./data/sampleExpenses";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: INITIAL_EXPENSES,
      selectedCategory: "Tất cả",
      showClock: true,
    };
  }

  updateDocumentTitle() {
    const totalAll = this.state.expenses.reduce(
      (sum, item) => sum + item.amount,
      0,
    );
    document.title = `Tổng chi: ${totalAll.toLocaleString("vi-VN")} đ`;
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateDocumentTitle();
    }
  }

  handleAddExpense = (newExpense) => {
    this.setState((prevState) => ({
      expenses: [newExpense, ...prevState.expenses],
    }));
  };

  handleDeleteExpense = (id, title) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa khoản chi "${title}" không?`,
    );
    if (!confirmed) return;

    this.setState((prevState) => ({
      expenses: prevState.expenses.filter((item) => item.id !== id),
    }));
  };

  handleSelectCategory = (category) => {
    this.setState({ selectedCategory: category });
  };

  handleToggleClock = () => {
    this.setState((prevState) => ({ showClock: !prevState.showClock }));
  };

  render() {
    const { expenses, selectedCategory, showClock } = this.state;

    const filteredExpenses =
      selectedCategory === "Tất cả"
        ? expenses
        : expenses.filter((item) => item.category === selectedCategory);

    return (
      <div className="container">
        <Header showClock={showClock} onToggleClock={this.handleToggleClock} />
        <ExpenseForm onAddExpense={this.handleAddExpense} />
        <ExpenseFilter
          selectedCategory={selectedCategory}
          onSelectCategory={this.handleSelectCategory}
        />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={this.handleDeleteExpense}
        />
      </div>
    );
  }
}

export default App;
