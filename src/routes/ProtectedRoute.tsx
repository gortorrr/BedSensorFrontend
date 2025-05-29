// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // ✅ import Zustand store

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token); // ✅ ดึง token จาก store

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
