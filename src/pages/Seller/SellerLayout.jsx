import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import assets from "../../assets/assets";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "add-product", icon: assets.add_icon },
    { name: "Product List", path: "product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "orders", icon: assets.order_icon },
  ];

  const logout = () => {
    setIsSeller(false);
  };

  return (
    <div className="flex">
      {/* ✅ Sidebar */}
      <div className="md:w-64 w-16 border-r h-[100vh] text-base border-gray-300 pt-4 flex flex-col">
        {sidebarLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path} // relative path
            className={({ isActive }) =>
              `flex items-center py-3 px-4 gap-3 ${
                isActive
                  ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                  : "hover:bg-gray-100/90 border-white text-gray-700"
              }`
            }
          >
            <img src={item.icon} alt="" className="w-7 h-7" />
            <p className="md:block hidden">{item.name}</p>
          </NavLink>
        ))}
        <button onClick={logout} className="m-4 px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>

      {/* ✅ Main content for nested pages */}
      <div className="flex-1 p-4">
        <Outlet /> {/* ✅ nested routes appear here */}
      </div>
    </div>
  );
};

export default SellerLayout;
