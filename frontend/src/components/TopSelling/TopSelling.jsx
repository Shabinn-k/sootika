import React, { useState, useEffect, useContext } from 'react';
import { api } from '../../api/Axios';
import "./TopSelling.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../Authentication/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TopSelling = ({ setShowLogin }) => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const [prod, setProd] = useState([]);
    const { addToCart, addToWish } = useContext(CartContext);

    useEffect(() => {
        api.get("/products")
            .then(res => setProd(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleCart = () => {
        if (!user) {
            setShowLogin(true);
            toast.warn("Please login to view Cart!");
            return false;
        }
        return true;
    };

    const handleWish = () => {
        if (!user) {
            setShowLogin(true);
            toast.warn("Please login to view Wishlist!");
            return false;
        }
        return true;
    };

    return (
        <div>
            <br />
            <h1>Our New Collections :-</h1>

            <div className="group-1">
                {prod.slice(0, 4).map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-img-box">
                            <img src={item.image} alt={item.title} onClick={() => navigate(`/detail/${item.id}`)} />
                        </div>
                        <h3>{item.title}</h3>
                        <div className="card-icons">
                            <FaHeart className="wish-icon"
                                onClick={() => { if (handleWish()) addToWish(item); }} />
                            <FaShoppingCart className="cart-icon"
                                onClick={() => { if (handleCart()) addToCart(item); }} />
                        </div>
                        <h2>{item.name}</h2>
                        <p>{item.catogory}</p>
                        <span>₹ {item.price}</span>
                    </div>
                ))}
            </div>

            <div className="group-2">
                {prod.slice(4, 8).map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-img-box">
                            <img src={item.image} alt={item.title} onClick={() => navigate(`/detail/${item.id}`)} />
                        </div>
                        <h3>{item.title}</h3>
                        <div className="card-icons">
                            <FaHeart className="wish-icon"
                                onClick={() => { if (handleWish()) addToWish(item); }} />
                            <FaShoppingCart className="cart-icon"
                                onClick={() => { if (handleCart()) addToCart(item); }} />
                        </div>
                        <h2>{item.name}</h2>
                        <span>₹ {item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopSelling;