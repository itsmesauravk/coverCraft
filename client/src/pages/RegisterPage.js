import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function RegisterPage(){
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    number:'',
    password: '',
    userPhoto: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const url = "http://localhost:4000"
 

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Check if the input is a file input
    if (name === 'userPhoto' && files.length > 0) {
        setFormData({ ...formData, userPhoto: files[0] });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const registerUser =  async(e) => {
    e.preventDefault();
    try{
        if(formData.password !== confirmPassword){
          alert("Passwords do not match")
          return
        }
        const {firstName, middleName, lastName, email,number ,password, userPhoto} = formData;
        const response = await axios.post(`${url}/register`,{
            firstName:firstName,
            middleName:middleName,
            lastName:lastName,
            email:email,
            number:number,
            password:password,
            userPhoto:userPhoto
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
        if(response.status === 200){
            alert("User Registered Successfully")
            setFormData({
              firstName: '',
              middleName: '',
              lastName: '',
              email: '',
            number:'',
              password: '',
              userPhoto: '',
            })
            setConfirmPassword('')
            setRedirect(true)

        }else{
            alert("Error registering the user")
        }

    }catch(error){
      console.log("Error on registration :",error)
    }
    
  };
  if(redirect){
    return <Navigate to={`/login`} />;
  }


  const backgroundImageUrl = "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100"
    style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-white p-8 shadow-md rounded-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">First Name <span className='text-red-600'>*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Last Name <span className='text-red-600'>*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email <span className='text-red-600'>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Number <span className='text-red-600'>*</span></label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password <span className='text-red-600'>*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
              minLength="8"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Confirm Password <span className='text-red-600'>*</span></label>
            <input
              type="password"
              name="password"
              value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
              minLength="8"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Photo <span className='text-red-600'>*</span></label>
            {formData.userPhoto && (
              <img
                src={URL.createObjectURL(formData.userPhoto)}
                alt="user"
                className="w-20 h-20 object-cover rounded-full"
              />
            )}
            <input
              type="file"
              name="userPhoto"
              value={formData.photo}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-400"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
        </p>
      </div>
    </div>
  );
};


