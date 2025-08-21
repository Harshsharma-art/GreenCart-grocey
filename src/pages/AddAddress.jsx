import React, { useState } from "react";
import assets from "../assets/assets";

const AddAddress = () => {
  // ✅ State to hold form values
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // ✅ Handle change for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save & clear fields
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save address in localStorage
    localStorage.setItem("shippingAddress", JSON.stringify(formData));

    alert("✅ Address Saved!");

    // ✅ Reset form fields
    setFormData({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
  };

  return (
    <div className="mt-16 pb-16">
      {/* ✅ Title */}
      <p className="text-2xl md:text-3xl text-bold font-normal gap-2 flex align-items-start">
        Add Shipping <span className="font-semibold text-primary ">Address</span>
      </p>

      {/* ✅ Flex Layout: Form + Image */}
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10 items-center md:items-start gap-10">
        
        {/* ✅ LEFT: FORM */}
        <div className="flex-1 max-w-md w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-400 rounded outline-none text-gray-700 font-normal focus:border-primary transition"
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-400 rounded outline-none text-gray-700 font-normal focus:border-primary transition"
            />

            {/* Street Address */}
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-400 rounded outline-none text-bold-700 font-normal focus:border-primary transition"
            />

            {/* City + State */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-400 rounded outline-none text-bold-700 font-normal focus:border-primary transition"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-400 rounded outline-none text-bold-700 font-normal focus:border-primary transition"
              />
            </div>

            {/* ZIP + Country */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-400 rounded outline-none text-gray-700 font-normal focus:border-primary transition"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-400 rounded outline-none text-gray-700 font-normal focus:border-primary transition"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-primary text-white rounded hover:bg-primary/90 transition"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* ✅ RIGHT: IMAGE */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            className="w-[80%] md:w-[70%] lg:w-[60%] object-contain"
            src={assets.add_address_iamge}
            alt="Add Address"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
