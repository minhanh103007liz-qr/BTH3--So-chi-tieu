import React, { Component } from "react";
import { CATEGORIES } from "../data/sampleExpenses";

class ExpenseFilter extends Component {
  render() {
    const { selectedCategory, onSelectCategory } = this.props;
    const options = ["Tất cả", ...CATEGORIES];

    return (
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
    );
  }
}

export default ExpenseFilter;
