import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";



export default function SingleProduct(){
    const [productData,setProductData] = useState([])
    const [loading,setLoading] = useState(false)
    const url = "http://localhost:4000";

    const productId = useParams()  //to get the id from the url
    // console.log(productId.id)

    const getSingleProduct = async() => { 

        try{
            setLoading(true)
            const response = await axios.get(`${url}/get-single-product/${productId.id}`)
            setProductData(response.data)
            // console.log(response.data)
            if(response.status !== 200){
                console.log("Error getting single product data")
            }


        }catch(error){
            console.log("Error getting single product data :",error)
        } finally{
            setLoading(false)
        }

    }

    useEffect(() => {
        getSingleProduct()
    },[productId.id])
    
    return(
        <div>
            {loading && <span className="loader"></span>}
            {!productData && (
                <div>
                    <h1 className="text-2xl mb-4">No Product Found</h1>
                </div>
            )}
            {productData && (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="mt-3 font-bold text-2xl bg-black p-2">
      <Link
        className="text-white hover:text-gray-600"
        to={'/'}
      >
        Back
      </Link>
    </div>
    <div className="flex gap-8 p-4 rounded-md bg-white shadow-md">
      <div className="flex-shrink-0 w-1/2">
        <img
          src={url + '/' + productData.coverPhoto}
          alt={productData.name}
          className="w-full h-auto rounded-md object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="mb-4">
          <span className="text-sm">Product Id: {productData._id}</span>
          <h2 className="text-3xl font-semibold mt-2 mb-4">{productData.coverName}</h2>
          <p className="text-lg font-semibold text-red-600">{`Rs ${productData.coverPrice}`}</p>
          <p className="text-lg  ">{`Type: ${productData.coverType}`}</p>
          <p className="text-lg ">{`Category: ${productData.coverCategory}`}</p>
        </div>
        <p className="text-lg ">{`${productData.coverDescription}`}</p>
        <div className="mt-4">
          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600"
            // onClick={() => handleAddToCart(productData)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        </div>
    )
}