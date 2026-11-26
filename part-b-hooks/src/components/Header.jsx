import { useTheme } from "../context/ThemeContext";
import Clock from "./Clock";

export default function Header({ showClock, onToggleClock }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>Sổ chi tiêu cá nhân </h1>
      <div className="header-right">
        {showClock && <Clock />}
        <button type="button" className="btn-secondary" onClick={onToggleClock}>
          {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
        </button>
        <button type="button" className="btn-secondary" onClick={toggleTheme}>
          {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
        </button>
      </div>
    </header>
  );
}
