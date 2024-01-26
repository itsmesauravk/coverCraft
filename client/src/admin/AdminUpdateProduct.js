import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../App.css';

export default function AdminUpdateProduct() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [coverName, setCoverName] = useState('');
  const [coverPrice, setCoverPrice] = useState('');
  const [coverCategory, setCoverCategory] = useState('');
  const [coverType, setCoverType] = useState('');
  const [coverDescription, setCoverDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateRedirect, setUpdateRedirect] = useState(false);

  //for previous details
  const [prevCoverName, setPrevCoverName] = useState('');
    const [prevCoverPrice, setPrevCoverPrice] = useState('');
    const [prevCoverCategory, setPrevCoverCategory] = useState('');
    const [prevCoverDescription, setPrevCoverDescription] = useState('');


  const { id } = useParams();

  const url = "http://localhost:4000";

    const productDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/admin/update-product/${id}`);
            console.log(response.data.data);
            setPrevCoverName(response.data.data.coverName);
            setPrevCoverPrice(response.data.data.coverPrice);
            setPrevCoverCategory(response.data.data.coverCategory);
            // setPrevCoverType(response.data.data.coverType);
            setPrevCoverDescription(response.data.data.coverDescription);
        } catch (error) {
            console.error("Error getting all products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            productDetails();
        }
    }, [id]);
    

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("coverName", coverName);
        formData.append("coverPrice", coverPrice);
        formData.append("updateCoverPhoto", selectedPhoto);
        formData.append("coverCategory", coverCategory);
        formData.append("coverType", coverType);
        formData.append("coverDescription", coverDescription);

        try {
            setLoading(true);
            const response = await axios.patch(`${url}/admin/update-product/${id}`, formData);
            console.log(response.data); 
            if (response) {
                alert("Product Updated Successfully");
                setUpdateRedirect(true);
            } else {
                alert("Unable to update the product");
            }
        } catch (error) {
            // console.error(error.response.data); // Log the error response data
            alert("Error occurred while updating the product: " + error);
        } finally {
            setLoading(false);
        }
    }


    if (updateRedirect) {
        return <Navigate to="/admin/products" />;
    }
    return (
        <div>
            <div>
                <button>
                    <Link to="/admin/products">Back</Link>
                </button>
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
                {loading ? (
                    <span className="loader"></span>
                    ) : (
                    <div>
                    <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
                    <form onSubmit={updateProduct}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Name</label>
                            <input
                            type="text"
                                placeholder={prevCoverName}
                                className="mt-1 p-2 w-full border rounded-md"
                                value={coverName}
                                onChange={(e)=>setCoverName(e.target.value)}
                                />
                            </div>
                    
                            <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Price</label>
                            <input
                            type="number"
                            placeholder={prevCoverPrice}
                            value={coverPrice}
                            onChange={(e)=>setCoverPrice(e.target.value)}
                            
                            className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                    
                            <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Category</label>
                            <select 
                            value={coverCategory}
                            placeholder={prevCoverCategory}
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
                                
                                onChange={(e)=>setCoverType(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md">
                                <option value="" disabled hidden>--Device Options--</option>
                                <option value="mobile-cover">Mobile Cover</option>
                                <option value="laptop-cover">Laptop Cover</option>
                                <option value="wraps">Wraps</option>
                            </select>
                            </div>
                    
                            <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Description</label>
                            <textarea
                            value={coverDescription}
                            placeholder={prevCoverDescription}
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
                            
                            name="updateCoverPhoto" 
                            className="mt-1 p-2 w-full border rounded-md" 
                            onChange={(e)=>setSelectedPhoto(e.target.files[0])}
                            />
                            </div>
                    
                        <button type='submit' className="bg-red-500 text-white font-bold px-4 py-2 rounded-md hover:bg-red-400 ">Add Product</button>
                    </form>
                    </div>
                )}
            </div>
        </div>
    )}