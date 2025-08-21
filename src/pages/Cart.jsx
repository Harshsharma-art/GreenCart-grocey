import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import assets, { dummyAddress } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    products,
    cartItems,
    removeFromCart,
    updateCartItem,
    currency,
    getCartTotalPrice,
  } = useAppContext();

  const navigate = useNavigate();

  const [cartArray, setCartArray] = useState([]);
  const [address] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const getCart = () => {
    const tempArray = [];
    for (const id in cartItems) {
      const productInfo = products.find((item) => item._id === id);
      if (productInfo && cartItems[id] > 0) {
        tempArray.push({
          ...productInfo,
          quantity: cartItems[id],
        });
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      getCart();
    }
  }, [products, cartItems]);

  const placeOrder = async () => {
    console.log("Placing order...");
  };

  // ✅ If cart empty
  if (products.length === 0 || Object.keys(cartItems).length === 0) {
    return (
      <div className="text-center mt-16 text-gray-500">
        Your cart is empty.{" "}
        <button
          onClick={() => navigate("/products")}
          className="text-primary hover:underline"
        >
          Shop now
        </button>
      </div>
    );
  }

  // ✅ Calculate prices ONCE
  const subtotal = getCartTotalPrice(); // ✅ correct subtotal
  const taxRate = 0.02; // 2% tax
  const tax = Math.round(subtotal * taxRate * 100) / 100; // ✅ rounded to 2 decimals
  const totalAmount = Math.round((subtotal + tax) * 100) / 100;

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* ✅ LEFT SIDE: Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium  mb-6  ">
          Shopping Cart{" "}
          <span className="text-sm text-primary-500">
            {cartArray.length} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Remove</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            {/* Product Info */}
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  window.scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={
                    Array.isArray(product.image)
                      ? product.image[0]
                      : product.image
                  }
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none ml-2"
                      value={cartItems[product._id]}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                    >
                      {Array.from({
                        length: Math.max(cartItems[product._id], 9),
                      }).map((_, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <p className="text-center">
             {currency} {(product.offerPrice * product.quantity).toFixed(2)}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        {/* Continue Shopping */}
        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="group-hover:translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      {/* ✅ RIGHT SIDE: Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Delivery Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {address.map((addr, idx) => (
                  <p
                    key={idx}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {addr.street}, {addr.city}, {addr.state}, {addr.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            value={paymentMethod}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        {/* Price Summary */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency}{subtotal.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{tax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>{currency}{totalAmount.toFixed(2)}</span>
          </p>
        </div>

        {/* Place Order */}
        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary transition"
        >
          {paymentMethod === "COD" ? "Place Order" : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
