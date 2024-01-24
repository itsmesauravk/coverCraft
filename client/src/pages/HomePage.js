import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/admin/dashboard"> Admin Pannel</Link>
    </div>
  )
}