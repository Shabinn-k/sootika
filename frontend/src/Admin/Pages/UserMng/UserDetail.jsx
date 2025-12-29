import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { api } from "../../../api/Axios";
import "./UserDetail.css";

const UserDetail = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);

  /* =====================
     FETCH USERS
  ===================== */
  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* =====================
     BLOCK / UNBLOCK USER
  ===================== */
  const handleBlock = async (user) => {
    const acc = user.acc === "blocked" ? "active" : "blocked";

    if (!window.confirm("Are you sure?")) return;

    try {
      await api.patch(`/users/${user.id}`, { acc });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, acc } : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update user status");
    }
  };

  /* =====================
     FILTER USERS
  ===================== */
  const displayUsers = users.filter((user) => {
    if (showBlocked && user.acc !== "blocked") return false;
    if (
      search &&
      !user.name?.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const blockedCount = users.filter(
    (u) => u.acc === "blocked"
  ).length;

  return (
    <Layout>
      <div className="users-page">
        <h3>Total Users: {users.length}</h3>
        <h3>Blocked Users: {blockedCount}</h3>

        <input
          type="search"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setShowBlocked(!showBlocked)}>
          {showBlocked ? "Show All" : "Show Blocked"}
        </button>

        <table className="users-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {displayUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="avatar">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                </td>

                <td>{user.name}</td>
                <td>{user.email}</td>

                {/* 🔒 NEVER SHOW PASSWORD */}
                <td>{user.password}</td>

                <td>{user.acc || "active"}</td>

                <td>
                  <button onClick={() => handleBlock(user)}>
                    {user.acc === "blocked" ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UserDetail;
