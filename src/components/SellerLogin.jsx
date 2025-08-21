import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller ,axios} = useAppContext(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
  try {
    event.preventDefault();
    const {data}=await axios.post('/api/seller/login', {
      email,  password
    }); 
   if(data.success) {
      setIsSeller(true);
      toast.success("Login successful");
      navigate("/seller");
    }else{
      toast.error(data.message || "Login failed");
      setIsSeller(false);
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    setIsSeller(false);
  }
  }

  // ✅ If already logged in, redirect to seller dashboard directly
  if (isSeller) {
    navigate("/seller");
    return null; // Prevent rendering login form again
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white flex flex-col gap-5 w-full max-w-sm mx-auto p-6 rounded-lg shadow-md border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-xl font-semibold text-center">
          <span className="text-primary">Seller Login</span>
        </h2>

        {/* Email */}
        <div className="w-full">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-primary rounded-md hover:bg-primary/90 transition-all duration-200 font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
