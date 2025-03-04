import axios from "axios";

// สร้าง instance ของ axios
const api = axios.create({
  baseURL: "http://localhost:8000", // เปลี่ยนเป็น API ของคุณ
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
