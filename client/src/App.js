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

function App() {
  return (
    <Routes>
      <Route path="/:id" element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />

      <Route path="/:id/admin" element={<AdminLayout/>}>
        <Route path="dashboard" element={<AdminPanel/>} />
        <Route path="users" element={<AdminUsers/>} />
        <Route path="products" element={<AdminProducts/>} />
        <Route path="add-products" element={<AdminAddProducts/>} />
        <Route path="update-product/:id" element={<AdminUpdateProduct/>} />
      </Route>


    </Routes>
  );
}

export default App;
