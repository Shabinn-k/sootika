import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api/Axios";
import Layout from "../../Components/Layout";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <p style={{ padding: "20px" }}>Loading...</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="product-detail">

        <div className="product-image">
          <img src={product.image} alt={product.description}/>
        </div>

        <h2>{product.title}</h2>

        <p className="product-info">
          <span>Description:</span> {product.description}
        </p>

        <p className="product-info">
          <span>Price:</span> ₹{product.price}
        </p>

        <div className={`stock-badge ${product.stock ? "stock-in" : "stock-out"}`}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </div>

        <div className="detail-actions">
          <button className="edit-btn"
            onClick={() => navigate(`/admin/products/edit/${id}`)}>
            Edit Product</button>

          <button className="back-btn"
            onClick={() => navigate("/admin/products")}>
            Back to List</button>
        </div>

      </div>
    </Layout>
  );
};

export default ProductDetail;