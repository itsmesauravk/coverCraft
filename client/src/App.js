// Started date Jan 24 2024 (Wednesday)

import React from 'react';
import './App.css';

import {Routes,Route} from 'react-router-dom'

import HomePage from './pages/HomePage';
import AdminPanel from './admin/AdminPanel';
import AdminLayout from './admin/AdminLayout';
import AdminUsers from './admin/AdminUsers';
import AdminProducts from './admin/AdminProducts';
import AdminAddProducts from './admin/AdminAddProducts';
import AdminUpdateProduct from './admin/AdminUpdateProduct';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContex';

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />

      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<AdminPanel/>} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/products" element={<AdminProducts/>} />
        <Route path="/admin/add-products" element={<AdminAddProducts/>} />
        <Route path="/admin/update-product/:id" element={<AdminUpdateProduct/>} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
