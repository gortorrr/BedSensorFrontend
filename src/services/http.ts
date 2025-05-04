import axios from "axios";

// สร้าง instance ของ Axios
const instance = axios.create({
  // baseURL: "http://127.0.0.1:8000/", // เปลี่ยนเป็น API ของคุณ
  baseURL: "http://dekdee3.informatics.buu.ac.th:8030/",
});

// ฟังก์ชัน Delay (mock delay เพื่อจำลอง latency)
function delay(sec: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sec), sec * 1000);
  });
}

// Interceptor สำหรับ Response (เพิ่ม delay 200ms)
instance.interceptors.response.use(
  async (res) => {
    await delay(0.2);
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
