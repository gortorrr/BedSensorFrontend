// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  tokenType: string | null;
  userId: number | null;
  setAuth: (token: string, tokenType: string, userId: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      tokenType: null,
      userId: null,
      setAuth: (token, tokenType, userId) => set({ token, tokenType, userId }),
      clearAuth: () => set({ token: null, tokenType: null, userId: null }),
    }),
    {
      name: "auth-storage",
      // storage ไม่ต้องเซ็ตเอง ปล่อยให้ zustand ทำงานกับ localStorage เองก็ได้
    }
  )
);
