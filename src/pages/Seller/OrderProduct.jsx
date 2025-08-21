import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";

const OrderProduct = () => {
  const navigate = useNavigate();

  // ✅ Sample order data (You can fetch from API later)
  const [orders, setOrders] = useState([
    {
      id: "ORD12345",
      items: [
        {
          name: "Fresh Apples",
          image: "/images/apple.jpg",
          price: 120,
          qty: 2,
        },
        {
          name: "Organic Tomatoes",
          image: "/images/tomato.jpg",
          price: 80,
          qty: 1,
        },
      ],
      totalPrice: 320,
      status: "Out for Delivery",
      deliveryDate: "2025-07-20",
    },
    {
      id: "ORD67890",
      items: [
        {
          name: "Milk - 1L",
          image: "/images/milk.jpg",
          price: 60,
          qty: 2,
        },
      ],
      totalPrice: 120,
      status: "Delivered",
      deliveryDate: "2025-07-15",
    },
  ]);

  // ✅ Cancel an order
  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Cancelled" } : order
    );
    setOrders(updatedOrders);
  };

  // ✅ Track an order
  const trackOrder = (orderId) => {
    navigate(`/track-order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 md:px-12 lg:px-24">
      {/* ✅ Page Title */}
      <h1 className="text-2xl font-bold text-primary mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-100"
          >
            {/* ✅ Order Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <p className="font-semibold text-gray-700">
                Order ID: <span className="text-primary">{order.id}</span>
              </p>
              <span
                className={`text-sm font-medium px-3 py-1 rounded ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* ✅ Ordered Items */}
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 py-2 border-b last:border-none"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.qty} × ₹{item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-700">
                  ₹{item.qty * item.price}
                </p>
              </div>
            ))}

            {/* ✅ Order Summary */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-600">
                Delivery Date:{" "}
                <span className="font-medium">{order.deliveryDate}</span>
              </p>
              <p className="font-bold text-lg text-gray-800">
                Total: ₹{order.totalPrice}
              </p>
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex gap-3 mt-4">
              {order.status !== "Cancelled" && order.status !== "Delivered" && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
              {order.status !== "Cancelled" && (
                <button
                  onClick={() => trackOrder(order.id)}
                  className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
                >
                  Track Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderProduct;
