import React, { useState } from 'react';

export default function AdminAddProducts() {
    const [selectedPhoto, setSelectedPhoto] = useState("")
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input type="text" className="mt-1 p-2 w-full border rounded-md" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Price</label>
        <input type="number" className="mt-1 p-2 w-full border rounded-md" />
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
         className="mt-1 p-2 w-full border rounded-md" 
         onChange={(e)=>setSelectedPhoto(e.target.files[0])}
         />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Category</label>
        <select className="mt-1 p-2 w-full border rounded-md">
          <option value="hard-cover">3D-Hard Cover</option>
          <option value="side-rubber">2D-Side Rubber</option>
          <option value="hard-full">3D-Hard Full</option>
          <option value="double-layer">Double Layers</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Type</label>
        <select className="mt-1 p-2 w-full border rounded-md">
          <option value="mobile-cover">Mobile Cover</option>
          <option value="laptop-cover">Laptop Cover</option>
          <option value="wraps">Wraps</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Description</label>
        <textarea className="mt-1 p-2 w-full border rounded-md"></textarea>
      </div>
      <button className="bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-400 ">Add Product</button>
    </div>

  );
}
