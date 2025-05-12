import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/");
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/your-background.jpg')" }}
    >
      <div className="bg-emerald-100 shadow-xl rounded-2xl w-100 h-100 p-4 flex flex-col justify-start items-center pt-12">
        {/* โลโก้ */}
        <div className="mb-4">
          <img src="/logo.png" alt="Logo" className="h-12 mx-auto" />
        </div>

        {/* ชื่อผู้ใช้ */}
        <label className="self-start text-sm text-gray-700 mb-1">
          ชื่อผู้ใช้
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* รหัสผ่าน */}
        <label className="self-start text-sm text-gray-700 mb-1">
          รหัสผ่าน
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <button
            type="button"
            className="absolute right-2 top-2 text-sm text-gray-500 hover:text-gray-700"
          >
            แสดง
          </button> */}

        {/* ปุ่มเข้าสู่ระบบ */}
        <br />
        <button
          className="w-4/5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={login}
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
};

export default Login;
