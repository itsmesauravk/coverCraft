import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Set the currentPath when the component mounts
    setCurrentPath(window.location.pathname);
  }, []);

  const handleLinkClick = (path) => {
    setCurrentPath(path);
    navigate(path);
  };

  return (
    <div className="flex">
      {/* for the sidebar */}
      <div className="flex flex-col h-screen w-1/6 bg-red-700  p-4">
        <h1 className="text-white font-bold text-xl mb-4 mt-4">Admin Panel</h1>

        <div className="mt-3 mb-3">
          <h1 className="text-2xl font-bold">Admin Info</h1>
        </div>

        <Link
          to="/admin/dashboard"
          className={`text-2xl mt-2 text-white hover:bg-black mb-2 p-2 ${
            currentPath === "/admin/dashboard" && "bg-black"
          }`}
          onClick={() => handleLinkClick("/admin/dashboard")}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/users"
          className={`text-2xl mt-2 text-white hover:bg-black mb-2 p-2 ${
            currentPath === "/admin/users" && "bg-black"
          }`}
          onClick={() => handleLinkClick("/admin/users")}
        >
          Users
        </Link>
        <Link
          to="/admin/products"
          className={`text-2xl mt-2 text-white hover:bg-black mb-2 p-2 ${
            currentPath === "/admin/products" && "bg-black"
          }`}
          onClick={() => handleLinkClick("/admin/products")}
        >
          Products
        </Link>
        <Link
          to="/admin/add-products"
          className={`text-2xl mt-2 text-white hover:bg-black mb-2 p-2 ${
            currentPath === "/admin/add-products" && "bg-black"
          }`}
          onClick={() => handleLinkClick("/admin/add-products")}
        >
          Add Products
        </Link>
      </div>

      {/* for the main content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
