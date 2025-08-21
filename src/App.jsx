import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";
import { useAppContext } from "./context/AppContext";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/SellerLogin";
import SellerLayout from "./pages/Seller/SellerLayout";
import AddProduct from "./pages/Seller/AddProduct";
import OrderProduct from "./pages/Seller/OrderProduct";

function App() {
  const IsSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, IsSeller } = useAppContext();

  return (
    <div>
      {/* ✅ Show Navbar only on non-seller paths */}
      {!IsSellerPath && <Navbar />}
      {showUserLogin && <Login />}

      <Toaster />

      <div className={`${IsSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          {/* ✅ Normal Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/myorders" element={<MyOrders />} />

          {/* ✅ Seller Login Route */}
          <Route path="/seller/login" element={<SellerLogin />} />

          {/* ✅ Seller Protected Routes */}
          <Route
            path="/seller/*"
            element={
              IsSeller ? (
                <SellerLayout />
              ) : (
                <Navigate to="/seller/login" replace />
              )
            }
          >
            {/* ✅ Nested Routes for Seller */}
            <Route index element={<Navigate to="add-product" replace />} /> 
            <Route path="add-product" element={<AddProduct />} />
            {/* You can add: <Route path="orders" element={<Orders />} /> */}
          </Route>

          {/* ✅ Catch-all redirect if nothing matches */}
          <Route path="*" element={<Navigate to="/" />} />
          

           <Route path="/seller/OrderProduct" element={<OrderProduct />} />
        </Routes>



      </div>

      {!IsSellerPath && <Footer />}
    </div>
  );
}

export default App;
