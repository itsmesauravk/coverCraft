import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function AdminProducts() {
  const url = "http://localhost:4000";

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [updateProductId, setUpdateProductId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/admin/get-products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error getting all products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    const deleteProduct = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
        try {
          const response = await axios.delete(`${url}/admin/delete-product/${productId}`);
          if (response) {
            alert("Product deleted successfully");
            setProductId('');
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
          } else {
            alert("Unable to delete the product");
          }
        } catch (error) {
          alert("Error deleting the product: ", error);
        }
      } else {
        setProductId('');
      }
    };

    // Execute deleteProduct if productId is available
    if (productId) {
      deleteProduct();
    }
  }, [url, productId]);

  if (updateProductId) {
    return <Navigate to={`/admin/update-product/${updateProductId}`} />;
  }
  
 

  // console.log("Product iD : ",productId)
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-md overflow-hidden shadow-md border border-gray-300 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={url + "/" + product.coverPhoto}
                alt={product.coverName}
                className="w-full h-48 object-contain rounded-t-md"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-black">
                  {product.coverName}
                </h2>
                <p className="text-red-600 font-semibold mb-2">
                  Price: ${product.coverPrice}
                </p>
                <p className="text-gray-600 mb-2">
                  Category: {product.coverCategory}
                </p>
                <p className="text-gray-600 mb-4">Type: {product.coverType}</p>
                <div className="flex gap-4">
                  
                  <button
                  onClick={()=>setUpdateProductId(product._id)}
                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-red-300">
                      Edit
                  </button>
                 
                  <button 
                  onClick={()=>setProductId(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
