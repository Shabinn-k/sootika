import { createContext, useEffect, useState } from "react";
import { api } from "../api/Axios";
import { useAuth } from "../Authentication/AuthContext";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);

  /* =====================
     FETCH CART / WISHLIST
  ===================== */
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setWishItems([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);
        setCartItems(res.data.cart || []);
        setWishItems(res.data.wishlist || []);
      } catch (err) {
        console.error("Fetch cart error:", err);
      }
    };

    fetchData();
  }, [user]);

  /* =====================
     UPDATE USER
  ===================== */
  const updateUserData = async (data) => {
    if (!user) return;
    try {
      await api.patch(`/users/${user.id}`, data);
    } catch (err) {
      console.error("Update user error:", err);
      toast.error("Failed to update data");
    }
  };

  /* =====================
     CART
  ===================== */
  const addToCart = async (item) => {
    if (!user) {
      toast.warn("Please login to add items to cart!");
      return;
    }

    let updated = [];

    setCartItems((prev) => {
      const exist = prev.find((p) => p.id === item.id);

      if (exist) {
        const qty = exist.quantity + (item.quantity || 1);

        updated =
          qty <= 0
            ? prev.filter((p) => p.id !== item.id)
            : prev.map((p) =>
                p.id === item.id ? { ...p, quantity: qty } : p
              );
      } else {
        updated = [...prev, { ...item, quantity: 1 }];
      }

      return updated;
    });

    await updateUserData({ cart: updated });
    toast.success("Cart updated");
  };

  const removeCart = async (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    await updateUserData({ cart: updated });
    toast.info("Item removed from cart");
  };

  const clearCart = async () => {
    setCartItems([]);
    await updateUserData({ cart: [] });
    toast.info("Cart cleared");
  };

  /* =====================
     WISHLIST
  ===================== */
  const addToWish = async (item) => {
    if (!user) {
      toast.warn("Please login to add items");
      return;
    }

    if (wishItems.find((w) => w.id === item.id)) {
      toast.info("Already in wishlist");
      return;
    }

    const updated = [...wishItems, item];
    setWishItems(updated);
    await updateUserData({ wishlist: updated });
    toast.success("Added to wishlist");
  };

  const removeWish = async (id) => {
    const updated = wishItems.filter((item) => item.id !== id);
    setWishItems(updated);
    await updateUserData({ wishlist: updated });
    toast.info("Removed from wishlist");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeCart,
        clearCart,
        wishItems,
        addToWish,
        removeWish,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
