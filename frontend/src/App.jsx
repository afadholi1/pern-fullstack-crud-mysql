import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// Tambahkan import ProductList, AddProduct, dll di sini

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto mt-10 px-4">
          <Routes>
            <Route path="/" element={<div className="text-xl font-semibold text-center">Halaman List Produk (Segera Hadir)</div>} />
            <Route path="/add" element={<div className="text-xl font-semibold text-center">Halaman Tambah Produk (Segera Hadir)</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;