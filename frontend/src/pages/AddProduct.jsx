import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        name,
        category,
        price: parseInt(price),
        stock: parseInt(stock),
      });
      navigate("/"); // Kembali ke halaman list setelah sukses
    } catch (error) {
      console.log(error);
    }
  };

  const formatRupiah = (value) => {
    if (!value) return "";
    // Hapus semua karakter selain angka
    const number = value.replace(/\D/g, "");
    // Format menjadi ribuan dengan titik
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Tambah Produk Baru
      </h1>
      <form onSubmit={saveProduct} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Nama Produk</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Mouse Gaming"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Kategori</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Contoh: Elektronik"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Harga</label>
            <input
              type="text" // Ubah dari number ke text agar bisa ada titiknya
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formatRupiah(price.toString())} // Tampilkan dengan format titik
              onChange={(e) => {
                // Simpan ke state HANYA angkanya saja (hapus titiknya)
                const rawValue = e.target.value.replace(/\D/g, "");
                setPrice(rawValue);
              }}
              placeholder="0"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Stok</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
