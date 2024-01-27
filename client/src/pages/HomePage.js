import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContex";
//implement use contex here


export default function HomePage() {
  const {userInfo} = useContext(UserContext)
  const userId = userInfo.id
  const isAdmin = userInfo.isAdmin
  console.log(userInfo)
  return (
    <div>

      <h1>Home Page</h1>
      {isAdmin ? (
        <Link
        className="bg-green-500  text-blue-500 hover:text-blue-600"
         to={`/admin/dashboard`}> Admin Pannel</Link>):("")}
    </div>
  )
}