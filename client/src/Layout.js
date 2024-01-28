import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "./UserContex";


export default function Layout(){
    const {userInfo} = useContext(UserContext)
    const isAdmin = userInfo ? userInfo.isAdmin : false;
    console.log("Layout",userInfo)

    const url = "http://localhost:4000"

    return (
        <>
            <div className="sticky top-0 bg-white z-50">
                {/* Header */}
                <header className="flex justify-between items-center p-4">
                    <div className="flex items-center ">
                    {/* Logo */}
                    <img src="/logo.png"
                    alt="Logo" className="h-16 rounded-full" />
                    <h1 className="text-xl font-bold ml-2">Cover Craftt</h1>
                    </div>

                    {userInfo ? (
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
                                    src={`${url}/${userInfo.photo}`}
                                    alt="Profile Image"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">
                                    {userInfo.firstName} {userInfo.lastName}
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

                <nav className="bg-gray-800 text-white p-4 text-md">
                    <ul className="flex justify-around">
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
            </div>
            <div>
                <Outlet/>
            </div>
        </>
    )
}