import React, { useEffect, useState } from "react";
import "./Orders.css";
import { api } from "../../api/Axios";
import { useAuth } from "../../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    api.get(`/users/${user.id}`)
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const getTrackColor = (track) => track?.toLowerCase();

  return (
    <div className="orders-page">
      <button className="btnHome" onClick={() => navigate("/")}>Go Home</button>

      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="orders-empty-wrapper">
          <p className="no-orders">You have no orders yet.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={`${order.orderId}-${order.date}`}
          >
            <div className="order-header">
              <h3>Order #{order.orderId}</h3>

              <span className={`order-track ${getTrackColor(order.track)}`}>
                {order.track}
              </span>
            </div>

            <p className="order-date">{order.date}</p>

            {order.items?.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="order-item-info">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>

                <p className="item-total">
                  ₹{item.quantity * item.price}
                </p>
              </div>
            ))}

            <div className="order-footer">
              <h3>Total Paid: ₹{order.total}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
