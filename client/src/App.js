// Started date Jan 24 2024 (Wednesday)

import React from 'react';
import './App.css';

import {Routes,Route} from 'react-router-dom'

import HomePage from './pages/HomePage';
import AdminPanel from './admin/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/dashboard" element={<AdminPanel/>} />

    </Routes>
  );
}

export default App;
