
import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../UserContex';
import axios from 'axios';

export default function AdminPanel() {
  const url = 'http://localhost:4000'
  const {userInfo} = useContext(UserContext)
  const [user,setUser] = useState([])
  const [product,setProduct] = useState([])

  const getData = async () => {
    try{
      const response = await axios.get(`${url}/get-users`,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      setUser(response.data)
      
      const response2 = await axios.get(`${url}/get-products`,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      
      })
      setProduct(response2.data)

      if(response.status === 200 && response2.status === 200){
        console.log('Ok')
      }else{
        console.log('Error to get data')
      }

    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  },[])

  const firstName = userInfo.firstName;
  const lastName = userInfo.lastName;
  return (
    <div>
      <div >
        <h1 className='text-2xl mt-4'>Welcome to Admin Panel <br/>
        <span className='text-3xl font-bold'>{firstName} {lastName}</span>,</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="bg-blue-500 h-52 rounded-md p-6 text-center">
          <h1 className="text-2xl mb-4">Total Users</h1>
          <span className="text-5xl font-bold">{user.length}</span>
        </div>

        <div className="bg-green-500 h-52 rounded-md p-6 text-center">
          <h1 className="text-2xl mb-4">Total Products</h1>
          <span className="text-5xl font-bold">{product.length}</span>
        </div>

        <div className="bg-purple-500 h-52 rounded-md p-6 text-center">
          <h1 className="text-2xl mb-4">Total Orders</h1>
          <span className="text-5xl font-bold">0</span>
        </div>

        <div className="bg-orange-500 h-52 rounded-md p-6 text-center">
          <h1 className="text-2xl mb-4">Total Sales</h1>
          <span className="text-5xl font-bold">0</span>
        </div>

        <div className="bg-yellow-500 h-52 rounded-md p-6 text-center">
          <h1 className="text-2xl mb-4">Total Investment</h1>
          <span className="text-5xl font-bold">0</span>
        </div>

        <div className="bg-gray-500 h-52 rounded-md p-6 text-center">
          <h1 className="text-2xl mb-4">Total Profit</h1>
          <span className="text-5xl font-bold">?</span>
        </div>
      </div>

    </div>
  )
}