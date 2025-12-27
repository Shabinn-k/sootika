import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../../Authentication/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Layout = ({ children }) => {
  const { logoutAdmin } = useAuth();

  return (
    <div className="admin-wrapper">

      <div className="admin-sidebar">
        <h2 className="admin-logo">Admin</h2>

        <ul className="admin-menu">
          <li>
            <Link className="link-items1" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
 
          <li>
            <Link className="link-items1" to="/admin/products/">
              Products
            </Link>
          </li>
 
          <li>
            <Link className="link-items1" to="/admin/users">
              Users
            </Link>
          </li>

          <li>
            <Link className="link-items1" to="/admin/orders">
              Orders
            </Link>
          </li>

          <li>
            <Link className="link-items1" to="/admin/feedback">
              Feedback
            </Link>
          </li>
        </ul>

        <div className="logout-wrapper">
          <Link className="logout" to="/" onClick={logoutAdmin}>
            <FiLogOut /> Logout
          </Link>
        </div>
      </div>

      <main className="admin-content">
        <div className="admin-page">{children}</div>
      </main>

    </div>
  );
};

export default Layout;
