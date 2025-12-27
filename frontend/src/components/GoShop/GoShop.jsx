import React from 'react'
import "./GoShop.css";
import { useNavigate } from 'react-router-dom';
import GoSh from "../../assets/GoShop.mp4"

 const GoShop = () => {
        const navigate= useNavigate()
    return (
    <div className="video-bg-container">

      <video autoPlay muted loop playsInline className="video-bg">
        <source src={GoSh}/>
      </video>

      <div className="video-content">
        <button className="shop-btn" onClick={()=>navigate("/shop")}>Go Shopping ➜</button>
      </div>

    </div>
  );
};

export default GoShop;
