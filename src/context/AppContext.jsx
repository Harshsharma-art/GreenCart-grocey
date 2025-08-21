/* eslint-disable no-undef */
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials=true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; // ✅ Set base URL for axios  


// ✅ Context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // ✅ Correct env usage
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearhQuery] = useState(""); // ✅ make it a string


// fetch seller  status
  useEffect(() => {
    const fetchSellerStatus = async () => {
      try {
        const { data } = await axios.get("/api/seller/status");
        setIsSeller(data.isSeller);
      } catch (error) {
        console.error("Error fetching seller status:", error);
      }
    };

    fetchSellerStatus();
  }, []);
 

  // fetch user auth status ,user data cart items
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.cartItems || {});
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };



  // ✅ Fetch all products
  const fetchProduct = async () => {
    setProducts(dummyProducts); // In future, can be API
  };

  // ✅ Add product to cart
  const addToCart = (itemId) => {
    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;

      toast.success("Added to Cart");
      return updatedCart;
    });
  };

  // ✅ Get total cart item count
  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  // ✅ Get total cart price
  const getCartTotalPrice = () => {
    let totalPrice = 0;

    for (const id in cartItems) {
      const productInfo = products.find((item) => item._id === id);
      if (productInfo && cartItems[id] > 0) {
        totalPrice += productInfo.offerPrice * cartItems[id];
      }
    }

    return Math.floor(totalPrice * 100) / 100; // ✅ correct rounding
  };

  // ✅ Update cart item qty
  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      cartData[itemId] = quantity;
      toast.success("Cart Updated");
      return cartData;
    });
  };

  // ✅ Remove product from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (cartData[itemId]) {
        cartData[itemId] -= 1;

        if (cartData[itemId] === 0) {
          delete cartData[itemId];
        }
      }

      toast.success("Removed From Cart");
      return cartData;
    });
  };

  // ✅ Load products initially
  useEffect(() => {
    fetchUser(); // Fetch user data and cart items
    fetchProduct();
    
  }, []);

  // ✅ Context value
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearhQuery,
    getCartItemCount,
    getCartTotalPrice, 
    axios, // ✅ Expose axios for API calls

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Custom hook
export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
