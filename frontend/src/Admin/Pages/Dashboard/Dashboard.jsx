import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { api } from "../../../api/Axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const dashboardData = async () => {
    const productRes = await api.get("/products");
    const userRes = await api.get("/users");
    const feedbackRes = await api.get("/feedbacks")

    setProducts(productRes.data);
    setUsers(userRes.data);
    setFeedbacks(feedbackRes.data);

     const allOrders = userRes.data.flatMap(
        (user) => user.orders || []);
        setOrders(allOrders);
      };


  useEffect(() => {
    dashboardData();
  }, []);


  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;

  const totalRev = orders.reduce(
    (sum, order) => sum + Number(order.total || 0), 0
  )

  const pendingOrders = orders.filter((order) => order.track === "Pending").length;
  const pendingFeedback = feedbacks.filter((f) => f.feed === "pending").length;

  const handleRoute =(path)=>{
    return function (){
      navigate(path)
    }
  }
  return (
    <Layout>
      <div className="dashboard-container">

        <h1 className="dash-title">Dashboard Overview</h1>

        <div className="dash-cards">

          <div className="dash-card" onClick={handleRoute("/admin/products")}>
            <h2>{totalProducts}</h2>
            <p>Total Products</p>
          </div>

          <div className="dash-card" onClick={handleRoute("/admin/users")}>
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="dash-card" onClick={handleRoute("/admin/orders")}>
            <h2>{totalOrders}</h2>
            <p>Total Orders</p>
          </div>

          <div className="dash-card">
            <h2>₹ {totalRev.toLocaleString()}</h2>
            <p>Total Revenue</p>
          </div>

          <div className="dash-card warning" onClick={handleRoute("/admin/orders")}>
            <h2>{pendingOrders}</h2>
            <p>Pending Orders</p>
          </div>

          <div className="dash-card warning" onClick={handleRoute("/admin/feedback")}>
            <h2>{pendingFeedback}</h2>
            <p>Pending Feedback</p>
          </div>
          
         </div>
 
        <h2 className="recent-title">Recent Orders</h2>
        <div className="recent-orders" onClick={handleRoute("/admin/orders")}>
          {orders.slice(0, 5).map((order, index) => (
            <div className="recent-item" key={index}>
              <p><b>Order ID:</b> #{order.orderId}</p>
              <p><b>Status:</b> {order.track}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;