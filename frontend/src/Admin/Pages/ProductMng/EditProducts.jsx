import React, { useEffect, useState } from "react";
import { api } from "../../../api/Axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import "./EditProducts.css";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        image: "",
        sImage: "",
        tImage: "",
        description: "",
        stock: true
    });

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const updateProduct = async () => {
        await api.put(`/products/${id}`, product);
        navigate("/admin/products");
    };

    return (
        <Layout>
            <div className="edit-product">
                <h2>Edit Product</h2>

                <div className="image-preview">
                    {product.image && (
                        <img src={product.image} alt="Main product" />
                    )}
                </div>

                <div className="form-group">
                    <label>Product Title</label>
                    <input value={product.title} required
                        onChange={e => setProduct({ ...product, title: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input value={product.price} required
                        onChange={e => setProduct({ ...product, price: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Main Image URL</label>
                    <input value={product.image}
                        onChange={e => setProduct({ ...product, image: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Second Image URL</label>
                    <input value={product.sImage || ""}
                        onChange={e => setProduct({ ...product, sImage: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Third Image URL</label>
                    <input value={product.tImage || ""}
                        onChange={e => setProduct({ ...product, tImage: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea value={product.description || ""}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                </div>


                <div className="stock-toggle">
                    <label>
                        <input type="checkbox" checked={product.stock}
                            onChange={e => setProduct({ ...product, stock: e.target.checked })} />
                        In Stock</label>
                </div>

                <div className="form-actions">
                    <button className="update-btn" onClick={updateProduct}>
                        Update Product
                    </button>

                    <button className="cancel-btn"
                        onClick={() => navigate("/admin/products")}>Cancel</button>
                </div>
            </div>
        </Layout>
    );
};

export default EditProduct;