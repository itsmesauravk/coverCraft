import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContex";
import axios from "axios";

export default function HomePage() {
  const url = "http://localhost:4000";
  const { userInfo } = useContext(UserContext);
  const userId = userInfo ? userInfo.id : null;
  const isAdmin = userInfo ? userInfo.isAdmin : false;
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${url}/get-products`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts(response.data);
      if (response.status === 200) {
        console.log("Ok");
      } else {
        console.log("Error to get data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // console.log(products);
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
        <h2 className="text-3xl font-bold mb-4">Our Products</h2>
        {products && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Link to={`/product/${product._id}`}>
                <img
                  src={url + '/' + product.coverPhoto}
                  alt={product.name}
                  className="w-64 h-46 object-cover rounded-t-lg"
                />
                </Link>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{product.coverName}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{product.coverPrice}</span>
                    <Link to={`/product/${product._id}`}>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!products && (
          <div>
            <h1 className="text-2xl mb-4">No Product Found</h1>
          </div>
        )}
      </section>

    </div>
  );
}
