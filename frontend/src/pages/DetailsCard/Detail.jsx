import React, { useContext, useEffect, useState } from 'react';
import "./Detail.css";
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/Axios';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../Authentication/AuthContext';
import { toast } from "react-toastify";

const Detail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();
  
  const [product, setProduct] = useState({});
  const [quant, setQuant] = useState(1);
  const [mainImg, setMainImg] = useState();

  useEffect(() => {
    const fetching = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setMainImg(res.data.image);
    };
    fetching();
  }, [id]);

  const handlePay = () => {
    if (!user) {
      toast.warn("Please login to continue!");
      return;
    }
    navigate("/payment", { state: { product, quant } });
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.warn("Please login to continue!");
      return;
    }
    addToCart({ ...product, quantity: quant });
    toast.success("Added to cart!");
  };

  return (
    <div className='detail-page'>
      <div className="shop-btn" onClick={() => navigate("/shop")}>Go to Shop</div>
      <div className="left">
        <img src={mainImg} alt="main" className='main-img' />
        <div className="down-main">
          {product.image && (
            <img src={product.image} className='down' onClick={() => setMainImg(product.image)} />
          )}
          {product.sImage && (
            <img src={product.sImage} className='down' onClick={() => setMainImg(product.sImage)} />
          )}
          {product.tImage && (
            <img src={product.tImage} className='down' onClick={() => setMainImg(product.tImage)} />
          )}
        </div>
      </div>

      <div className="right">
        <h2>{product.title}</h2>
        <p className="small">{product.name}</p>
        <p className="info">{product.description}</p>
        <div className="pp">₹ {product.price}</div>

        <div className="qntity">
          <button onClick={() => setQuant(Math.max(1, quant - 1))}>-</button>
          <span>{quant}</span>
          <button onClick={() => setQuant(quant + 1)}>+</button>
        </div>

        <div className="btn-row">
          <button className='add-btn' onClick={handleAddToCart}>Add to Cart</button>
          <button className='pay' onClick={handlePay}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;