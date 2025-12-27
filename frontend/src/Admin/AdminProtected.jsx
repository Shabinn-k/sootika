import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const admin = localStorage.getItem("admin");
  const user = localStorage.getItem("user");
  if (!admin || user) {
    return <Navigate to="/"/>;
  }

  return children;
};

export default AdminProtected; 