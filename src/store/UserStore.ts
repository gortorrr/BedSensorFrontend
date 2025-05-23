import { create } from "zustand";
import { userService } from "../services/userService";
import { User } from "../types/user";

interface UserStore {
  users: User[];
  getUsers: () => Promise<void>;
  addUser: (user: Omit<User, "user_id">) => Promise<void>;
  editUser: (userId: number, user: Partial<User>) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],

  // ดึงข้อมูลผู้ใช้ทั้งหมด
  getUsers: async () => {
    try {
      const data = await userService.getUsers();
      set({ users: data });
    } catch (err) {
      console.error("❌ getUsers failed:", err);
    }
  },

  // เพิ่มผู้ใช้ใหม่
  addUser: async (user) => {
    try {
      await userService.addUser(user);
      await get().getUsers(); // ดึงใหม่หลังเพิ่ม
    } catch (err) {
      console.error("❌ addUser failed:", err);
    }
  },

  // แก้ไขข้อมูลผู้ใช้
  editUser: async (userId, user) => {
    try {
      await userService.editUser(userId, user);
      await get().getUsers(); // ดึงใหม่หลังแก้ไข
    } catch (err) {
      console.error("❌ editUser failed:", err);
    }
  },

  deleteUser: async (user_id: number) => {
    const res = await userService.deleteUser(user_id);
    console.log("deleted target", res);
  },
}));
