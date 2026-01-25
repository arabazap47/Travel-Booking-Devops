
import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token); // ✅ works in v4+
  } catch (err) {
    console.error("Token decode failed:", err);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

