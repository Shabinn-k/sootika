import "./Shop.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../../db.json";
import { toast } from "react-toastify";
import { useAuth } from "../../Authentication/AuthContext";
import { CartContext } from "../../context/CartContext";
import { FaHeart } from "react-icons/fa";

const Shop = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [shop, setShop] = useState(products);

  const { user } = useAuth();
  const { addToCart, addToWish } = useContext(CartContext);

  useEffect(() => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setShop(filtered);
  }, [search]);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please login to add items to Cart!");
      return;
    }

    if (product.stock === false) {
      toast.error("Product is out of stock!");
      return;
    }

    addToCart(product);
   
  };

  const handleAddToWish = (product) => {
    if (!user) {
      toast.error("Please login to add items to Wishlist!");
      return;
    }

    addToWish(product);
  };

  return (
    <div className="shop-page">
      <div className="back-home" onClick={() => navigate("/")}>
        Back to home
      </div>

      <input
        type="search"
        placeholder="search something"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {shop.length > 0 ? (
          shop.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="image-box">
                <FaHeart
                  className="wishlist-icon"
                  onClick={() => handleAddToWish(item)}
                />
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => navigate(`/detail/${item.id}`)}
                />
              </div>

              <h3 onClick={() => navigate(`/detail/${item.id}`)}>
                {item.title}
              </h3>

              <h2 className="name">{item.name}</h2>

              {/* BOOLEAN STOCK STATUS */}
              <p className={`stock ${item.stock === false ? "out" : ""}`}>
                {item.stock === true ? "In Stock" : "Out of Stock"}
              </p>

              <span className="price">₹ {item.price}</span>

              <button
                className="addCart"
                disabled={item.stock === false}
                onClick={() => handleAddToCart(item)}
              >
                {item.stock === true ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))
        ) : (
          <p className="noProduct">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Shop;