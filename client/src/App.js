import React, { useContext, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPanel from './admin/AdminPanel';
import AdminLayout from './admin/AdminLayout';
import AdminUsers from './admin/AdminUsers';
import AdminProducts from './admin/AdminProducts';
import AdminAddProducts from './admin/AdminAddProducts';
import AdminUpdateProduct from './admin/AdminUpdateProduct';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import MobilePage from './pages/MobilePage';
import LaptopPage from './pages/LaptopPage';
import WrapsPage from './pages/WrapsPage';
import SettingPage from './pages/SettingPage';
import { UserContext } from './UserContex';
import SingleProduct from './pages/SingleProduct';
// import PageNotFound from './pages/PageNotFound';

function App() {
  const {userInfo,setUserInfo} = useContext(UserContext)

  const fetchUserInfoFromLocalStorage = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  };

  useEffect(() => {
    fetchUserInfoFromLocalStorage();
  }, []);

  const isAdmin = userInfo ? userInfo.isAdmin : false;
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<MobilePage />} />
        <Route path="/laptops" element={<LaptopPage/>} />
        <Route path="/wraps" element={<WrapsPage />} />
      </Route>
      <Route path='/settings' element={<SettingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/product/:id' element={<SingleProduct />} />

      {isAdmin && (
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="/admin/dashboard" element={<AdminPanel/>} />
            <Route path="/admin/users" element={<AdminUsers/>} />
            <Route path="/admin/products" element={<AdminProducts/>} />
            <Route path="/admin/add-products" element={<AdminAddProducts/>} />
            <Route path="/admin/update-product/:id" element={<AdminUpdateProduct/>} />
        </Route>)}
    </Routes>


  
   
  );
}

export default App;
