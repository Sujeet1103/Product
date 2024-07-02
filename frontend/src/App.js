import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Customers from './Customers';
import Products from './Products';
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customers/>} />
        <Route path="/products" element={<Products/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;