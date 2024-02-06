// import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
// import { UserContext } from "./UserContex";


export default function Layout(){
    // const {userInfo} = useContext(UserContext)

    //to get the userinfo from localhost
    const userInfoLS = JSON.parse(localStorage.getItem("userInfo"));
    const isAdmin = userInfoLS ? userInfoLS.isAdmin : false;
    console.log("Layout localStorage userinfo",userInfoLS)

    const url = "http://localhost:4000"

    return (
        <>
            <div className="sticky  top-0 bg-white z-50">
                <div className=" flex flex-col items-center">
                    {/* Header */}
                        <header className="flex justify-between items-center p-4  w-4/5">
                            <div className="flex items-center ">
                            {/* Logo */}
                            <img src="/logo.png"
                            alt="Logo" className="h-16 rounded-full" />
                            <h1 className="text-xl font-bold ml-2">Cover Craftt</h1>
                            </div>

                            {userInfoLS ? (
                                <div className="flex items-center">
                                {isAdmin && (
                                    <Link
                                    to="/admin/dashboard"
                                    className="font-bold text-black bg-white hover:bg-gray-100 px-4 py-2 rounded-full transition duration-300"
                                    >
                                    Admin Panel
                                    </Link>

                                )}
                                    <div className="border-2 border-black p-1 rounded-full flex items-center">
                                    <div className="mr-2 ">
                                        <img
                                            src={`${url}/${userInfoLS.photo}`}
                                            alt="Profile Image"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-semibold">
                                            {userInfoLS.firstName} {userInfoLS.lastName}
                                        </h1>
                                    </div>
                                </div>
                                </div>
                                ):(
                                    <div className="flex items-center bg-black rounded-full">
                                        <Link
                                            to="/login"
                                            className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-l-full transition duration-300"
                                        >
                                            Login
                                        </Link>
                                        <span className="text-gray-500 mx-2">|</span>
                                        <Link
                                            to="/register"
                                            className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-r-full transition duration-300"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}

                        </header>
                </div>

                <div className="flex justify-center bg-gray-800">
                    <div className="flex justify-center   w-4/5">
                        <nav className=" text-white p-4 text-md w-3/5 ">
                            <ul className="flex justify-between ">
                            <li>
                                <Link
                                to="/"
                                className="hover:text-gray-300 focus:outline-none transition-colors duration-300"
                                >
                                Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                to="/phones"
                                className="hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300"
                                >
                                Phones
                                </Link>
                            </li>
                            <li>
                                <Link
                                to="/laptops"
                                className="hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300"
                                >
                                Laptops
                                </Link>
                            </li>
                            <li>
                                <Link
                                to="/wraps"
                                className="hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300"
                                >
                                Wraps
                                </Link>
                            </li>
                            <li>
                                <Link
                                to="/settings"
                                className="hover:text-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300"
                                >
                                Settings
                                </Link>
                            </li>
                            </ul>
                        </nav>
                        {/* social icons  */}
                        <div className="flex  w-2/5">
                            <div className="flex text-xl items-center justify-end text-white w-full">
                                <a href={'https://www.facebook.com/profile.php?id=61555176305414&mibextid=ZbWKwL' } target="_blank">
                                    <i className="fa-brands fa-facebook-f mr-5"></i>
                                </a>
                                <a href={'https://www.instagram.com/cover_craftts?igsh=MXVjcXh5MGFkOHBybg=='} target="_blank">
                                    <i className="fa-brands fa-instagram mr-5"></i>
                                </a>
                                <i className="fa-brands fa-twitter mr-5"></i>
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </>
    )
}