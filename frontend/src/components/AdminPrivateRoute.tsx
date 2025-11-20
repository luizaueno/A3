import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export function AdminPrivateRoute({ children }: { children: JSX.Element }) {
  // Por enquanto, vamos usar localStorage para simular login do admin
  const isAdminAuthenticated = localStorage.getItem("adminToken");

  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
}