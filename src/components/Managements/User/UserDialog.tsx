import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import AddUserIcon from "../../../assets/btnManagement/AddUser.png";
import { User } from "../../../types/user";
import { useUserStore } from "../../../store/UserStore";

interface UserDialogProps {
  isOpen: boolean;
  user: User | null;
  onCancel: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ isOpen, user, onCancel }) => {
  const [formData, setFormData] = useState<Omit<User, "user_id">>({
    user_name: "",
    user_position: "",
    user_username: "",
    user_password: "",
  });

  const userStore = useUserStore();

  useEffect(() => {
    if (user) {
      setFormData({
        user_name: user.user_name,
        user_position: user.user_position,
        user_username: user.user_username,
        user_password: user.user_password,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.user_name || !formData.user_username) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      if (user?.user_id === 0) {
        await userStore.addUser(formData);
      } else if (user?.user_id) {
        await userStore.editUser(user.user_id, formData);
      }
      onCancel(); // ปิด dialog
    } catch (err) {
      console.error("❌ Failed to save user", err);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed inset-0 z-50 flex justify-center items-center"
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg max-w-fit max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {user?.user_id !== 0 ? "แก้ไขข้อมูลผู้ใช้" : "เพิ่มข้อมูลผู้ใช้"}
          </h2>

          <div className="flex gap-6 mb-4">
            {/* รูปโปรไฟล์ */}
            <div className="flex-shrink-0">
              <label className="cursor-pointer relative w-32 h-32 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition">
                <img
                  src={AddUserIcon}
                  alt="default"
                  className="w-20 h-23 opacity-50"
                />
                <input
                  id="addImg"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>

            {/* ฟอร์มข้อมูลผู้ใช้ */}
            <div className="flex flex-col gap-4 min-w-0 w-80">
              {/* Username */}
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.user_username}
                  onChange={handleChange}
                  placeholder="กรุณากรอก Username"
                  className="p-2 pl-3 border border-gray-300 rounded-md w-full  h-11 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  รหัสผ่าน
                </label>
                <input
                  id="pass"
                  type="password"
                  value={formData.user_password}
                  onChange={handleChange}
                  placeholder="กรุณากรอกรหัสผ่าน"
                  className="p-2 pl-3 border border-gray-300 rounded-md w-full  h-11 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  ชื่อผู้ใช้งาน
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="กรุณากรอกชื่อผู้ใช้งาน"
                  className="p-2 pl-3 border border-gray-300 rounded-md w-full  h-11 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  ตำแหน่ง
                </label>
                <input
                  id="position"
                  type="text"
                  value={formData.user_position}
                  onChange={handleChange}
                  placeholder="กรุณากรอกตำแหน่งงาน"
                  className="p-2 pl-3 border border-gray-300 rounded-md w-full  h-11 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              id="btnCancel"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110 cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-[#95BAC3] text-white hover:bg-[#5E8892] transform transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
            >
              บันทึก
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default UserDialog;
