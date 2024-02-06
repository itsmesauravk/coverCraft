import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import '../App.css'
import { UserContext } from "../UserContex";


export default function LoginPage() {

    const url = "http://localhost:4000"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    // const [userId, setUserId] = useState('')
    const {setUserInfo} = useContext(UserContext)
    const [loginErr, setLoginErr] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${url}/login`, {
                email: email,
                password: password
            })
            if (response.status === 200) {
                console.log("Login Successful")
                // console.log("Login",response.data) 
                setUserInfo(response.data.user)
                //storing user data in local storage unless they logout
                localStorage.setItem("userInfo", JSON.stringify(response.data.user))
                // console.log("Data saved in local Storage.")
                
                setEmail('')
                setPassword('')
                setLoading(false)
                setRedirect(true)
                setLoginErr(false)
            } else {
                console.log("Login Failed")
                setLoading(false)
                setLoginErr(true)
            }
        } catch (error) {
            console.log("Error while login : ", error)
            setLoading(false)
            setLoginErr(true)
        }
    }


    if(redirect){
        return <Navigate to={`/`} />;
    }

    const backgroundImageUrl = "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative bg-white p-8 rounded shadow-md w-96 ">
                <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
                {loading ? (<span className="loader"></span>) :(
                    <>
                        <form onSubmit={loginUser}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Email</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="max-w-md mt-1 p-2 w-full border rounded-md"
                                    placeholder="example@gmail.com"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-black">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="max-w-md mt-1 p-2 w-full border rounded-md"
                                    placeholder="example123"
                                />
                            </div>
                            {loginErr && (
                                <p className="text-red-500 text-sm mb-4">
                                    Invalid email or password
                                </p>
                            )}
                            <button
                                type="submit"
                                className="bg-black text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800"
                            >
                                Login
                            </button>
                        </form>
                        <div className="mt-4">
                            <p className="text-sm text-black">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-red-500 hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </>
                ) }
            </div>
        </div>
    );
}
