// src/App.jsx
import { useEffect, useState } from "react";
import { API_URL } from "./constants/categories";
import { useTheme } from "./context/ThemeContext";
import { useFetch } from "./hooks/useFetch";
import { useDebounce } from "./hooks/useDebounce";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseStats from "./components/ExpenseStats";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  const { theme } = useTheme();
  const {
    data: expenses,
    loading,
    error,
    addItem,
    deleteItem,
  } = useFetch(API_URL);

  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [showClock, setShowClock] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const totalAll = expenses.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0,
    );
    document.title = `Tổng chi: ${totalAll.toLocaleString("vi-VN")} đ`;
  }, [expenses]);

  const handleDeleteExpense = async (id, title) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa khoản chi "${title}" không?`,
    );
    if (!confirmed) return;
    await deleteItem(id);
  };

  const filteredExpenses = expenses.filter((item) => {
    const matchCategory =
      selectedCategory === "Tất cả" || item.category === selectedCategory;
    const matchSearch = item.title
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className={`page ${theme === "dark" ? "theme-dark" : ""}`}>
      <div className="container">
        <Header
          showClock={showClock}
          onToggleClock={() => setShowClock((prev) => !prev)}
        />

        <ExpenseForm onAddExpense={addItem} />

        <ExpenseStats expenses={expenses} />

        <ExpenseFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {error && <p className="error-banner">Lỗi: {error}</p>}

        {loading ? (
          <p className="loading-msg">Đang tải dữ liệu từ MockAPI...</p>
        ) : (
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        )}
      </div>
    </div>
  );
}
