# LTW - Bài thực hành 03 (N2): Ứng dụng Sổ chi tiêu cá nhân

## Thông tin sinh viên

* **Họ và tên:** <Điền họ tên của bạn>

* **Mã sinh viên:** <Điền mã sinh viên của bạn>

* **Lớp / Nhóm:** N2

## Cấu trúc thư mục

```
.
├── part-a-class/   # Phần A: Xây dựng bằng React Class Component (dữ liệu mẫu)
├── part-b-hooks/   # Phần B: Xây dựng bằng Function Component + Hooks + MockAPI
└── README.md

```

## Hướng dẫn cài đặt và chạy

> **Yêu cầu môi trường:** Đã cài đặt Node.js (phiên bản 18 trở lên).

### 1. Chạy Phần A (`part-a-class`)

```
cd part-a-class
npm install
npm run dev

```

Mở đường dẫn hiển thị trên terminal (mặc định `http://localhost:5173`).

### 2. Chạy Phần B (`part-b-hooks`)

```
cd part-b-hooks
npm install
npm run dev

```

> **Lưu ý:** Phần B kết nối dữ liệu trực tiếp qua MockAPI (cấu hình trong `part-b-hooks/src/constants/categories.js`).

## Hooks đã khắc phục các thách thức của Class như thế nào trong bài này?

| Thách thức khi viết bằng Class (Phần A) | Cách Hooks khắc phục trong bài (Phần B) | 
| ----- | ----- | 
| **Logic bị xé lẻ qua nhiều hàm vòng đời:** Trong `Clock`, việc bật `setInterval` nằm ở `componentDidMount` còn `clearInterval` nằm ở `componentWillUnmount`. Với `document.title` trong `App`, phải viết lặp ở cả `componentDidMount` lẫn `componentDidUpdate`. | **`useEffect` gom logic thiết lập và dọn dẹp vào cùng một khối:** `setInterval` và hàm `return () => clearInterval(...)` nằm ngay cạnh nhau; cập nhật `document.title` chỉ cần một `useEffect` phụ thuộc `[expenses]`. | 
| **Khó tái sử dụng logic có state:** Nếu nhiều component cần gọi API hoặc hiển thị đồng hồ, Class phải dùng các mẫu phức tạp như HOC hoặc Render Props. | **Custom Hooks (`useFetch`, `useClock`, `useDebounce`)** tách gọn phần xử lý logic và state ra hàm riêng, có thể gọi lại ở bất kỳ component nào chỉ bằng 1 dòng. | 
| **Cú pháp rườm rà và dễ lỗi ngữ cảnh `this`:** Phải viết `constructor(props)`, `super(props)`, `this.state`, `this.setState` và dùng arrow function / `.bind(this)` cho các hàm sự kiện. | **Function Component thuần** bỏ hoàn toàn `this` và `constructor`; dùng `useState` giúp đọc và cập nhật từng state độc lập, ngắn gọn hơn rõ rệt. | 
| **Truyền dữ liệu dùng chung qua nhiều tầng (prop drilling):** Chia sẻ trạng thái như giao diện Sáng/Tối xuống các component con sâu hơn phải truyền `props` thủ công qua từng lớp. | **`useContext` (`ThemeContext`)** cho phép `App` và `Header` truy cập trực tiếp `theme` và `toggleTheme` mà không cần truyền props trung gian. | 
