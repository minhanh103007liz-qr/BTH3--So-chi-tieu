import { CATEGORIES } from "../constants/categories";

export default function ExpenseFilter({
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
}) {
  const options = ["Tất cả", ...CATEGORIES];

  return (
    <div className="filter-section">
      <div className="filter-bar">
        {options.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo nội dung (có độ trễ)..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
