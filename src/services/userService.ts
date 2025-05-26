import http from "./http";
import { User } from "../types/user";
import axios from "axios";

export const userService = {
  async getUsers(): Promise<User[]> {
    const res = await http.get("/users");
    return res.data;
  },

  async addUser(user: Omit<User, "user_id">) {
    const res = await http.post("/users", user);
    return res.data;
  },

  async editUser(userId: number, user: Partial<User>) {
    const res = await http.put(`/user/edit/${userId}`, user);
    return res.data;
  },

  async addImageToUser(formData: FormData, user_id: number) {
    const res = await http.post(
      `http://localhost:8000/users/${user_id}/upload-image`,
      formData
    );
    return res.data;
  },
};
