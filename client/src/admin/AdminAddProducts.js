import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function AdminAddProducts() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [coverName, setCoverName] = useState('');
  const [coverPrice, setCoverPrice] = useState('');
  const [coverCategory, setCoverCategory] = useState('');
  const [coverType, setCoverType] = useState('');
  const [coverDescription, setCoverDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:4000";

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("coverName", coverName);
    formData.append("coverPrice", coverPrice);
    formData.append("coverPhoto", selectedPhoto);
    formData.append("coverCategory", coverCategory);
    formData.append("coverType", coverType);
    formData.append("coverDescription", coverDescription);

    try {
      setLoading(true);

      const response = await axios.post(`${url}/admin/add-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        alert("New Product Added Successfully");
        setCoverName("");
        setCoverPrice("");
        setCoverCategory("");
        setSelectedPhoto(null);
        setCoverType("");
        setCoverDescription("");
      } else {
        alert("Unable to add new product");
      }
    } catch (error) {
      alert("Error occurred while adding new product: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
          <form onSubmit={addProduct}>
            <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <input
                  type="text"
                  required
                    className="mt-1 p-2 w-full border rounded-md"
                    value={coverName}
                    onChange={(e)=>setCoverName(e.target.value)}
                    />
                </div>
        
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Price</label>
                  <input
                  type="number"
                  value={coverPrice}
                  onChange={(e)=>setCoverPrice(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-md" />
                </div>
        
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Category</label>
                  <select 
                  value={coverCategory}
                  required
                  onChange={(e)=>setCoverCategory(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md">
                    <option value="">--Cover Types--</option>
                    <option value="hard-cover">3D-Hard Cover</option>
                    <option value="side-rubber">2D-Side Rubber</option>
                    <option value="hard-full">3D-Hard Full</option>
                    <option value="double-layer">Double Layers</option>
                  </select>
                </div>
        
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Type</label>
                  <select
                    value={coverType}
                    required
                    onChange={(e)=>setCoverType(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md">
                    <option value="">--Device Options--</option>
                    <option value="mobile-cover">Mobile Cover</option>
                    <option value="laptop-cover">Laptop Cover</option>
                    <option value="wraps">Wraps</option>
                  </select>
                </div>
        
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Description</label>
                  <textarea
                  value={coverDescription}
                  required
                  onChange={(e)=>setCoverDescription(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"></textarea>
                </div>
        
                <div className="mb-4">
                  {selectedPhoto && (
                      <div>
                        <img
                          alt="not found"
                          width={"250px"}
                          src={URL.createObjectURL(selectedPhoto)}
                        />
                        <br />
                        <button onClick={() => setSelectedPhoto(null)}>Remove</button>
                      </div>
                    )}
        
                  <label className="block text-sm font-medium text-gray-600">Add Photo</label>
                  <input
                  type="file"
                  required
                  name="coverPhoto" 
                  className="mt-1 p-2 w-full border rounded-md" 
                  onChange={(e)=>setSelectedPhoto(e.target.files[0])}
                  />
                </div>
        
              <button type='submit' className="bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-400 ">Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
}
