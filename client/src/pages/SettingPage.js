import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContex";


export default function SettingPage() {
    const url = "http://localhost:4000"
    const {setUserInfo} = useContext(UserContext)

    const [redirect, setRedirect] = useState(false)

    const logoutHandler = async() => {
        const confirm = window.confirm("Are you sure you want to logout?")
        if(confirm){
            try {
                const response = await axios.post(`${url}/logout`)
                if(response.status === 200){
                    console.log("Logout Successful")
                    setRedirect(true)
                    setUserInfo(null)
                    //clearing local storage (user data
                
                    localStorage.removeItem("userInfo")
                }else{
                    console.log("Logout Failed")
                }
    
            } catch (error) {
                console.log("Error while logout : ",error)
            }
        }
    }

    if(redirect){
        return <Navigate to={`/`} />;
    }

    return (
        <div className="container mx-auto p-4">
          <Link to="/" className="text-blue-500 hover:underline mb-4 block">
            Home
          </Link>
          <h1 className="text-3xl font-bold mb-6">Setting Page</h1>
    
          <button
            onClick={logoutHandler}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      );
}