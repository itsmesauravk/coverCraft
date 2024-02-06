import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { UserContext } from "../UserContex";
import axios from "axios";
import '../App.css';

export default function HomePage() {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");

  const getProducts = async () => {
    try {
      setLoading(true);
      let response;
      if (typeFilter === "all") {
        response = await axios.get(`${url}/get-products`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.get(`${url}/get-products-by-type/${typeFilter}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setProducts(response.data);
      if (response.status === 200) {
        console.log("Ok");
      } else {
        console.log("Error to get data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //get user data
  // const userData = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    getProducts();
  }, [typeFilter]);

  // console.log(products);
  // console.log(typeFilter);
  return (
    <div className="">
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
      {loading && <span className="loader"></span>}
      <div className="flex justify-center">
        {!loading && (
            <section className="p-8 w-4/5">
              <div className="mt-2 mb-4">
                <h2 className="text-3xl font-bold mb-4">Our Products</h2>
                <div>
                  <p>Filter:</p>
                  <label className="mr-2" htmlFor="phone">Type</label>
                  <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="border-2 border-gray-500 rounded-md p-2">
                    <option value="all">All</option>
                    <option value="mobile-cover">Phone</option>
                    <option value="laptop-cover">Laptop</option>
                    <option value="wraps">wraps</option>
                  </select>
                </div>
              </div>
              {products && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                  <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={`${url}/${product.coverPhoto}`}
                        alt={product.name}
                        className="w-full h-48 object-contain rounded-t-md"
                      />
                    </Link>
                    <div className="p-4">
                      <h3 className="font-bold text-xl mb-2">{product.coverName}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-red-600 font-bold">Rs {product.coverPrice}</span>
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

        )}


      </div>
    </div>
  );
}
