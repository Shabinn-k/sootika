import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import "./Wishlist.css";

const Wishlist = () => {
    const navigate = useNavigate()
    const { wishItems, removeWish, addToCart } = useContext(CartContext);

    return (
        <div className='wish-page'>
            {wishItems.length === 0 ? <div className='empty-msg-container'><h2 className='empty-msg'>NO ITEMS WERE ADDED</h2>
                <button className="home-btn" onClick={() => navigate("/")}>GO HOME</button></div> :
                <>
                    <h1 className='text-center'>YOUR WISHLIST</h1><br />
                    {wishItems.map((item) => (
                        <div className="wish-card" key={item.id}>
                            <img src={item.image} alt={item.title} width={150} />
                            <div className="wish-info">
                                <h3>{item.title}</h3>
                                <h2>{item.name}</h2> 
                                <span>₹ {item.price}</span>
                            </div>

                            <div className="btns">
                                <div className="tocart"><button onClick={() => { addToCart(item); removeWish(item.id) }}>ADD TO CART</button></div>
                                <div className="remove" onClick={() => removeWish(item.id)}>REMOVE</div>
                            </div>
                        </div>

                    ))}
                    <button className="home-btN" onClick={() => navigate("/")}>GO HOME</button>
                </>
            }
        </div>
    )
}

export default Wishlist