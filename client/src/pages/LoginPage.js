import { Link } from "react-router-dom";

export default function LoginPage() {
    const backgroundImageUrl = "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"
    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
             <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative bg-white p-8 rounded shadow-md w-96 ">
                <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">Username</label>
                        <input
                            type="text"
                            className="max-w-md mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">Password</label>
                        <input
                            type="password"
                            className="max-w-md mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
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
            </div>
        </div>
    );
}
