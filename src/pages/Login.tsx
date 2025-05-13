import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/");
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center "
      style={{ backgroundImage: "url('src/assets/BGlogin.png')" }}
    >
      <div className="relative z-10 shadow-xl rounded-2xl w-[550px] h-[640px] p-8 flex flex-col justify-start items-center pt-12"
      style={{
          background: 'linear-gradient(135deg, rgba(201, 201, 201, 0.5) 0%, rgba(196, 196, 196, 0.1) 100%)',
          backdropFilter: 'blur(8px)'
        }}
      >
        {/* โลโก้ */}
        <div className="mb-4">
          <img src="/src/assets/BuuLogo2.png" alt="Logo" className="h-35 mx-auto" />
        </div>

        {/* ชื่อผู้ใช้ */}
        <label className="self-start text-[#FFFFFF] text-2xl font-light mb-6">
          ชื่อผู้ใช้งาน
        </label>
        <input
          type="text"
          placeholder="กรุณากรอกชื่อผู้ใช้งาน"
          className="w-full mb-6 h-14 px-3 py-2 pr-10 rounded-md focus:outline-none focus:ring-3 focus:ring-[#B7D6DE]"
          style={{
              background: 'rgba(242, 242, 242, 0.6)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(200, 200, 200, 0.8)'
            }}
        />

        {/* รหัสผ่าน */}
        <label className="self-start text-[#FFFFFF] text-2xl font-light mb-6">
          รหัสผ่าน
        </label>
        <input
          type="password"
          placeholder="กรุณากรอกรหัสผ่าน"
          className="w-full mb-8 h-14 px-3 py-2 pr-10  rounded-md focus:outline-none focus:ring-3 focus:ring-[#B7D6DE]"
          style={{
              background: 'rgba(242, 242, 242, 0.6)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(200, 200, 200, 0.8)'
            }}
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
          className="w-4/5 py-2 h-14 bg-[#A5D9D0] text-gray-800 font-medium text-xl transition-colors rounded-md hover:bg-[#9DDBC1] duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          onClick={login}
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
};

export default Login;
