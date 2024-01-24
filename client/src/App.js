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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />

      <Route path="/admin" element={<AdminLayout/>} >
        <Route path="/admin/dashboard" element={<AdminPanel/>} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/products" element={<AdminProducts/>} />
        <Route path="/admin/add-products" element={<AdminAddProducts/>} />
      </Route>

    </Routes>
  );
}

export default App;
