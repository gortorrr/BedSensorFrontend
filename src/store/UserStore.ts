import { create } from "zustand";
import { userService } from "../services/userService";

interface UserStore {
  deleteUser: (patient_id: number) => void;
}

export const usePatientStore = create<UserStore>(() => ({
  deleteUser: async (user_id: number) => {
    const res = await userService.deleteUser(user_id);
    console.log("deleted target", res);
  },
}));
