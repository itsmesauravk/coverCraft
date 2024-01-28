import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContex";

export default function HomePage() {
  const { userInfo } = useContext(UserContext);
  const userId = userInfo ? userInfo.id : null;
  const isAdmin = userInfo ? userInfo.isAdmin : false;

  return (
    <div>
      {/* Image with Info */}
      <div className="relative">
        <img
          src="/bigImg.jpg"
          alt="Big Image"
          className="w-full object-cover"
          style={{ height: "60vh" }}

        />
        <div className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-black">
          <h2 className="text-5xl font-bold mb-4">Bienvenido a Cover Craftt</h2>
          <p className="text-lg">
            Explore the latest trends in the world of smartphones & laptops<br/> cover and wraps.
          </p>
        </div>
      </div>

      {/* Shopping Cards Section */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        {/* Add your shopping cards or components here */}
        <div className="h-screen bg-red-500">

        </div>
      </section>

    </div>
  );
}
