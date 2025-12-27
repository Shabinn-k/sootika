import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { api } from "../../../api/Axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  /* =====================
     FETCH ALL ORDERS
  ===================== */
  const fetchOrders = async () => {
    const res = await api.get("/users");

    const list = res.data.flatMap(user =>
      (user.orders || []).map(order => ({
        userId: user.id,
        userName: user.name,
        userPhone: user.phone,
        orderId: order.orderId,
        date: order.date,
        track: order.track,
        items: order.items,
        total: order.total,
        paymentMethod: order.paymentMethod,
        shippingAddress: order.shippingAddress
      }))
    );

    setOrders(list);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =====================
     UPDATE ORDER STATUS
  ===================== */
  const updateOrder = async (userId, orderId, newTrack) => {
    const res = await api.get(`/users/${userId}`);
    const user = res.data;

    const updatedOrders = user.orders.map(order =>
      order.orderId === orderId
        ? { ...order, track: newTrack }
        : order
    );

    await api.patch(`/users/${userId}`, {
      orders: updatedOrders
    });

    setOrders(prev =>
      prev.map(order =>
        order.orderId === orderId
          ? { ...order, track: newTrack }
          : order
      )
    );
  };

  return (
    <Layout>
      <div className="admin-orders">
        <h2>All Orders</h2>

        {orders.map((order, index) => (
          <div className="order-card" key={index}>

            {/* USER INFO */}
            <p><b>User:</b> {order.userName}</p>
            <p><b>Phone:</b> {order.userPhone}</p>

            {/* ORDER INFO */}
            <p><b>Order ID:</b> #{order.orderId}</p>
            <p><b>Date:</b> {order.date}</p>
            <p><b>Payment:</b> {order.paymentMethod?.toUpperCase()}</p>

            <h3 className="ppp">Total: ₹ {order.total}</h3>

            {/* ORDER STATUS */}
            <label>Status:</label>
            <select
              value={order.track}
              onChange={(e) =>
                updateOrder(order.userId, order.orderId, e.target.value)
              }
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

            {/* DELIVERY ADDRESS */}
            {order.shippingAddress && (
              <>
                <h4>Delivery Address</h4>
                <p>
                  {order.shippingAddress.address}, <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>
              </>
            )}

            {/* ITEMS */}
            <h4>Items</h4>
            {order.items.map(item => (
              <p key={item.id}>
                ● {item.title} × {item.quantity} — ₹ {item.price}
              </p>
            ))}

          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminOrders;
