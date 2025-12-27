import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../api/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔹 Load auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));

    setLoading(false);
  }, []);

  // 🔹 Auto block check (polling)
  useEffect(() => {
    if (!user) return;

    const checkUserAcc = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);

        if (res.data.acc === "blocked") {
          toast.error("Your account has been blocked by admin");
          logoutUser();
        }
      } catch (err) {
        console.error("Account check failed:", err);
      }
    };

    const interval = setInterval(checkUserAcc, 5000);
    return () => clearInterval(interval);
  }, [user]);

  // 🔹 LOGIN
  const login = async (email, password) => {
    try {
      // ---- ADMIN LOGIN ----
      const adminRes = await api.get("/admin", {
        params: { email },
      });

      if (adminRes.data.length) {
        const adminData = adminRes.data[0];

        if (adminData.password !== password) {
          toast.error("Incorrect admin password!");
          return false;
        }

        setAdmin(adminData);
        setUser(null);
        localStorage.setItem("admin", JSON.stringify(adminData));
        localStorage.removeItem("user");

        toast.success("Admin Login Successful!");
        navigate("/admin/dashboard");
        return true;
      }

      // ---- USER LOGIN ----
      const res = await api.get("/users", { params: { email } });

      if (!res.data.length) {
        toast.error("Email not found!");
        return false;
      }

      const userData = res.data[0];

      if (userData.password !== password) {
        toast.error("Incorrect password!");
        return false;
      }

      if (userData.acc === "blocked") {
        toast.error("Your account is blocked!");
        return false;
      }

      setUser(userData);
      setAdmin(null);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.removeItem("admin");

      toast.success("Login Successful!");
      return true;
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong!");
      return false;
    }
  };

  // 🔹 LOGOUT USER
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔹 LOGOUT ADMIN
  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    navigate("/");
  };

  // 🔹 SIGNUP
  const signup = async (newUser) => {
    try {
      const check = await api.get("/users", {
        params: { email: newUser.email },
      });

      if (check.data.length) {
        toast.error("Email already exists!");
        return false;
      }

      const res = await api.post("/users", {
        ...newUser,
        acc: "active",
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Signup Successful!");
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong!");
      return false;
    }
  };

  // ⏳ Prevent render before auth load
  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        login,
        logoutUser,
        logoutAdmin,
        signup,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
