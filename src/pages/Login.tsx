import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // แก้ path ให้ถูก
import { authService } from "../services/authService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser); // เพิ่มตรงนี้

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // 🔐 Login API
      const { access_token, token_type, user_id } = await authService.login(
        username,
        password
      );

      // 🧠 เก็บ token ใน store
      setAuth(access_token, token_type, user_id);

      // 👤 ดึง current user
      const user = await authService.getCurrentUser();
      setCurrentUser(user);

      // ✅ ไปหน้าแรก
      navigate("/");
    } catch (error) {
      alert("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('src/assets/BGlogin.png')" }}
    >
      <div
        className="relative z-10 shadow-xl rounded-2xl w-[550px] h-[640px] p-8 flex flex-col justify-start items-center pt-12"
        style={{
          background:
            "linear-gradient(135deg, rgba(201, 201, 201, 0.5) 0%, rgba(196, 196, 196, 0.1) 100%)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mb-4">
          <img
            src="/src/assets/BuuLogo2.png"
            id="logo"
            alt="Logo"
            className="h-35 mx-auto"
          />
        </div>

        {/* Username */}
        <label className="self-start text-[#FFFFFF] text-2xl font-light mb-6">
          ชื่อผู้ใช้งาน
        </label>
        <input
          id="username"
          type="text"
          placeholder="กรุณากรอกชื่อผู้ใช้งาน"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-6 h-14 px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-3 focus:ring-[#B7D6DE]"
          style={{
            background: "rgba(242, 242, 242, 0.6)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(200, 200, 200, 0.8)",
          }}
        />

        {/* Password */}
        <label className="self-start text-[#FFFFFF] text-2xl font-light mb-6">
          รหัสผ่าน
        </label>
        <input
          id="pass"
          type="password"
          placeholder="กรุณากรอกรหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-8 h-14 px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-3 focus:ring-[#B7D6DE]"
          style={{
            background: "rgba(242, 242, 242, 0.6)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(200, 200, 200, 0.8)",
          }}
        />
        {/* <button
            type="button"
            className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
          >
            แสดง
          </button> */}
        {/* Login Button */}
        <button
          id="btnOk"
          className="w-4/5 py-2 h-14 bg-[#A5D9D0] text-gray-800 font-medium text-xl transition-colors rounded-md hover:bg-[#9DDBC1] duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          onClick={handleLogin}
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
};

export default Login;
