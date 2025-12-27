import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeCart } = useContext(CartContext)

  return (
  <div className='cart-page'>
    {cartItems.length === 0 ? (
      <div className='empty-msg-container'>
        <h2>NO ITEMS WERE ADDED</h2>
        <button className='home-btn' onClick={() => navigate("/")}>HOME</button>
      </div>
    ) : (
      <>
        <h1 className='text-center'>YOUR CART ITEMS</h1>

        {cartItems.map((item) => (
          <div key={item.id} className='cart-card'>
            <img src={item.image} width={150} alt={item.title} className='rounded-2xl' />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <h2>{item.name}</h2> 
              <span>₹ {item.price}</span>
            </div>

            <div className="cart-last">
              <button onClick={() => addToCart({ ...item, quantity: -1 })}>-</button>
              <h4>{item.quantity}</h4>
              <button onClick={() => addToCart({ ...item, quantity: 1 })}>+</button>
            </div>

            <button className='remove-btn' onClick={() => removeCart(item.id)}>Remove</button>
          </div>
        ))}

        <div className="payment-summary">
          <h2>Order Summary</h2>

          <div className="payment-row">
            <span>Subtotal</span>
            <span>₹ {cartItems.reduce((acc, item) => acc + item.price * item.quantity,null)}</span>
          </div>

          <div className="payment-row">
            <span>Shipping</span>
            <span>₹80</span>
          </div>

          <div className="payment-row total">
            <span>Total</span>
            <span>₹ {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 80} </span>
          </div>

          <button className="pay-btN" onClick={() => navigate("/payment")}>
            Proceed To Payment
          </button>
        </div>

        <button className="home-btN1" onClick={() => navigate("/")}>GO HOME</button>
      </>
    )}
  </div>
);

}

export default Cart